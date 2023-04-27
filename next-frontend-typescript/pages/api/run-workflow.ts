import { NextApiRequest, NextApiResponse } from 'next'
import { runWorkflow } from "../../temporal/onboard-client";
import { PatientInfo } from '../../temporal/models';

  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {

    try {

        let patientinfo = await req.body as PatientInfo;
        console.log("Executing workflow client ")
        let ret = await runWorkflow(patientinfo);
        res.status(200).json(ret);
    }
    catch {
        let content = await req.body;
        res.status(500).json({
            message: `Error launching workflow for ${content}`
        });
    }  
}