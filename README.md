# temporal-aks-poc

## Temporal Demo Running on AKS
This project demonstrates how to set up a Temporal cluster on AKS with code to define a Temporal workflow and a Next JS frontend to kick off the workflow. The sample workflow emulates a patient onboarding workflow which is executed by calling a set of external APIs in the workflow activites.

The project is implmented in five components as desceribed here.

### docker-compose ###
This is cloned from  

### express-backend ###
This is a simple NodeJS Express project to model backend service APIs used in the workflow. The directory also contains a Dockerfile which is used to build the container image for the backend to deploy on AKS (or ACI).

### demo-app ###
This is a derived from the Temporal [hello-world](https://github.com/temporalio/samples-typescript/tree/main/hello-world) sample Typescript app. I used this primarily to buld the Temporal worker service for the demo, but you can use the client for testing. The directory also contains a Dockerfile which is used to build the container image for the Temporal worker.

### next-frontend-typescript ###
A Next JS frontend app to implement the form for kicking off workflows. This project also contains code for a worker and workflow. The difference between this and demo-app is the client, which kicks off the workflow from the api 

### terraform ###
This  the Terraform definition for standing up an AKS cluster for hosting in Azure. 

***TODO*** There should probably be another script in there to get the deploy up the temporal cluster, worker, backend and frontend on the AKS cluster


