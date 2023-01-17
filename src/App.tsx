import React, { useState } from "react";
import bundle from "./bundler";

function App() {
  const [text, setText] = useState<string>("");
  const [code, setCode] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const output = await bundle();
    setCode(output.code);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleChange}></textarea>
        <br />
        <button>Submit</button>
      </form>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
