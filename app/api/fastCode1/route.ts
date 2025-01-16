import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
// console.log(message,'This is input');
//const promptMsg='React application no comment or explanation needed '+ message;

        const completion = await groq.chat.completions.create({
            messages: messages || [
                {
                    role: "user",
                    content: "React application no comment or explanation needed",
                },
            ],
            model: "llama-3.3-70b-versatile",
        });
console.log(completion.choices[0]?.message?.content,'This is output'+completion)

        return NextResponse.json(completion.choices[0]?.message?.content || "");
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}