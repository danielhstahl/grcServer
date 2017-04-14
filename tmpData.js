const RCUS=[
    {
        process:"Design",
        risk:"Inappropriate consideration of alternative design",
        processStep:0,
        riskStep:0,
        controls:"N/A",
        workpaper:2,
        MRMVResponsibility:"Assess Alternative Design"
    },
    {
        process:"Design",
        risk:"Inappropriate design for the purpose",
        processStep:0,
        riskStep:1,
        controls:"N/A",
        workpaper:2,
        MRMVResponsibility:"MRMV assesses purpose and design"
    },
    {
        process:"Design",
        risk:"Inappropriate design for regulations/GAAP/etc",
        processStep:0,
        riskStep:2,
        controls:"N/A",
        workpaper:6,
        MRMVResponsibility:"MRMV assesses design with respect to relevant regulations"
    },
    {
        process:"Design",
        risk:"Inappropriate design for the portfolio",
        processStep:0,
        riskStep:3,
        controls:"N/A",
        workpaper:1,
        MRMVResponsibility:"MRMV assesses model as it pertains to the portfolio"
    }
    ,
    {
        process:"Design",
        risk:"Conflicting assumptions between models",
        processStep:0,
        riskStep:4,
        controls:"N/A",
        workpaper:1,
        MRMVResponsibility:"MRMV assesses interrelated model risk"
    },
    {
        process:"Design",
        risk:"Conflicting assumptions inside model",
        processStep:0,
        riskStep:5,
        controls:"N/A",
        workpaper:2,
        MRMVResponsibility:"MRMV assesses assumptions for conflicts"
    },
    {
        process:"Design",
        risk:"Inappropriate assumptions",
        processStep:0,
        riskStep:6,
        controls:"Documentation of rationale of assumptions",
        workpaper:2,
        MRMVResponsibility:"Assess documentation for appropriate rationale"
    },
    {
        process:"Design",
        risk:"Inappropriate assumptions",
        processStep:0,
        riskStep:7,
        controls:"N/A",
        workpaper:2,
        MRMVResponsibility:"MRMV assesses quality of assumptions"
    },
    {
        process:"Design",
        risk:"Inappropriate variables (irrelevant, or exclusion of relevant variable)",
        processStep:0,
        riskStep:8,
        controls:"N/A",
        workpaper:2,
        MRMVResponsibility:"MRMV assesses quality of variable selection"
    },
    {
        process:"Design",
        risk:"Inappropriate use of enterprise resources",
        processStep:0,
        riskStep:9,
        controls:"SLA with development area",
        workpaper:1,
        MRMVResponsibility:"Receive copy of SLA"
    },
    {
        process:"Calibration",
        risk:"Code Error",
        processStep:1,
        riskStep:0,
        controls:"Unit Testing",
        workpaper:2,
        MRMVResponsibility:"Test adequacy of unit testing.  If no controls, write control gap issue"
    },
    {
        process:"Calibration",
        risk:"Code Error",
        processStep:1,
        riskStep:1,
        controls:"Versioning",
        workpaper:2,
        MRMVResponsibility:"Test adequacy of dev environment.  If no controls, write control gap issue"
    },
    {
        process:"Calibration",
        risk:"Segmentation of calibration data is inappropriate (eg, not granular enough)",
        processStep:1,
        riskStep:2,
        controls:"Documentation of rationale for segmentation",
        workpaper:2,
        MRMVResponsibility:"Assess quality of segmentation documentation"
    },
    {
        process:"Calibration",
        risk:"Segmentation of calibration data is inappropriate (eg, not granular enough)",
        processStep:1,
        riskStep:3,
        controls:"Evidence of appropriateness of segmentation",
        workpaper:2,
        MRMVResponsibility:"Assess quality of evidence.  If no evidence, perform independent testing and write issue."
    },
    {
        process:"Calibration",
        risk:"Variable selection chosen using \"data mining\" technique",
        processStep:1,
        riskStep:4,
        controls:"N/A",
        workpaper:2,
        MRMVResponsibility:"MRMV assesses quality of documentation and evidence."
    },
    {
        process:"Calibration",
        risk:"Variables are statistically inappropriate (stationary/non stationary/irrelevant)",
        processStep:1,
        riskStep:5,
        controls:"Stationarity tests, other variable tests, etc",
        workpaper:2,
        MRMVResponsibility:"Assess quality of testing.  If inadequate testing, perform independent testing and write issue."
    },
    {
        process:"Calibration",
        risk:"Data Quality (Nulls, etc)",
        processStep:1,
        riskStep:6,
        controls:"Analysis and consideration of data quality",
        workpaper:3,
        MRMVResponsibility:"Test adequacy of analysis.  If inadequate, perform independent testing and write issue."
    },
    {
        process:"Calibration",
        risk:"Data Integrity (Incorrect data)",
        processStep:1,
        riskStep:7,
        controls:"Recon controls or meta data/schema",
        workpaper:3,
        MRMVResponsibility:"Test adequacy of controls.  If inadequate, perform recon and write issue."
    },
    {
        process:"Calibration",
        risk:"Data appropriateness (Data sources not applicable to model)",
        processStep:1,
        riskStep:8,
        controls:"Documentation of sources and explanation for why the source is adequate",
        workpaper:3,
        MRMVResponsibility:"Assess quality of documentation."
    },
    {
        process:"Calibration",
        risk:"Data appropriateness (Proxy data not relevant enough to model)",
        processStep:1,
        riskStep:9,
        controls:"Testing of appropriateness of proxy data ",
        workpaper:3,
        MRMVResponsibility:"Assess quality of testing.  If inadequate testing, perform independent testing and write issue."
    },{
        process:"Calibration",
        risk:"Data appropriateness (Proxy data not relevant enough to model)",
        processStep:1,
        riskStep:10,
        controls:"Documented rationale for the appropriateness (where testing is inappropriate)",
        workpaper:3,
        MRMVResponsibility:"Assess quality of documentation."
    },
    {
        process:"Calibration",
        risk:"Upstream inputs have variances which may impact model performance",
        processStep:1,
        riskStep:11,
        controls:"Sensitivity analysis of key inputs",
        workpaper:3,
        MRMVResponsibility:"Test adequacy of controls.  If inadequate, perform sensitivity analysis and write issue."
    },
    {
        process:"Calibration Diagnostics",
        risk:"Design not adequate for data",
        processStep:2,
        riskStep:0,
        controls:"Evidence of effective design (residual plots, etc)",
        workpaper:2,
        MRMVResponsibility:"Test adequacy of analysis.  If inadequate, perform independent testing and write issue."
    },
    {
        process:"Calibration Diagnostics",
        risk:"Design not adequate for data",
        processStep:2,
        riskStep:1,
        controls:"Hold out sample testing",
        workpaper:5,
        MRMVResponsibility:"Test adequacy of analysis.  If inadequate, perform independent testing and write issue."
    },
    {
        process:"Calibration Diagnostics",
        risk:"Design not adequate for data",
        processStep:2,
        riskStep:2,
        controls:"Assessment of business intuition vs model results",
        workpaper:2,
        MRMVResponsibility:"Test adequacy of analysis.  If inadequate, perform independent testing and write issue."
    },
    {
        process:"Calibration Diagnostics",
        risk:"Design not adequate for data",
        processStep:2,
        riskStep:3,
        controls:"Benchmarking to more familiar models",
        workpaper:5,
        MRMVResponsibility:"Test adequacy of benchmarking.  If inadequate, independently benchmark."
    },
    {
        process:"Implementation Structure",
        risk:"Data schema is different than Dev",
        processStep:3,
        riskStep:0,
        controls:"N/A",
        workpaper:4,
        MRMVResponsibility:"Ensure use of same schema in production as in dev"
    },
    {
        process:"Implementation Structure",
        risk:"Data integrity",
        processStep:3,
        riskStep:1,
        controls:"Recon controls or meta data/schema",
        workpaper:4,
        MRMVResponsibility:"Test adequacy of controls.  If inadequate, perform recon and write issue"
    },
    {
        process:"Implementation Structure",
        risk:"Code errors",
        processStep:3,
        riskStep:2,
        controls:"Versioning software/code control",
        workpaper:4,
        MRMVResponsibility:"Test adequacy of environment.  If no controls, write control gap issue"
    },
    {
        process:"Implementation Structure",
        risk:"Code errors",
        processStep:3,
        riskStep:3,
        controls:"Unit Testing (run every time pushed to production)",
        workpaper:4,
        MRMVResponsibility:"Assess unit tests, view logs to ensure that tests are run every time"
    },
    {
        process:"Implementation Structure",
        risk:"Code errors",
        processStep:3,
        riskStep:4,
        controls:"N/A",
        workpaper:4,
        MRMVResponsibility:"MRMV independently replicates the model output"
    },
    {
        process:"Implementation Structure",
        risk:"Key person risk/lack of transparency/unmaintainable code",
        processStep:3,
        riskStep:5,
        controls:"Documentation of code (comments, organized code, etc)",
        workpaper:4,
        MRMVResponsibility:"Assess quality of code (eg assessing comments, legibility)"
    },
    {
        process:"Implementation Structure",
        risk:"Inefficient code or algorithms",
        processStep:3,
        riskStep:6,
        controls:"N/A",
        workpaper:4,
        MRMVResponsibility:"MRMV assesses alternative algorithms"
    },
    {
        process:"Implementation Structure",
        risk:"Implementation different than dev/test",
        processStep:3,
        riskStep:7,
        controls:"Hash of code, Docker, anything that proves that the two environments are the same",
        workpaper:4,
        MRMVResponsibility:"Ensure that controls exist (should be self auditing)"
    },
    {
        process:"Implementation Structure",
        risk:"Infrastructure inappropriate for demonstrating continued accuracy of output",
        processStep:3,
        riskStep:8,
        controls:"N/A",
        workpaper:4,
        MRMVResponsibility:"Assess infrastructure.  Must answer \"yes\" to the question of \"can I trust the OGM results that I receive in 1 year with no additional testing\" to avoid writing issue"
    },
    {
        process:"Implementation Process",
        risk:"Model deterioration over time",
        processStep:4,
        riskStep:0,
        controls:"OGM (Thresholds, etc)",
        workpaper:5,
        MRMVResponsibility:"Assess quality of OGM including ability to capture deterioration"
    },
    {
        process:"Implementation Process",
        risk:"Model deterioration over time",
        processStep:4,
        riskStep:1,
        controls:"Governance committee choice and roll",
        workpaper:6,
        MRMVResponsibility:"Assess appropriateness of committees"
    },
    {
        process:"Implementation Process",
        risk:"Model deterioration over time",
        processStep:4,
        riskStep:2,
        controls:"Governance committee effective challenge",
        workpaper:6,
        MRMVResponsibility:"Assess committee decks/minutes"
    },
    {
        process:"Implementation Process",
        risk:"Deterioration not escalated",
        processStep:4,
        riskStep:3,
        controls:"Escalation plan documentation",
        workpaper:6,
        MRMVResponsibility:"Assess quality of escalation procedures"
    },
    {
        process:"Implementation Process",
        risk:"Deterioration not escalated",
        processStep:4,
        riskStep:4,
        controls:"Escalation plan performance",
        workpaper:5,
        MRMVResponsibility:"Ensure escalation plan was followed"
    },{
        process:"Implementation Process",
        risk:"Owner and user not familiar with the model's weaknesses and limitations (when using EMRG)",
        processStep:4,
        riskStep:5,
        controls:"N/A",
        workpaper:5,
        MRMVResponsibility:"MRMV interviews"
    },{
        process:"Implementation Process", 
        risk:"Owner and user not familiar with the model's weaknesses and limitations (when using EMRG)",
        processStep:4,
        riskStep:6,
        controls:"N/A",
        workpaper:6,
        MRMVResponsibility:"MRMV interviews throughout Validation process"
    },{
        process:"Implementation Process", 
        risk:"Model is used inappropriately",
        processStep:4,
        riskStep:7,
        controls:"Clear documentaiton of intended use",
        workpaper:1,
        MRMVResponsibility:"Assess quality of documentation"
    },{
        process:"Implementation Process", 
        risk:"Model is used in areas where model limitations are exposed",
        processStep:4,
        riskStep:8,
        controls:"Clear documentation of limitations",
        workpaper:2,
        MRMVResponsibility:"Assess quality of documentation"
    },{
        process:"Implementation Process", 
        risk:"Overrides are misused/abused",
        processStep:4,
        riskStep:9,
        controls:"Committee Approvals",
        workpaper:1,
        MRMVResponsibility:"Assess approvals"
    },{
        process:"Implementation Process", 
        risk:"Overrides are misused/abused",
        processStep:4,
        riskStep:10,
        controls:"Overrides tied to model limitations",
        workpaper:1,
        MRMVResponsibility:"Check that overrides tie to limitations"
    },{
        process:"Implementation Process", 
        risk:"Inappropriate changes are made to the model",
        processStep:4,
        riskStep:11,
        controls:"Significant change definition",
        workpaper:6,
        MRMVResponsibility:"MRMV assesses significant change definition and ensures replicable thresholds"
    },{
        process:"Implementation Process", 
        risk:"Inappropriate or accidental changes to the model",
        processStep:4,
        riskStep:12,
        controls:"Security infrastructure/passwords/etc",
        workpaper:6,
        MRMVResponsibility:"MRMV assesses security infrastructure documentation.  Tests that password is required"
    },{
        process:"Implementation Process", 
        risk:"Changes made to the model are not working as intended",
        processStep:4,
        riskStep:13,
        controls:"Change log",
        workpaper:6,
        MRMVResponsibility:"MRMV assesses change log.  MRMV ensures that \"undoing\" is possible."
    },{
        process:"Implementation Process", 
        risk:"Model reporting does not meet intended purpose of model",
        processStep:4,
        riskStep:14,
        controls:"N/A",
        workpaper:6,
        MRMVResponsibility:"MRMV assess reporting."
    },{
        process:"Implementation Process", 
        risk:"Disaster causes model to stop performing for an unacceptable period of time",
        processStep:4,
        riskStep:15,
        controls:"Business continuity plan",
        workpaper:6,
        MRMVResponsibility:"Assess adequacy of plan."
    },{
        process:"Implementation Process", 
        risk:"Model documentation does not adhere to corporate policy",
        processStep:4,
        riskStep:16,
        controls:"N/A",
        workpaper:6,
        MRMVResponsibility:"MRMV assess compliance of documentation with MRMV requirements."
    }
]

const skills=[
    {
        type:"programming",
        value:"Matlab"
    },{
        type:"programming",
        value:"R"
    },{
        type:"programming",
        value:"C++"
    },{
        type:"math",
        value:"Stochastic Calculus"
    },{
        type:"statistics",
        value:"Time Series"
    },{
        type:"accounting",
        value:"FAS 114"
    }
]
const availablePersonel=[
    {
        name:"Name 1",
        id:"123",
        skills:[
            "R",
            "FAS 114",
            "Time Series"
        ]        
    },
    {
        name:"Name 2",
        id:"345",
        skills:[
            "Stochastic Calculus",
            "R",
            "C++",
            "Time Series"
        ]
    }
]

const testSelection=[
    {
        index:0,
        description:"Verification",
        requiresExplanation:false
    },
    {
        index:1,
        description:"Independent Replication",
        requiresExplanation:false
    },
    {
        index:2,
        description:"Qualitative",
        requiresExplanation:false
    },
    {
        index:3,
        description:"None",
        requiresExplanation:true
    }
]
module.exports.RCUS=RCUS;
module.exports.testSelection=testSelection;
module.exports.availablePersonel=availablePersonel;
module.exports.skills=skills;