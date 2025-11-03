import { Box } from "@mantine/core"
import React from "react"

import {
  BreadcrumbCustom,
  BuildingsProject,
  Contact,
  FormBanner,
  HeroProject,
} from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const ProjectPage = () => {
  return (
    <main>
      <BreadcrumbCustom
        items={[
          { label: "Главная", href: "/", icon: <IconHome /> },
          { label: "Наши проекты" },
        ]}
      />
      <Box className={"container"}>
        <HeroProject />
        <BuildingsProject />
        <FormBanner />
        <Contact />
      </Box>
    </main>
  )
}

export default ProjectPage
