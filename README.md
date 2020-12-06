## E-Commerce App using Microservices build with Node, TypeScript, MongoDB, React Next.js, Docker and Kubernetes Part10

## Features

- Authentication and authorization with jsonwebtoken and cookie session
-  TypeScript custom errors class-based approach
- Testing with jest, supertest, and MongoDB In-Memory Server all services
- Next.js Server Side Rendering
- Common libraries published to NPM
- New ticket service added to support basic operations (Create, Read, Update)
- NATS Streaming Server Event Bus Implementation
- Managing NATS Client inside ticket service
- New events are emitted when a ticket is created or updated
- NATS reusable listeners implemented via Abstract Class and Interface with TypeScript
- New order service added to support basic operations (Create, Read, Delete)
- New events are emitted when an order is created or cancelled
- NATS publisher(s)/listener(s) added to tickets and orders services
- Handling concurrency issues by adding a version number to ticket and order events inside common libraries
