import React, { useEffect, useRef } from "react";
import "./style.css";

const Editor = () => {

  

  const editorRef = useRef(null);
  useEffect(() => {
    const handleInput = (event) => {
      const text = event.target.innerText;
      const coloredText = text.replace(
        /(var|let|const)/g,
        '<span class="statement">$1</span>'
      );
      event.target.innerHTML = coloredText;
      const lines = text.split("\n"); 
      const wordsInLines = lines.map((line) => line.split(/\s+/)); // Tách từng dòng thành mảng các từ
      console.log(wordsInLines);
      placeCaretAtEnd(event.target);
      // updateLineNumbers();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };

    const placeCaretAtEnd = (el) => {
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };


    const editor = document.getElementById("editor");
    editor.addEventListener("input", handleInput);
    editor.addEventListener("keydown", handleKeyDown);
    // updateLineNumbers();

    return () => {
      editor.removeEventListener("input", handleInput);
      editor.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
    ref={editorRef}
      id="editor"
      className="editor"
      spellCheck="false"
      contentEditable="true"
      style={{
        border: "1px solid #ccc",
        minHeight: "100px",
        padding: "8px",
        whiteSpace: "pre-wrap", // Allow wrapping within words
      }}
      // data-lines="" // Initial data-lines attribute
    ></div>
  );
};

export default Editor;
