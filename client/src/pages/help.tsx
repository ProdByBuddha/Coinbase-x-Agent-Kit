
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        CDP AgentKit Help Guide
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Learn the basics of CDP AgentKit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>CDP AgentKit is a powerful chat interface that allows you to interact with the Coinbase Digital Platform (CDP). Here's what you can do:</p>
          
          <div className="space-y-4">
            <section>
              <h3 className="font-semibold text-lg mb-2">Chat Management</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create multiple chat instances to organize different conversations</li>
                <li>Configure API keys for each chat instance</li>
                <li>Customize chat names for better organization</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">API Integration</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Connect to CDP using your API credentials</li>
                <li>Securely store and manage API keys</li>
                <li>Access CDP features through an intuitive chat interface</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">Real-time Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Real-time chat updates and responses</li>
                <li>Live network status monitoring</li>
                <li>Interactive message history</li>
              </ul>
            </section>

            <section className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Getting Help</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                <p>For additional support or questions, please refer to the CDP documentation or contact support.</p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
