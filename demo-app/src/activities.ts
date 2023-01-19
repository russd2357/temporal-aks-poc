import fetch, { Response } from "node-fetch";


export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function assignDoctor() : Promise<string> {
  let ret = "Bogons in sight shields down!";
  const response = await fetch('http://20.99.160.16:9099/onboard/doctor', {
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
  const response = await fetch('http://20.99.160.16:9099/onboard/hospital', {
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

  const response = await fetch('http://20.99.160.16:9099/onboard/notify?${fmtContactInfo}', {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json()).message;

  return ret;
}
