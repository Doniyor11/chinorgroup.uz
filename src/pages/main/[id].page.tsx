import { Box } from "@mantine/core"
import Head from "next/head"
import React from "react"

import { BreadcrumbCustom } from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const BuildingInnerPage = () => {
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <main>
        <BreadcrumbCustom
          items={[
            { label: "Главная", href: "/", icon: <IconHome /> },
            { label: "Наши проекты", href: "/", icon: <IconHome /> },
            { label: "Коттеджы “Riverside”" },
          ]}
        />
        <Box className={"container"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam
          autem beatae doloribus, earum, eligendi enim eos iusto magni maiores
          nemo neque nobis perspiciatis quasi reprehenderit sit voluptate
          voluptates voluptatibus?
        </Box>
      </main>
    </>
  )
}

export default BuildingInnerPage
