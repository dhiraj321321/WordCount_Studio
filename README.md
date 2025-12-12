# WordCount Studio (Week 8) – Wordcount Tools

A full‑stack **Wordcount Tools** application built for Week 8 project submission.
Users can paste/type content and instantly get word analytics. Submissions are stored in PostgreSQL and the backend also saves the raw content as a file for processing.

## Tech Stack
- Frontend: React (CRA) + Axios
- Backend: Spring Boot (Java) + Spring Data JPA
- Database: PostgreSQL
- Deployment: GitHub Pages (Frontend), Render (Backend + PostgreSQL)

## Key Features
- Live text editor (paste/type content)
- Word count + Character count + Sentence count + Paragraph count
- Submission history (stored in PostgreSQL)
- Export report (downloads latest analysis as a `.txt` report)
- Modern glassmorphism dashboard UI (WordStudio Neo)

## Project Structure (Monorepo)
WordCount_Studio/
src/ # Spring Boot backend
pom.xml # Spring Boot Maven config
wordcount-ui/ # React frontend

text

## API Endpoints (Backend)
Base URL: `/api/wordcount`
- `POST /api/wordcount` → analyze and save submission
- `GET  /api/wordcount/history` → get saved submissions

## Run Locally

### 1) Backend (Spring Boot)
1. Create a PostgreSQL database (example: `wordcountdb`)
2. Update `src/main/resources/application.properties` with your DB credentials
3. Run:
mvn spring-boot:run

text
Backend runs at: `http://localhost:8080`

### 2) Frontend (React)
cd wordcount-ui
npm install
npm start

text
Frontend runs at: `http://localhost:3000`

> Note: When running locally, `wordcount-ui/src/api.js` should point to `http://localhost:8080/api/wordcount`.

## Deployment

### Frontend (GitHub Pages)
This project uses `gh-pages` to deploy the React build.
cd wordcount-ui
npm run deploy

text
GitHub Pages URL:
- https://dhiraj321321.github.io/WordCount_Studio

### Backend (Render)
1. Create a PostgreSQL database on Render
2. Deploy Spring Boot backend as a Web Service
3. Set environment variables:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

Then update frontend API URL in:
`wordcount-ui/src/api.js`
to the deployed backend URL, and redeploy frontend.

## Links
- GitHub Repository: https://github.com/dhiraj321321/WordCount_Studio
- Live Frontend (GitHub Pages): https://dhiraj321321.github.io/WordCount_Studio
- Live Backend (Render): <PASTE_YOUR_RENDER_BACKEND_URL_HERE>

## Author
Dhiraj Parida
