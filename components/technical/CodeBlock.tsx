import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism/";

interface CodeBlockProps {
  language?: string;
  value: string;
}

// Value is passed in as children props of ReactMarkdown component
const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      customStyle={{ margin: "4px", padding: "1.5em" }}
      children={value}
      language={"jsx"}
      style={materialLight}
      wrapLines={true}
    />
  );
};
export default CodeBlock;
