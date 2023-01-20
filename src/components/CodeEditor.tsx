import { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import MonacoEditor from "@monaco-editor/react";
import { useRef } from "react";
import "./code-editor.css";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import "./syntax.css";

interface CodeEditorProps {
  initialValue: string;
  onChange: OnChange;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Instantiate the highlighter
    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      parse,
      traverse,
      editor
    );

    // Activate highlighting (debounceTime default: 100ms)
    monacoJSXHighlighter.highlightOnDidChangeModelContent();

    // Activate JSX commenting
    monacoJSXHighlighter.addJSXCommentCommand();
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button button-format is-primary is-small"
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        theme="vs-dark"
        language="javascript"
        height={500}
        onMount={onMount}
        onChange={onChange}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
