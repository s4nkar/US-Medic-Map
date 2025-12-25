# 🗺️ US Medic Map
**Interactive Visualization of Medicare Cardiovascular Claims**

The **US Medic Map** is a data visualization tool designed for health plan executives. It identifies geographic hotspots for Cardiovascular Disease (CVD) using CDC data, enabling targeted health interventions and smarter vendor procurement.



---

## 💡 Project Summary

This application visualizes the burden of heart disease and stroke across the United States. By mapping Medicare claims data, it allows decision-makers to:
* **Identify High-Need Areas:** Spot states with the highest hospitalization rates at a glance.
* **Prioritize Resources:** Direct clinical vendors and interventions to the regions that need them most.
* **Interactive Exploration:** Filter by specific health indicators and view precise metrics via map tooltips.

---

## 📊 Data Source
The application utilizes the **CDC - Surveillance of Cardiovascular Disease Indicators** dataset. 
* **Source:** [Kaggle - Cardiovascular Disease Indicators](https://www.kaggle.com/datasets/imtkaggleteam/medicare-and-medicaid/data?select=CMS.csv)
* **Focus:** State-level Heart Failure and Stroke hospitalization rates.

---

## 🏗️ Technical Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14, React, Leaflet, Tailwind | Map rendering & interactive UI |
| **Backend** | Django, Django REST Framework | API layer & Business logic |
| **Database** | PostgreSQL | Relational storage for claims data |
| **Infra** | Docker, Nginx, AWS EC2 | Production-grade deployment |

---

## ⚡ Quick Start (Docker - Recommended)

The fastest way to get the full stack (Frontend, Backend, Database) running locally.

1.  **Clone and Enter:**
    ```bash
    git clone https://github.com/s4nkar/US-Medic-Map.git
    cd us-medic-map
    ```

2.  **Launch the Stack:**
    ```bash
    docker compose up --build
    ```

3.  **Setup Data:**
    In a new terminal, run these commands to prepare your database:
    ```bash
    docker compose exec backend python manage.py migrate
    docker compose exec backend python manage.py ingest_data
    ```

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend API:** [http://localhost:8000/api/](http://localhost:8000/api/)
* **pgAdmin:** [http://localhost:5050](http://localhost:5050)

---

## 🚀 Production & Deployment

This project is built for professional deployment using a **CI/CD pipeline**.

### Infrastructure Architecture
The project uses **Nginx** as a reverse proxy to manage traffic.
* **Port 80:** Nginx handles all incoming traffic.
* **/api/**: Routes traffic to the Django Gunicorn server.
* **/**: Routes traffic to the Next.js production build.



### CI/CD Workflow (GitHub Actions)
Every push to the `main` branch triggers an automated deployment to **AWS EC2**:
1.  **Checkout:** GitHub Actions pulls the latest code.
2.  **Transfer:** Code is securely moved to EC2 via SCP.
3.  **Build:** Docker Compose rebuilds the production images on the server.
4.  **Finalize:** Migrations and `collectstatic` are run automatically.

---

## 🛠️ Manual Development Setup

If you prefer to run the services without Docker:

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
