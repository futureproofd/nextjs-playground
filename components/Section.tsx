import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
  display: flex;
  align-items: flex-start;
  font-family: wotfard;
  margin: 32px;

  article {
    margin: 12px 32px;

    p {
      margin: 12px 0;
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
      border: 1px dashed var(--color-highlight);
    }
  }
`;

const SectionTitle = styled.div`
  position: sticky;
  top: 0;

  h2 {
    color: var(--color-black);
    width: 200px;
    font-weight: 800;
    font-size: 2.5rem;
    line-height: 1;
    letter-spacing: -2px;
  }
`;

export const Section = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionTitle>
        <h2>/{title}</h2>
      </SectionTitle>
      <article>{children}</article>
    </SectionContainer>
  );
};
