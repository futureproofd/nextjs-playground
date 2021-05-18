import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllSectionContent } from "../lib/sections";
import { Layout, siteTitle } from "../components/Layout";
import { DateRange } from "../components/DateRange";
import { Section } from "../components/Section";
import hydrate from "next-mdx-remote/hydrate";
import { Collapsible } from "../components/Collapsible";
import { GalleryImage } from "../components/GalleryImage";
import { MdxRemote } from "next-mdx-remote/types";

export const getSectionTitles = (): string[] => {
  return ["About", "Work", "Projects", "Interests", "Links"];
};

export enum Sections {
  ABOUT = "About",
  WORK = "Work",
}

// List of React components to render within MDX
const components: MdxRemote.Components = { Collapsible, GalleryImage };

export const getStaticProps: GetStaticProps = async (context) => {
  const allSectionsContent = await getAllSectionContent();
  // TODO: get github projects and attach to props
  return {
    props: {
      allSectionsContent,
    },
  };
};

const renderSectionMetaData = (section: Sections, metaData) => {
  const { id, startDate, endDate, title, position, url } = metaData;
  return (
    <div key={id} className="metaData">
      {section === Sections.ABOUT ? (
        <h3>{title}</h3>
      ) : (
        <Link href={url || "/"}>{title}</Link>
      )}
      <h1>{position}</h1>
      <DateRange startDate={startDate} endDate={endDate} />
    </div>
  );
};

/*  hydrate consumes the output of renderToString as well as the same components 
    argument as renderToString. Its result can be rendered directly into your component. 
    This function will initially render static content, and hydrate it when the browser isn't 
    busy with higher priority tasks.
*/
const renderSectionContent = (section: Sections, allSectionsContent) => {
  return allSectionsContent
    .filter((each) => each.section === section.toLowerCase())
    .map(({ id, startDate, endDate, title, position, url, contentHtml }) => (
      <div key={id}>
        {renderSectionMetaData(section, {
          startDate,
          endDate,
          title,
          position,
          url,
        })}
        <div className="sectionContentsContainer">
          {hydrate(contentHtml, { components })}
        </div>
      </div>
    ));
};

/*
Pages are associated with a route based on their file name. For example, in development:

pages/index.js is associated with the / route.
pages/posts/first-post.js is associated with the /posts/first-post route.
*/
export default function Home({ allSectionsContent }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <link
        rel="preload"
        href="/fonts/wotfard/wotfard-regular-webfont.woff2"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/league/LeagueMono-Regular.woff2"
        as="font"
        crossOrigin=""
      />
      <div>
        {getSectionTitles().map((section: string) => (
          <Section title={section}>
            {renderSectionContent(section as Sections, allSectionsContent)}
          </Section>
        ))}
      </div>
    </Layout>
  );
}
