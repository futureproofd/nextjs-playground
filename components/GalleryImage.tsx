import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Image from "next/image";
import consoleDesc from "./technical/metadata/esi.console.desc.mdx";

const SImage = styled.article`
  display: flex;
  margin: 6px;
  padding: 16px;
  width: fit-content;
`;

const SGalleryDescription = styled.section`
  border-width: thin;
  border-style: hidden hidden hidden solid;
  border-color: var(--color-subtleHighlight);
  display: flex;
  margin: 24px;

  ul {
    font-size: 0.8rem;
  }
`;

const SGalleryContainer = styled.div`
  display: flex;
`;

const getDescriptiveMarkup = (section) => {
  switch (section) {
    case "console":
      return consoleDesc;
    default:
      return "";
  }
};

export const GalleryImage = ({ props }) => {
  const { src, descriptionType } = props;

  return (
    <SGalleryContainer>
      <SImage>
        <Image priority src={src} height={400} width={600} alt={"yo"} />
      </SImage>
      {descriptionType ? (
        <SGalleryDescription>
          <ReactMarkdown children={getDescriptiveMarkup(descriptionType)} />
        </SGalleryDescription>
      ) : null}
    </SGalleryContainer>
  );
};
