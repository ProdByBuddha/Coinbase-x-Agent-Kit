
# Modern Web Application with Model-Agnostic AI Framework

A full-stack web application template featuring React frontend with TypeScript, Express.js backend, and a flexible AI integration framework supporting multiple language models.

## Features

- 🤖 Model-Agnostic AI Framework
- 🌐 Modern React Frontend with TypeScript
- 🎨 Complete UI Component Library with shadcn/ui
- 💾 PostgreSQL Database with Drizzle ORM
- 🔄 Real-time Updates with Socket.IO
- 🎯 Type-safe API Integration
- 📱 Responsive Design
- 🔒 Session Management
- 💼 Blockchain Integration with CDP (Coinbase Developer Platform)

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS
  - shadcn/ui Components
  - React Query
  - Socket.IO Client

- **Backend**:
  - Express.js
  - PostgreSQL with Drizzle ORM
  - Socket.IO
  - LangChain for AI Integration
  - CDP AgentKit for Blockchain Operations

## Quick Start

1. Fork this project on Replit

2. Set up the PostgreSQL database:
   - Click "Tools" > "Database" > "Create a database"
   - Wait for provisioning
   - DATABASE_URL will be auto-configured

3. Configure AI Model:
   The framework supports multiple AI models through the OpenAI SDK compatibility layer:
   ```typescript
   // In server/chatbot.ts
   const llm = new ChatOpenAI({
     modelName: "your-preferred-model", // e.g., "gpt-4", "qwen/qwen-2.5-72b-instruct"
     apiKey: process.env.YOUR_API_KEY,
     configuration: {
       baseURL: "your-model-api-endpoint",
       defaultHeaders: {
         "Content-Type": "application/json"
       }
     }
   });
   ```

4. Set up required API keys in Replit Secrets:
   - Click "Tools" > "Secrets"
   - Add your model API key (e.g., OPENAI_API_KEY, OPENROUTER_API_KEY)
   - Add CDP keys:
     - CDP_API_KEY_NAME
     - CDP_API_KEY_PRIVATE_KEY

5. Create wallet data file:
   ```bash
   touch wallet_data.txt
   ```

6. Run database migrations:
   ```bash
   npx drizzle-kit push
   ```

## AI Model Configuration

The application uses a model-agnostic approach through LangChain and OpenAI SDK compatibility:

1. **Switch Models**: Update the ChatOpenAI configuration in `server/chatbot.ts`
2. **Custom Endpoints**: Configure baseURL for different providers
3. **Model Parameters**: Adjust temperature, topP, and other parameters as needed

Supported Configurations:
- OpenAI Models
- OpenRouter Models (Qwen, Claude, etc.)
- Custom API-compatible Endpoints

## Development

The application runs in development mode:
- Frontend: Vite dev server with HMR
- Backend: Express server with auto-reload
- Database: PostgreSQL with Drizzle ORM

## Contributing

1. Fork the project
2. Create feature branches
3. Submit pull requests
4. Report issues
5. Suggest improvements

## License

MIT License - free to use and modify for your own projects
