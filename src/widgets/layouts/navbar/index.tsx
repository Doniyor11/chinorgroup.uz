import { Box, Burger, Button, Drawer, Flex, Select, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import cx from "clsx";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";



import { MenuData } from "@/widgets/layouts/navbar/libs.ts";



import Logo from "@/shared/assets/images/icon-logo.svg";
import IconDown from "@/shared/assets/images/icons/arrow-down.svg";
import FlagUz from "@/shared/assets/images/icons/icon-lang.svg";



import s from "./styles.module.scss";


export const Navbar = () => {
  const matches = useMediaQuery("(max-width: 576px)")
  const { lang } = useTranslation("common")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [active, setActive] = useState<string>("")
  const [isLang, setIsLang] = useState("ru")
  const scrollTo = (id: string) => {
    const block = document.querySelector(`#${id}`)!
    if (block) {
      block.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setActive(id)
    setIsOpen(false)
  }


  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "ru"
    if (storedLang !== lang) {
      setLanguage(storedLang)
    }

    setIsLang(storedLang)
  }, [lang])

  return (
    <>
      <Box className={cx(s.navbarWrapper, "container")}>
        <Box className={s.navbarWrapperLogo}>
          <Logo />
        </Box>

        <Flex className={s.navbarLeft}>
          <ul className={s.menu}>
            {MenuData?.map((item, index) => (
              <li
                key={index}
                className={cx(s.link, { [s.active]: item?.path_id === active })}
                onClick={() => scrollTo(item?.path_id)}
              >
                {item?.text}
              </li>
            ))}
          </ul>
          <Select
            className={s.lang}
            defaultValue={"Uz"}
            data={["ru", "uz", "en"]}
            allowDeselect={false}
            leftSection={<FlagUz />}
            rightSection={<IconDown />}
            value={isLang}
            onChange={(e: any) => {
              setLanguage(e)
              setIsLang(e)
              localStorage.setItem("lang", e)
            }}
          />
          <Button onClick={() => scrollTo("contacts")} className={s.submitBtn}>
            Оставить заявку
          </Button>
          {matches && (
            <Burger opened={isOpen} onClick={() => setIsOpen(true)} />
          )}
        </Flex>
      </Box>
      <Drawer
        size={"80%"}
        padding={12}
        opened={isOpen}
        position={"right"}
        onClose={() => setIsOpen(false)}
        title={
          <>
            <Select
              className={s.lang}
              defaultValue={"Uz"}
              data={["Ru", "Uz"]}
              allowDeselect={false}
              leftSection={<FlagUz />}
              rightSection={<IconDown />}
            />
          </>
        }
      >
        {MenuData?.map((item, index) => (
          <Text
            key={index}
            className={s.menuLink}
            onClick={() => scrollTo(item?.path_id)}
          >
            {item?.text}
          </Text>
        ))}
        <Button onClick={() => scrollTo("contacts")} className={s.submitBtn}>
          Оставить заявку
        </Button>
      </Drawer>
    </>
  )
}
