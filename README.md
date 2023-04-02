# Hexagonal Architecture with AWS SAM and TypeScript

## Overview

Hexagonal Architecture is to design the application in layers, with the core business logic at the center and the external interfaces and technologies forming a "hexagonal" shape around it. The core business logic is encapsulated in the center of the hexagon, while the external interfaces and technologies are represented by the "ports" and "adapters" on the hexagon's perimeter.

## Usage

Installation:

```bash
npm install
```

Test:

```bash
npm run test
```

Coverage:

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
