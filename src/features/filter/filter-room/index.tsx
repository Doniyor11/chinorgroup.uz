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
import { mockBuildings } from "@/shared/data/mock-buildings"
import { useRoomFilters } from "@/shared/hooks/use-room-filters"

import s from "./index.module.scss"

export const FilterRoom = () => {
  return (
    <Box className={s.filterRoom}>
      <Flex align={"center"} className={s.filterRoomTop}>
        <Box w={{ base: "100%", lg: "50%" }}>
          <Text className={"title-section"} c={"#18181B"}>
            Квартиры в <br /> рассрочку
          </Text>
        </Box>
        <Box w={{ base: "100%", lg: "50%" }}>
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
      </Flex>
    </Box>
  )
}

const TabsCustom = () => {
  const [activeTab, setActiveTab] = useState("1")

  return (
    <>
      <Tabs
        variant="pills"
        value={activeTab}
        onChange={(value) => setActiveTab(value || "1")}
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
          <FilterWithData rooms={1} />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <FilterWithData rooms={2} />
        </Tabs.Panel>

        <Tabs.Panel value="3">
          <FilterWithData rooms={3} />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

interface FilterWithDataProps {
  rooms: number
}

const FilterWithData = ({ rooms }: FilterWithDataProps) => {
  const { filters, updateFilter, installmentPlans } =
    useRoomFilters(mockBuildings)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])
  const [downPaymentPercent, setDownPaymentPercent] = useState<
    [number, number]
  >([0, 100])

  React.useEffect(() => {
    updateFilter("rooms", rooms)
  }, [rooms, updateFilter])

  React.useEffect(() => {
    updateFilter("price", priceRange[1])
  }, [priceRange, updateFilter])

  React.useEffect(() => {
    updateFilter("initialPaymentPercent", downPaymentPercent[1])
  }, [downPaymentPercent, updateFilter])

  const complexes = React.useMemo(() => {
    const uniqueComplexes = new Set(
      mockBuildings
        .filter((b) => b.apartments.some((a) => a.rooms === rooms))
        .map((b) => b.name),
    )
    return Array.from(uniqueComplexes).map((name) => ({
      value: name,
      label: name,
    }))
  }, [rooms])

  const downPaymentAmount = (priceRange[1] * downPaymentPercent[1]) / 100

  return (
    <>
      <Flex
        gap={{ base: "1rem", sm: "1.5rem", md: "2rem", lg: "3.5rem" }}
        w={"100%"}
        direction={{ base: "column", lg: "row" }}
      >
        <Flex direction={"column"} gap={"1rem"} className={s.filterRoomInner}>
          <Flex direction={"column"} gap={"0.5rem"}>
            <Text className={"input-label"}>Жилой комплекс</Text>
            <Select
              placeholder={"Выберите"}
              className={"select"}
              rightSection={<IconDown />}
              data={complexes}
              value={filters.complex}
              onChange={(value) => updateFilter("complex", value || undefined)}
            />
          </Flex>
          <Flex direction={"column"} gap={"0.5rem"}>
            <Text className={s.filterLabel}>Стоимость квартиры</Text>
            <Flex className={"filterInput"}>
              <Flex justify={"space-between"} w={"100%"}>
                <Text className={s.filterInputSpan}>
                  {priceRange[1]} млн сум
                </Text>
              </Flex>
              <RangeSlider
                value={priceRange}
                onChange={setPriceRange}
                min={0}
                max={500}
                color="green"
                thumbSize={14}
                label={null}
                className={"rangeSlider"}
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
            <Flex className={"filterInput"}>
              <Flex justify={"space-between"} w={"100%"}>
                <Text className={s.filterInputSpan}>
                  {downPaymentAmount.toFixed(0)} млн сум
                </Text>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  {downPaymentPercent[1]} %
                </Text>
              </Flex>
              <RangeSlider
                value={downPaymentPercent}
                onChange={setDownPaymentPercent}
                min={0}
                max={100}
                color="green"
                thumbSize={14}
                label={null}
                className={"rangeSlider"}
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

        <InfoBlock
          title="Стандартная рассрочка"
          monthlyPayment={installmentPlans.standard.months.toString()}
          number={installmentPlans.standard.monthlyPayment.toLocaleString(
            "ru-RU",
          )}
        />
        <InfoBlock
          title="Подходящая рассрочка"
          monthlyPayment={installmentPlans.flexible.months.toString()}
          number={installmentPlans.flexible.monthlyPayment.toLocaleString(
            "ru-RU",
          )}
          className={s.bgGreen}
        />
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
