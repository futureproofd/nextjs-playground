import Head from "next/head";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import styled from "styled-components";
import { format } from "date-fns";

const name = "- Marcus Plienegger -";
const mainName = `DEV/${format(new Date(), "yyyy")}`;
export const siteTitle = "Marcus Plienegger";

const LayoutContainer = styled.div`
  padding: 0;
`;

const LayoutHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: var(--color-text);
    font-size: 10rem;
    font-family: wotfard;
    line-height: 1;
    letter-spacing: -16px;
    font-weight: 800;
    margin-bottom: -40px;
  }

  h2 {
    font-size: 1.2rem;
    font-family: wotfard;
    letter-spacing: 4px;
    line-height: 1.2;
    font-weight: 100;
    margin-top: 1rem;
  }
`;

const LayoutImageHeader = styled.div`
  display: flex;
  padding: 0;
  background-image: radial-gradient(#000000 20%, transparent 5%);
  background-size: 6px 6px;
  border-radius: 8px;
  justify-content: center;
`;

export const Layout = ({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) => {
  return (
    <LayoutContainer>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="My developer profile" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <LayoutHeader>
        {home ? (
          <>
            <h2>{name}</h2>
            <h1>{mainName}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.png"
                  className={utilStyles.borderCircle}
                  height={144}
                  width={144}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </LayoutHeader>
      <LayoutImageHeader>
        <Image
          priority
          src="/images/profile.png"
          className={utilStyles.borderCircle}
          height={144}
          width={144}
          alt={name}
        />
      </LayoutImageHeader>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </LayoutContainer>
  );
};
