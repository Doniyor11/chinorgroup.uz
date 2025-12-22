import {
  Box,
  Button,
  Flex,
  RangeSlider,
  Select,
  Slider,
  Tabs,
  Text,
} from "@mantine/core"
import cx from "clsx"
import useTranslation from "next-translate/useTranslation"
import React, { useState } from "react"

import IconDown from "@/shared/assets/images/icons/arrow-down.svg"
import { mockBuildings } from "@/shared/data/mock-buildings"
import { useRoomFilters } from "@/shared/hooks/use-room-filters"

import s from "./index.module.scss"

export const FilterRoom = () => {
  const { t } = useTranslation("common")

  return (
    <Box className={s.filterRoom} style={{ pointerEvents: "auto" }}>
      <Flex align={"center"} className={s.filterRoomTop}>
        <Box w={{ base: "100%", lg: "50%" }}>
          <Text
            className={"title-section"}
            c={"#18181B"}
            dangerouslySetInnerHTML={{ __html: t("filter_room_title") }}
          />
        </Box>
        <Box w={{ base: "100%", lg: "50%" }}>
          <Text className={s.filterHeadDescription}>
            {t("filter_room_description")}
          </Text>
        </Box>
      </Flex>
      <Box style={{ pointerEvents: "auto" }} w={"100%"}>
        <TabsCustom />
      </Box>
    </Box>
  )
}

