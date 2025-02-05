
# Beta Features and Development Guide

## Database Schema
```json
{
  "balance_eth": {
    "name": "balance_eth",
    "type": "text",
    "primaryKey": false,
    "notNull": false
  },
  "balance_wei": {
    "name": "balance_wei",
    "type": "text",
    "primaryKey": false,
    "notNull": false
  },
  "created_at": {
    "name": "created_at",
    "type": "timestamp",
    "primaryKey": false,
    "notNull": true,
    "default": "now()"
  }
}
```

## UI Components
### Dialog Component
```typescript
// From components/ui/dialog.tsx
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
```

## Development Setup
1. Fork project on Replit
2. Set up PostgreSQL database through Replit
3. Configure environment variables
4. Run database migrations:
   ```bash
   npx drizzle-kit push
   ```

## Beta Features in Development
- Physical Art Tutorials
- Music Tutorials
- Blockchain Wallet Integration
- Real-time Chat System

## Deployment
Configured for deployment on Replit with:
```json
"deployment": {
  "deploymentTarget": "cloudrun",
  "build": ["npm", "run", "build"],
  "run": ["npm", "run", "start"]
}
```
