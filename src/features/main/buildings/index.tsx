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
import useTranslation from "next-translate/useTranslation"
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
  const { t } = useTranslation("common")
  const {
    filters,
    filteredBuildings,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  } = useBuildingFilters(mockBuildings)

  return (
    <Box className={s.buildings}>
      <Flex
        align={"center"}
        gap={"1.5rem"}
        mb={"2.25rem"}
        className={s.buildingsHeader}
      >
        <Text className={"title-section"} c={"#18181B"}>
          {t("buildings_title")}
        </Text>
        <Select
          className={s.buildingsSelect}
          data={[
            {
              value: t("buildings_city_tashkent"),
              label: t("buildings_city_in_tashkent"),
            },
            {
              value: t("buildings_city_samarkand"),
              label: t("buildings_city_in_samarkand"),
            },
          ]}
          value={filters.city || t("buildings_city_tashkent")}
          defaultValue={t("buildings_city_tashkent")}
          onChange={(value) => updateFilter("city", value || undefined)}
          rightSection={<IconArrow />}
        />
      </Flex>

      <FilterBuildings
        filters={filters}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        t={t}
      />

      <Grid>
        {filteredBuildings.map((building) => (
          <Grid.Col key={building.id} span={{ base: 12, sm: 6, md: 4 }}>
            <BuildingCard building={building} t={t} />
          </Grid.Col>
        ))}
      </Grid>
      {filteredBuildings.length === 0 && (
        <Text ta="center" c="#70707B" my="2rem">
          {t("buildings_not_found")}
        </Text>
      )}
      <Flex justify={"center"} mt={"3.5rem"}>
        <Button className={"button-black"} w={"12.5rem"}>
          {t("buildings_more_button")}
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
  t: (key: string) => string
}

const FilterBuildings = ({
  filters,
  updateFilter,
  clearFilters,
  hasActiveFilters,
  t,
}: FilterBuildingsProps) => {
  const [selectedYear, setSelectedYear] = useState<string | undefined>()

  const complexes = React.useMemo(() => {
    const uniqueComplexes = new Set(mockBuildings.map((b) => b.name))
    return [
      { value: "", label: t("buildings_filter_all") },
      ...Array.from(uniqueComplexes).map((name) => ({
        value: name,
        label: name,
      })),
    ]
  }, [t])

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
        className={s.filterRow}
      >
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={"input-label"}>{t("buildings_filter_complex")}</Text>
          <Select
            placeholder={t("buildings_filter_select")}
            className={"select"}
            rightSection={<IconDown />}
            data={complexes}
            value={filters.complex}
            onChange={(value) => updateFilter("complex", value || undefined)}
          />
        </Flex>
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={"input-label"}>{t("buildings_filter_rooms")}</Text>
          <Select
            placeholder={t("buildings_filter_select")}
            className={"select"}
            rightSection={<IconDown />}
            data={[
              { value: "", label: t("buildings_filter_all") },
              { value: "1", label: t("buildings_filter_rooms_1") },
              { value: "2", label: t("buildings_filter_rooms_2") },
              { value: "3", label: t("buildings_filter_rooms_3") },
            ]}
            value={filters.rooms?.toString()}
            onChange={(value) =>
              updateFilter("rooms", value ? parseInt(value) : undefined)
            }
          />
        </Flex>
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={s.filterLabel}>{t("buildings_filter_price")}</Text>
          <Flex className={"filterInput"}>
            <Flex justify={"space-between"} w={"100%"}>
              <Flex justify={"space-between"} gap={"0.75rem"}>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  {t("buildings_filter_from")}
                </Text>
                <Text className={s.filterInputSpan}>
                  {filters.priceRange[0]} {t("buildings_price_mln")}
                </Text>
              </Flex>
              <Flex justify={"space-between"} gap={"0.75rem"}>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  {t("buildings_filter_to")}
                </Text>
                <Text className={s.filterInputSpan}>
                  {filters.priceRange[1]} {t("buildings_price_mln")}
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
        className={s.filterRow}
      >
        <Flex direction={"column"} gap={"0.5rem"} className={s.buildingsItem}>
          <Text className={s.filterLabel}>{t("buildings_filter_area")}</Text>
          <Flex className={"filterInput"}>
            <Flex justify={"space-between"} w={"100%"}>
              <Flex justify={"space-between"} gap={"0.75rem"}>
                <Text className={s.filterInputSpan} c={"#70707B"}>
                  {t("buildings_filter_area_up_to")}
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
          <Text className={"input-label"}>
            {t("buildings_filter_completion")}
          </Text>
          <Flex gap={"0.5rem"}>
            {[
              { key: t("buildings_year_completed"), value: "Сдан" },
              { key: "2025", value: "2025" },
              { key: "2026", value: "2026" },
              { key: "2027", value: "2027" },
              { key: "2028+", value: "2028+" },
            ].map((year) => (
              <Text
                key={year.value}
                component={"span"}
                className={cx(s.buildingsYear, {
                  [s.active]: selectedYear === year.value,
                })}
                onClick={() => handleYearClick(year.value)}
                style={{ cursor: "pointer" }}
              >
                {year.key}
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
              {t("buildings_filter_clear")}
            </Button>
          )}
          <Button className={"button-black"}>
            {t("buildings_filter_find")}
          </Button>
        </Flex>
      </Flex>
      {/*  */}
    </>
  )
}

interface BuildingCardProps {
  building: Building
  t: (key: string) => string
}

const BuildingCard = ({ building, t }: BuildingCardProps) => {
  return (
    <>
      <Box className={s.buildingsBox}>
        <Box className={s.buildingsBoxImage}>
          <Flex className={s.buildingsTags} gap={"0.5rem"}>
            {building.tags?.map((tag) => (
              <Text key={tag} component={"span"}>
                {tag === t("buildings_tag_last_apartment") && <IconHome />}
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
            {t("buildings_price_from")}{" "}
            {Math.round(building.priceFrom / 1000000)} {t("buildings_price_mln")}
          </Text>
        </Flex>

        <Box className={cx(s.buildingsBoxContent)}>
          <Flex
            direction={"column"}
            gap={"0.75rem"}
            className={s.buildingsBoxInfo}
          >
            <Text component={"h3"}>
              {building.availableApartments} {t("buildings_apartments_on_sale")}
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
                  ? `${Math.round(minPrice / 1000000)} ${t(
                      "buildings_price_mln_short",
                    )}`
                  : `${Math.round(minPrice / 1000000)}-${Math.round(
                      maxPrice / 1000000,
                    )} ${t("buildings_price_mln_short")}`

              return (
                <Flex key={rooms} justify={"space-between"}>
                  <Text component={"p"} c={count > 0 ? "#009540" : "#70707B"}>
                    {rooms}-{t("buildings_room_count")}
                  </Text>
                  <Text component={"p"} c={"#70707B"}>
                    {count > 0
                      ? `${count} ${t("buildings_pieces")}`
                      : t("buildings_none")}
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
              {t("buildings_completion_date")}{" "}
              {new Date(building.completionDate).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Text>
            <Link href={`/main/${building.id}`}>
              {t("buildings_more_details")}
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
