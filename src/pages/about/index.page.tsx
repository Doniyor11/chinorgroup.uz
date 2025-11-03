import { Box } from "@mantine/core"
import React from "react"

import {
  AboutInfo,
  BreadcrumbCustom,
  ChooseUs,
  Company,
  Contact,
} from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const AboutPage = () => {
  return (
    <main>
      <BreadcrumbCustom
        items={[
          { label: "Главная", href: "/", icon: <IconHome /> },
          { label: "О компании" },
        ]}
      />
      <Box className={"container"}>
        <AboutInfo />
        <ChooseUs />
        <Company />
        <Contact />
      </Box>
    </main>
  )
}

export default AboutPage
