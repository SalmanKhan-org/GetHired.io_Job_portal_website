# GetHired.io | Your Gateway to Better Opportunities 🚀

GetHired.io is a modern job portal web application that connects talented individuals with recruiters and companies looking to hire. It features two user roles — Recruiters and Job Seekers — providing seamless job posting and application management functionalities.

---

## ✨ Features

### 👤 For Job Seekers (Users)
- Sign up / Log in via [Clerk](https://clerk.com/) Authentication
- Browse all job listings
- Filter jobs based on **title** and **location**
- Sort jobs (e.g., by date, relevance)
- Apply to any job by uploading a **resume (PDF/Image)**
- View detailed job descriptions
- Resume upload via [Cloudinary](https://cloudinary.com/)
- Pagination support for efficient job browsing

### 🧑‍💼 For Recruiters
- Sign up / Log in with secure authentication
- Create and manage job postings
- View all applications submitted for their jobs
- Track the number of applicants for each job
- Delete or update jobs

---

## 🔧 Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: [Clerk](https://clerk.com/)
- **File Uploads**: [Cloudinary](https://cloudinary.com/)
- **State Management**: React Hooks & Context API
- **Others**: Multer (file uploads), Axios, dotenv

---

## 📦 Third-Party Services

- **Clerk** – for user authentication (Job Seekers)
- **Cloudinary** – for uploading resumes (PDFs/Images)

---

## 🛠️ Getting Started (Local Setup)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gethired.io.git
   cd gethired.io


## Install dependencies
npm install


## Future Enhancements
Admin dashboard to manage all jobs and users
Notification system for application status
Email integration for alerts
Dark mode toggle
Bookmark/save job feature for users
