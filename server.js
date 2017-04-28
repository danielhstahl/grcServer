'use strict';
const express = require('express');
const bodyParser=require('body-parser');
let winston = require('winston');
const cryptojs=require('crypto-js');
const inRamDb=require('./inRamDb');
const addToSession=inRamDb.addToSession
const removeFromSession=inRamDb.removeFromSession
const getFromSession=inRamDb.getFromSession
const auth=require('./auth')
const sql=require('./testSql.js')
const policies=require('./policies')
if(process.env.NODE_ENV==='development'||process.env.NODE_ENV===undefined){
    sql.init()
}
let app = express();
let serverInstance
const port=process.env.NODE_ENV==='test'?'2999':'3001';

winston.add(winston.transports.File, { filename: 'logfile.log' });

const jsonParser = bodyParser.json();
app.use(bodyParser.json());

const transformNormalizedToKey=(associates)=>{
    associates.sort((a, b)=>a.id<b.id?-1:1);
    return associates.reduce((aggr, curr, index, arr)=>{
        const aggrLength=aggr.length;
        if(index>0&&arr[index-1].id===curr.id){
            aggr[aggrLength-1].skills.push(curr.skill)
        }
        else{
            aggr.push({cn:`Name ${aggrLength+1}`, id:curr.id, skills:[curr.skill]})
        }
        return aggr
    }, [])
}
const close=()=>{
    serverInstance.close()
}
const api=(sqlInstance)=>{
    const policy=policies.getPolicies(sqlInstance)
    app.get("/associates",  policy.auditAndMRMV, (req, res)=>{ 
        winston.info('called /associates')
        sqlInstance.getAssociateSkills((err, result)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /associates')
            res.send(transformNormalizedToKey(result))
        })
    })
    app.get("/skills", policy.auditAndMRMV, (req, res)=>{//these are "static"
        winston.info('called /skills')
        sqlInstance.getSkills((err, result)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /skills')
            res.send(result)
        })
    })
    app.get('/checkLogin', (req, res)=>{
        winston.info('called /checkLogin')
        res.send({hashPassword:getFromSession(req.query.sessionId)})
    })
    app.get("/RCUS", policy.auditAndMRMV, (req, res)=>{//these are "static"
        winston.info('called /RCUS')
        sqlInstance.getRcus((err, result)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /RCUS')
            res.send(result)
        })
    })
    app.get("/testSelection",  policy.auditAndMRMV, (req, res)=>{//these are "static"
        winston.info('called /testSelection')
        sqlInstance.getTestSelection((err, result)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /testSelection')
            res.send(result)
        })
    })
    app.get("/validationAssociates",  policy.auditAndMRMV, (req, res)=>{//in final state use validation id.  This is the "instantiated" version of "currentAssociates"
        winston.info('called /validationAssociates')
        sqlInstance.getValidationAssociates(req.query.validationId, (err, result)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /validationAssociates')
            res.send(result)
        })
    })
    app.get("/validationRcus",  policy.auditAndMRMV, (req, res)=>{ //in final state use validation id.  This is the "instantiated" version of "RCUS"
        winston.info('called /validationRcus')
        sqlInstance.getValidationRcus(req.query.validationId, (err, result)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /validationRcus')
            res.send(result)
        })
    })
    app.get("/validationSkills",  policy.auditAndMRMV, (req, res)=>{ 
        winston.info('called /validationSkills')
        sqlInstance.getValidationSkills(req.query.validationId, (err, result)=>{
            console.log(result)
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /validationSkills')
            res.send(result)
        })
    })

    app.post("/writeValidationRcus",  policy.auditAndMRMV,  (req, res)=>{ //in final state use validation id
        const obj=req.body;
        winston.info('called /writeValidationRcus')
        sqlInstance.writeValidationRcus(obj.validationId, obj.testWork, obj.explanation, obj.processStep, obj.riskStep, (err, result)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /writeValidationRcus')
            res.sendStatus(200);
        })
    })
    app.post('/login',    (req, res)=>{
        winston.info('called /login')
        auth.authenticate(req.body.user, req.body.password, policies.mapADToPolicies, (err, user)=>{
            if(err){
                winston.error(`${err.message}, ${req.body.user}`)
            }
            if(!err){
                user.sessionId=addToSession(cryptojs.SHA256(req.body.password).toString(cryptojs.enc.Base64))
                winston.info('return /login')
            }
            res.send({err, user})
        })
    })
    app.post("/writeValidationAssociate",  policy.auditAndMRMV,  (req, res)=>{ //in final state use validation id
        winston.info('called /writeValidationAssociate')
        const id=req.body.id;
        const include=req.body.include;
        const validationId=req.body.validationId;
        sqlInstance.writeValidationAssociate(validationId, id, include, (err)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /writeValidationAssociate')
            res.sendStatus(200);
            
        })
    })

    app.post("/writeValidationSkill",  policy.auditAndMRMV,  (req, res)=>{ //in final state use validation id
        winston.info('called /writeValidationSkill')
        const skill=req.body.skill;
        const include=req.body.include;
        const validationId=req.body.validationId;
        sqlInstance.writeValidationSkill(validationId, skill, include, (err)=>{
            if(err){
                return winston.error(err.toString())
            }
            winston.info('return /writeValidationAssociate')
            res.sendStatus(200);
        })
    })

}

if(process.env.NODE_ENV==='test'){
    module.exports.transformNormalizedToKey=transformNormalizedToKey;
    module.exports.close=close;
    module.exports.api=api
}
else{
    api(sql)
}









serverInstance=app.listen(port);

