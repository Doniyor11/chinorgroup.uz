import {
  Box,
  Button,
  Flex,
  RangeSlider,
  Select,
  Tabs,
  Text,
} from "@mantine/core"
import cx from "clsx"
import React, { useState } from "react"

import IconDown from "@/shared/assets/images/icons/arrow-down.svg"

import s from "./index.module.scss"

export const FilterRoom = () => {
  return (
    <Box className={s.filterRoom}>
      <Flex align={'center'} className={s.filterRoomTop}>
        <Box w={"50%"}>
          <Text className={'title-section'} c={'#18181B'}>Квартиры в <br/> рассрочку</Text>
        </Box>
        <Box w={"50%"}>
          <Text className={s.filterHeadDescription}>
            Мы стремимся сделать ваш опыт в сфере недвижимости плавным, выгодным
            и без стресса. Наша команда преданных своему делу профессионалов,
            обладающая многолетним опытом, поможет вам уверенно ориентироваться
            на рынке недвижимости.
          </Text>
        </Box>
      </Flex>
      <Flex gap={"3.5rem"}>
        <TabsCustom />
        <InfoBlock />
        <InfoBlock
          title={"Подходящая рассрочка"}
          monthlyPayment={"48"}
          number={"15 549 000"}
          className={s.bgGreen}
        />
      </Flex>
    </Box>
  )
}

const TabsCustom = () => {
  return (
    <>
      <Tabs
        variant="pills"
        defaultValue="1"
        classNames={{
          list: s.list,
          tab: s.tab,
          panel: s.panel,
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="1">1 комнатные</Tabs.Tab>
          <Tabs.Tab value="2">2 комнатные</Tabs.Tab>
          <Tabs.Tab value="3">3 комнатные</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1">
          <Filter />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <Filter />
        </Tabs.Panel>

        <Tabs.Panel value="3">
          <Filter />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

const Filter = () => {
  const [value, setValue] = useState<[number, number]>([0, 120])

  return (
    <>
      <Flex direction={"column"} gap={"1rem"} className={s.filterRoomInner}>
        <Flex direction={"column"} gap={"0.5rem"}>
          <Text className={'input-label'}>Жилой комплекс</Text>
          <Select
            placeholder={"Выберите"}
            className={'select'}
            rightSection={<IconDown />}
          />
        </Flex>
        <Flex direction={"column"} gap={"0.5rem"}>
          <Text className={s.filterLabel}>Стоимость квартиры</Text>
          <Flex className={'filterInput'}>
            <Flex justify={"space-between"} w={"100%"}>
              <Text className={s.filterInputSpan}>{value[0]} млн сум</Text>
            </Flex>
            <RangeSlider
              value={value}
              onChange={setValue}
              min={0}
              max={300}
              color="green"
              thumbSize={14}
              label={null}
              className={'rangeSlider'}
              classNames={{
                track: s.track,
              }}
              styles={{
                track: {
                  height: 2,
                  backgroundColor: "#fff",
                },
                bar: {
                  backgroundColor: "green",
                },
                thumb: {
                  border: "2px solid green",
                  backgroundColor: "#fff",
                },
              }}
            />
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={"0.5rem"}>
          <Text className={s.filterLabel}>Первоначальный взнос</Text>
          <Flex className={'filterInput'}>
            <Flex justify={"space-between"} w={"100%"}>
              <Text className={s.filterInputSpan}>{value[0]} млн сум</Text>
              <Text className={s.filterInputSpan} c={"#70707B"}>
                {value[1]} %
              </Text>
            </Flex>
            <RangeSlider
              value={value}
              onChange={setValue}
              min={0}
              max={300}
              color="green"
              thumbSize={14}
              label={null}
              className={'rangeSlider'}
              classNames={{
                track: s.track,
              }}
              styles={{
                track: {
                  height: 2,
                  backgroundColor: "#fff",
                },
                bar: {
                  backgroundColor: "green",
                },
                thumb: {
                  border: "2px solid green",
                  backgroundColor: "#fff",
                },
              }}
            />
          </Flex>
        </Flex>
        <Button className={"button-green"} mt={"0.5rem"} fullWidth>
          Получить консультацию
        </Button>
      </Flex>
    </>
  )
}

interface InfoBlockProps {
  title?: string
  number?: string
  monthlyPayment?: string
  className?: string
}

const InfoBlock = ({
  title = "Стандартная рассрочка",
  monthlyPayment = "60",
  number = "12 549 000",
  className,
}: InfoBlockProps) => {
  return (
    <>
      <Flex
        direction={"column"}
        justify={"space-between"}
        className={cx(s.filterInfo, s.filterRoomInner, className)}
      >
        <Text className={s.filterInfoTitle}>{title}</Text>
        <Flex direction={"column"} gap={"0.75rem"}>
          <Text className={s.filterInfoLabel}>Срок рассрочки</Text>
          <Text className={s.filterInfoNumber}>{monthlyPayment} месяцев</Text>
        </Flex>
        <Flex direction={"column"} gap={"0.37rem"}>
          <Flex direction={"column"} gap={"0.75rem"}>
            <Text className={s.filterInfoLabel}>Ежемесячный платеж</Text>
            <Text className={s.filterInfoNumber}>{number} сум</Text>
          </Flex>
          <Text className={s.filterInfoNumber} c={"#51525C"} fz={"0.875rem"}>
            весь период рассрочки
          </Text>
        </Flex>
      </Flex>
    </>
  )
}
