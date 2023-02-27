import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 0: 
  const connection = await NativeConnection.connect({
    // TODO - Add service discovery for the Temporal services to circumvent need for hardcoded IP address
    address: '51.143.61.84'
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

  console.log('Connected');

  // Step 2: Start accepting tasks on the `onboard` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
