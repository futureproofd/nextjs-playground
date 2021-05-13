import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Image from "next/image";
import consoleDesc from "./technical/metadata/esi.console.desc.mdx";

const SImage = styled.article`
  display: flex;
  margin: 16px 0px 16px 8px;
  padding: 8px;
  width: fit-content;
`;

const SGalleryDescription = styled.section`
  background-image: linear-gradient(to right, #f6f6f6, white, white, white);
  display: flex;
  margin: 16px 8px 16px 0;
  padding: 16px;
  ul {
    font-size: 0.9rem;
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
