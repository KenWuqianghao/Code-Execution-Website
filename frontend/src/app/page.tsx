"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Card} from '@nextui-org/react';

function App() {
  const [code, setCode] = useState("# Write your Python code here\nprint('Hello, world!')");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  // fetch response from http://localhost:8000/execute/ with the code
  const executeCode = async () => {
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
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <Editor
          height="50vh"
          defaultLanguage="python"
          theme="vs-dark"
          defaultValue={code}
          onChange={handleEditorChange}
        />
      </Card>
      <Card>
        <div className="p-4">
          <Button onClick={executeCode} auto>
            Run Code
          </Button>
          <div className="mt-4">
            <h2>Output:</h2>
            <pre>{output}</pre>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;