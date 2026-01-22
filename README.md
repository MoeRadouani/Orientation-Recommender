\# Orientation Recommender 🎓



A web-based academic orientation recommender using student grades.



\## Structure

\- frontend/ → React + Vite UI

\- backend/ → ML model \& API

\- data/ → datasets

\- notebooks/ → experiments



\## Features

\- Student dashboard

\- Admin dashboard

\- Grade-based recommendations

\- Clean popup-based UI



\## Run Frontend

cd frontend/careerpath-ai

npm install

npm run dev



\## Run Backend

pip install -r requirements.txt

pip install uvicorn fastapi

python -m uvicorn api:app --reload

