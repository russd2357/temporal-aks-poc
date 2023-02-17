# Demo App

This is derived from the Temporal [Hello World Tutorial](https://docs.temporal.io/typescript/hello-world/) but has been modified to model a sample workflow that should be familiar if you watched this [instructional video on Temporal workflows](https://www.youtube.com/watch?v=23rX78xqYUg). Unlike the video, though this demo is built using the Typescript SDK for Temporal.


### Containerization 

Another departure from the original Temporal tutorial is that this demo is intended to be containerized. Included in this directory is a Dockerfile to be used for building a container image for the worker service.

In the Dockerfile, we use Ubuntu as the base image. We probably could make it smaller by using Alpine or Node as the base image but then we would have to add more components to make sure we could support Temporal, so for now use Ubuntu as the base image for the containers. 

In order to reduce the size of the container image, the Dockerfile uses multiple stages to build the final image. Remember to use the --no-cache option when building the container for the worker service. When building the worker container image, you can choose whatever you want for the container tag. In a production scenario, you should tag the image with a self-descriptive name. For this, I chose the tag 'onboard-worker' because it designates the workflow the worker service is associated with.

`docker build --no-cache -t onboard-worker .`

Once you've built the container, make a simple Docker Compose file for the service. Then you can use [kompose](https://kompose.io) to convert the Docker Compose file into a Kubernetes manifest.

`kompose convert -f docker-compose-onboard.yml -o temporal-poc-worker.yaml
