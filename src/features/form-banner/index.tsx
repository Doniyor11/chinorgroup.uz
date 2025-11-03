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
      gap={"1.5rem"}
      className={cx(s.formBanner, className)}
      justify={"center"}
      align={"center"}
    >
      <Text className={s.title}>{title}</Text>
      <Text className={s.subtitle}>{subtitle}</Text>
      <Flex gap={"1.5rem"}>
        <Button className={cx("button-green")} w={"18rem"}>
          {buttonText}
        </Button>

        {button && (
          <Button className={cx("button-white")} w={"18rem"}>
            Рассчитать стоимость
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