const TabsCustom = () => {
  const { t } = useTranslation("common")
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
          <Tabs.Tab value="1">{t("filter_room_tab_1")}</Tabs.Tab>
          <Tabs.Tab value="2">{t("filter_room_tab_2")}</Tabs.Tab>
          <Tabs.Tab value="3">{t("filter_room_tab_3")}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1">
          <FilterWithData rooms={1} key="1" />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <FilterWithData rooms={2} key="2" />
        </Tabs.Panel>

        <Tabs.Panel value="3">
          <FilterWithData rooms={3} key="3" />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

interface FilterWithDataProps {
  rooms: number
}

const FilterWithData = React.memo(({ rooms }: FilterWithDataProps) => {
  const { t } = useTranslation("common")
  const { filters, updateFilter } = useRoomFilters(mockBuildings)

  // Определяем диапазоны цен в зависимости от количества комнат (в миллионах)
  const getPriceRange = (roomCount: number): [number, number] => {
    switch (roomCount) {
      case 1:
        return [430, 816] // 430-816 млн
      case 2:
        return [754, 1139] // 754-1139 млн
      case 3:
        return [1001, 1530] // 1001-1530 млн
      default:
        return [430, 816]
    }
  }

  const roomPriceRange = React.useMemo(() => getPriceRange(rooms), [rooms])
  const [priceRange, setPriceRange] = useState<[number, number]>([
    roomPriceRange[0],
    roomPriceRange[0],
  ])
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25) // Минимум 25%

  React.useEffect(() => {
    updateFilter("rooms", rooms)
  }, [rooms, updateFilter])

  React.useEffect(() => {
    // Сбрасываем диапазон цен при смене комнат
    setPriceRange([roomPriceRange[0], roomPriceRange[0]])
  }, [roomPriceRange])

  React.useEffect(() => {
    updateFilter("price", priceRange[1])
  }, [priceRange, updateFilter])

  React.useEffect(() => {
    updateFilter("initialPaymentPercent", downPaymentPercent)
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

  const downPaymentAmount = (priceRange[1] * downPaymentPercent) / 100

  // Форматирование цены: если >= 1000 млн, показываем в млрд
  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      const formattedPrice = (price / 1000).toFixed(3).replace(".", ",")
      return `${formattedPrice} ${t("filter_room_milliard_sum")}`
    }
    const formattedPrice = price.toString().replace(".", ",")
    return `${formattedPrice} ${t("filter_room_million_sum")}`
  }

  // Форматирование первоначального взноса
  const formatDownPayment = (amount: number): string => {
    if (amount >= 1000) {
      const formattedAmount = (amount / 1000).toFixed(3).replace(".", ",")
      return `${formattedAmount} ${t("filter_room_milliard_sum")}`
    }
    const formattedAmount = amount.toFixed(0).replace(".", ",")
    return `${formattedAmount} ${t("filter_room_million_sum")}`
  }

  // Проверка на отсутствие квартир для Chinor и Bobur TJM
  const isChinorOrBobur =
    filters.complex === "«Chinor» TJM" || filters.complex === "'Bobur' TJM"
  const hasNoApartments =
    isChinorOrBobur &&
    mockBuildings
      .find((b) => b.name === filters.complex)
      ?.apartments.filter((a) => a.rooms === rooms && a.isAvailable).length ===
      0

  return (
    <>
      <Flex
        gap={{ base: "1rem", sm: "1.5rem", md: "2rem", lg: "3.5rem" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Flex direction={"column"} gap={"1rem"} className={s.filterRoomInner}>
          <Flex direction={"column"} gap={"0.5rem"}>
            <Text className={"input-label"}>{t("filter_room_complex")}</Text>
            <Select
              placeholder={t("filter_room_select")}
              className={"select"}
              rightSection={<IconDown />}
              data={complexes}
              value={filters.complex}
              onChange={(value) => updateFilter("complex", value || undefined)}
            />
          </Flex>
          <Flex direction={"column"} gap={"0.5rem"}>
            <Text className={s.filterLabel}>
              {t("filter_room_apartment_price")}
            </Text>
            <Flex className={"filterInput"}>
              <Flex justify={"space-between"} w={"100%"}>
                <Text className={s.filterInputSpan}>
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </Text>
              </Flex>
              <RangeSlider
                value={priceRange}
                onChange={setPriceRange}
                min={roomPriceRange[0]}
                max={roomPriceRange[1]}
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
            <Text className={s.filterLabel}>
              {t("filter_room_down_payment")}
            </Text>
            <Flex className={"filterInput"}>
              <Flex justify={"space-between"} w={"100%"}>
                <Text className={s.filterInputSpan}>
                  {formatDownPayment(downPaymentAmount)}
                </Text>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  {downPaymentPercent} %
                </Text>
              </Flex>
              <Slider
                value={downPaymentPercent}
                onChange={setDownPaymentPercent}
                min={25}
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
            {t("filter_room_consultation")}
          </Button>
        </Flex>

        {hasNoApartments ? (
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            className={cx(s.filterInfo, s.filterRoomInner)}
            style={{ gridColumn: "span 2" }}
          >
            <Text
              className={s.filterInfoTitle}
              fz={{ base: "1.5rem", md: "2rem" }}
              ta={"center"}
            >
              {t("filter_room_no_apartments")} 😊
            </Text>
          </Flex>
        ) : (
          <>
            <FlexibleInstallmentBlock
              title={t("filter_room_standard_installment")}
            />
            <SuitableInstallmentBlock
              title={t("filter_room_flexible_installment")}
              totalPrice={priceRange[1]}
              className={s.bgGreen}
            />
          </>
        )}
      </Flex>
    </>
  )
})

// Гибкая рассрочка (Flexible Installment)
interface FlexibleInstallmentBlockProps {
  title?: string
  className?: string
}

const FlexibleInstallmentBlock = ({
  title = "Гибкая рассрочка",
  className,
}: FlexibleInstallmentBlockProps) => {
  const { t } = useTranslation("common")

  return (
    <>
      <Flex
        direction={"column"}
        justify={"space-between"}
        className={cx(s.filterInfo, s.filterRoomInner, className)}
      >
        <Text className={s.filterInfoTitle}>{title}</Text>
        <Flex direction={"column"} gap={"0.5rem"}>
          <Text className={s.filterInfoLabel}>
            {t("filter_room_payment_structure")}
          </Text>
          <Flex direction={"column"} gap={"0.25rem"}>
            <Text className={s.filterInfoNumber} fz={"0.875rem"}>
              • {t("filter_room_initial_payment_30")}
            </Text>
            <Text className={s.filterInfoNumber} fz={"0.875rem"}>
              • {t("filter_room_monthly_payment_40")}
            </Text>
            <Text className={s.filterInfoNumber} fz={"0.875rem"}>
              • {t("filter_room_cadastral_payment_30")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

// Подходящая рассрочка (Suitable Installment)
interface SuitableInstallmentBlockProps {
  title?: string
  totalPrice: number // in millions
  className?: string
}

const SuitableInstallmentBlock = ({
  title = "Подходящая рассрочка",
  totalPrice,
  className,
}: SuitableInstallmentBlockProps) => {
  const { t } = useTranslation("common")

  // Расчет оставшихся месяцев (автоматически уменьшается каждый месяц)
  const calculateRemainingMonths = (): number => {
    const STORAGE_KEY = "installment_start_date"
    const totalMonths = 28
    const currentDate = new Date()
    const currentYearMonth = `${currentDate.getFullYear()}-${currentDate.getMonth()}`

    // Получаем сохраненную дату начала из localStorage
    const storedStartDate =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null

    // Если даты нет, сохраняем текущую дату как начальную
    if (!storedStartDate && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, currentYearMonth)
      return totalMonths
    }

    // Парсим сохраненную дату
    if (storedStartDate) {
      const [startYear, startMonth] = storedStartDate.split("-").map(Number)

      // Вычисляем количество прошедших месяцев
      const monthsPassed =
        (currentDate.getFullYear() - startYear) * 12 +
        (currentDate.getMonth() - startMonth)

      // Оставшиеся месяцы
      const remainingMonths = totalMonths - monthsPassed

      // Минимум 1 месяц
      return Math.max(1, remainingMonths)
    }

    return totalMonths
  }

  const months = calculateRemainingMonths()
  const fortyPercentAmount = totalPrice * 0.4 // totalPrice уже в миллионах
  const monthlyPayment = fortyPercentAmount / months

  // Форматирование с учетом миллионов/миллиардов
  const formatPayment = (amount: number): string => {
    if (amount >= 1000) {
      const formattedAmount = (amount / 1000).toFixed(3).replace(".", ",")
      return `${formattedAmount} ${t("filter_room_milliard_sum")}`
    }
    const formattedAmount = amount.toFixed(1).replace(".", ",")
    return `${formattedAmount} ${t("filter_room_million_sum")}`
  }

  return (
    <>
      <Flex
        direction={"column"}
        justify={"space-between"}
        className={cx(s.filterInfo, s.filterRoomInner, className)}
      >
        <Text className={s.filterInfoTitle}>{title}</Text>
        <Flex direction={"column"} gap={"0.75rem"}>
          <Text className={s.filterInfoLabel}>
            {t("filter_room_installment_term")}
          </Text>
          <Text className={s.filterInfoNumber}>
            {months} {t("filter_room_months")}
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"0.37rem"}>
          <Flex direction={"column"} gap={"0.75rem"}>
            <Text className={s.filterInfoLabel}>
              {t("filter_room_monthly_payment")}
            </Text>
            <Text className={s.filterInfoNumber}>
              {formatPayment(monthlyPayment)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
