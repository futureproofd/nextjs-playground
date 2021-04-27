import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";


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

export const getAllSectionMetaData = async () => {
  const fileNames = walk(sectionsDirectory);

  const allSectionData = await Promise.all(fileNames.map(async (fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.substring(fileName.lastIndexOf('/') + 1).replace(/\.md$/, "");
    const fileParts = fileName.split('/')
    const section = fileParts[fileParts.length - 2];

    // Read markdown file as string
    const fileContents = fs.readFileSync(fileName, "utf8");
    // Use gray-matter to parse each section details metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
      section,
      id,
      contentHtml,
      ...matterResult.data,
    };
  }));

  // Sort Section content by date
  return allSectionData.sort(
    (a: { [key: string]: any }, b: { [key: string]: any }) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    }
  )
}


export const getSectionBody = (section, id) => {
  console.log('section and id', section, id)
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

  console.log('body is', sectionBody)

  return sectionBody || 'none';
}


