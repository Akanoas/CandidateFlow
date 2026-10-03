# CandidateFlow

CandidateFlow is a full-stack applicant tracking system built for the WGU D424 Software Engineering Capstone. It provides a secure, centralized dashboard for recruiting operations, candidate management, and pipeline reporting.

**Author:** Abdoul Assirou Akano

---

## 🚀 Live Deployment

* **Live Application:** [https://d424-software-engineering-capstone-1-bye1.onrender.com](https://www.google.com/search?q=https://d424-software-engineering-capstone-1-bye1.onrender.com)
* **Test Username:** `fake-email@gmail.com`
* **Test Password:** `123456`

> **⚠️️ Important Notice Regarding Hosting:**
> The backend API and database are hosted on Render's free tier. Render automatically spins down free web services after 15 minutes of inactivity. When you first open the application and attempt to log in, it may take **50 to 60 seconds** for the backend server to wake up. If your first login attempt results in a red "backend did not respond" error, please wait one minute and click "Sign In" again.

---

## 🛠️ Tech Stack

**Frontend**

* React 18
* TypeScript
* Vite
* Tailwind CSS

**Backend**

* Java 21
* Spring Boot 3
* Spring Security (JWT Authentication)
* Hibernate / JPA

**Database & Deployment**

* PostgreSQL 16
* Docker (Backend containerization)
* Render (Cloud hosting for Database, Backend Web Service, and Frontend Static Site)
* GitLab (Version control and CI/CD)

---

## ☁️ Cloud Architecture (Production)

The production environment is hosted entirely on Render, utilizing three interconnected services:

1. **Managed PostgreSQL Database:** Operates on an internal private network for secure data storage.
2. **Spring Boot Web Service:** Deployed via a multi-stage `Dockerfile` (Maven build + Eclipse Temurin 21 JRE). It connects to the database via internal environment variables and enforces a strict CORS policy allowing only the frontend URL.
3. **React Static Site:** Built with Vite and served globally. It connects to the backend API via dynamic environment variables (`VITE_API_BASE_URL`) and utilizes Render rewrite rules to support React Router single-page navigation.

---

## 💻 Running the Application Locally

To run this application on your local machine for development or testing, ensure you have Docker, Java 21, and Node.js installed.

**1. Start the Database**

```bash
docker-compose up -d

```

**2. Start the Backend**

```bash
cd backend
./mvnw spring-boot:run

```

**3. Start the Frontend**

```bash
cd frontend
npm install
npm run dev

```