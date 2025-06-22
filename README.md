# Multi-Output Study Tool Web App

A full-stack, AI-powered study tool that lets you upload PDF/DOCX files and generate summaries, flashcards, MCQs, and quiz games. Built with a modern React + Tailwind CSS frontend and a FastAPI backend with LangChain, OpenAI, and Pinecone for Retrieval-Augmented Generation (RAG).

---

## ✨ Features
- **Drag-and-drop PDF/DOCX upload**
- **Output selection:** Summaries, Flashcards, MCQs, Quiz Game
- **Pastel, animated UI:** Loading spinner, error alerts, fade-in results
- **Responsive:** Stacked on mobile, multi-column on desktop
- **LLM-powered backend:** Summarization, Q&A, MCQ, quiz via OpenAI + LangChain
- **RAG with Pinecone:** Context-aware, relevant outputs
- **Dockerized backend:** Easy deployment anywhere (AWS, local)

---

## 🖼️ Screenshots
<!-- Add screenshots here -->
image.png
---

## 🛠️ Technologies Used
- **Frontend:** React, Tailwind CSS, JavaScript, HTML
- **Backend:** Python, FastAPI, LangChain, OpenAI API, Pinecone, PyPDF2, python-docx
- **DevOps:** Docker, GitHub Actions (CI/CD), AWS-ready

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/multi-output-study-tool.git
cd multi-output-study-tool
```

### 2. Frontend Setup
```bash
npm install
npm run dev
```
- App runs at [http://localhost:5173](http://localhost:5173)

### 3. Backend Setup (Docker, recommended)
1. Create a `.env` file in `backend/`:
   ```env
   OPENAI_API_KEY=your-openai-key
   PINECONE_API_KEY=your-pinecone-key
   PINECONE_ENV=your-pinecone-environment
   PINECONE_INDEX=study-tool-index
   ```
2. Build and run the backend:
   ```bash
   docker build -t study-backend ./backend
   docker run --env-file ./backend/.env -p 8000:8000 study-backend
   ```
- API runs at [http://localhost:8000](http://localhost:8000)

### 4. Connect Frontend to Backend
- The frontend is preconfigured to call the backend at `localhost:8000`.
- Upload a PDF/DOCX, select output, and enjoy AI-generated study aids!

---

## ☁️ AWS Deployment
- Deploy the backend container to AWS ECS, ECR, or EC2.
- Use the provided Dockerfile and `.env` for environment variables.
- Set up CI/CD with GitHub Actions for automated deploys.

---



---

## 🤝 Contributing
Pull requests welcome! For major changes, open an issue first.

---

## 📧 License
MIT


