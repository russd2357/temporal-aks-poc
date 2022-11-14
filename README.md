# temporal-aks-poc

## Temporal Demo Running on AKS
This project demonstrates how to set up a Temporal cluster on AKS with code to define a Temporal workflow and a Next JS frontend to kick off the workflow. The sample workflow emulates a patient onboarding workflow where that executes the workflow by calling a set of external service APIs.

Here is a brief description of the components

### express-backend ###
This is a simple NodeJS Express project to implment the backend service APIs.

### demo-app ###
This is a derived from the Temporal [hello-world](https://github.com/temporalio/samples-typescript/tree/main/hello-world) sample Typescript app.

### next-frontend-typescript ###
A Next JS frontend app to implement the form for kicking off workflows.

### terraform ###
Contains the Terraform definition for standing up the Temporal cluster and worker fleet on AKS


