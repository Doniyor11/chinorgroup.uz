import {
  Box,
  Button,
  Flex,
  Grid,
  RangeSlider,
  Select,
  Text,
} from "@mantine/core"
import cx from "clsx"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

import IconArrow from "@/shared/assets/images/icons/arrow-down-yellow.svg"
import IconDown from "@/shared/assets/images/icons/arrow-down.svg"
import IconHome from "@/shared/assets/images/icons/icon-home.svg"
import IconLocation from "@/shared/assets/images/icons/loction-small.svg"
import IconX from "@/shared/assets/images/icons/x-icon.svg"
import { mockBuildings } from "@/shared/data/mock-buildings.ts"
import { useBuildingFilters } from "@/shared/hooks/use-building-filters.ts"
import type { Building, BuildingFilters } from "@/shared/types/buildings.ts"

import s from "./index.module.scss"

export const Buildings = () => {
  const {
    filters,
    filteredBuildings,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  } = useBuildingFilters(mockBuildings)

  return (
    <Box className={s.buildings}>
      <Flex align={"center"} gap={"1.5rem"} mb={"2.25rem"}>
        <Text className={"title-section"} c={"#18181B"}>
          Новостройки
        </Text>
        <Select
          className={s.buildingsSelect}
          data={[
            { value: "Ташкент", label: "в Ташкенте" },
            { value: "Самарканд", label: "в Самарканде" },
          ]}
          value={filters.city || "Ташкент"}
          defaultValue="Ташкент"
          onChange={(value) => updateFilter("city", value || undefined)}
          rightSection={<IconArrow />}
        />
      </Flex>

      <FilterBuildings
        filters={filters}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <Grid>
        {filteredBuildings.map((building) => (
          <Grid.Col key={building.id} span={4}>
            <BuildingCard building={building} />
          </Grid.Col>
        ))}
      </Grid>
      {filteredBuildings.length === 0 && (
        <Text ta="center" c="#70707B" my="2rem">
          Квартиры не найдены. Попробуйте изменить параметры фильтра.
        </Text>
      )}
      <Flex justify={"center"} mt={"3.5rem"}>
        <Button className={"button-black"} w={"12.5rem"}>
          Подробнее
        </Button>
      </Flex>
    </Box>
  )
}

interface FilterBuildingsProps {
  filters: BuildingFilters
  updateFilter: <K extends keyof BuildingFilters>(
    key: K,
    value: BuildingFilters[K],
  ) => void
  clearFilters: () => void
  hasActiveFilters: boolean
}

const FilterBuildings = ({
  filters,
  updateFilter,
  clearFilters,
  hasActiveFilters,
}: FilterBuildingsProps) => {
  const [selectedYear, setSelectedYear] = useState<string | undefined>()

  const complexes = React.useMemo(() => {
    const uniqueComplexes = new Set(mockBuildings.map((b) => b.name))
    return [
      { value: "", label: "Все" },
      ...Array.from(uniqueComplexes).map((name) => ({
        value: name,
        label: name,
      })),
    ]
  }, [])

  const handleYearClick = (year: string) => {
    setSelectedYear(year)
    updateFilter("completionYear", year)
  }

  return (
    <>
      {/* Filter top  */}
      <Flex
        align={"flex-end"}
        gap={"0.75em"}
        justify={"space-between"}
        mb={"0.75rem"}
      >
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
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
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={"input-label"}>Количество комнат</Text>
          <Select
            placeholder={"Выберите"}
            className={"select"}
            rightSection={<IconDown />}
            data={[
              { value: "", label: "Все" },
              { value: "1", label: "1 комната" },
              { value: "2", label: "2 комнаты" },
              { value: "3", label: "3 комнаты" },
            ]}
            value={filters.rooms?.toString()}
            onChange={(value) =>
              updateFilter("rooms", value ? parseInt(value) : undefined)
            }
          />
        </Flex>
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={s.filterLabel}>Задайте стоимость</Text>
          <Flex className={"filterInput"}>
            <Flex justify={"space-between"} w={"100%"}>
              <Flex justify={"space-between"} gap={"0.75rem"}>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  от
                </Text>
                <Text className={s.filterInputSpan}>
                  {filters.priceRange[0]} млн сум
                </Text>
              </Flex>
              <Flex justify={"space-between"} gap={"0.75rem"}>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  до
                </Text>
                <Text className={s.filterInputSpan}>
                  {filters.priceRange[1]} млн сум
                </Text>
              </Flex>
            </Flex>
            <RangeSlider
              value={filters.priceRange}
              onChange={(value) => updateFilter("priceRange", value)}
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
      </Flex>
      {/* Filter bottom  */}
      <Flex
        align={"flex-end"}
        gap={"0.75em"}
        justify={"space-between"}
        mb={"3.5rem"}
      >
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={s.filterLabel}>Задайте площадь</Text>
          <Flex className={"filterInput"}>
            <Flex justify={"space-between"} w={"100%"}>
              <Flex justify={"space-between"} gap={"0.75rem"}>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  Площадь до
                </Text>
                <Text className={s.filterInputSpan}>
                  {filters.areaRange[1]} м²
                </Text>
              </Flex>
            </Flex>
            <RangeSlider
              value={filters.areaRange}
              onChange={(value) => updateFilter("areaRange", value)}
              min={0}
              max={200}
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
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={"input-label"}>Дата сдачи</Text>
          <Flex gap={"0.5rem"}>
            {["Сдан", "2025", "2026", "2027", "2028+"].map((year) => (
              <Text
                key={year}
                component={"span"}
                className={cx(s.buildingsYear, {
                  [s.active]: selectedYear === year,
                })}
                onClick={() => handleYearClick(year)}
                style={{ cursor: "pointer" }}
              >
                {year}
              </Text>
            ))}
          </Flex>
        </Flex>
        <Flex
          className={s.buildingsItem}
          align={"center"}
          justify={"flex-end"}
          gap={"0.5rem"}
        >
          {hasActiveFilters && (
            <Button
              bg={"transparent"}
              c={"#18181B"}
              rightSection={<IconX />}
              onClick={() => {
                clearFilters()
                setSelectedYear(undefined)
              }}
            >
              Очистить фильтр
            </Button>
          )}
          <Button className={"button-black"}>Найти</Button>
        </Flex>
      </Flex>
      {/*  */}
    </>
  )
}

