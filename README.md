# temporal-aks-poc

## Temporal Demo Running on AKS
This project demonstrates how to set up a Temporal cluster on AKS with code to define a Temporal workflow and a Next JS frontend to kick off the workflow. The sample workflow emulates a patient onboarding workflow which is executed by calling a set of external APIs in the workflow activites.

Here is a brief description of the components

### express-backend ###
This is a simple NodeJS Express project to model backend service APIs used in the workflow.

### demo-app ###
This is a derived from the Temporal [hello-world](https://github.com/temporalio/samples-typescript/tree/main/hello-world) sample Typescript app. I used this primarily to buld the Temporal worker service for the demo, but you can use the client for testing.

### next-frontend-typescript ###
A Next JS frontend app to implement the form for kicking off workflows.

### terraform ###
Contains the Terraform definition for standing up an AKS cluster for hosting in Azure.


