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
          { label: "Главная", href: "/", icon: <IconHome /> },
          { label: "Цены на услуги" },
        ]}
      />
      <Box className={"container"}>
        <PageHead
          title={t("price_page_title")}
          subtitle={t("price_page_subtitle")}
          description={t("price_page_description")}
        />
        <FilterPrice />
        <FormBanner
          title={"Нужна точная смета?"}
          button={false}
          subtitle={
            "Свяжитесь с нами для получения детального расчета стоимости вашего проекта"
          }
          buttonText={"Получить консультацию"}
        />
      </Box>
    </main>
  )
}

export default PricePage
