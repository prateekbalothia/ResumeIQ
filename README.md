# ResumeIQ 📄💡

ResumeIQ is an AI-powered resume analyzer and interview preparation tool. By uploading a PDF resume and providing an optional job description, the application performs a complete ATS compliance check, identifies skill gaps, highlights strengths/weaknesses, suggests improvements, and generates customized interview questions tailored to the target role.

---

## Key Features

- **Secure Authentication**: User signup, login, and secure sessions via JWT (with access token rotation & refresh token HTTP-only cookies).
- **Resume Parsing**: PDF text extraction dynamically handles uploads and processes the text contents.
- **AI-Powered Analysis**: Integrated with the Google Gemini API (`gemini-2.5-flash`) for deep context analysis.
- **ATS Insights**: 
  - Overall ATS Score and Match Rate.
  - Bulletproof breakdown of strengths, weaknesses, and key suggestions.
  - Skill gaps (core skills matching vs missing skills).
-  **Custom Interview Prep**: Automatic generation of relevant, personalized interview questions based on the candidate's background and the target role.
- history  **Analysis History**: A detailed history dashboard to review past analysis reports and trace improvements.

---

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & Lucide Icons
- **Interactive UI**: Aurora backgrounds, click-spark micro-interactions, and premium glassmorphism designs
- **Language**: TypeScript

### Backend
- **Framework**: Node.js & Express
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose ODM)
- **File Uploads**: Multer
- **PDF Extraction**: PDF-Parse
- **AI Integration**: Google Gemini API SDK (`@google/genai`)

---

## Project Structure

```
ResumeIQ/
├── backend/       # Express API server (TypeScript)
│   ├── src/
│   │   ├── config/      # DB connection configuration
│   │   ├── controllers/ # Request handlers (auth, analysis)
│   │   ├── middleware/  # Authentication & upload middlewares
│   │   ├── models/      # MongoDB Mongoose schemas
│   │   ├── routes/      # Express API routes
│   │   ├── services/    # Gemini AI integration service
│   │   └── server.ts    # Server startup
│   └── package.json
│
└── frontend/      # Next.js React client (TypeScript)
    ├── src/
    │   ├── app/         # Pages & App Router routes
    │   ├── components/  # Reusable UI component cards
    │   ├── context/     # Auth state management provider
    │   ├── lib/         # Utility functions
    │   └── services/    # Axios API client
    └── package.json
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- [Gemini API Key](https://ai.google.dev/)

---

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/prateekbalothia/ResumeIQ.git
cd ResumeIQ
```

#### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder and populate it:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resumeiq
   JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=development
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server runs by default on http://localhost:5000*

---

#### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend runs by default on http://localhost:3000*

---

## License

This project is licensed under the ISC License.
