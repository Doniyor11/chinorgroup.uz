import { Box, Burger, Button, Drawer, Flex, Select, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import cx from "clsx"
import setLanguage from "next-translate/setLanguage"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { MenuData } from "@/widgets/layouts/navbar/libs.ts"

import Logo from "@/shared/assets/images/icon-logo.svg"
import IconDown from "@/shared/assets/images/icons/arrow-down.svg"
import FlagUz from "@/shared/assets/images/icons/icon-lang.svg"

import s from "./styles.module.scss"

export const Navbar = () => {
  const matches = useMediaQuery("(max-width: 576px)")
  const { lang } = useTranslation("common")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [active, setActive] = useState<string>("")
  const [isLang, setIsLang] = useState("ru")
  const router = useRouter()

  const handleNavClick = (path: string) => {
    // Исправление: добавляем локаль и используем locale опцию
    router.push(`/${path}`, undefined, { locale: lang })
    setActive(path)
    setIsOpen(false)
  }

  // Устанавливаем активный пункт меню на основе текущего пути
  useEffect(() => {
    const currentPath = router.pathname.split("/")[1] || ""
    setActive(currentPath)
  }, [router.pathname])

  useEffect(() => {
    // Убираем localStorage для языка - используем только next-translate
    setIsLang(lang)
  }, [lang])

  return (
    <>
      <Box className={cx(s.navbarWrapper, "container")}>
        <Box className={s.navbarWrapperLogo}>
          <Logo />
        </Box>
        <ul className={s.menu}>
          {MenuData?.map((item) => (
            <li
              key={item.path}
              className={cx(s.link, { [s.active]: item?.path === active })}
              onClick={() => handleNavClick(item?.path)}
            >
              {item?.text}
            </li>
          ))}
        </ul>
        <Flex className={s.navbarLeft}>
          <Select
            className={s.lang}
            defaultValue={"ru"}
            data={["ru", "uz", "en"]}
            allowDeselect={false}
            leftSection={<FlagUz />}
            rightSection={<IconDown />}
            value={isLang}
            classNames={{
              input: s.inputSelect,
            }}
            onChange={(e: any) => {
              setLanguage(e)
              setIsLang(e)
              localStorage.setItem("lang", e)
            }}
          />
          <Button
            onClick={() => handleNavClick("contacts")}
            className={"button-black"}
          >
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
              defaultValue={isLang}
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
          </>
        }
      >
        {MenuData?.map((item) => (
          <Text
            key={item.path}
            className={cx(s.menuLink, { [s.active]: item?.path === active })}
            onClick={() => handleNavClick(item?.path)}
          >
            {item?.text}
          </Text>
        ))}
        <Button className={"button-black"} w={"12.5rem"}>
          Оставить заявку
        </Button>
      </Drawer>
    </>
  )
}
