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

import IconDown from "@/shared/assets/images/icons/arrow-down.svg"
import IconHome from "@/shared/assets/images/icons/icon-home.svg"
import IconLocation from "@/shared/assets/images/icons/loction-small.svg"
import IconX from "@/shared/assets/images/icons/x-icon.svg"
import { mockBuildings } from "@/shared/data/mock-buildings.ts"
import { useBuildingFilters } from "@/shared/hooks/use-building-filters.ts"
import type { Building, BuildingFilters } from "@/shared/types/buildings.ts"

import s from "./index.module.scss"

export const BuildingsProject = () => {
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
        gap={{ base: "1rem", sm: "1.5rem" }}
        mb={{ base: "1.5rem", sm: "2rem", md: "2.25rem" }}
      >
        <Text className={"title-section"} c={"#18181B"}>
          {t("buildings_title")}
        </Text>
      </Flex>

      <FilterBuildings
        filters={filters}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        t={t}
      />

      <Grid gutter={{ base: "1rem", sm: "1.5rem", md: "2rem" }}>
        {filteredBuildings.map((building) => (
          <Grid.Col key={building.id} span={{ base: 12, sm: 6, lg: 4 }}>
            <BuildingCard building={building} t={t} />
          </Grid.Col>
        ))}
      </Grid>
      {filteredBuildings.length === 0 && (
        <Text ta="center" c="#70707B" my={{ base: "1.5rem", sm: "2rem" }}>
          {t("buildings_not_found")}
        </Text>
      )}
      <Flex
        justify={"center"}
        mt={{ base: "2rem", sm: "2.5rem", md: "3.5rem" }}
      >
        <Button className={"button-black"} w={{ base: "100%", sm: "12.5rem" }}>
          {t("buildings_load_more")}
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
        align={{ base: "stretch", md: "flex-end" }}
        gap={{ base: "0.75rem", md: "0.75em" }}
        justify={"space-between"}
        mb={{ base: "0.75rem", md: "0.75rem" }}
        wrap={{ base: "wrap", md: "nowrap" }}
        direction={{ base: "column", md: "row" }}
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
        align={{ base: "stretch", md: "flex-start" }}
        gap={{ base: "0.75rem", md: "0.75em" }}
        justify={"space-between"}
        mb={{ base: "2rem", sm: "2.5rem", md: "3.5rem" }}
        wrap={{ base: "wrap", md: "nowrap" }}
        direction={{ base: "column", md: "row" }}
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
          <Flex gap={"0.5rem"} wrap={"wrap"}>
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
          justify={{ base: "flex-start", md: "flex-end" }}
          gap={"0.5rem"}
          wrap={"wrap"}
          h={"100%"}
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
              style={{ whiteSpace: "nowrap" }}
            >
              {t("buildings_filter_clear")}
            </Button>
          )}
          <Button className={"button-black"} w={{ base: "100%", sm: "auto" }}>
            {t("buildings_filter_find")}
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

interface BuildingCardProps {
  building: Building
  t: (key: string) => string
}

const BuildingCard = ({ building, t }: BuildingCardProps) => {
  const { lang } = useTranslation("common")

  // Проверяем, есть ли доступные квартиры (1, 2, 3 комнатные)
  const hasAvailableApartments = [1, 2, 3].some((rooms) => {
    return building.apartments.some(
      (apt) => apt.rooms === rooms && apt.isAvailable,
    )
  })

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
            {lang === "uz"
              ? `${Math.round(building.priceFrom / 1000000)} ${t(
                  "buildings_price_mln_from",
                )}`
              : `${t("buildings_price_from")} ${Math.round(
                  building.priceFrom / 1000000,
                )} ${t("buildings_price_mln")}`}
          </Text>
        </Flex>

        <Box className={cx(s.buildingsBoxContent)}>
          <Flex
            direction={"column"}
            gap={"0.75rem"}
            className={s.buildingsBoxInfo}
          >
            {hasAvailableApartments ? (
              <>
                <Text component={"h3"}>
                  {building.availableApartments}{" "}
                  {t("buildings_apartments_on_sale")}
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
                      <Text
                        component={"p"}
                        c={count > 0 ? "#009540" : "#70707B"}
                      >
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
              </>
            ) : (
              <Flex
                align={"center"}
                justify={"center"}
                style={{
                  minHeight: "150px",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <Text
                  fz={{ base: "1rem", sm: "1.125rem" }}
                  c={"#70707B"}
                  fw={500}
                >
                  {t("buildings_sold_out")}
                </Text>
              </Flex>
            )}
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
            <Link href={`/project/${building.id}`}>
              {t("buildings_more_details")}
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
