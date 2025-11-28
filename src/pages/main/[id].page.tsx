import { Box } from "@mantine/core"
import Head from "next/head"
import useTranslation from "next-translate/useTranslation"
import React from "react"

import {
  BreadcrumbCustom,
  BuildingsInner,
  FilterPrice,
  FormBanner,
} from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const BuildingInnerPage = () => {
  const { t } = useTranslation("common")

  return (
    <>
      <Head>
        <title>{t("building_inner_page_title")}</title>
      </Head>

      <main>
        <BreadcrumbCustom
          items={[
            {
              label: t("building_inner_breadcrumb_home"),
              href: "/",
              icon: <IconHome />,
            },
            {
              label: t("building_inner_breadcrumb_projects"),
              href: "/",
              icon: <IconHome />,
            },
            { label: t("building_inner_breadcrumb_complex") },
          ]}
        />
        <Box className={"container"}>
          <BuildingsInner />
          <FilterPrice />
          <FormBanner
            title={t("building_inner_form_title")}
            button={false}
            subtitle={t("building_inner_form_subtitle")}
            buttonText={t("building_inner_form_button")}
          />
        </Box>
      </main>
    </>
  )
}

export default BuildingInnerPage
