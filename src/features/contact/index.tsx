import Image1 from "@//shared/assets/images/about2.png"
import { Box, Flex, Text } from "@mantine/core"
import Image from "next/image"
import React from "react"

import s from "./index.module.scss"

export const ContactContainer = () => {
  return (
    <>
      <Box className={s.mapContainer}>
        <Flex direction={"column"} className={s.mapItem}>
          <Box className={s.headerContent}>
            <Box className={s.mapImage}>
              <Image
                src={Image1}
                alt={"Contact Header"}
                width={60}
                height={60}
              />
            </Box>
            <Box>
              <Text c={"#18181B"} fz={"1.5rem"} fw={"500"}>
                Коттеджы “Riverside”
              </Text>
              <Flex gap={"0.25rem"}>
                <Text c={"#18181B"} fz={"1.125rem"} fw={"500"}>
                  Офис:
                </Text>
                <Text c={"#70707B"} fz={"1.125rem"} fw={"400"}>
                  789 Эльм-Стрит Спрингфирд
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
        <iframe
          title="contact-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.4692634869262!2d30.31823277620179!3d59.93428098192371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696312f5f6c6b7b%3A0x8e8b4e4f4e4f4e4f!2z0JrQuNC10L3QuNC1INGB0LjRgdGC0LLQvtCz0L4g0L7QsdC70LjRhtC90YvQuSDQutC-0YHRgtC-
            9!5e0!3m2!1sru!2sru!4v1701304541234!5m2!1sru!2sru"
          width="100%"
          height="44rem"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </>
  )
}
