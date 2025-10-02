# App

## Requirements

- Node.js >= v21.5.0
- Docker

## Start up with docker

### Clone repository

```bash
git clone https://github.com/PZ-III/app.git
cd app
```

### Env Local

## Create file .env.local and type:

```bash
VITE_AUTH0_DOMAIN=AUTH0_DOMAIN
VITE_AUTH0_CLIENT_ID=AUTH0_CLIENT_ID
VITE_AUTH0_AUDIENCE=AUTH0_AUDIENCE
VITE_AXIOS_BASE_URL_API=URL_API
VITE_AXIOS_BASE_URL_APP=URL_APP
```

### Build Docker Container and Run

```bash
docker-compose up --build
```

## Start up without docker

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```
