# Nooro - Task Management Application

A modern, responsive task management application built with Next.js 13, featuring a beautiful UI with NextUI components and smooth animations.


## 🚀 Demo

Check out the demo Website

https://github.com/user-attachments/assets/0d3a8c44-3759-45c0-bde7-a64a50b724ac


Check out the demo Mobile Friendly



https://github.com/user-attachments/assets/6fc3064a-188f-4294-9c55-a9fa584b8a70



## ✨ Features

- 🎨 Modern and responsive UI with NextUI components
- 🌓 Light/Dark mode with system preference sync
- 🔄 Real-time task updates
- 📱 Mobile-first responsive design
- 🎯 Task organization with color coding
- ⚡ Server-side rendering for optimal performance
- 🔍 Real-time task search functionality
- 🔒 Device-based data persistence
- 🎭 Smooth animations with Framer Motion

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15.1.2)
- **UI Components:** [@nextui-org/react](https://nextui.org/) (v2.6.8)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3.4.1)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (v11.15.0)
- **Icons:** [Lucide React](https://lucide.dev/) (v0.469.0)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) (v0.4.4)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/) (v1.7.1)
- **Utilities:** 
  - [lodash](https://lodash.com/) (v4.17.21)
  - [uuid](https://github.com/uuidjs/uuid) (v11.0.3)
  - [clsx](https://github.com/lukeed/clsx) (v1.2.1)
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) (v1.14.0)

## 📦 Project Structure

```
nooro-frontend/
├── src/
│   ├── app/                 # Next.js 13 App Router
│   │   ├── api/            # API Routes
│   │   ├── tasks/          # Task-related pages
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── tasks/          # Task-related components
│   │   └── ui/             # Shared UI components
│   ├── lib/                # Utilities and API client
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript types
└── public/                 # Static assets
```

## 🚀 Getting Started

### Backend Setup (Required)

Before running the frontend, you need to set up the backend server:

1. Clone the backend repository:
```bash
git clone https://github.com/AkhtarZaman7/backend.git
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
LOG_LEVEL=info

# Database Configuration
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/nooro_db"

# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=nooro_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the backend server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

Once the backend is running, you can set up the frontend:

1. Clone the frontend repository:
```bash
git clone https://github.com/AkhtarZaman7/frontend.git
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes | `http://localhost:5000` |

## 🧪 Development

### TypeScript

The project uses TypeScript for type safety. Key dependencies:
- TypeScript v5.x
- @types/react v19.x
- @types/node v20.x
- @types/lodash v4.17.13

### Code Quality

- **ESLint** v9.x with Next.js configuration
- **Prettier** for code formatting
- **TypeScript** for static type checking

## 📝 API Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/:id` | Get a specific task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## 🧪 Deployment

The application is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## 👥 Authors

- Akhtar Zaman - [@AkhtarZaman7](https://github.com/AkhtarZaman7)

## 🙏 Acknowledgments

- [NextUI](https://nextui.org/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for the smooth animations
- [Lucide Icons](https://lucide.dev/) for the icon set

## 📦 Dependencies

### Production Dependencies
```json
{
  "@heroicons/react": "^2.2.0",
  "@nextui-org/react": "^2.6.8",
  "clsx": "1.2.1",
  "framer-motion": "^11.15.0",
  "lodash": "^4.17.21",
  "lucide-react": "^0.469.0",
  "next": "15.1.2",
  "next-themes": "^0.4.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "sonner": "^1.7.1",
  "tailwind-merge": "1.14.0",
  "uuid": "^11.0.3"
}
```

### Development Dependencies
```json
{
  "@eslint/eslintrc": "^3",
  "@types/lodash": "^4.17.13",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.1.2",
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```
