"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Copy, Check } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [userPrompt, setUserPrompt] = useState('')
  const [projectType, setProjectType] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()
  const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    const userMessage = {
      id: String(Date.now()),
      role: 'user',
      content: userPrompt
    };
    
    setMessages(prev => [...prev, userMessage]);
console.log(JSON.stringify({ messages: [...messages, userMessage] }));
    try {
      
const buildshipUrl = process.env.BUILDSHIP_URL;
// if (!buildshipUrl) {
//   throw new Error('BUILDSHIP_URL is not defined in the environment variables');
// }
     
      // Make API request
      const response = await fetch(buildshipUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: userPrompt })
      });

      const data = await response.text();
      
     

      console.log('Success:', data);
      setOutput(data);
    } catch (error) {
      console.error('Error:', error);
      setOutput('An error occurred while generating the PRD.');
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The PRD has been copied to your clipboard.",
      })



      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Copy failed",
        description: "Failed to copy the PRD to clipboard.",
        variant: "destructive",
      })
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-3xl">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8" />
              AI PRD Generator
            </div>
            
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-grow space-y-2">
                <Label htmlFor="idea">Enter your idea</Label>
                <Input
                  id="idea"
                  placeholder="Describe your project idea..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  required
                />
              </div>
              <div className="w-40 space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger id="projectType">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate PRD'}
            </Button>
          </form>

          {output && (
            <Card className="mt-6">
{output && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8 shrink-0"
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy PRD</span>
              </Button>
            )}
              <CardContent className="pt-6">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {output}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

