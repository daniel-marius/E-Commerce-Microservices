## E-Commerce App using Microservices build with Node, TypeScript, MongoDB, Redis, React, Next.js, Docker and Kubernetes Part14

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
- New events are emitted when the order status is created/cancelled/awaiting/complete
- NATS publisher(s)/listener(s) added to tickets and orders services
- Handling concurrency issues by adding a version number to ticket and order events inside common libraries
- New expiration service added to handle the expired orders
- NATS publisher and listener added to expiration service
- Common library updated
- Payments service + Stripe API
