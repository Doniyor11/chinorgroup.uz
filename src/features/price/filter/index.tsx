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
import React from "react"

import IconDown from "@/shared/assets/images/icons/arrow-down.svg"
import IconHome from "@/shared/assets/images/icons/icon-home.svg"
import IconLocation from "@/shared/assets/images/icons/loction-small.svg"
import { mockBuildings } from "@/shared/data/mock-buildings.ts"
import { useBuildingFilters } from "@/shared/hooks/use-building-filters.ts"
import type { Building } from "@/shared/types/buildings.ts"

import s from "./index.module.scss"

export const FilterPrice = () => {
  const { t } = useTranslation("common")
  const { filteredBuildings } = useBuildingFilters(mockBuildings)
  return (
    <Box className={s.filterRoom}>
      <Flex gap={"3.5rem"} direction={"column"}>
        <FilterWithData />
        <Flex direction={"column"} gap={"1rem"}>
          <Text
            className={s.filterCardTitle}
            dangerouslySetInnerHTML={{
              __html: t("price_page_matching_apartments"),
            }}
          />
          <Text className={s.filterCardDescription}>
            {t("price_page_matching_description")}
          </Text>
        </Flex>
        <Box className={s.buildings}>
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
        </Box>
      </Flex>
    </Box>
  )
}

