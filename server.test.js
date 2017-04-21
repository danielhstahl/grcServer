const server=require('./server')
const sql=require('./testSql.js')
const request = require('request');
sql.init()
beforeAll(()=>{
    server.api(sql)
})
afterAll(()=>{
    console.log("closing server")
    server.close()
})
it("denormalizes results", ()=>{
    const testArray=[
        {
            id:"2", 
            skill:"skill1"
        },
        {
            id:"2", 
            skill:"skill2"
        },
        {
            id:"1", 
            skill:"skill1"
        },
        {
            id:"1", 
            skill:"skill2"
        }
    ]
    const expectedResult=[
        {
            name:"Name 1",
            id:"1",
            skills:["skill2", "skill1"]
        },
        {
            name:"Name 2",
            id:"2",
            skills:["skill2", "skill1"]
        }
    ]
    expect(server.transformNormalizedToKey(testArray)).toEqual(expectedResult)
})
it("returns skills when part of MRMV group", (done)=>{
    request.get({
        url:"http://localhost:2999/skills", 
        //qs:{validationId:"1"},
        headers:{
            Authorization : "mykey1"
        }
    }, (err, response, body)=>{
        console.log(body)
        expect(JSON.parse(body)).toEqual([{"type":"programming","value":"Matlab"},{"type":"programming","value":"R"},{"type":"programming","value":"C++"},{"type":"math","value":"Stochastic Calculus"},{"type":"statistics","value":"Time Series"},{"type":"accounting","value":"FAS 114"}])
        done()
    })
})

it("returns permission error when not part of MRMV group", (done)=>{
    request.get({
        url:"http://localhost:2999/skills", 
        //qs:{validationId:"1"},
        headers:{
            Authorization : "somethingrandom"
        }
    }, (err, response, body)=>{
        expect(body).toEqual("Permission Denied")
        done()
    })
})