import React from "react";
import RichTextEditor from "./components/RichTextEditor";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>富文本编辑器</h1>
        <p>基于 Slate.js 构建的现代化富文本编辑器</p>
      </header>
      <main className="app-main">
        <RichTextEditor />
      </main>
    </div>
  );
}

export default App;
