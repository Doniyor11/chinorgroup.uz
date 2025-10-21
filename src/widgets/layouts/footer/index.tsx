import { Anchor, Text } from "@mantine/core"

import { MenuData } from "@/widgets/layouts/navbar/libs.ts"

import IconPhone from "@/shared/assets/images/icons/icon-lang.svg"
import ImageLogo from "@/shared/assets/images/icon-logo-footer.svg"

import s from "./styles.module.scss"

export const Footer = () => {
  return (
    <div className={s.footerWrapper}>
      <div className={s.footerTop}>
        <div className={s.box}>
          <ImageLogo/>
          <Text className={s.text}>Часы работы 24/7</Text>
        </div>
        <div className={s.box}>
          <Text className={s.boxTitle}>Меню</Text>

          {MenuData?.map((item, index) => (
            <Text className={s.link} key={index}>
              {item.text}
            </Text>
          ))}
        </div>
        <div className={s.box}>
          <Text className={s.boxTitle}>Медия</Text>

          <Anchor href={"#"} className={s.link}>
            Телеграмм ссылка
          </Anchor>
          <Anchor href={"#"} className={s.link}>
            Ватсап
          </Anchor>
          <Anchor href={"#"} className={s.link}>
            Инстаграм
          </Anchor>
          <Anchor href={"#"} className={s.link}>
            Фэйсбук
          </Anchor>
        </div>
        <div className={s.box}>
          <Text className={s.boxTitle}>
            Свяжитесь с нами <br />
            по телефону
          </Text>

          <Anchor href={"tel:+998957808887"} className={s.link}>
            <IconPhone /> +998 (95) 780-88-87
          </Anchor>
          <Anchor href={"tel:+998957808887"} className={s.link}>
            <IconPhone /> +998 (95) 780-88-87
          </Anchor>
          <Anchor href={"tel:+998957808887"} className={s.link}>
            <IconPhone /> +998 (95) 780-88-87
          </Anchor>
          <Anchor href={"tel:+998901141001"} className={s.link}>
            <IconPhone /> +998 (90) 114-10-01
          </Anchor>
        </div>
      </div>
      <Text className={s.bottomText}>Copyright © Aqua Flow 2025</Text>
    </div>
  )
}
