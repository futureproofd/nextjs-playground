import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllSectionContent } from "../lib/sections";
import { Layout, siteTitle } from "../components/Layout";
import { Section } from "../components/Section";
import hydrate from "next-mdx-remote/hydrate";
import { Collapsible } from "../components/Collapsible";
import { MdxRemote } from "next-mdx-remote/types";

export const getSectionTitles = (): string[] => {
  return ["About", "Work", "Projects", "Interests", "Links"];
};

export enum Sections {
  ABOUT = "About",
  WORK = "Work",
}

const components: MdxRemote.Components = { Collapsible };

const sectionTitles = getSectionTitles();
export const getStaticProps: GetStaticProps = async (context) => {
  const allSectionsContent = await getAllSectionContent();
  return {
    props: {
      allSectionsContent,
    },
  };
};

/*hydrate consumes the output of renderToString as well as the same components 
  argument as renderToString. Its result can be rendered directly into your component. 
  This function will initially render static content, and hydrate it when the browser isn't 
  busy with higher priority tasks.
*/
const renderSectionParts = (section: Sections, allSectionsContent) => {
  return allSectionsContent
    .filter((each) => each.section === section.toLowerCase())
    .map(({ id, startDate, endDate, title, position, contentHtml }) => (
      <div key={id}>
        <Link href={`/${section.toLowerCase()}/${id}`}>{title}</Link>
        <h1>{position}</h1>
        <time>{`${startDate} ${endDate ? "➪ " + endDate : " ➪ Now"}`}</time>
        <div>{hydrate(contentHtml, { components })}</div>
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
        href="/fonts/wotfard/wotfard-medium-webfont.woff2"
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
        {sectionTitles.map((section: string) => (
          <Section title={section}>
            {renderSectionParts(section as Sections, allSectionsContent)}
          </Section>
        ))}
      </div>
    </Layout>
  );
}
