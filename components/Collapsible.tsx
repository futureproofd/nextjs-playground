import ReactMarkdown from "react-markdown";
import { esi } from "./technical/esi";

export const Collapsible = ({ props }) => {
  const getTechnicalMarkup = (props) => {
    switch (props) {
      case "esi":
        return esi;
      default:
        return "nothing to see here.";
    }
  };
  return (
    <details>
      <summary>Technical Details for the curious</summary>{" "}
      <h1>How it's built:</h1>
      <ReactMarkdown>{getTechnicalMarkup(props)}</ReactMarkdown>
    </details>
  );
};
