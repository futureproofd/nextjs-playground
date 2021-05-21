import React from "react";
import styled from "styled-components";

const SSectionContainer = styled.section`
  display: flex;
  align-items: flex-start;
  font-family: wotfard;
  font-size: 1rem;
  margin: 0 32px 0 0;
`;

const SSectionTitle = styled.div`
  position: sticky;
  border-top: 1px solid;
  border-width: thin;
  top: 60px;
  border-image: linear-gradient(to left, #e0e0e0, white) 1;

  h2 {
    color: var(--color-black);
    font-weight: 400;
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -2px;
    line-height: 1;
    margin: 16px 0 0 16px;
    width: 225px;
  }
`;

const SSectionContents = styled.article`
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

    a::after {
      background: transparent url(/images/external_link.svg) 0 0 no-repeat;
      background-size: 16px;
      content: "";
      display: inline-block;
      height: 16px;
      margin-left: 6px;
      width: 16px;
    }
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
    font-weight: 300;
    font-family: Helvetica, Arial, sans-serif;
    color: var(--color-text);

    a {
      font-weight: 500;
      font-size: 1rem;
      color: var(--color-link);
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
  }

  h1 {
    color: var(--color-highlight);
    font-size: 1rem;
  }

  h4 {
    margin: 6px 0;
    color: var(--color-subText);
    font-style: italic;
  }

  time {
    color: var(--color-subText);
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

  p {
    margin-bottom: 18px;
  }

  li,
  ul {
    margin: 4px 0;
  }

  li:last-child {
    margin-bottom: 18px;
  }

  ul li ul li:last-child {
    margin-bottom: 4px;
  }
`;

export const Section = ({ title, children }) => {
  return (
    <SSectionContainer>
      <SSectionTitle>
        <h2>/{title}</h2>
      </SSectionTitle>
      <SSectionContents>{children}</SSectionContents>
    </SSectionContainer>
  );
};