interface BuildingCardProps {
  building: Building
}

const BuildingCard = ({ building }: BuildingCardProps) => {
  return (
    <>
      <Box className={s.buildingsBox}>
        <Box className={s.buildingsBoxImage}>
          <Flex className={s.buildingsTags} gap={"0.5rem"}>
            {building.tags?.map((tag) => (
              <Text key={tag} component={"span"}>
                {tag === "Последняя квартира" && <IconHome />}
                {tag}
              </Text>
            ))}
          </Flex>
          <Image
            src={building.image}
            alt={building.name}
            width={400}
            height={300}
          />
        </Box>

        {/*  */}
        <Flex
          className={s.buildingsBoxBody}
          align={"center"}
          justify={"space-between"}
        >
          <Flex direction={"column"} gap={"0.25rem"}>
            <Text className={s.buildingsBoxTitle}>{building.name}</Text>
            <Text className={s.buildingsBoxDescription}>
              {" "}
              <IconLocation /> {building.location}
            </Text>
          </Flex>
          <Text className={s.buildingsBoxPrice}>
            от {Math.round(building.priceFrom / 1000000)} млн сум
          </Text>
        </Flex>

        <Box className={cx(s.buildingsBoxContent)}>
          <Flex
            direction={"column"}
            gap={"0.75rem"}
            className={s.buildingsBoxInfo}
          >
            <Text component={"h3"}>
              {building.availableApartments} квартир в продаже
            </Text>
            {[1, 2, 3].map((rooms) => {
              const count = building.apartments.filter(
                (apt) => apt.rooms === rooms && apt.isAvailable,
              ).length
              const minPrice = Math.min(
                ...building.apartments
                  .filter((apt) => apt.rooms === rooms && apt.isAvailable)
                  .map((apt) => apt.price),
              )
              const maxPrice = Math.max(
                ...building.apartments
                  .filter((apt) => apt.rooms === rooms && apt.isAvailable)
                  .map((apt) => apt.price),
              )
              const priceText =
                minPrice === Infinity
                  ? "-"
                  : minPrice === maxPrice
                  ? `${Math.round(minPrice / 1000000)} млн`
                  : `${Math.round(minPrice / 1000000)}-${Math.round(
                      maxPrice / 1000000,
                    )} млн`

              return (
                <Flex key={rooms} justify={"space-between"}>
                  <Text component={"p"} c={count > 0 ? "#009540" : "#70707B"}>
                    {rooms}-комн
                  </Text>
                  <Text component={"p"} c={"#70707B"}>
                    {count > 0 ? `${count} шт` : "нет"}
                  </Text>
                  <Text component={"p"} c={"#26272B"}>
                    {priceText}
                  </Text>
                </Flex>
              )
            })}
          </Flex>
          <Flex
            justify={"space-between"}
            className={s.buildingsBoxFooter}
            align={"center"}
          >
            <Text component={"p"} c={"#70707B"}>
              Дата сдачи до{" "}
              {new Date(building.completionDate).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Text>
            <Link href={`/buildings/${building.id}`}>Подробнее</Link>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
