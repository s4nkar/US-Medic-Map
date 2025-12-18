# 1. Use Python 3.12 slim to keep the image size small
FROM python:3.12-slim

# 2. Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# 3. Install system dependencies for Postgres & healthchecks
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 4. Install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the code (Baking it in)
COPY . .

# 6. Collect static files during build (Optional but recommended)
# Note: This requires environment variables to be set, 
# so we usually do this at runtime or via the compose file.

# 7. Default command (Gunicorn is the industry standard)
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]