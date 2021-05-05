import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import renderToString from 'next-mdx-remote/render-to-string'

import { Collapsible } from '../components/Collapsible';
import { MdxRemote } from "next-mdx-remote/types";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components: MdxRemote.Components = { Collapsible };

const sectionsDirectory = path.join(process.cwd(), "sections");

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
}

export const getAllSectionContent = async () => {
  const fileNames = walk(sectionsDirectory);

  const allSectionData = await Promise.all(fileNames.map(async (fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.substring(fileName.lastIndexOf('/') + 1).replace(/\.mdx$/, "");
    const fileParts = fileName.split('/')
    const section = fileParts[fileParts.length - 2];

    // Read markdown file as string
    const fileContents = fs.readFileSync(fileName, "utf8");
    // Use gray-matter to parse each section details metadata section
    //  const matterResult = matter(fileContents);

    const { content, data } = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(content);

    const contentHtml = processedContent.toString();

    const mdxSource = await renderToString(content, { components, scope: data })

    // Combine the data with the id
    return {
      section,
      id,
      contentHtml: mdxSource,
      ...data,
    };
  }));

  // Sort Section content by date
  return allSectionData.sort(
    (a: { [key: string]: any }, b: { [key: string]: any }) => {
      if (a.startDate < b.startDate) {
        return 1;
      } else {
        return -1;
      }
    }
  )
}


export const getSectionBody = (section, id) => {
  const fileNames = walk(sectionsDirectory);

  const file = fileNames.filter(each => each.indexOf(`/${section}/${id}`) > -1);
  const sectionBody = file.map(async (fileName) => {
    // Read markdown file as string
    const fileContents = fs.readFileSync(fileName, "utf8");
    // Use gray-matter to parse each section details metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);

    return processedContent.toString();
  });

  return sectionBody || 'none';
}


