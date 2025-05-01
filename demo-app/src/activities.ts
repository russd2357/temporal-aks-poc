import fetch, { Response } from "node-fetch";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const backendHost = process.env.BACKEND_HOST || 'localhost';
const backendPort = process.env.BACKEND_PORT || '9099';

export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function assignDoctor() : Promise<string> {
  let ret = "Bogons in sight shields down!";
  
  // NOTE - This example uses the DNS service in the AKS cluster for service discovery

  const response = await fetch(`http://${backendHost}:${backendPort}/onboard/doctor`, {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json()).name;

  return ret;
}

export async function assignHospital() : Promise<string> {
  let ret = "Bogons in sight shields down!";
  
  // NOTE - This example uses the DNS service in the AKS cluster for service discovery

  const response = await fetch(`http://${backendHost}:${backendPort}/onboard/hospital`, {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json()).name;

  return ret;
}

export async function notifyPatient(contactinfo: string) : Promise<string> {
  let ret = "Bogons in sight shields down!";  // if you ever see this, you've got problems!
  let fmtContactInfo = encodeURIComponent(contactinfo);

  // encodeURIComponent doesn't encode parentheses so we have to do those ourselves
  fmtContactInfo = fmtContactInfo.replace('(', '&#40').replace(')', '&#41');
  
  // NOTE - This example uses the DNS service in the AKS cluster for service discovery

  const response = await fetch(`http://${backendHost}:${backendPort}/onboard/notify?${fmtContactInfo}`, {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json()).message;

  return ret;
}
