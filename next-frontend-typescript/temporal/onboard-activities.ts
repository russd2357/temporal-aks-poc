import fetch, { Response } from "node-fetch";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// all of the APIs for the demo return the same kind of object
// we don't need special tybapes for each one here
interface DemoApiResponse {
  name: string
}

export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function assignDoctor() : Promise<string> {
  let ret = "Bogons in sight shields down!";
  
  // get the backend service URL and port from environment variables
  const serviceUrl =  process.env.BACKEND_URL || 'http://localhost';
  const servicePort = process.env.BACKEND_PORT || '9099';

  const response = await fetch(`${serviceUrl}:${servicePort}/onboard/doctor`, {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json() as DemoApiResponse).name;

  return ret;
}

export async function assignHospital() : Promise<string> {
  let ret = "Bogons in sight shields down!";
  
  const serviceUrl =  process.env.BACKEND_URL || 'http://localhost';
  const servicePort = process.env.BACKEND_PORT || '9099';

  const response = await fetch(`${serviceUrl}:${servicePort}/onboard/hospital`, {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json() as DemoApiResponse).name;

  return ret;
}

export async function notifyPatient(contactinfo: string) : Promise<string> {
  let ret = "Bogons in sight shields down!";  // if you ever see this, you've got problems!
  let fmtContactInfo = encodeURIComponent(contactinfo);

  // encodeURIComponent doesn't encode parentheses so we have to do those ourselves
  fmtContactInfo = fmtContactInfo.replace('(', '&#40').replace(')', '&#41');

  // get the backend service URL and port from environment variables
  const serviceUrl =  process.env.BACKEND_URL || 'http://localhost';
  const servicePort = process.env.BACKEND_PORT || '9099';

  const response = await fetch(`${serviceUrl}:${servicePort}/onboard/notify?${fmtContactInfo}`, {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json() as DemoApiResponse).name;

  return ret;
}
