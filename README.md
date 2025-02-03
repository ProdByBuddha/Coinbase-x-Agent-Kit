
# Modern Web Application Template

A full-stack web application template featuring a React frontend with TypeScript and an Express.js backend with PostgreSQL database integration.

## Features

- 🌐 Modern React Frontend with TypeScript
- 🎨 Complete UI Component Library with shadcn/ui
- 💾 PostgreSQL Database with Drizzle ORM
- 🔄 Real-time Updates with Socket.IO
- 🎯 Type-safe API Integration
- 📱 Responsive Design
- 🔒 Session Management
- 🎭 User Authentication

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS
  - shadcn/ui Components
  - React Query for Data Fetching
  - Socket.IO Client

- **Backend**:
  - Express.js
  - PostgreSQL with Drizzle ORM
  - Socket.IO
  - Session Management
  - Passport Authentication

## Quick Start

1. Fork this project on Replit

2. Set up the PostgreSQL database:
   - Click the "Tools" button in the left sidebar
   - Select "Database"
   - Click "Create a database" 
   - Wait for the database to be provisioned
   - The DATABASE_URL environment variable will be automatically added to your Repl

3. Set up required API keys in Replit Secrets:

   a) Get OpenAI API Key:
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the generated key
   - In Replit, click "Tools" > "Secrets"
   - Add new secret with key: `OPENAI_API_KEY` and paste your OpenAI key as the value

   b) Get Coinbase API Keys:
   - Go to https://cloud.coinbase.com
   - Navigate to "API Keys" section
   - Create a new API key
   - Copy both the API Key Name and Private Key
   - In Replit Secrets, add:
     - `CDP_API_KEY_NAME`: Your API Key Name (organizations/...)
     - `CDP_API_KEY_PRIVATE_KEY`: Your Private Key (yes...that long ---BEGIN/END EC PRIVATE KEY....paste the ENTIRE value)

4. Create an empty wallet data file:
   ```bash
   touch wallet_data.txt
   ```

5. Run database migrations:
   ```bash
   npx drizzle-kit push
   ```

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Page components
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   ├── socket.ts        # WebSocket handling
│   └── index.ts         # Server entry point
├── db/                  # Database configuration
└── migrations/          # Database migrations
```

## Development

The application runs in development mode by default:
- Frontend: Vite dev server with HMR
- Backend: Express server with auto-reload
- Database: PostgreSQL with Drizzle ORM

## Contributing

Feel free to:
1. Fork the project
2. Create feature branches
3. Submit pull requests
4. Report issues
5. Suggest improvements

## License

MIT License - free to use and modify for your own projects
