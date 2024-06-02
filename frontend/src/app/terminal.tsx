// components/Terminal.js
import { useEffect, useRef } from 'react';

function Terminal({ output }) {
  const endOfOutputRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever output changes
    endOfOutputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <div className="bg-black text-green-400 font-mono text-xs p-4 h-full overflow-auto">
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .blinking-cursor {
            animation: blink 1s step-end infinite;
          }
        `}
      </style>
      <pre className="whitespace-pre-wrap">{output}</pre>
      <div ref={endOfOutputRef} />
      <div className="h-3 w-3 bg-green-400 inline-block ml-1 blinking-cursor"></div> {/* Blinking cursor simulation */}
    </div>
  );
}

export default Terminal;
