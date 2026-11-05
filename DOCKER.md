# PulseID Docker Guide

This guide explains how to build and run **PulseID** in Docker containers across different operating systems (**Windows**, **macOS**, and **Linux**).

---

## Prerequisites

- Install **Docker** and **Docker Compose**:
  - **Windows / macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (enable WSL 2 backend on Windows).
  - **Linux**: [Docker Engine](https://docs.docker.com/engine/install/) & [Docker Compose Plugin](https://docs.docker.com/compose/install/).

Verify your installation:
```bash
docker --version
docker compose version
```

---

## 1. Quick Start (Production Mode)

The production container uses Next.js `standalone` output and Node.js 22 Debian Slim for an ultra-lightweight, secure image (~160MB) running as a non-root user.

### Using Docker Compose (Recommended)

1. **Build and start the container in background:**
   ```bash
   docker compose up --build -d
   ```

2. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

3. **Check container status & health:**
   ```bash
   docker compose ps
   ```

4. **View live logs:**
   ```bash
   docker compose logs -f
   ```

5. **Stop the container:**
   ```bash
   docker compose down
   ```

---

## 2. Using Docker CLI Directly

If you prefer using `docker build` and `docker run` without Compose:

```bash
# Build the production image
docker build -t pulseid:latest .

# Run the container (maps host port 3000 to Cloud Run standard port 8080)
docker run -d \
  -p 3000:8080 \
  -e PORT=8080 \
  --name pulseid-app \
  pulseid:latest

# Check logs
docker logs -f pulseid-app

# Stop and remove container
docker stop pulseid-app && docker rm pulseid-app
```

---

## 3. Google Cloud Run & Cloud Build Deployment

The container is pre-configured for **Google Cloud Run**:
- Listens on `0.0.0.0`
- Defaults to `PORT=8080` (or dynamically accepts `$PORT` injected by Cloud Run)
- Implements non-root user execution (`nextjs`, UID 1001)
- Supports multi-architecture builds via Buildx / Cloud Build

### Direct Deployment via Google Cloud CLI:

```bash
# Deploy source directly to Cloud Run
gcloud run deploy pulseid \
  --source . \
  --port 8080 \
  --allow-unauthenticated
```

---

## 4. Development Mode in Docker (Live Hot Reload)

If you want to run the development server inside Docker with code changes synced from your host machine across OSes:

```bash
# Start in dev mode
docker compose -f docker-compose.dev.yml up --build

# Stop dev container
docker compose -f docker-compose.dev.yml down
```

> **Note for file watching across OSes:** `WATCHPACK_POLLING=true` is enabled in `docker-compose.dev.yml` to guarantee that Next.js / Turbopack detects file edits across Windows WSL2 mounts, macOS VirtioFS, and Linux filesystems.

---

## 5. Cross-OS Notes

### Windows (WSL 2 / Docker Desktop)
- Ensure Docker Desktop is running before executing commands.
- We recommend cloning or running the project inside the WSL 2 filesystem (e.g., `\\wsl$\Ubuntu\home\...`) or directly from Windows PowerShell. Both work seamlessly.

### macOS (Apple Silicon M1/M2/M3/M4 & Intel)
- The base image `node:22-bookworm-slim` supports both `linux/arm64` and `linux/amd64` architectures natively with full glibc compatibility.
- No emulation or Rosetta translation is required on Apple Silicon.

### Linux (Ubuntu, Debian, Fedora, Arch)
- If running Docker without root privileges, make sure your user is added to the `docker` group:
  ```bash
  sudo usermod -aG docker $USER
  ```
- The production container automatically drops privileges to run as user `nextjs` (UID `1001`) for compliance and security.

---

## 6. Troubleshooting & Useful Commands

| Task | Command |
| :--- | :--- |
| **Rebuild without cache** | `docker compose build --no-cache` |
| **Inspect running container shell** | `docker exec -it pulseid-app sh` |
| **Check container resource usage** | `docker stats pulseid-app` |
| **Remove orphaned images** | `docker image prune` |

