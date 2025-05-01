import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const temporalHost = process.env.TEMPORAL_HOST || 'localhost';
const temporalPort = process.env.TEMPORAL_PORT || '7233';



async function run() {

  // Step 0: 
  const connection = await NativeConnection.connect({
    // NOTE - This example uses the DNS service in the AKS cluster for service discovery
    //        For the demo the Worker service is deployed to the same cluster as the Temporal service.
    //        The DNS service is not available outside of the cluster. The service naming
    //        convention is <service-name>.<namespace>.svc.cluster.local
    //        In a production environment, you would implement a more robust service discovery 
    //        to find the Temporal service.
    address: `${temporalHost}:${temporalPort}`,
    tls: {}       // TODO: When you are reeady for TLS, provide a TLSConfig here
  });

  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    connection: connection,
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'hello-world',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `hello-world` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
