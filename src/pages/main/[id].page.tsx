import { Box } from "@mantine/core"
import Head from "next/head"
import React from "react"

import { BreadcrumbCustom, BuildingsInner } from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const BuildingInnerPage = () => {
  return (
    <>
      <Head>
        <title>
          Новостройки в Ташкенте от Chinor Group | ЖК «Jomiy residence»
        </title>
      </Head>

      <main>
        <BreadcrumbCustom
          items={[
            { label: "Главная", href: "/", icon: <IconHome /> },
            { label: "Наши проекты", href: "/", icon: <IconHome /> },
            { label: "ЖК «Jomiy residence»" },
          ]}
        />
        <Box className={"container"}>
          <BuildingsInner />
        </Box>
      </main>
    </>
  )
}

export default BuildingInnerPage
