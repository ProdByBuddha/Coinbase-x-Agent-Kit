
# Modern Web Application with Model-Agnostic AI Framework

A full-stack web application template featuring React frontend with TypeScript, Express.js backend, and a flexible AI integration framework supporting multiple language models.

## Core Setup

### Project Structure
```typescript
// Main Application Entry - App.tsx
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function Router() {
  return (
    <div className="min-h-screen matrix-bg">
      <div className="relative z-10">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/help" component={Help} />
          <Route path="/examples" component={Examples} />
          <Route path="/chat/:id" component={Chat} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}
```

### Server Configuration
```typescript
// Server Entry - server/index.ts
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ALWAYS serve the app on port 5000
const PORT = 5000;
server.listen(PORT, "0.0.0.0", () => {
  log(`serving on port ${PORT}`);
});
```

### Styling System
```css
/* Core styling system from index.css */
@layer base {
  body {
    @apply font-sans antialiased bg-background text-foreground relative;
    background: linear-gradient(135deg, hsl(227 58% 10%) 0%, hsl(227 58% 5%) 100%);
  }
}

.cyberpunk-card {
  @apply relative overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm;
  box-shadow: 0 0 15px rgba(79, 97, 205, 0.2);
}
```

## Features
- Model-Agnostic AI Framework
- React Frontend with TypeScript
- Complete UI Component Library with shadcn/ui
- PostgreSQL Database with Drizzle ORM
- Real-time Updates with Socket.IO
- Type-safe API Integration
- Responsive Design
- Session Management
- Blockchain Integration
