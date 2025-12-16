# US Medic Map: Interactive Health Data Map

## 💡 Project Goal and Summary

The **US Medic Map** is a full-stack web application designed to visualize critical public health data from the CDC's Medicare Claims dataset on an interactive map.

This application's primary business value is to provide health plan executives with a **Data Visualization Tool** to quickly identify geographic areas (States/Counties) with the highest burden of Cardiovascular Disease (CVD) indicators. By highlighting high-need areas, it directly supports the prioritization of targeted interventions and vendor procurement efforts.

### Core Features

* **Choropleth Map Visualization:** States are color-coded based on the selected health metric (indicator value).
* **Dynamic API Filtering:** The map view dynamically updates based on a user-selected health indicator.
* **Interactivity:** Hovering over any state reveals the precise data value (rate) for that region via tooltips.
* **Full-Stack Implementation:** Built using the specified Next.js/React and Django/DRF stack.


---

## ⚙️ Technical Stack and Architecture

The solution employs a clean, split-stack architecture to ensure scalability and clear separation of concerns.

| Component | Technology Used | Purpose and Integration |
| :--- | :--- | :--- |
| **Frontend** | Next.js, React, **React Leaflet**, Tailwind CSS, Radix UI, TanStack Query | Utilizes the modern stack for performance. **TanStack Query** handles efficient data fetching and caching. **Radix UI** ensures accessible, professional UI components. |
| **Backend** | Django, Django REST Framework, PostgreSQL | Provides a robust, scalable API layer. **PostgreSQL** serves as the relational database for storing the cleaned Medicare claims subset. |
| **Mapping** | **React Leaflet** + **GeoJSON Data** | A lightweight and powerful library used to generate the **Choropleth Map** visualization. |

### Data Strategy

To maintain a focus on core feature implementation and efficiency, a highly targeted data strategy was used:
* **Dataset Subset:** A relevant, pre-filtered subset of the CDC data focusing on **State-Level Heart Failure Hospitalization Rates** across specific years was imported into the database.
* **Geo-Coordination:** Geographic boundaries (**GeoJSON**) are used to correctly render the state-level map and link state boundaries to the metric values returned by the API.

---

## 🚀 Setup and Running the Project

### Prerequisites

* Python 3.10+
* Node.js 18+
* PostgreSQL Database instance

### 1. Backend Setup (`/backend` directory)

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure Database
# Update database connection settings in project_core/settings.py

# 3. Apply Migrations
python manage.py makemigrations claims_api
python manage.py migrate

# 4. Load Data
# Note: Data loading steps (e.g., via management command) are documented in claims_api/README.md

# 5. Start the server (API available at [http://127.0.0.1:8000](http://127.0.0.1:8000))
python manage.py runserver

```

### 2. Frontend Setup (`/frontend` directory)

```bash
# 1. Install dependencies
npm install

# 2. Configure API Endpoint
# Ensure NEXT_PUBLIC_API_URL in .env points to the running backend (e.g., http://localhost:8000)

# 3. Start the development server (App available at http://localhost:3000)
npm run dev
```
