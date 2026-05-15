# Student Management System

A full-stack Student Management System demonstrating automated CI/CD practices using Maven, Docker, and GitHub Actions.

## Project Architecture

*   **Frontend**: React.js (Vite)
*   **Backend**: Java Spring Boot (REST API)
*   **Database**: MySQL 8.0 (Containerized / XAMPP)
*   **Containerization**: Docker & Docker Compose
*   **CI/CD**: GitHub Actions

## Directory Structure

*   `src/`: Spring Boot Java source code.
*   `frontend/`: React Vite application.
*   `docker-compose.yml`: Orchestration file for DB, Backend, and Frontend.
*   `.github/workflows/ci-cd.yml`: GitHub Actions pipeline configuration.
*   `ci_cd_execution_logs.txt`: A detailed terminal log showing pipeline errors and corrections implemented.

## Getting Started Locally

### Prerequisites
*   Java 17
*   Maven 3.9+
*   Node.js 18+
*   Docker & Docker Compose (or XAMPP for local MySQL)

### Running with Docker Compose (Recommended)
This will spin up the MySQL database, Spring Boot backend, and React frontend in isolated containers.
```bash
docker-compose up -d --build
```
*   Frontend will be available at `http://localhost:80`
*   Backend API will be available at `http://localhost:8080`

### Running Locally (Without Docker)

1. **Database:** Start XAMPP MySQL. Create a database named `devopsstudents`.
2. **Backend:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
3. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## CI/CD Pipeline
The project utilizes GitHub actions for Continuous Integration.
*   **Triggers:** Push to `main` or `develop`.
*   **Stages:** Checkout -> JDK Setup -> Maven Cache -> Build & Test -> Docker Build -> Docker Push.
*   **Testing:** Uses JaCoCo for code coverage and H2 in-memory DB for isolated tests.

## Documentation
*   Refer to the `ci_cd_execution_logs.txt` to view the simulated terminal outputs containing common deployment errors (Compilation failures, Docker COPY errors, Secret access denied) and their resolutions.
