import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllSectionMetaData } from "../lib/sections";
import { Layout, siteTitle } from "../components/Layout";
import { Section } from "../components/Section";

export const getStaticProps: GetStaticProps = async (context) => {
  const allSectionsContent = await getAllSectionMetaData();

  return {
    props: {
      allSectionsContent,
    },
  };
};

export const getSectionTitles = (): string[] => {
  return [
    "About",
    "Experience",
    "Interests",
    "Projects",
    "References",
    "Links",
  ];
};

export enum Sections {
  ABOUT = "About",
  EXPERIENCE = "Experience",
}

const sectionTitles = getSectionTitles();

const renderSectionParts = (section: Sections, allSectionsContent) => {
  return allSectionsContent
    .filter((each) => each.section === section.toLowerCase())
    .map(({ id, date, title, contentHtml }) => (
      <article key={id}>
        <Link href={`/${section.toLowerCase()}/${id}`}>{title}</Link>
        <br />
        {id}
        <br />
        {date}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
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
