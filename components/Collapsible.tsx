import ReactMarkdown from "react-markdown";
import acd from "./technical/acd.technical.mdx";
import esi from "./technical/esi.technical.mdx";
import me from "./technical/me.technical.mdx";
import gfm from "remark-gfm";
import styled from "styled-components";
import CodeBlock from "./technical/CodeBlock";

const STechnicalDetails = styled.div`
  background-color: var(--color-subSection);
  border: 1px solid var(--color-subtleHighlight);
  border-width: thin;
  border-radius: 2px;
  padding: 24px;
  margin-top: 12px;
  margin-left: 32px;

  p {
    margin-top: 18px;
  }

  /* Code snippets */
  pre {
    border-radius: 4px;
    border: 1px dotted darkgray;
  }

  a::after {
    background: transparent url(/images/external_link.svg) 0 0 no-repeat;
    background-size: 12px;
    content: "";
    display: inline-block;
    height: 12px;
    margin-left: 3px;
    width: 12px;
  }
`;

const SSummaryDetails = styled.summary`
  color: var(--color-link);
  font-weight: 400;
  padding: 16px;
  cursor: pointer;
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
        {/* Additional markdown support for tables and other elements via gfm */}
        <ReactMarkdown
          plugins={[gfm]}
          renderers={{ code: CodeBlock }}
          children={getTechnicalMarkup(section)}
        />
      </STechnicalDetails>
    </details>
  );
};
