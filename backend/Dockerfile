# Use Python 3.12 to match your local environment
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Prevent Python from writing .pyc files and ensure logs print immediately
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies required for psycopg2
# We need 'gcc' and 'libpq-dev' because 'psycopg2' (non-binary) compiles from source
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file first (for cache efficiency)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Default command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]