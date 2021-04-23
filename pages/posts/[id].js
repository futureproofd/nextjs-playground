import Layout from "../../components/layout";
import Date from "../../components/date";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";

import utilStyles from "../../styles/utils.module.css";

/*
 getStaticProps only runs on the server-side. It will never run on the client-side. It won’t even be included in the JS bundle for the browser.
  That means you can write code such as direct database queries without them being sent to browsers.

  getStaticProps can only be exported from a page. You can’t export it from non-page files.

  One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.
*/
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/*
If a page has dynamic routes (documentation) and uses getStaticProps it needs to define a list of paths that have to be rendered to HTML at build time.

If you export an async function called getStaticPaths from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.

i.e. paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
*/
export async function getStaticPaths() {
  // we determine our list of paths to pre-render here:
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

/*
First, we’ll create a page called [id].js under pages/posts. Pages that begin with [ and end with ] are dynamic routes in Next.js.

In pages/posts/[id].js, we’ll write code that will render a post page — just like other pages we’ve created.
*/
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
