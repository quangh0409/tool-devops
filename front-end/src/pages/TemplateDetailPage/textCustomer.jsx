import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Editor = () => {
  const editorRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [lineNumbers, setLineNumbers] = useState("");

  useEffect(() => {
    const updateLineNumbers = () => {
      const lines = editorRef.current.value.split("\n");
      setLineNumbers(lines.map((_, idx) => `${idx + 1}`).join("\n"));
    };

    // Sync the scroll position of line numbers with the textarea
    const syncScroll = () => {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
      }
    };

    const editor = editorRef.current;
    editor.addEventListener("scroll", syncScroll);
    editor.addEventListener("input", updateLineNumbers);

    // Initial update for line numbers
    updateLineNumbers();

    return () => {
      editor.removeEventListener("scroll", syncScroll);
      editor.removeEventListener("input", updateLineNumbers);
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <pre 
        ref={lineNumbersRef} 
        className="line-numbers"
        aria-hidden="true"
      >
        {lineNumbers}
      </pre>
      <textarea
        ref={editorRef}
        className="editor"
        spellCheck="false"
        style={{
          border: "1px solid #ccc",
          minHeight: "100px",
          padding: "8px",
          whiteSpace: "pre-wrap", // Change to 'nowrap' if you don't want line wrapping
          overflowX: 'auto',
          fontFamily: 'monospace', // Use monospace font
        }}
      ></textarea>
    </div>
  );
};

export default Editor;
