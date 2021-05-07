import ReactMarkdown from "react-markdown";
import { acd } from "./technical/acd";
import { esi } from "./technical/esi";
import { me } from "./technical/me";
import gfm from "remark-gfm";
import styled from "styled-components";

const STechnicalDetails = styled.div`
  background-color: whitesmoke;
  border: 1px solid var(--color-subtleHighlight);
  border-width: thin;
  border-radius: 3px;
  padding: 24px;
  margin-top: 12px;
  margin-left: 32px;

  p {
    margin-top: 18px;
  }
`;

const SSummaryDetails = styled.summary`
  color: var(--color-link);
  font-weight: 800;
  padding: 16px;
`;

export const Collapsible = ({ props }) => {
  const { section, title } = props;

  const getTechnicalMarkup = (section) => {
    switch (section) {
      case "acd":
        return acd;
      case "esi":
        return esi;
      case "me":
        return me;
      default:
        return "nothing to see here.";
    }
  };
  return (
    <details>
      <SSummaryDetails>
        {title || "Technical Details for the curious"}
      </SSummaryDetails>
      <STechnicalDetails>
        {section !== "me" ? <h1>How it's built</h1> : null}
        {/* Additional markdown support for tables and other elements via gfm */}
        <ReactMarkdown plugins={[gfm]}>
          {getTechnicalMarkup(section)}
        </ReactMarkdown>
      </STechnicalDetails>
    </details>
  );
};
