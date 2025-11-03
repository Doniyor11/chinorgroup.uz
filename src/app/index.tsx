import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"

import { Layout } from "@/widgets"

import "@/shared/styles/app.scss"

import { withHocs } from "./lib/with-hocs"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>
          Новостройки в Ташкенте от Chinor Group — лидер строительства в
          Ташкенте!
        </title>

        {/* Основные мета-теги */}
        <meta
          name="description"
          content="Chinor Group — лидер строительства в Ташкенте. Современные новостройки, квартиры от застройщика, выгодные условия покупки и рассрочка. Искусство создавать комфортное жилье!"
        />
        <meta
          name="keywords"
          content="Chinor Group, новостройки Ташкент, квартиры Ташкент, недвижимость Узбекистан, жилой комплекс, купить квартиру Ташкент, застройщик Узбекистан"
        />

        {/* Open Graph для соцсетей */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Chinor Group — Новостройки в Ташкенте"
        />
        <meta
          property="og:description"
          content="Современные жилые комплексы от Chinor Group. Квартиры в Ташкенте от надежного застройщика."
        />
        <meta property="og:image" content="/images/chinor-group-og.jpg" />
        <meta property="og:url" content="https://chinorgroup.uz" />
        <meta property="og:site_name" content="Chinor Group" />
        <meta property="og:locale" content="ru_UZ" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chinor Group — Новостройки в Ташкенте"
        />
        <meta
          name="twitter:description"
          content="Современные квартиры от ведущего застройщика Узбекистана"
        />
        <meta name="twitter:image" content="/images/chinor-group-twitter.jpg" />

        {/* Дополнительные SEO теги */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
        <meta name="author" content="Chinor Group" />
        <meta name="language" content="ru-UZ" />
        <meta name="geo.region" content="UZ-TK" />
        <meta name="geo.placename" content="Ташкент" />
        <meta name="geo.position" content="41.311151;69.279737" />
        <meta name="ICBM" content="41.311151, 69.279737" />

        {/* Брендинг */}
        <meta name="application-name" content="Chinor Group" />
        <meta name="theme-color" content="#000000" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://chinorgroup.uz" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Альтернативные языки (если есть) */}
        <link rel="alternate" hrefLang="ru" href="https://chinorgroup.uz" />
        <link rel="alternate" hrefLang="uz" href="https://chinorgroup.uz/uz" />
        <link rel="alternate" hrefLang="en" href="https://chinorgroup.uz/en" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default withHocs(App)
