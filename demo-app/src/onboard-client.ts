import { Connection, WorkflowClient } from '@temporalio/client';
import { onboard, PatientInfo } from './onboard-workflow';
import { nanoid } from 'nanoid';

async function run() {
  // Comment this out to connect to the default Server location (localhost:7233)
  const connection = await Connection.connect(
  // In production, pass options to configure TLS and other settings:
    {
      // TODO - Add service discovery for the Temporal services to circumvent need for hardcoded IP address
      address: '51.143.61.84'
    }
  );

  console.log('connected')

  const client = new WorkflowClient({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  let patientInfo = {
    name: 'Henry Jones',
    address1: '114 Duncan Rd',
    address2: '',
    email: 'hjones@foo.bar.com',
    phone: '(713) 555-1212',
    contactPref: 'Phone'
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

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
