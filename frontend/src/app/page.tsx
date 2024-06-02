"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import Terminal from './terminal'; // Adjust the import path as needed

export default function Home() {
  const [code, setCode] = useState("# Write your Python code here\nprint('Hello, world!')");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  // fetch response from http://localhost:8000/execute/ with the code
  const runCode = async () => {
    const response = await fetch("http://localhost:8000/execute/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code}),
    });
    const data = await response.json();
    setOutput(data.result);
  };

  return (
    <div className="flex h-screen">
      <div className="relative w-1/2 h-full">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
        />
        <button
          onClick={runCode}
          className="absolute right-10 bottom-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          style={{ zIndex: 1000 }} // Ensure the button is above all other content
        >
          Run Code
        </button>
      </div>
      <div className="w-1/2 h-full bg-black">
        <Terminal output={output} />
      </div>
    </div>
  );
}