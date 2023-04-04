# Hexagonal Architecture with AWS SAM and TypeScript

## Overview

Hexagonal Architecture is to design the application in layers, with the core business logic at the center and the external interfaces and technologies forming a "hexagonal" shape around it. The core business logic is encapsulated in the center of the hexagon, while the external interfaces and technologies are represented by the "ports" and "adapters" on the hexagon's perimeter.

## Usage

### Installation:

```bash
npm install
```

### Run locally:

- install [Docker](https://docs.docker.com/desktop/install/mac-install/)
- install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- compile TypeScript

```bash
npm run build
```

- build AWS SAM application

```bash
sam build
```

- run AWS SAM application locally

```bash
sam local start-api
```

### Test:

```bash
npm run test
```

### Coverage:

```bash
npm run coverage
```

## Endpoints

- POST `/` - create new payment
- GET `/` - get all payments

## TODO

- [ ] address comments in the code
- [ ] consider using classes rather then functions
- [ ] add proper tracing rather then `console.log`
- [ ] add a pipeline
- [ ] add AWS policies and roles
