# Lead Management System - README

## Introduction

The Lead Management System is a simple web application tailored for businesses to manage and track their leads and their respective orders. It features a sleek Angular front-end that interacts with a SurrealDB backend, providing a seamless user experience for lead and order management.

## Environment Variables

To connect the application to the database, set up the following environment variables:

```
DB_URL=         // Database URL
DB_NAMESPACE=   // Namespace for logical data separation
DB_DATABASE=    // Database name
DB_USERNAME=    // Username for database authentication
DB_PASSWORD=    // Password for database authentication
```

## Core Libraries and Technologies

- **Angular**: Robust front-end framework for building dynamic and reactive interfaces.
- **SurrealDB**: Innovative NoSQL database that offers real-time capabilities.
- **RxJS**: Powerful library for composing asynchronous and event-based programs by using observable sequences.
- **SCSS**: Syntactically Awesome Style Sheets, a CSS preprocessor that adds power and elegance to the basic language.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript and adds type safety to the development process.
- **Zod** - A TypeScript-first schema declaration and validation library.

## Project Timeline

The project setup and initial implementation were allocated 16 hours, ensuring a robust foundation and streamlined workflow.

## Hosting

The Angular application and the SurrealDB instance are hosted on DigitalOcean, providing a reliable and scalable cloud platform.

- DigitalOcean App Platform: [Link to Angular app](link1) - Coming soon
- DigitalOcean Database Cluster: [Link to SurrealDB instance](link2) - Coming soon

## SurrealDB and Zod setup

The choice of SurrealDB was driven by its real-time capabilities and ease of use. For more information and documentation on how to set up and use SurrealDB, visit their official website:
Zod is a TypeScript-first schema declaration and validation library. It was chosen for its ease of use and its ability to provide a clear and concise way to define the shape of the data. For more information and documentation on how to set up and use Zod, visit their official website:

- [SurrealDB Documentation](https://surrealist.starlane.studio/)
- [Zod Documentation](https://zod.dev/)

## Project Setup

To get the application up and running on your local machine:

1. Clone the repository.
2. Set up the required environment variables.
3. Run `npm install` to install dependencies.
4. Use `ng serve` to start the development server.
5. Visit `http://localhost:4200/` in your browser.
