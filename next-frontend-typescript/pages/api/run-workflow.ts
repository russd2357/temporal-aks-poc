import { NextApiRequest, NextApiResponse } from 'next'
import { runWorkflow } from "../../temporal/onboard-client";
import { PatientInfo } from '../../temporal/models';

  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {

    try {
        console.log("Received request to run workflow");
        console.log("Request body: ", req.body);
        let patientinfo = await req.body as PatientInfo;
        console.log("Executing workflow client ")
        let ret = await runWorkflow(patientinfo);
        res.status(200).json(ret);
    }
    catch (error) {
        let content = await req.body;
        res.status(500).json({
            message: `Error launching workflow for ${content}`
        });
        console.error("Error launching workflow: ", error);
    }  
}