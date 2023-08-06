# K6 Benchmarking

## Requirements

Docker + Docker Compose

## Setup

In root folder run the following command

`docker-compose create`

## Run/Repeat Tests

In root folder run the following command

`docker-compose start`

To repeat a test just use the command above again and it will run again.

## Observe 

### K6 

Go to Grafana

`http://localhost:3000/d/ReuNR5Aik/k6-dashboard?orgId=1&refresh=10s`

You will need to read the graphs and interpret what has happened.

### ImgProxy

Go to Grafana

`http://localhost:3000/d/6UWY8Afik/imgproxy-instrumentation`

