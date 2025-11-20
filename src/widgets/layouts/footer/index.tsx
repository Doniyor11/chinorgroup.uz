import { Anchor, Box, Flex, Text } from "@mantine/core"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"

import ImageLogo from "@/shared/assets/images/icon-logo-footer.svg"
import IconTop from "@/shared/assets/images/icons/back-to-top.svg"

import s from "./styles.module.scss"

export const Footer = () => {
  const { t } = useTranslation("common")
  const getCurrentYear = (): number => new Date().getFullYear()

  return (
    <div className={s.footerWrapper}>
      <Box className={"container"}>
        <Box className={s.footerTop}>
          <Flex gap={"2rem"} direction={"column"}>
            <Text className={s.leftTitle}>{t("footer_title")}</Text>
            <Flex
              gap={{ base: "1rem", md: "1.5rem" }}
              direction={{ base: "column", sm: "row" }}
              wrap="wrap"
            >
              <Flex direction={"column"} gap={"0.75rem"}>
                <Text className={s.footerLeftLabel}>{t("contact_email")}</Text>
                <Link
                  className={s.footerText}
                  href={"mailto:info@chinorgroup.uz"}
                >
                  info@chinorgroup.uz
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"0.75rem"}>
                <Text className={s.footerLeftLabel}>{t("contact_phone")}</Text>
                <Link className={s.footerText} href={"tel:+998(99)813-00-07"}>
                  +998(99)813-00-07
                </Link>
                <Link className={s.footerText} href={"tel:+998(99)943-00-07"}>
                  +998(99)943-00-07
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"0.75rem"}>
                <Text className={s.footerLeftLabel}>
                  {t("contact_address")}
                </Text>
                <Text className={s.footerText}>
                  {t("contact_address_full")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box>
            <Flex gap={{ base: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }}>
              <Flex direction={"column"} gap={"1rem"}>
                <Text className={s.menuTitle}>{t("nav_navigation")}</Text>
                <Link className={s.footerText} href={""}>
                  {t("footer_nav_about")}
                </Link>
                <Link className={s.footerText} href={""}>
                  {t("footer_nav_portfolio")}
                </Link>
                <Link className={s.footerText} href={""}>
                  {t("nav_blog")}
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                <Text className={s.menuTitle}>
                  {t("footer_services_title")}
                </Text>
                <Link className={s.footerText} href={""}>
                  {t("footer_services_residential")}
                </Link>
                <Link className={s.footerText} href={""}>
                  {t("footer_services_commercial")}
                </Link>
                <Link className={s.footerText} href={""}>
                  {t("footer_services_renovation")}
                </Link>
                <Link className={s.footerText} href={""}>
                  {t("footer_services_design")}
                </Link>
              </Flex>
              <Flex direction={"column"} gap={"1rem"}>
                <Text className={s.menuTitle}>{t("footer_follow_us")}</Text>
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
          justify={{ base: "center", md: "space-between" }}
          align={"center"}
          pt={{ base: "1.5rem", md: "1rem" }}
          pb={{ base: "1.5rem", md: "1rem" }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: "1rem", md: "0" }}
        >
          <Flex align={"center"}>
            <ImageLogo />
          </Flex>
          <Text className={s.bottomText} ta={{ base: "center", md: "left" }}>
            © {getCurrentYear()} {t("footer_rights")}
          </Text>
          <Flex>
            <Flex
              gap={"0.5rem"}
              className={s.bottomText}
              c={"#FCFCFC"}
              align={"center"}
              style={{ cursor: "pointer" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {t("footer_back_to_top")} <IconTop />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify={"flex-start"}
          align={"center"}
          pt={{ base: "1.5rem", md: "1rem" }}
          pb={{ base: "1.5rem", md: "1rem" }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: "1rem", md: "0" }}
        >
          <Flex gap={"0.5rem"} align={"center"} style={{ cursor: "pointer" }}>
            <Text c={"#fff"}>Powered by</Text>
            <Anchor href="https://t.me/qalamarketing" target="_blank">
              Qalam Agency
            </Anchor>
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}
