# Lab2Life – AI Medical Report Summarizer

## 🚀 Overview
Lab2Life is an AI-powered system that extracts and summarizes medical reports using OCR and Large Language Models (LLMs).

## 🧠 Features
- Extracts text from medical PDFs using OCR (pytesseract)
- Converts unstructured data into structured format
- Generates concise summaries using LLM (Groq API)
- Secure handling of sensitive healthcare data

## 🛠️ Tech Stack
- Python
- FastAPI (Backend)
- OCR (pytesseract, pdfplumber)
- LLM (Groq API)
- Streamlit / Frontend

## 📂 Project Structure
lab2life/
├── lab2life-front/
├── lab2life-backend/

## ⚙️ How to Run

### Backend
```bash
cd lab2life-backend
pip install -r requirements.txt
uvicorn main:app --reload

## 📊 Dashboard Preview
![Dashboard](screenshots/dashboard.png)