const FilterWithData = () => {
  const { t } = useTranslation("common")
  const { filters, updateFilter, filteredBuildings } =
    useBuildingFilters(mockBuildings)

  // Get unique building names for the project name filter
  const projectNames = React.useMemo(() => {
    const names = Array.from(new Set(mockBuildings.map((b) => b.name)))
    return names.map((name) => ({ value: name, label: name }))
  }, [])

  // Calculate approximate price based on filters
  const calculatedPrice = React.useMemo(() => {
    if (filteredBuildings.length === 0) return 0

    // Get all matching apartments from filtered buildings
    const matchingApartments = filteredBuildings.flatMap((building) =>
      building.apartments.filter((apt) => {
        const matchesRooms = filters.rooms ? apt.rooms === filters.rooms : true
        const matchesArea =
          apt.area >= filters.areaRange[0] && apt.area <= filters.areaRange[1]
        return apt.isAvailable && matchesRooms && matchesArea
      }),
    )

    if (matchingApartments.length === 0) return 0

    // Calculate average price
    const totalPrice = matchingApartments.reduce(
      (sum, apt) => sum + apt.price,
      0,
    )
    const avgPrice = totalPrice / matchingApartments.length

    // Return in millions
    return Math.round(avgPrice / 1000000)
  }, [filteredBuildings, filters.rooms, filters.areaRange])

  // Format price: if >= 1000 (4 digits), show in billions, otherwise in millions
  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(1)} ${t("filter_room_mlrd_sum")}`
    }
    return `${price} ${t("filter_room_mln_sum")}`
  }

  return (
    <>
      <Flex w={"100%"}>
        <Grid gutter={"1.5rem"} align={"stretch"}>
          <Grid.Col span={3}>
            <Flex
              align={"flex-start"}
              className={s.filterRoomLeft}
              direction={"column"}
              gap={"1.5rem"}
            >
              <Text
                className={s.filterHeadTitle}
                dangerouslySetInnerHTML={{
                  __html: t("price_page_calculator_title"),
                }}
              />
              <Text
                className={s.filterHeadDescription}
                dangerouslySetInnerHTML={{
                  __html: t("price_page_calculator_description"),
                }}
              />
            </Flex>
          </Grid.Col>
          <Grid.Col span={5}>
            <Flex
              direction={"column"}
              gap={"1rem"}
              className={s.filterRoomInner}
            >
              <Grid align={"flex-end"}>
                <Grid.Col span={6}>
                  <Flex direction={"column"} gap={"0.5rem"}>
                    <Text className={"input-label"}>
                      {t("buildings_filter_rooms")}
                    </Text>
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
                      value={filters.rooms?.toString() || ""}
                      onChange={(value) =>
                        updateFilter(
                          "rooms",
                          value ? parseInt(value) : undefined,
                        )
                      }
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Flex direction={"column"} gap={"0.5rem"}>
                    <Text className={s.filterLabel}>{t("buildings_area")}</Text>
                    <Flex className={"filterInput"}>
                      <Flex justify={"space-between"} w={"100%"}>
                        <Flex gap={"0.5rem"}>
                          <Text className={s.filterInputSpan} c={"#70707B"}>
                            {t("buildings_filter_from")}
                          </Text>
                          <Text className={s.filterInputSpan}>
                            {filters.areaRange[0]} м²
                          </Text>
                        </Flex>
                        <Flex gap={"0.5rem"}>
                          <Text className={s.filterInputSpan} c={"#70707B"}>
                            {t("buildings_filter_to")}
                          </Text>
                          <Text className={s.filterInputSpan}>
                            {filters.areaRange[1]} м²
                          </Text>
                        </Flex>
                      </Flex>
                      <RangeSlider
                        value={filters.areaRange}
                        onChange={(value) => updateFilter("areaRange", value)}
                        min={33}
                        max={150}
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
                </Grid.Col>
                <Grid.Col span={12}>
                  <Flex direction={"column"} gap={"0.5rem"}>
                    <Text className={"input-label"}>
                      {t("price_page_project_name")}
                    </Text>
                    <Select
                      placeholder={t("buildings_filter_select")}
                      className={"select"}
                      rightSection={<IconDown />}
                      data={[
                        { value: "", label: t("price_page_all_projects") },
                        ...projectNames,
                      ]}
                      value={filters.complex || ""}
                      onChange={(value) =>
                        updateFilter("complex", value || undefined)
                      }
                    />
                  </Flex>
                </Grid.Col>
              </Grid>

              {/*<Flex direction={"column"} gap={"0.5rem"}>*/}
              {/*  <Text mb={"0.25rem"} className={s.titleCheckbox}>*/}
              {/*    Дополнительные услуги*/}
              {/*  </Text>*/}
              {/*  <Checkbox*/}
              {/*    label={"Проектирование (+$50/м²)"}*/}
              {/*    className={s.filterCheckbox}*/}
              {/*  />*/}
              {/*  <Checkbox*/}
              {/*    label={"Инженерные системы (+$80/м²)"}*/}
              {/*    className={s.filterCheckbox}*/}
              {/*  />*/}
              {/*  <Checkbox*/}
              {/*    label={"Ландшафтный дизайн (+$40/м²)"}*/}
              {/*    className={s.filterCheckbox}*/}
              {/*  />*/}
              {/*  <Checkbox*/}
              {/*    label={"Отделочные работы (+$150/м²)"}*/}
              {/*    className={s.filterCheckbox}*/}
              {/*  />*/}
              {/*</Flex>*/}

              <Button className={"button-green"} mt={"0.5rem"} fullWidth>
                {t("price_page_calculate_button")}
              </Button>
            </Flex>
          </Grid.Col>
          <Grid.Col span={4}>
            <InfoBlock
              title={t("price_page_project_cost")}
              monthlyPayment={formatPrice(calculatedPrice)}
            />
          </Grid.Col>
        </Grid>
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

const InfoBlock = ({ monthlyPayment, className }: InfoBlockProps) => {
  const { t } = useTranslation("common")
  return (
    <>
      <Flex
        direction={"column"}
        justify={"space-between"}
        className={cx(s.filterInfo, className)}
      >
        <Flex direction={"column"} gap={"1.5rem"}>
          <Text
            className={s.filterInfoLabel}
            dangerouslySetInnerHTML={{
              __html: t("price_page_approximate_cost"),
            }}
          />
          <Text className={s.filterInfoNumber}>{monthlyPayment}</Text>
        </Flex>
        <Flex direction={"column"} gap={"0.37rem"}>
          <Text
            className={s.filterInfoNumber}
            fz={"0.875rem"}
            dangerouslySetInnerHTML={{
              __html: t("price_page_final_cost_note"),
            }}
          />
        </Flex>
      </Flex>
    </>
  )
}

interface BuildingCardProps {
  building: Building
}

const BuildingCard = ({ building }: BuildingCardProps) => {
  const { t, lang } = useTranslation("common")
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
            <Link href={`/buildings/${building.id}`}>
              {t("buildings_more_details")}
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  )
}
