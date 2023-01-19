import React, { useState } from "react";
import bundle from "./bundler";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

function App() {
  const [text, setText] = useState<string>("console.log('Hello World!')");
  const [code, setCode] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
    const output = await bundle(text);
    setCode(output.code);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <CodeEditor initialValue={text} onChange={(value) => setText(value)} />
        <textarea value={text} onChange={handleChange}></textarea>
        <br />
        <button>Submit</button>
      </form>

      <Preview code={code} />
    </div>
  );
}

export default App;
