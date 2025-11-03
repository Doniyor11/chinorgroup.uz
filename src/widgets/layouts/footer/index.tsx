import { Box, Flex, Text } from "@mantine/core"
import Link from "next/link"

import ImageLogo from "@/shared/assets/images/icon-logo-footer.svg"
import IconTop from "@/shared/assets/images/icons/back-to-top.svg"

import s from "./styles.module.scss"

export const Footer = () => {
  const getCurrentYear = (): number => new Date().getFullYear()

  return (
    <div className={s.footerWrapper}>
      <Box className={"container"}>
        <Box className={s.footerTop}>
          <Flex gap={"2rem"} direction={"column"}>
            <Text className={s.leftTitle}>
              Современные строительные решения <br /> для вашего бизнеса и дома.
            </Text>
            <Flex gap={"1.5rem"}>
              <Flex direction={"column"} gap={"0.75rem"}>
                <Text className={s.footerLeftLabel}>Почта</Text>
                <Link
                  className={s.footerText}
                  href={"mailto:info@chinorgroup.uz"}
                >
                  info@chinorgroup.uz
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"0.75rem"}>
                <Text className={s.footerLeftLabel}>Номер телефона</Text>
                <Link className={s.footerText} href={"tel:+998 90 999 99 99"}>
                  +998 90 999 99 99
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"0.75rem"}>
                <Text className={s.footerLeftLabel}>Адрес</Text>
                <Text className={s.footerText}>г. Ташкент, Узбекистан</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box>
            <Flex gap={"5rem"}>
              <Flex direction={"column"} gap={"1rem"}>
                <Text className={s.menuTitle}>Навигация</Text>
                <Link className={s.footerText} href={""}>
                  О компании
                </Link>
                <Link className={s.footerText} href={""}>
                  Портфолио
                </Link>
                <Link className={s.footerText} href={""}>
                  Блог
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                <Text className={s.menuTitle}>Услуги</Text>
                <Link className={s.footerText} href={""}>
                  Жилое <br /> строительство
                </Link>
                <Link className={s.footerText} href={""}>
                  Коммерческое <br /> строительство
                </Link>
                <Link className={s.footerText} href={""}>
                  Ремонт и <br /> реконструкция
                </Link>
                <Link className={s.footerText} href={""}>
                  Проектирование
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                <Text className={s.menuTitle}>Follow Us</Text>
                <Link className={s.footerText} href={""}>
                  Facebook
                </Link>
                <Link className={s.footerText} href={""}>
                  Instagram
                </Link>
                <Link className={s.footerText} href={""}>
                  Telegram
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Flex
          justify={"space-between"}
          align={"center"}
          pt={"1rem"}
          pb={"1rem"}
        >
          <Flex align={"center"}>
            <ImageLogo />
          </Flex>
          <Text className={s.bottomText}>
            © {getCurrentYear()} All Rights Reserved
          </Text>
          <Flex
            gap={"0.5rem"}
            className={s.bottomText}
            c={"#FCFCFC"}
            align={"center"}
          >
            Back to top <IconTop />
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}
