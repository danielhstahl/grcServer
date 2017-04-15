'use strict';
const express = require('express');
const bodyParser=require('body-parser');
let winston = require('winston');
const cryptojs=require('crypto-js');
const inRamDb=require('./inRamDb');
const addToSession=inRamDb.addToSession
const removeFromSession=inRamDb.removeFromSession
const getFromSession=inRamDb.getFromSession
const userAttributes=require('./auth')
const sql=require('./testSql.js')
const jsonParser = bodyParser.json();
let app = express();

const port='3001';

winston.add(winston.transports.File, { filename: 'logfile.log' });

app.use(bodyParser.json());

const transformNormalizedToKey=(associates)=>{
    associates.sort((a, b)=>a.id<b.id?-1:1);
    return associates.reduce((aggr, curr, index, arr)=>{
        const aggrLength=aggr.length;
        if(index>0&&arr[index-1].id===curr.id){
            aggr[aggrLength-1].skills.push(curr.skill)
        }
        else{
            aggr.push({name:`Name ${aggrLength+1}`, id:curr.id, skills:[curr.skill]})
        }
        return aggr
    }, [])
}
if(process.env.NODE_ENV==='test'){
    module.exports.transformNormalizedToKey=transformNormalizedToKey;
}




app.get("/associates", (req, res)=>{ 
    winston.info('called /associates')
    sql.getAssociateSkills((err, result)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /associates')
        res.send(transformNormalizedToKey(result))
    })

})
app.get("/skills", (req, res)=>{//these are "static"
    winston.info('called /skills')
    sql.getSkills((err, result)=>{
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
app.get("/RCUS", (req, res)=>{//these are "static"
    winston.info('called /RCUS')
    sql.getRcus((err, result)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /RCUS')
        res.send(result)
    })
})
app.get("/testSelection", (req, res)=>{//these are "static"
    winston.info('called /testSelection')
    sql.getTestSelection((err, result)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /testSelection')
        res.send(result)
    })
})
app.get("/validationAssociates", (req, res)=>{//in final state use validation id.  This is the "instantiated" version of "currentAssociates"
    winston.info('called /validationAssociates')
    sql.getValidationAssociates(req.query.validationId, (err, result)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /validationAssociates')
        res.send(result)
    })
})
app.get("/validationRcus", (req, res)=>{ //in final state use validation id.  This is the "instantiated" version of "RCUS"
    winston.info('called /validationRcus')
    sql.getValidationRcus(req.query.validationId, (err, result)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /validationRcus')
        res.send(result)
    })
})
app.get("/validationSkills", (req, res)=>{ 
    winston.info('called /validationSkills')
    sql.getValidationSkills(req.query.validationId, (err, result)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /validationSkills')
        res.send(result)
    })
})

app.post("/writeValidationRcus",  (req, res)=>{ //in final state use validation id
    const obj=req.body;
    winston.info('called /writeValidationRcus')
    sql.writeValidationRcus(obj.validationId, obj.testWork, obj.explanation, obj.processStep, obj.riskStep, (err, result)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /writeValidationRcus')
        res.sendStatus(200);
    })
    
    
})
app.post('/login', (req, res)=>{
    winston.info('called /login')
    userAttributes.authenticate(req.body.user, req.body.password, (err, user)=>{
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
app.post("/writeValidationAssociate",  (req, res)=>{ //in final state use validation id
    winston.info('called /writeValidationAssociate')
    const id=req.body.id;
    const include=req.body.include;
    const validationId=req.body.validationId;
    sql.writeValidationAssociate(validationId, id, include, (err)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /writeValidationAssociate')
        res.sendStatus(200);
        
    })
})

app.post("/writeValidationSkill",  (req, res)=>{ //in final state use validation id
    winston.info('called /writeValidationSkill')
    const skill=req.body.skill;
    const include=req.body.include;
    const validationId=req.body.validationId;
    sql.writeValidationSkill(validationId, skill, include, (err)=>{
        if(err){
            return winston.error(err.toString())
        }
        winston.info('return /writeValidationAssociate')
        res.sendStatus(200);
    })
})

app.listen(port);

