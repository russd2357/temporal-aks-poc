import fetch, { Response } from "node-fetch";

// all of the APIs for the demo return the same kind of object
// we don't need special types for each one here
interface DemoApiResponse {
  name: string
}


export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function assignDoctor() : Promise<string> {
  let ret = "Bogons in sight shields down!";
  const response = await fetch('http://localhost:9099/onboard/doctor', {
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
  const response = await fetch('http://localhost:9099/onboard/hospital', {
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

  const response = await fetch('http://localhost:9099/onboard/notify?${fmtContactInfo}', {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json() as DemoApiResponse).name;

  return ret;
}
