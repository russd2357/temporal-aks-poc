import { Connection, WorkflowClient } from '@temporalio/client';
import { onboard } from './onboard-workflow';
import { PatientInfo } from './models';
import { nanoid } from 'nanoid';


async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect(
    // In production, pass options to configure TLS and other settings:
    {
      address: '51.143.61.84',
      tls: {}
    }
    );

  const client = new WorkflowClient({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  let patientInfo = {
    name: 'Henry Jones',
    address1: '114 Duncan Rd',
    address2: '',
    email: 'hjones@foo.bar.com',
    phone: '(713) 555-1212'
  } as PatientInfo;

  const handle = await client.start(onboard, {
    // type inference works! args: [name: string]
    args: [patientInfo],
    taskQueue: 'onboard',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'onboard-workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); 
}

export async function runWorkflow(patientInfo: PatientInfo) {
    // Connect to the Temporal service running in AKS
    const connection = await Connection.connect( {
        // In production, pass options to configure TLS and other settings:
      
        // NOTE - This example uses the DNS service in the AKS cluster for service discovery
        //        For the demo the frontend service is deployed to the same cluster as the Temporal service.
        //        The DNS service is not available outside of the cluster. The service naming
        //        convention is <service-name>.<namespace>.svc.cluster.local
        //        In a production environment, you would implement a more robust service discovery 
        //        to find the Temporal service.
        //address: 'temporal.temporal.svc.cluster.local'
        address: '52.137.103.208'
      }
    );
    
      const client = new WorkflowClient({
        connection,
        // namespace: 'foo.bar', // connects to 'default' namespace if not specified
      });
    
    const handle = await client.start(onboard, {
      // type inference works! args: [name: string]
      args: [patientInfo],
      taskQueue: 'onboard',
      // in practice, use a meaningful business id, eg customerId or transactionId
      workflowId: 'onboard-workflow-' + nanoid(),
    });
    console.log(`Started workflow ${handle.workflowId}`);

    return ({
      workflowId: `${handle.workflowId}`
    })
  
    // optional: wait for client result
    // console.log(await handle.result()); 
}
  