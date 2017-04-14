'use strict';
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
const RCUS=require('./tmpData').RCUS
const testSelection=require('./tmpData').testSelection

const CreateRCUS=`CREATE TABLE RCUS(
    process varchar(20) not null,
    risk varchar(255) not null,
    processStep int not null, 
    riskStep int not null,
    controls varchar(20) not null,
    workpaper int not null,
    MRMVResponsibility varchar(255) not null,
    CONSTRAINT riskprocess PRIMARY KEY(processStep, riskStep)
    );`




const InsertRCUS=()=>{
    RCUS.map((item)=>{
        db.run(`INSERT INTO RCUS (process, risk, processStep, riskStep, controls, workpaper, MRMVResponsibility) VALUES (?, ?, ?, ?, ?, ?, ?);`, [item.process, item.risk, item.processStep, item.riskStep, item.controls, item.workpaper, item.MRMVResponsibility])
    })
}
const CreateTestSelection=`CREATE TABLE testSelection([index] int not null constraint testSElID primary key, description varchar(25) not null, requiresExplanation bool not null);`;

const TestSelection=()=>{
    testSelection.map((item)=>{
        db.run(`INSERT INTO testSelection ([index], description, requiresExplanation) VALUES (?, ?, ?);`, [item.index, item.description, item.requiresExplanation])
    })
}

const CreateAssociates=`CREATE TABLE Associates(
id varchar(10) constraint associateId primary key
);`

const CreateSkillCategory=`CREATE TABLE SkillCategory(
    category varchar(20) constraint skillCategoryId primary key
);`

const CreateSkills=`CREATE TABLE Skills(
    skill varchar(20) constraint skillId primary key,
    category varchar(20) not null,
    CONSTRAINT skillToCategory FOREIGN KEY(category) REFERENCES SkillCategory(category));`

const CreateAssociateSkills=`CREATE TABLE AssociateSkills(
    id varchar(10) not null,
    skill varchar(20) not null,
    dateAdded DATETIME not null,
CONSTRAINT AssociateSkillID PRIMARY KEY(id, skill) ,
CONSTRAINT AssociateSkillsToAssociate FOREIGN KEY(id) REFERENCES Associates(id),
CONSTRAINT AssociateSkillsToSkills FOREIGN KEY(skill) REFERENCES Skills(skill));`

const CreateValidations=`CREATE TABLE Validations(
    validationId varchar(10) constraint validationID primary key,
    beginDate DATETIME not null
);`

const CreateRcusValidation=`CREATE TABLE ValidationRcus (
    testWork int not null, 
    explanation varchar(255) not null, 
    processStep int not null, 
    riskStep int not null, validationId varchar(10), 
    dateAdded datetime not null, 
    constraint validationrcuspk 
    PRIMARY KEY(processStep, riskStep, 
    dateAdded, validationId),
    constraint validationRcusFk 
    FOREIGN KEY(processStep, riskStep) 
    REFERENCES RCUS(processStep, riskStep), 
    constraint validationRcusValidation FOREIGN KEY(ValidationID)
    REFERENCES Validations(ValidationId));`

const CreateValidationSkills=`CREATE TABLE ValidationSkills(
    validationId varchar(10) not null,
    skill varchar(20) not null,
    include boolean not null,
    dateAdded DATETIME not null,
CONSTRAINT validationSkillsId PRIMARY KEY(validationId, skill, dateAdded),
CONSTRAINT ValidationSkillsToValidation FOREIGN KEY(validationId) REFERENCES Validations(validationId),
CONSTRAINT ValidationSkillstoSkills FOREIGN KEY(skill) REFERENCES Skills(skill))`

const CreateValidationAssociates=`CREATE TABLE ValidationAssociates(
    validationId varchar(10) not null,
    id varchar(10) not null, 
    include boolean not null,
    dateAdded DATETIME not null,
CONSTRAINT validationAssociatesId PRIMARY KEY(validationId, id, dateAdded),
CONSTRAINT ValidationAssociatesToValidation FOREIGN KEY(validationId) REFERENCES Validations(validationId),
CONSTRAINT ValidationAssociatestoAssociates FOREIGN KEY(id) REFERENCES Associates(id))`

const InsertAssociates=`INSERT INTO Associates (id) VALUES('123');INSERT INTO Associates (id) VALUES('456');`

const InsertSkillCategory=`INSERT INTO SkillCategory (category) VALUES('programming');
INSERT INTO SkillCategory (category) VALUES('math');
INSERT INTO SkillCategory (category) VALUES('statistics');
INSERT INTO SkillCategory (category) VALUES('accounting');`

const InsertSkills=`INSERT INTO Skills (skill, category) VALUES('Matlab', 'programming');
INSERT INTO Skills (skill, category) VALUES('R', 'programming');
INSERT INTO Skills (skill, category) VALUES('C++', 'programming');
INSERT INTO Skills (skill, category) VALUES('Stochastic Calculus', 'math');
INSERT INTO Skills (skill, category) VALUES('Time Series', 'statistics');
INSERT INTO Skills (skill, category) VALUES('FAS 114', 'accounting');`

const InsertAssociateSkills=`INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('123', 'R', datetime('now'));
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('123', 'FAS 114', datetime('now'));
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('123', 'Time Series', datetime('now'));
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'R', datetime('now'));
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'Stochastic Calculus', datetime('now'));
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'C++', datetime('now'));
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'Time Series', datetime('now'));`

