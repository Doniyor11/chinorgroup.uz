import { Button, Flex, Text } from "@mantine/core"
import cx from "clsx"
import useTranslation from "next-translate/useTranslation"
import React from "react"

import { useModalStore } from "@/shared/store/modal-store.ts"

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
  title,
  subtitle,
  button = true,
  buttonText,
}) => {
  const { t } = useTranslation("common")
  const { openModal } = useModalStore()

  return (
    <Flex
      direction={"column"}
      gap={{ base: "1rem", sm: "1.25rem", md: "1.5rem" }}
      className={cx(s.formBanner, className)}
      justify={"center"}
      align={"center"}
    >
      <Text className={s.title}>{title || t("form_banner_title")}</Text>
      <Text className={s.subtitle}>
        {subtitle || t("form_banner_subtitle")}
      </Text>
      <Flex
        gap={{ base: "0.75rem", sm: "1rem", md: "1.5rem" }}
        direction={{ base: "column", sm: "row" }}
        w={{ base: "100%", sm: "auto" }}
      >
        <Button
          className={cx("button-green")}
          w={{ base: "100%", sm: "15rem", md: "18rem" }}
          onClick={() => openModal()}
        >
          {buttonText || t("form_banner_button")}
        </Button>

        {button && (
          <Button
            className={cx("button-white")}
            w={{ base: "100%", sm: "15rem", md: "18rem" }}
            onClick={() => openModal()}
          >
            {t("form_banner_calculate")}
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
