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
        <title>Aqua Flow</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default withHocs(App)
