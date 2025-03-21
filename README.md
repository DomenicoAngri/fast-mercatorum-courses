# Course Auto Viewer

A simple web application to automate course viewing with a Svelte (TypeScript) frontend and Express (TypeScript) backend, set up as a Turborepo monorepo.

## Project Structure

```
course-viewer/
├── apps/
│   ├── frontend/         # Svelte + TypeScript frontend application
│   └── backend/          # Express + TypeScript API server
└── packages/             # Shared packages (if needed in the future)
```

## Getting Started

### Prerequisites

- Node.js v14 or later
- npm v7 or later

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd course-viewer
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
# Create .env file in apps/backend
cp apps/backend/.env.example apps/backend/.env
# Edit the file with your configuration
```

### Development

Start both frontend and backend in development mode:

```bash
npm run dev
```

Or start them individually:

```bash
# Frontend only
npm run dev --filter=frontend

# Backend only
npm run dev --filter=backend
```

### Building for Production

Build all applications:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

## Backend API Endpoints

The backend provides the following API endpoints:

- `GET /api/health`: Check server health
- `GET /api/courses`: Get all available courses
- `GET /api/courses/:id`: Get specific course details
- `POST /api/courses/:id/start`: Start automatic viewing of a course
- `POST /api/courses/:id/stop`: Stop viewing a course
- `GET /api/courses/status`: Get current status of running courses

## Customization

To implement your specific API calls for course viewing, modify the course controller in:

```
apps/backend/src/controllers/courseController.ts
```

## Technology Stack

- **Frontend**:
    - Svelte/SvelteKit with TypeScript
    - Tailwind CSS for styling
- **Backend**:
    - Node.js with Express in TypeScript
    - Axios for API requests
- **Build & Development**:
    - Turborepo for monorepo management
    - TypeScript for type safety
    - ESLint for code linting
