# Project Overview

This project is a service ads platform built using a microfrontend architecture with Angular and NX for the frontend and NestJS for the backend. It includes secure authentication, real-time notifications, and a chat system using RabbitMQ.

## Frontend

- **Microfrontend Architecture with Module Federation using Angular and NX**
    - **Main app is hosted on port 4200**
    - **Login app is hosted on port 4201**

### Example: microfrontend configuration

The microfrontend configuration is defined in the `module.federation.manifest.json` file inside the `main-app`.

Example of the file:
```json
{
  "login": "http://localhost:4201/"
}
```

This ensures that the `login` app is correctly referenced and loaded in the `main-app`. The same logic applies to other remote applications.


- Web App that consumes the services of the REST API

```typescript
login(email: string, password: string) {
  const url = `http://localhost:3000/users/login`;

  return this.http.post<any>(url, { email, password })
    .pipe(
      tap((response) => {
        console.log('Login successful:', response);

        if (response && response.user_id) {
          localStorage.removeItem("user_id");
          localStorage.setItem("user_id", response.user_id);  // Store user_id
        }

        this.authentificationAPI(email, password).subscribe((response: any) => {
          console.log('Login successful:', response);
          localStorage.removeItem("token_api");
          localStorage.setItem("token_api", response.access_token);
        });

        this.isUserLoggedIn.next(true);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Authentication failed:', error);
        } else {
          console.error('Login error:', error);
        }
        return throwError(error);
      })
    );
}
```

## Backend

- **Secure backend API with JWT authentication**

### Example: JWT Guard for Secure Endpoints
```typescript
@UseGuards(AuthGuard('jwt'))
@Get('all')
findAll() {
  return this.adsService.findAll();
}
```

## Microservices

### **Notifications using Kafka streaming event when a new ad is posted**

#### Example: Kafka Connection
```typescript
app.connectMicroservice({
  transport: Transport.KAFKA,
  options: {
    client: {
      // brokers: ['localhost:9093'], // Local Kafka broker
      brokers: ['kafka:9093'], // Docker Kafka broker
    },
    consumer: {
      groupId: 'nestjs-consumer-client',
    },
  },
});
```

### **Message brokers using RabbitMQ for chat on ads**

#### Example: RabbitMQ Connection
```typescript
app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.RMQ,
  options: {
    // urls: ['amqp://guest:guest@localhost:5672'],
    urls: ['amqp://guest:guest@rabbitmq:5672'],
    queue: 'chat_messages',
    queueOptions: {
      durable: false,
    },
  },
});
```

## Docker Setup

All services, including Kafka, RabbitMQ, and each microfrontend (main-app, login, etc.), have been dockerized. This ensures a consistent environment across different deployments and simplifies the setup process. Each service runs in its own container, allowing for scalability and easy management.

# Start the project
To start the project, you only have to start all services on docker based on docker-compose.yml file with the following command:
```shell
docker-compose up -d
```