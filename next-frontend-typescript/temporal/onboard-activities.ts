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
  
  // NOTE - This example uses the DNS service in the AKS cluster for service discovery
  //        For the demo the backend service is deployed to the same cluster as the frontend service.
  //        The DNS service is not available outside of the cluster. The service naming
  //        convention is <service-name>.<namespace>.svc.cluster.local

  const response = await fetch('http://40.64.83.248:9099/onboard/doctor', {
  //const response = await fetch('http://express-backend.backend.svc.cluster.local:9099/onboard/doctor', {
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
  
  // NOTE - This example uses the DNS service in the AKS cluster for service discovery
  //        For the demo the backend service is deployed to the same cluster as the frontend service.
  //        The DNS service is not available outside of the cluster. The service naming
  //        convention is <service-name>.<namespace>.svc.cluster.local

  //const response = await fetch('http://express-backend.backend.svc.cluster.local:9099/onboard/hospital', {
  const response = await fetch('http://40.64.83.248:9099/onboard/doctor', {
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

  // NOTE - This example uses the DNS service in the AKS cluster for service discovery
  //        For the demo the backend service is deployed to the same cluster as the frontend service.
  //        The DNS service is not available outside of the cluster. The service naming
  //        convention is <service-name>.<namespace>.svc.cluster.local

  const response = await fetch('http://40.64.83.248:9099:9099/onboard/notify?${fmtContactInfo}', {
  //const response = await fetch('http://express-backend.backend.svc.cluster.local:9099/onboard/notify?${fmtContactInfo}', {
    method: "POST"
  });

  if (!response.ok)
  {
    throw new Error(`Error! status: ${response.status}`);
  }

  ret = (await response.json() as DemoApiResponse).name;

  return ret;
}
