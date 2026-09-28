# ConceptMap 🌌

> An interactive, node-based knowledge mapping and cognitive graph platform built on Novakian concept mapping principles with a Dune-inspired aesthetic.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ReactFlow](https://img.shields.io/badge/@xyflow/react-12.10-FF0072)](https://reactflow.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 📖 Overview

**ConceptMap** is a full-stack visual thinking and knowledge synthesis workspace. Inspired by Joseph D. Novak's concept mapping methodology, it empowers learners, researchers, and engineers to break down complex domains into structured concepts, labeled semantic relationships (propositions), and tracked understanding levels.

The user interface features a cinematic, holographic Dune / Arrakis-inspired theme built with custom typography, glowing telemetry status indicators, and responsive interactive panels.

---

## ✨ Features

- **Interactive Visual Graph Canvas**:
  - Drag-and-drop node positioning powered by [`@xyflow/react`](https://reactflow.dev/).
  - Dynamic deterministic layout positioning to maintain node coordinates across sessions.
  - Interactive edge connections: drag handles between concepts to form labeled relationships.
  - Zoom, pan, viewport controls, and subtle background grid guides.
- **Cognitive Level Tracking & Telemetry**:
  - Categorize concepts by understanding levels: **Beginner** (Weak), **Intermediate** (Developing), and **Advanced** (Mastered).
  - Real-time legend metrics displaying mastery breakdown across the canvas.
  - **Isolated Node Detection**: Visual pulse warnings highlighting disconnected concepts that require synthesis.
- **Granular Concept Management**:
  - Detailed sidebars for editing concept titles, descriptions, and tags.
  - **Embedded Notes**: Add timestamped research notes and revision bullet points directly inside each concept.
- **Multi-Canvas Support**:
  - Create and manage independent canvases for different subjects, books, or system architectures.
  - Quick-switch between canvases or remove outdated workspaces.
- **Relationship & Connection Modeling**:
  - Labeled semantic relationships (e.g., `"leads to"`, `"consists of"`, `"depends on"`).
  - Click any edge to inspect, modify relation types, or delete connections.
- **Secure Authentication**:
  - User registration and login powered by JSON Web Tokens (JWT) and `bcryptjs` password hashing.
  - Protected API routes and client-side route guards.

---

## 🛠️ Architecture & Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 with Vite 8
- **Routing**: React Router v7 (`BrowserRouter`, `ProtectedRoute`)
- **Graph Engine**: `@xyflow/react` (React Flow v12)
- **Styling**: Tailwind CSS v4, custom Dune theme design system (`Cinzel`, `JetBrains Mono`, `Inter`, `Syncopate`)
- **HTTP Client**: Axios with automatic JWT Bearer token request interceptors

### Backend (`/server`)
- **Runtime & Framework**: Node.js (ES Modules) with Express 5
- **Database & ODM**: MongoDB with Mongoose 9
- **Authentication**: `jsonwebtoken` (JWT) & `bcryptjs`
- **Validation**: `express-validator` middleware
- **Security**: CORS-configured origin control

```
ConceptMap/
├── client/                      # Frontend Vite + React application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable graph, sidebar, and form components
│   │   │   ├── ConceptDrawer.jsx    # Quick-add concept modal
│   │   │   ├── ConceptForm.jsx      # Concept creation/editing fields
│   │   │   ├── ConnectionForm.jsx   # Edge relationship creation/editing modal
│   │   │   ├── GraphCanvas.jsx      # React Flow interactive graph canvas & legend
│   │   │   └── Sidebar.jsx          # Concept inspector & note manager
│   │   ├── pages/               # Application views
│   │   │   ├── AuthPage.jsx         # Login & Register views with animated SVG
│   │   │   ├── CanvasPage.jsx       # Main canvas dashboard & state orchestrator
│   │   │   └── ProtectedRoute.jsx   # Auth guard wrapper
│   │   ├── services/
│   │   │   └── api.js               # Centralized Axios API client
│   │   ├── App.jsx              # Client router definitions
│   │   ├── index.css            # Tailwind v4 theme, animations & typography
│   │   └── main.jsx             # React entry point
│   ├── .env.development         # Frontend environment configuration
│   └── package.json
│
├── server/                      # Backend Node.js + Express REST API
│   ├── config/
│   │   └── db.js                # MongoDB connection handler
│   ├── controllers/             # Controller logic (auth, canvas, concept, connection)
│   ├── middleware/              # Auth verification & input validators
│   ├── models/                  # Mongoose schemas (User, Canvas, Concept, Connection)
│   ├── routes/                  # Express route declarations
│   ├── services/                # Database query services
│   ├── server.js                # Server entry point
│   ├── .env                     # Server environment variables
│   └── package.json
│
└── README.md
```

---

## 📡 API Endpoints

All endpoints except `/api/auth/*` require a Bearer token in the `Authorization` header:  
`Authorization: Bearer <JWT_TOKEN>`

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | `{ "username": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT | `{ "email": "...", "password": "..." }` |

### 🖼️ Canvases (`/api/canvases`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/canvases` | Get all canvases for authenticated user | — |
| `POST` | `/api/canvases` | Create a new canvas | `{ "title": "..." }` |
| `GET` | `/api/canvases/:id` | Get canvas details by ID | — |
| `PATCH` | `/api/canvases/:id` | Update canvas title or concept list | `{ "title"?: "...", "concepts"?: [] }` |
| `DELETE` | `/api/canvases/:id` | Delete a canvas | — |
| `GET` | `/api/canvases/:canvasId/graph` | Fetch graph nodes (concepts) & edges (connections) | — |

### 💡 Concepts (`/api/concepts` & `/api/canvases/:canvasId/concepts`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/canvases/:canvasId/concepts` | Create concept & attach to canvas | `{ "title": "...", "description"?: "...", "tags"?: [], "understandingLevel"?: "Beginner" \| "Intermediate" \| "Advanced" }` |
| `GET` | `/api/concepts/:conceptId` | Get single concept details | — |
| `PATCH` | `/api/concepts/:conceptId` | Update concept properties or notes | `{ "title"?: "...", "description"?: "...", "tags"?: [], "understandingLevel"?: "...", "notes"?: [] }` |
| `DELETE` | `/api/concepts/:conceptId` | Delete concept & remove canvas references | — |

### 🔗 Connections (`/api/connections`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/connections` | Create directional relation between concepts | `{ "source": "<conceptId>", "target": "<conceptId>", "relationType": "..." }` |
| `GET` | `/api/connections/:connectionId` | Get connection details by ID | — |
| `PATCH` | `/api/connections/:connectionId` | Update connection target, source, or label | `{ "source"?: "...", "target"?: "...", "relationType"?: "..." }` |
| `DELETE` | `/api/connections/:connectionId` | Delete a connection | — |

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
Create a `.env` file in the `server/` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name>
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (`client/.env.development` or `client/.env`)
Create a `.env.development` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/Muizzahmed786/ConceptMap.git
cd ConceptMap
```

### 2. Set Up the Backend
```bash
cd server
npm install
# Configure your server/.env file with MONGO_URI and JWT_SECRET
npm run dev
```
*The server will start on `http://localhost:5000` (or your configured `PORT`).*

### 3. Set Up the Frontend
In a new terminal window:
```bash
cd client
npm install
# Ensure client/.env.development points to your backend URL (default: http://localhost:5000)
npm run dev
```
*The client dev server will start at `http://localhost:5173`.*

---

## 🧪 Scripts Reference

### Backend (`/server`)
- `npm run dev`: Runs backend server with `nodemon` for auto-reloading during development.
- `npm start`: Runs server using standard Node.js runtime.

### Frontend (`/client`)
- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles production assets into `client/dist`.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint across the frontend codebase.

---

## 📄 License
This project is licensed under the ISC License.
