/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import CodeViewer from "@/components/code/code-viewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function fastCode() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." }
  ]);
  const [generatedCode, setGeneratedCode] =useState("");

  // function to handle the send button click axios post request to /api/fastCode

  const handleSend = async () => {
    if (message.trim()) {
      const newMessages = [...messages, { role: "user", content: message + ' React application no comment or explanation needed Use Shad cn' }];

      // Logic to send the message
      try {
        setMessages(newMessages);
        setMessage("");
  
        console.log(message,'This is input');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = await fetch("/api/fastCode1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages }),
        });
        const data = await response.json();
        console.log("Response:", data);
setMessages([...messages, { role: "bot", content: data }]);
console.log("Sending message:", data);

      } catch (error) {
        console.error("Error:", error);
      }


      setGeneratedCode("");
      setMessage("")
    }
  };

  return (
    <div className="isolate m-5 ">
      <div className="mx-[10%]">
        <CodeViewer 
        // If generated code is empty show the message Hello World else defaultCode
        code={ generatedCode || `
import { useState } from 'react';
    import { Button } from "/components/ui/button"
    
    export default function HelloWorld() {

      return (
        <div className="flex flex-col items-center justify-center h-screen">
          
            <p className="text-3xl text-right">Hii World</p>
          
         
        </div>
      );
    }
          `} 
        
        showEditor />
      </div>
      <div className="fixed bottom-0 left-0 bg-center  w-full justify-center right-0 p-4 bg-white shadow-lg">
        <div className="flex w-[30%] ">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Create a Calculator app using react" 
            className="flex-1 mr-2 border border-gray-300 rounded-lg p-2"
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
