'use strict'
const AD = require('activedirectory')
const sql=require('./testSql')
const configUrl='ldap://corp.rgbk.com';
const config = { url: configUrl,
               baseDN: 'dc=domain,dc=com'}
const authenticate=require('express-authentication')

const customParser=function(entry, raw, callback){
    if (raw.hasOwnProperty("thumbnailPhoto")){
        entry.thumbnailPhoto = raw.thumbnailPhoto;
    }
    callback(entry)
}

const wrapAuthenticate=(adInstance, username, password)=>{
    return new Promise((resolve, reject)=>{
        adInstance.authenticate(username, password, (err, auth)=>{
            err?reject(err):resolve(auth)
        })
    })
}

const wrapFindUser=(adInstance, userid)=>{
    return new Promise((resolve, reject)=>{
        adInstance.findUser(userid, (err, auth)=>{
            err?reject(err):resolve(auth)
        })
    })
}


const wrapIsMemberOf=(adInstance, userid, group)=>{
    return new Promise((resolve, reject)=>{
        adInstance.isUserMemberOf(userid, group, (err, auth)=>{
            err?reject(err):resolve(auth)
        })
    })
}

const wrapRootDSE=(adInstance)=>{
    return new Promise((resolve, reject)=>{
        adInstance.getRootDSE((err, auth)=>{
            err?reject(err):resolve(auth)
        })
    })
}



const authenticate=(userid, password, cb)=>{
    const username=`CORP\\${userid}`;
    let ad = new AD(config);
    let domainPartition;
    let user;
    wrapRootDSE(ad).then((dse)=>{
        domainPartition=dse.namingContexts[2];
        return wrapAuthenticate(ad, username, password)
    }).then((auth)=>{
         if(!auth){
            throw new Error("Login Failed")
        }
       const authConfig={baseDN:domainPartition, url: configUrl,username, password, attributes:{
                user: [
                    'dn', 'distinguishedName',
                    'userPrincipalName', 'sAMAccountName', 'mail',
                    'lockoutTime', 'whenCreated', 'pwdLastSet', 'userAccountControl',
                    'employeeID', 'sn', 'givenName', 'initials', 'cn', 'displayName',
                    'comment', 'description', 'thumbnailPhoto'
                ],    
            }, entryParser:customParser}
        ad=new AD(authConfig);
        return wrapFindUser(ad, userid)
    }).then((userObject)=>{
        user=userObject;
        user.thumbnailPhoto=user.thumbnailPhoto.toString('base64')
        return wrapIsMemberOf(ad, userid, 'MVGMembers')
    }).then((isWithMRMV)=>{
        user.userType=isWithMRMV?"MRMVAnalyst":"";
        return cb(null,user)
    }).catch((err)=>{
        if(err.message==="getaddrinfo ENOTFOUND corp.rgbk.com corp.rgbk.com:389" && process.env.NODE_ENV !== 'production'){
            return cb(null, {cn:"Test Person", userType:"MRMVAnalyst"});
        }
        return cb(err, null);
    })
}

const basicAuth=(req, res, next)=>{
    req.challenge = req.get('Authorization');
    console.log(req.authentication)
    sql.getUserFromKey(req.authentication, (err, res)=>{
        req.authenticated=res.length>0?true:false
        req.group=res[0].group
        next();
    })
}
const handleGroups=(groups)=>{
    groups
    return basicAuth
}


module.exports.authenticate=authenticate;
module.exports.basicAuth=basicAuth;
