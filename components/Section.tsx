import React from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 8px 0px;

  h2 {
    position: sticky;
    top: 0;
  }

  article {
    flex: 1;
    margin-left: 32px;
  }
`;

export const Section = ({ title, children }) => {
  return (
    <SectionContainer>
      <h2>{title}</h2>
      <article>{children}</article>
    </SectionContainer>
  );
};
