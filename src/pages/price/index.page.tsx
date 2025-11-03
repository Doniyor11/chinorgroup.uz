import { Box } from "@mantine/core"
import React from "react"

import {
  BreadcrumbCustom,
  FilterPrice,
  FormBanner,
  PriceInfo,
} from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const PricePage = () => {
  return (
    <main>
      <BreadcrumbCustom
        items={[
          { label: "Главная", href: "/", icon: <IconHome /> },
          { label: "Цены на услуги" },
        ]}
      />
      <Box className={"container"}>
        <PriceInfo />
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
