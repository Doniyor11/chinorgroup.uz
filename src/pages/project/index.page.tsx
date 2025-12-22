import { Box } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import React from "react"

import {
  BreadcrumbCustom,
  Buildings,
  Contact,
  FormBanner,
  HeroProject,
} from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const ProjectPage = () => {
  const { t } = useTranslation("common")

  return (
    <main>
      <BreadcrumbCustom
        items={[
          { label: t("breadcrumb_home"), href: "/", icon: <IconHome /> },
          { label: t("breadcrumb_projects") },
        ]}
      />
      <Box className={"container"}>
        <HeroProject />
        <Buildings />
        <FormBanner />
        <Contact />
      </Box>
    </main>
  )
}

export default ProjectPage
