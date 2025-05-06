import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// NOTE - This example uses the DNS service in the AKS cluster for service discovery
//        For the demo the Worker service is deployed to the same cluster as the Temporal service.


export async function run() {
  // Step 0:
  const temporalHost = process.env.TEMPORAL_HOST || 'localhost';
  const temporalPort = process.env.TEMPORAL_PORT || '7233';

  console.log(`Connecting to Temporal server at ${temporalHost}:${temporalPort}`);
  const connection = await NativeConnection.connect({
    // NOTE - This example uses the DNS service in the AKS cluster for service discovery
    //        For the demo the Worker service is deployed to the same cluster as the Temporal service.
    //        The DNS service is not available outside of the cluster. The service naming
    //        convention is <service-name>.<namespace>.svc.cluster.local
    //        In a production environment, you would implement a more robust service discovery 
    //        to find the Temporal service.
    //address: 'temporal.temporal.svc.cluster.local'
    address: `${temporalHost}:${temporalPort}`
  });

  try {
    // Step 1: Register Workflows and Activities with the Worker and connect to
    // the Temporal server.
    console.log('Creating worker');
    
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

    console.log('Connected - worker created');

    // Step 2: Start accepting tasks on the `onboard` queue
    await worker.run();
  }  finally {
    await connection.close();
    console.log('Connection closed');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
