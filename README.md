# 🔐 Security Audit Dashboard

A full-stack web application for security engineers to upload, view, and investigate system audit logs at scale.

## 🔗 Live Links
- **Frontend:** https://gidy-security-audit-dashboard.netlify.app/
- **Backend API:** https://gidy-audit-dashboard-koyh.onrender.com
- **GitHub:** https://github.com/Sivanishanth/gidy-audit-dashboard

## 🛠️ Tech Stack

|
 Layer 
|
 Technology 
|
|
---
|
---
|
|
 Frontend 
|
 React.js, Tailwind CSS, Vite 
|
|
 Backend 
|
 Node.js, Express.js 
|
|
 Database 
|
 MongoDB, Mongoose 
|
|
 Deployment 
|
 Netlify (Frontend), Render (Backend) 
|

## ✨ Features
- Bulk upload up to 10,000 log records in a single request
- Server-side search across actor, action, resource, IP, role, region
- Filter by severity, status, role, and region
- Sort by any column (ascending/descending)
- Paginated results (20 per page)
- Responsive dark theme UI
- Clear All filters button

## 🚀 Setup Instructions

### Backend
```bash
cd backend
npm install
```
Create `.env` file:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

Run:
```bash
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Create `.env` file:

## 📁 Project Structure

gidy-audit-dashboard/
├── backend/
│ ├── controllers/
│ │ └── logController.js
│ ├── models/
│ │ └── Log.js
│ ├── routes/
│ │ └── logs.js
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Filters.jsx
│ │ │ ├── LogTable.jsx
│ │ │ └── UploadButton.jsx
│ │ └── App.jsx
│ └── index.html
└── README.md


## 👨‍💻 Author
**Sivanishanth J**
- GitHub: github.com/Sivanishanth
- LinkedIn: linkedin.com/in/sivanishanth303
- Portfolio: sivanishanth-portfolio.netlify.app