const InsertValidations=`INSERT INTO Validations (validationId, beginDate) VALUES ('1', datetime('now'));`



const getAssociateSkills=(cb)=>{
    db.all(`SELECT id, skill from AssociateSkills;`, cb)
} 
const getSkills=(cb)=>{
    db.all(`SELECT category as type, skill as value FROM skills;`, cb)
}
const getValidationAssociates=(validationId, cb)=>{
    db.all(
    `
    SELECT t1.id as id FROM
        (SELECT id, MAX(dateAdded) as mxDate FROM
            (SELECT id, dateAdded FROM ValidationAssociates WHERE validationId=?) 
        GROUP BY id) t1
    INNER JOIN
        (SELECT id, dateAdded, include FROM ValidationAssociates WHERE validationId=?) t2
    ON t1.id=t2.id AND t1.mxDate=t2.dateAdded
    WHERE include=1
    `,
    [validationId, validationId],
    cb)
}

const getValidationSkills=(validationId, cb)=>{
    let valSkills=[];
    db.each(
    `
    SELECT t1.skill as skill FROM
        (SELECT skill, MAX(dateAdded) as mxDate FROM
            (SELECT skill, dateAdded FROM ValidationSkills WHERE validationId=?) 
        GROUP BY skill) t1
    INNER JOIN
        (SELECT skill, dateAdded, include FROM ValidationSkills WHERE validationId=?) t2
    ON t1.skill=t2.skill AND t1.mxDate=t2.dateAdded
    WHERE include=1
    `,
    [validationId, validationId], (err, result)=>{
        valSkills.push(result.skill)
    },
    (err, rowCount)=>{
        cb(err, valSkills)
    })
}
const getValidationRcus=(validationId, cb)=>{
    db.all(
    `
    SELECT testWork, explanation, t1.processStep as processStep, t1.riskStep as riskStep FROM
        (SELECT processStep, riskStep, MAX(dateAdded) as mxDate FROM
           ValidationRcus WHERE validationId=?
        GROUP BY processStep, riskStep) t1
    INNER JOIN
        (SELECT processStep, riskStep, dateAdded, testWork, explanation FROM ValidationRcus WHERE validationId=?) t2
    ON t1.riskStep=t2.riskStep AND t1.mxDate=t2.dateAdded
    and t1.processStep=t2.processStep
    `,
    [validationId, validationId], cb)
}
const writeValidationRcus=(validationId, testWork, explanation, processStep, riskStep, cb)=>{
    db.run(`
       insert into ValidationRcus (testWork, explanation, processStep, riskStep, validationId, dateAdded)  
       values (?, ?, ?, ?, ?, datetime('now')) 
    `,[
        testWork, explanation, processStep, riskStep, validationId
    ], cb)
}
const writeValidationAssociate=(validationId, id, include, cb)=>{
    db.run(`
       insert into ValidationAssociates (validationId, id, include, dateAdded)  
       values (?, ?, ?, datetime('now')) 
    `,[
        validationId, id, include?1:0
    ], cb)
}
const writeValidationSkill=(validationId, skill, include, cb)=>{
    db.run(`
       insert into ValidationSkills (validationId, skill, include, dateAdded)  
       values (?, ?, ?, datetime('now')) 
    `,[
        validationId, skill, include?1:0
    ], cb)
}

const getAllFromTable=(table)=>{
    db.each(`SELECT * FROM ${table}`, (err, row)=>{
        console.log(row);
    })
}
const getRcus=(cb)=>{
    db.all(`SELECT * FROM RCUS;`, cb)
}
const getTestSelection=(cb)=>{
    let testSelection=[]
    db.each(`SELECT * FROM testSelection;`, (err, res)=>{
        testSelection.push({index:res.index, description:res.description, requiresExplanation:res.requiresExplanation===1?true:false})
    }, (err)=>{
        cb(err, testSelection);
    })

}


db.serialize(()=>{
  db.exec(CreateAssociates);
  db.exec(CreateSkillCategory);
  db.exec(CreateSkills);
  db.exec(CreateAssociateSkills);
  db.exec(CreateValidations);
  db.exec(CreateValidationSkills);
  db.exec(CreateValidationAssociates);
  db.exec(InsertAssociates);
  db.exec(InsertSkillCategory);
  db.exec(InsertSkills);
  db.exec(InsertAssociateSkills);
  db.exec(InsertValidations);
  db.exec(CreateRCUS);
  db.exec(CreateTestSelection);
  db.exec(CreateRcusValidation)
  InsertRCUS();
  TestSelection();
  /*db.each("SELECT id FROM Associates", (err, row)=>{
      console.log( row.id);
  });*/
});


///TBD!

module.exports.getAssociateSkills=getAssociateSkills
module.exports.getSkills=getSkills
module.exports.getValidationAssociates=getValidationAssociates
module.exports.getValidationSkills=getValidationSkills
module.exports.writeValidationAssociate=writeValidationAssociate
module.exports.writeValidationSkill=writeValidationSkill
module.exports.getAllFromTable=getAllFromTable
module.exports.getRcus=getRcus
module.exports.getTestSelection=getTestSelection
module.exports.getValidationRcus=getValidationRcus
module.exports.writeValidationRcus=writeValidationRcus