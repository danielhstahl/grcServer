const sql=require('./testSql')
sql.init()
/*beforeAll(() => {
  sql.createNewKey(sql.db, "mykey1", "MRMV", ()=>{})
  sql.createNewKey(sql.db, "mykey2", "SomeKey", ()=>{})
});*/
it("errors when putting duplicate key:group pairs", (done)=>{
   sql.createNewKey( "mykey1", "MRMV", (err, result)=>{
        expect(err).toBeTruthy()
        done()
   })
})
it("returns no results when key does not exist", (done)=>{
    sql.getUserFromKey("somekey", (err, result)=>{
        expect(result).toEqual([])
        done()
    })
})
it("returns latest result when key does exist", (done)=>{
    sql.getUserFromKey( "mykey1", (err, result)=>{
        expect(result).toEqual([{key:"mykey1", ADGroup:"MRMV"}])
        done()
    })
})