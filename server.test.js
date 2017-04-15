const server=require('./server')

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