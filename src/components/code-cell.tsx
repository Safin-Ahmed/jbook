import { useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import { OnChange } from "@monaco-editor/react";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState("console.log('Hello World!')");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output.code);
  };

  const handleEditorChange: OnChange = (value = "", event) => {
    setInput(value);
  };

  return (
    <div>
      <CodeEditor onChange={handleEditorChange} initialValue={input} />
      <div>
        <button onClick={onClick}>Run</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
