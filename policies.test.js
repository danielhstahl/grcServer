const policies=require('./policies')
it('returns nothing when no match', ()=>{
    const adGroups=[
        {
            cn:"Something"
        }
    ]
    expect(policies.mapADToPolicies(adGroups)).toEqual([])
})

it('correctly maps AD to available groups', ()=>{
    const adGroups=[
        {
            cn:"MVGMembers"
        }
    ]
    expect(policies.mapADToPolicies(adGroups)).toEqual(["MRMVAnalyst"])
})