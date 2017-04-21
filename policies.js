const auth=require('./auth')


const possibleGroups=[
    "MRMVAnalyst",
    "MRMVGovernance",
    "MRMVAdmin",
    "Audit",
    "ModelOwner",
    "ModelDeveloper"
]
const policies={
    onlyMRMV:["MRMVAnalyst", "MRMVGovernance", "MRMVAdmin"],
    auditAndMRMV:["MRMVAnalyst", "MRMVGovernance", "MRMVAdmin", "Audit"],
    onlyModelOwner:["ModelOwner"],
    onlyModelers:["ModelOwner", "ModelDeveloper"],
    onlyAdmin:["MRMVAdmin"],
    onlyGovernance:["MRMVGovernance"],
    onlyAdminOrGovernance:["MRMVGovernance", "MRMVAdmin"],
    anyone:possibleGroups
}
const ADGroupsMap={
    MVGMembers:"MRMVAnalyst"
}

const mapADToPolicies=(adgroups)=>{
    return adgroups.filter((val)=>{
        return ADGroupsMap[val.cn]?true:false
    }).map((val)=>ADGroupsMap[val.cn])
}

/**this is a rather expensive function, so run this on startup and never again */
const getPolicies=(sqlInstance)=>{
    const GroupsAllowed=(groups)=>auth.handleGroups(groups, sqlInstance)
    return Object.keys(policies).reduce((cumulator, val, arr)=>{
        cumulator[val]=GroupsAllowed(policies[val])
        return cumulator
    }, {})
}

module.exports.getPolicies=getPolicies
module.exports.mapADToPolicies=mapADToPolicies
