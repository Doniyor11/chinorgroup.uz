import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  RangeSlider,
  Select,
  Text,
} from "@mantine/core"
import cx from "clsx"
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
  const { filteredBuildings } = useBuildingFilters(mockBuildings)
  return (
    <Box className={s.filterRoom}>
      <Flex gap={"3.5rem"} direction={"column"}>
        <FilterWithData />
        <Flex direction={"column"} gap={"1rem"}>
          <Text className={s.filterCardTitle}>Подходящие квартиры</Text>
          <Text className={s.filterCardDescription}>
            Вот коллекция интересных статей, которые вы, возможно, еще не
            видели. Не упустите важную информацию и последние тенденции, которые
            могут расширить ваши знания.
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
              <Box>
                <Text className={s.filterHeadTitle}>
                  Калькулятор <br /> стоимости
                </Text>
              </Box>
              <Box>
                <Text className={s.filterHeadDescription}>
                  Рассчитайте примерную <br /> стоимость вашего проекта
                </Text>
              </Box>
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
                    <Text className={"input-label"}>Тип работ</Text>
                    <Select
                      placeholder={"Выберите"}
                      className={"select"}
                      rightSection={<IconDown />}
                    />
                  </Flex>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Flex direction={"column"} gap={"0.5rem"}>
                    <Text className={s.filterLabel}>Тип материалов</Text>
                    <Flex className={"filterInput"}>
                      <Flex gap={"0.5rem"} w={"100%"}>
                        <Text className={s.filterInputSpan} c={"#70707B"}>
                          Площадь до
                        </Text>
                        <Text className={s.filterInputSpan}>120 м²</Text>
                      </Flex>
                      <RangeSlider
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
                </Grid.Col>
                <Grid.Col span={12}>
                  <Flex direction={"column"} gap={"0.5rem"}>
                    <Text className={"input-label"}>Тип работ</Text>
                    <Select
                      placeholder={"Выберите"}
                      className={"select"}
                      rightSection={<IconDown />}
                    />
                  </Flex>
                </Grid.Col>
              </Grid>

              <Flex direction={"column"} gap={"0.5rem"}>
                <Text mb={"0.25rem"} className={s.titleCheckbox}>
                  Дополнительные услуги
                </Text>
                <Checkbox
                  label={"Проектирование (+$50/м²)"}
                  className={s.filterCheckbox}
                />
                <Checkbox
                  label={"Инженерные системы (+$80/м²)"}
                  className={s.filterCheckbox}
                />
                <Checkbox
                  label={"Ландшафтный дизайн (+$40/м²)"}
                  className={s.filterCheckbox}
                />
                <Checkbox
                  label={"Отделочные работы (+$150/м²)"}
                  className={s.filterCheckbox}
                />
              </Flex>

              <Button className={"button-green"} mt={"0.5rem"} fullWidth>
                Рассчитать стоимость
              </Button>
            </Flex>
          </Grid.Col>
          <Grid.Col span={4}>
            <InfoBlock title="Подходящая рассрочка" monthlyPayment={"349"} />
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
  return (
    <>
      <Flex
        direction={"column"}
        justify={"space-between"}
        className={cx(s.filterInfo, className)}
      >
        <Flex direction={"column"} gap={"1.5rem"}>
          <Text className={s.filterInfoLabel}>
            Примерная стоимость <br /> проекта:
          </Text>
          <Text className={s.filterInfoNumber}>{monthlyPayment} млн сум</Text>
        </Flex>
        <Flex direction={"column"} gap={"0.37rem"}>
          <Text className={s.filterInfoNumber} fz={"0.875rem"}>
            * Окончательная стоимость <br /> определяется после осмот
          </Text>
        </Flex>
      </Flex>
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
