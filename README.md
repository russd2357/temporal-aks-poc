# temporal-aks-poc

## DISCLAIMER - THIS IS A WORK IN PROGRESS. IT IS ALSO INTENDED FOR DEMO PURPOSES ONLY. DO NOT USE IN PRODUCTION ##

## Temporal Demo Running on AKS
This project demonstrates how to set up a Temporal cluster on AKS with code to define a Temporal workflow and a Next JS frontend to kick off the workflow. The sample workflow emulates a patient onboarding workflow which is executed by calling a set of external APIs in the workflow activites.

The project is implmented in five components as desceribed here.

### docker-compose ###
This is cloned from the Temporal [docker-compose](https://github.com/temporalio/docker-compose) project. It is used to stand up a local Temporal cluster for development and testing. As such, it is a starting point for deploying the Temporal cluster on AKS. In order to deploy on AKS, you will first need to stand up an AKS cluster using the Terraform scripts in the terraform directory. Once the cluster is up, you can use ```kompose``` to generate the Kubernetes manifest files for the Temporal cluster.

 One difference between the implementation here and the Temporal docker-compose project is the docker-compose.yml file is modified to make the Temporal service and its frontends visible from outside the cluster by adding a label to the service definition that informs ```kompose``` to create a LoadBalancer service. For example,

 ![kompose code snippet showing LoadBalancer label](./images/kompose-snippet-1.png)

Generate the Kubernetes manifest file using the following command,

 ```
    kompose convert -f docker-compose.yml -o ./aks/temporal-aks.yaml
 ```


### express-backend ###
This is a simple NodeJS Express project to model backend service APIs used in the workflow. The directory also contains a Dockerfile which is used to build the container image for the backend to deploy on AKS (or ACI).

### demo-app ###
This is a derived from the Temporal [hello-world](https://github.com/temporalio/samples-typescript/tree/main/hello-world) sample Typescript app. I used this primarily to buld the Temporal worker service for the demo, but you can use the client for testing. The directory also contains a Dockerfile which is used to build the container image for the Temporal worker.

### next-frontend-typescript ###
A Next JS frontend app to implement the form for kicking off workflows. This project also contains code for a worker and workflow. The difference between this and demo-app is the client, which kicks off the workflow from the api 

### terraform ###
This  the Terraform definition for standing up an AKS cluster for hosting in Azure. 

***TODO*** There should probably be another script in there to get the deploy up the temporal cluster, worker, backend and frontend on the AKS cluster


Released under the [MIT License](LICENSE.md).


