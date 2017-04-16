const inRamDb=require('./inRamDb')
it('adds to session', ()=>{
    const id=inRamDb.addToSession("somehashedpassword")
    expect(inRamDb.getFromSession(id)).toEqual("somehashedpassword")
})
it('removes from session automatically', (done)=>{
    const time=100; //.1 second
    const time2=150; //.15 second
    const id=inRamDb.addToSession("anotherhashedpassword", time)
    setTimeout(()=>{
        expect(inRamDb.getFromSession(id)).toBeUndefined()
        done()
    }, time2)
})