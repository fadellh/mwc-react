# React Frontend for Ecommerce

This project is a React-based frontend for the microservices ecommerce application. The initial template for this project was taken from [ecommerce-react](https://github.com/jgudo/ecommerce-react) by Julius Guevarra.

The project uses Vite as the build tool and development server. It also integrates with Firebase, Ant Design, and other modern libraries to provide a responsive, production-ready user interface.

---

## Table of Contents

- [React Frontend for Ecommerce](#react-frontend-for-ecommerce)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Scripts](#scripts)
  - [Deployment](#deployment)
    - [Deploy to Kubernetes](#deploy-to-kubernetes)
      - [Manual Deployment](#manual-deployment)
      - [CI/CD Deployment](#cicd-deployment)
  - [License](#license)

---

## Overview

This React project provides the frontend for an ecommerce application. It is designed to work with a set of microservices (Order, Inventory, User, Payment, etc.) and leverages a centralized API Gateway. The project is built on a modern React stack with Vite, offering fast rebuilds and an optimized production build.

---

## Features

- **Modern Build Tool:** Uses [Vite](https://vitejs.dev/) for a lightning-fast development experience.
- **Responsive UI:** Built with [Ant Design](https://ant.design/) components for a sleek, responsive user interface.
- **Firebase Integration:** Uses Firebase for authentication, database, and storage.
- **Routing & State Management:** Configured with [React Router](https://reactrouter.com/) and [Redux](https://redux.js.org/) (with Redux Saga and Redux Thunk) for efficient state management.
- **Form Handling & Validation:** Utilizes [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) for building and validating forms.
- **Google Maps & Places:** Integrated with Google Maps via [google-map-react](https://github.com/google-map-react/google-map-react) and [react-google-places-autocomplete](https://github.com/Tintef/react-google-places-autocomplete).

---

## Getting Started

### Prerequisites

- **Node.js & npm/yarn:** Make sure you have Node.js (v14 or higher) and npm (or yarn) installed.
- **Git:** To clone the repository.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-react-ecommerce-project.git
   cd your-react-ecommerce-project
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of your project (at the same level as `package.json`) with the following content. **Make sure to replace the dummy values with your actual credentials in production.**

```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain.firebaseapp.com
VITE_FIREBASE_DB_URL=https://your-firebase-db-url.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket.appspot.com
VITE_FIREBASE_MSG_SENDER_ID=your-firebase-msg-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_GATEWAY_API_KEY=YOUR_GATEWAY_API_KEY_HERE
VITE_API_BASE_URL=https://api.your-domain.com
VITE_GMAPS_API_KEY=YOUR_GMAPS_API_KEY_HERE
```

> **Note:**  
> In production, use a secure method for managing secrets (e.g., environment variables injected by your CI/CD pipeline) rather than committing them to your repository.

---

## Scripts

The following scripts are defined in `package.json`:

- **Development:**  
  Start the development server using Vite.
  ```bash
  npm run dev
  # or
  yarn dev
  ```

- **Build:**  
  Create an optimized production build.
  ```bash
  npm run build
  # or
  yarn build
  ```
  *Note:* After building, the build script copies `index.html` to `404.html` in the `dist` folder, ensuring proper routing for single-page applications.

- **Serve:**  
  Preview the production build.
  ```bash
  npm run serve
  # or
  yarn serve
  ```

- **Test:**  
  Run tests using Jest.
  ```bash
  npm run test
  # or
  yarn test
  ```

---

## Deployment

### Deploy to Kubernetes

You can deploy the React frontend to Kubernetes either manually or using a CI/CD pipeline.

#### Manual Deployment

1. **Build the Docker Image:**

   ```bash
   npm run build
   # Build a Docker image using a Dockerfile that copies the contents of the `dist` folder.
   docker build -t your-artifact-registry/your-react-ecommerce-project:latest .
   ```

2. **Login to Docker Artifact Registry:**

   ```bash
   docker login -u YOUR_USERNAME -p YOUR_PASSWORD YOUR_ARTIFACTORY_URL
   ```

3. **Push the Docker Image:**

   ```bash
   docker push your-artifact-registry/your-react-ecommerce-project:latest
   ```

4. **Deploy with Kubernetes:**

   Use the provided Kubernetes manifest files in the `infrastructure/kubernetes` directory. For example:

   ```bash
   kubectl apply -f infrastructure/kubernetes/application-deployment.yml
   ```

   You can also update additional configuration files (e.g., `toko-config.yml`) as needed.

#### CI/CD Deployment

Integrate the build, push, and deploy steps into your CI/CD pipeline. This pipeline should:

- Build the Docker image from the production build.
- Authenticate with your Docker registry.
- Push the Docker image to your artifact repository.
- Deploy the updated image using your Kubernetes deployment manifests.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Happy coding!
```