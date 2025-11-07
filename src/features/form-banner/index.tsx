import { Button, Flex, Text } from "@mantine/core"
import cx from "clsx"
import React from "react"

import s from "./index.module.scss"

interface FormBannerProps {
  className?: string
  title?: string
  subtitle?: string
  button?: boolean
  buttonText?: string
}

export const FormBanner: React.FC<FormBannerProps> = ({
  className,
  title = "Готовы обсудить ваш проект?",
  subtitle = "Свяжитесь с нами для получения бесплатной консульт",
  button = true,
  buttonText = "Оставить заявку",
}) => {
  return (
    <Flex
      direction={"column"}
      gap={{ base: "1rem", sm: "1.25rem", md: "1.5rem" }}
      className={cx(s.formBanner, className)}
      justify={"center"}
      align={"center"}
    >
      <Text className={s.title}>{title}</Text>
      <Text className={s.subtitle}>{subtitle}</Text>
      <Flex
        gap={{ base: "0.75rem", sm: "1rem", md: "1.5rem" }}
        direction={{ base: "column", sm: "row" }}
        w={{ base: "100%", sm: "auto" }}
      >
        <Button
          className={cx("button-green")}
          w={{ base: "100%", sm: "15rem", md: "18rem" }}
        >
          {buttonText}
        </Button>

        {button && (
          <Button
            className={cx("button-white")}
            w={{ base: "100%", sm: "15rem", md: "18rem" }}
          >
            Рассчитать стоимость
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
