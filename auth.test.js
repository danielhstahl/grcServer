'use strict'
const auth=require('./auth')
let GroupsAllowed

beforeAll(() => {
  const sql={ //simulate ORM
      getUserFromKey:(authKey, cb)=>{
          switch(authKey){
            case "mykey1":
                cb(null, [{ADGroup:"MRMV", key:authKey}])
                break
            case "mykey2":
                cb(null, [{ADGroup:"SomeKey", key:authKey}])
                break
            default:
                cb(null, [])
          }
      }
  }
  GroupsAllowed=(groups)=>auth.handleGroups(groups, sql)
});
it('does not authenticate when no authorization header is included', (done)=>{
    const middleWare=GroupsAllowed(["MRMV", "Audit"])
    let req={
        get:key=>null
    }
    const res={
      status:(number)=>{
          return {
              send:(msg)=>done()
          }
        }
    }
    middleWare(req, res, ()=>{
        throw new Error("Should not authenticate!")
        done()
    })
})
it('does not authenticate when group is included but does not match (web app)', (done)=>{
    const middleWare=GroupsAllowed(["MRMV", "Audit"])
    let req={
        get:key=>key==='Authorization'?"SomethingElse":null,
        group:"SomethingElse"
    }
    const res={
      status:(number)=>{
          return {
              send:(msg)=>done()
          }
        }
    }
    middleWare(req, res, ()=>{
        throw new Error("Should not authenticate!")
        done()
    })
})
it('authenticates when group is included and does match (web app)', (done)=>{
    const middleWare=GroupsAllowed(["MRMV", "Audit"])
    let req={
        get:key=>key==='Authorization'?"SomethingElse":null,
        group:"MRMV"
    }
    const res={
      status:(number)=>{
          return {
              send:(msg)=>{
                  throw new Error("Should authenticate!")
                  done()
              }
          }
        }
    }
    middleWare(req, res, ()=>{
        done()
    })
})
it('does not authenticate when group is not included and key does not exist (Rest)', (done)=>{
    const middleWare=GroupsAllowed(["MRMV", "Audit"])
    let req={
        get:key=>key==='Authorization'?"SomethingElse":null
    }
    const res={
      status:(number)=>{
          return {
              send:(msg)=>done()
          }
        }
    }
    middleWare(req, res, ()=>{
        throw new Error("Should not authenticate!")
        done()
    })
})
it('authenticates when group is not included and key does exist (Rest)', (done)=>{
    const middleWare=GroupsAllowed(["MRMV", "Audit"])
    let req={
        get:key=>key==='Authorization'?"mykey1":null
    }
    const res={
      status:(number)=>{
          return {
              send:(msg)=>{
                  throw new Error("Should authenticate!")
                  done()
              }
          }
        }
    }
    middleWare(req, res, ()=>{
        done()
    })
})