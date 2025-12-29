import { Box } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import React from "react"

import { BreadcrumbCustom, FilterPrice, FormBanner, PageHead } from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const PricePage = () => {
  const { t } = useTranslation("common")
  return (
    <main>
      <BreadcrumbCustom
        items={[
          { label: t("breadcrumb_home"), href: "/", icon: <IconHome /> },
          { label: t("price_page_breadcrumb") },
        ]}
      />
      <Box className={"container"}>
        <PageHead
          title={t("price_page_subtitle")}
          description={t("price_page_description")}
        />
        <FilterPrice />
        <FormBanner
          title={t("price_page_form_banner_title")}
          button={false}
          subtitle={t("price_page_form_banner_subtitle")}
          buttonText={t("price_page_form_banner_button")}
        />
      </Box>
    </main>
  )
}

export default PricePage
