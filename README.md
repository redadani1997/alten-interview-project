# Alten Interview Project

This project is an implementation of a fullstack application designed to allow admins to manage products and users to view and purchase them and contact support in case of any issues.

The utilized stack is:
- Frontend: React.js with Redux
- Backend: Java 21 with Spring boot 3+
- Database: H2 in-memory database *(can also persist data in disk)*
- OpenAPI: OpenAPI First approach to generate application code and documentation *[(access here)](https://github.com/redadani1997/alten-interview-project/blob/main/alten-core-api/schemas/api/v1/alten.yaml)*

## Features
- Admins can view, add, edit, and delete products.
- Users can view products and add them to their cart.
- Users can update/delete products from their cart.
- Users can purchase items from their cart *(will also update product quantity)*
- Users can contact support.

## Architecture
- This is a monolithic application, deployed as a single unit. 
- The frontend and backend are both served from the same server.
- The nginx server is used to serve the frontend static content and proxy the backend requests.
- The Dockerfile is used to build the entire stack on the same container.
- The Dockerfile uses multi-stage builds to build the frontend and backend separately and then copy them to the final optimized image containing only Nginx and the JRE.

## How to run
1. Clone the repository
2. docker build . -t alten-project
3. docker run -it --name alten-project-instance -p 3333:3333 alten-project
4. Head to http://localhost:3333
5. Enjoy!