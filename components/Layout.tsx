import Head from "next/head";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import styled from "styled-components";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const name = "- Marcus Plienegger -";
const mainName = `DEV/${format(new Date(), "yyyy")}`;
export const siteTitle = "Marcus Plienegger";
const TIMEOUT_DELAY = 300;
const SMain = styled.main`
  margin-top: 32px;
`;

const SLayoutContainer = styled.div`
  padding: 0;
`;

const SLayoutHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  top: 0;
  right: 0;
  left: 0;

  /* Big 202X Logo */
  h1 {
    color: var(--color-text);
    font-size: 10rem;
    font-family: wotfard;
    line-height: 1;
    letter-spacing: -16px;
    font-weight: 800;
    margin-bottom: -40px;
  }

  /* Name */
  h2 {
    font-size: 1.2rem;
    font-family: wotfard;
    letter-spacing: 4px;
    line-height: 1.2;
    font-weight: 100;
    margin-top: 1rem;
  }
`;

const SStickyHeader = styled.div`
  @keyframes slideInFromTop {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  /* This section calls the slideInFromLeft animation we defined above */
  animation: 0.3s ease 0s 1 slideInFromTop;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 3;
  position: fixed;
  padding: 6px 16px;
  background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 1px,
      white 1px,
      white 5px
    ),
    linear-gradient(
      to right,
      var(--color-highlight),
      white,
      white,
      white,
      white
    );
  top: 0;
  right: 0;
  left: 0;
  box-shadow: 0 0px 8px 3px rgba(0, 0, 0, 0.1);

  /* Big 202X Logo */
  h1 {
    color: var(--color-text);
    font-size: 3rem;
    font-family: wotfard;
    line-height: 1;
    letter-spacing: -6px;
    font-weight: 800;
  }
`;

const SLayoutImageHeader = styled.div`
  display: flex;
  background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      white 1px,
      white 8px
    ),
    linear-gradient(to bottom, var(--color-highlight), black, darkgrey, white);
  justify-content: center;
`;

export const Layout = ({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) => {
  const [shrinkNav, setShrinkNav] = useState<boolean>(false);

  const scrollHandler = () => {
    // Delay function to avoid overlapping resizing.
    setTimeout(() => {
      setShrinkNav((shrinkNav) => {
        if (
          !shrinkNav &&
          (document.body.scrollTop > 250 ||
            document.documentElement.scrollTop > 250)
        ) {
          return true;
        }

        if (
          shrinkNav &&
          document.body.scrollTop < 10 &&
          document.documentElement.scrollTop < 10
        ) {
          return false;
        }

        return shrinkNav;
      });
    }, TIMEOUT_DELAY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollHandler);
    }
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <SLayoutContainer>
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
      {shrinkNav ? (
        <SStickyHeader>
          <>
            <h1>{`MP/${mainName.substring(4)}`}</h1>
          </>
        </SStickyHeader>
      ) : null}
      <SLayoutHeader>
        <>
          <h2>{name}</h2>
          <h1>{mainName}</h1>
        </>
      </SLayoutHeader>

      <SLayoutImageHeader>
        <Image
          priority
          src="/images/profile.png"
          className={utilStyles.borderCircle}
          height={144}
          width={144}
          alt={name}
        />
      </SLayoutImageHeader>

      <SMain>{children}</SMain>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </SLayoutContainer>
  );
};
