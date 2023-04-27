import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './onboard-activities';

async function run() {
  // Step 0: 
  const connection = await NativeConnection.connect({
    // NOTE - This example uses the DNS service in the AKS cluster for service discovery
    //        For the demo the Worker service is deployed to the same cluster as the Temporal service.
    //        The DNS service is not available outside of the cluster. The service naming
    //        convention is <service-name>.<namespace>.svc.cluster.local
    //        In a production environment, you would implement a more robust service discovery 
    //        to find the Temporal service.
    //address: 'temporal.temporal.svc.cluster.local'
    address: '52.137.103.208'
  });

  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    connection: connection,
    workflowsPath: require.resolve('./onboard-workflow'),
    activities,
    taskQueue: 'onboard',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `onboard` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
