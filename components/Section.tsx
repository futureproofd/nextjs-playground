import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
  display: flex;
  align-items: flex-start;
  font-family: wotfard;
  font-size: 1rem;
  margin: 0 32px 0 0;
`;

const SectionTitle = styled.div`
  position: sticky;
  border-top: 1px solid;
  border-width: thin;
  top: 0;
  border-image: linear-gradient(to left, #e0e0e0, white) 1;

  h2 {
    color: var(--color-black);
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1;
    margin: 16px 0 0 16px;
    width: 225px;
  }
`;

const SectionContents = styled.article`
  font-weight: 100;
  margin: 0 32px 0 0;

  .metaData {
    border-width: thin;
    border-style: hidden hidden hidden solid;
    padding: 8px;
    padding-left: 16px;
    border-color: var(--color-subtleHighlight);
    border-image: linear-gradient(to top, var(--color-subtleHighlight), #e0e0e0)
      1;
    background-image: linear-gradient(to right, whitesmoke, white);
  }

  .sectionContentsContainer {
    padding: 32px;
    border-style: hidden hidden hidden solid;
    border-width: thin;
    border-color: var(--color-subtleHighlight);
    border-image: linear-gradient(
        to bottom,
        var(--color-subtleHighlight),
        white
      )
      1;

    a {
      font-weight: bolder;
      font-size: 1rem;
      font-style: italic;
      color: var(--color-link);
    }
  }

  h1 {
    color: var(--color-highlight);
    font-size: 1rem;
    font-weight: 100;
  }

  time {
    color: darkslategray;
    font-size: 0.9rem;
    font-style: italic;
    font-weight: 100;
  }

  a {
    font-weight: bolder;
    font-size: 1.4rem;
    color: var(--color-text);
    text-decoration: none;
  }

  hr {
    margin: auto;
    margin: 24px 0;
    border: 1px dotted var(--color-highlight);
  }

  p:not(:first-child) {
    margin-top: 18px;
  }
`;

export const Section = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionTitle>
        <h2>/{title}</h2>
      </SectionTitle>
      <SectionContents>{children}</SectionContents>
    </SectionContainer>
  );
};
