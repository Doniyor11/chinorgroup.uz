import { Box, Flex, Grid, Select, Text } from "@mantine/core"
import cx from "clsx"
import useTranslation from "next-translate/useTranslation"
import Image, { type StaticImageData } from "next/image"
import React, { useMemo, useState } from "react"

import IconDown from "@/shared/assets/images/icons/arrow-down.svg"
import ImageRoom3 from "@/shared/assets/rooms-plan/3xona.png"

import s from "./styles.module.scss"

interface Specification {
  name: string
  sqm: string
  dimensions: string
}

interface ApartmentData {
  id: string
  title: string
  blockName: string
  rooms: number
  planImage?: StaticImageData
  specifications: Specification[]
  totalArea: string
}

// Фейковые данные для разных блоков и типов квартир
const apartmentsData: ApartmentData[] = [
  // Блок A - 1 комнатные
  {
    id: "a-1-1",
    title: "1 xonali xonadon",
    blockName: "Blok-A",
    rooms: 1,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "4.50m²", dimensions: "2.50m x 1.80m" },
      { name: "Yotoqxona", sqm: "12.00m²", dimensions: "4.00m x 3.00m" },
      { name: "Hammom", sqm: "3.20m²", dimensions: "1.80m x 1.80m" },
      { name: "Oshxona", sqm: "8.50m²", dimensions: "3.00m x 2.80m" },
      { name: "Mehmonxona", sqm: "16.50m²", dimensions: "5.50m x 3.00m" },
      { name: "Ayvan", sqm: "3.80m²", dimensions: "2.50m x 1.50m" },
    ],
    totalArea: "48.50m²",
  },
  {
    id: "a-1-2",
    title: "1 xonali xonadon",
    blockName: "Blok-A",
    rooms: 1,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "5.00m²", dimensions: "2.50m x 2.00m" },
      { name: "Yotoqxona", sqm: "13.50m²", dimensions: "4.50m x 3.00m" },
      { name: "Hammom", sqm: "3.60m²", dimensions: "2.00m x 1.80m" },
      { name: "Oshxona", sqm: "9.00m²", dimensions: "3.00m x 3.00m" },
      { name: "Mehmonxona", sqm: "18.00m²", dimensions: "6.00m x 3.00m" },
      { name: "Ayvan", sqm: "4.20m²", dimensions: "2.80m x 1.50m" },
    ],
    totalArea: "53.30m²",
  },
  // Блок A - 2 комнатные
  {
    id: "a-2-1",
    title: "2 xonali xonadon",
    blockName: "Blok-A",
    rooms: 2,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "5.60m²", dimensions: "3.00m x 1.80m" },
      { name: "Yotoqxona (1)", sqm: "10.00m²", dimensions: "4.00m x 2.50m" },
      { name: "Yotoqxona (2)", sqm: "12.00m²", dimensions: "4.00m x 3.00m" },
      { name: "Hammom", sqm: "3.20m²", dimensions: "1.80m x 1.80m" },
      { name: "Oshxona", sqm: "9.50m²", dimensions: "3.50m x 2.70m" },
      { name: "Mehmonxona", sqm: "18.95m²", dimensions: "5.50m x 3.40m" },
      { name: "Hojotxona", sqm: "2.97m²", dimensions: "1.80m x 1.65m" },
      { name: "Ayvan", sqm: "5.00m²", dimensions: "3.00m x 1.65m" },
    ],
    totalArea: "67.22m²",
  },
  {
    id: "a-2-2",
    title: "2 xonali xonadon",
    blockName: "Blok-A",
    rooms: 2,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "6.00m²", dimensions: "3.00m x 2.00m" },
      { name: "Yotoqxona (1)", sqm: "11.20m²", dimensions: "4.00m x 2.80m" },
      { name: "Yotoqxona (2)", sqm: "13.50m²", dimensions: "4.50m x 3.00m" },
      { name: "Hammom", sqm: "4.00m²", dimensions: "2.00m x 2.00m" },
      { name: "Oshxona", sqm: "10.50m²", dimensions: "3.50m x 3.00m" },
      { name: "Mehmonxona", sqm: "20.00m²", dimensions: "5.00m x 4.00m" },
      { name: "Hojotxona", sqm: "3.20m²", dimensions: "2.00m x 1.60m" },
      { name: "Ayvan", sqm: "5.40m²", dimensions: "3.00m x 1.80m" },
    ],
    totalArea: "73.80m²",
  },
  {
    id: "a-2-1",
    title: "2 xonali xonadon",
    blockName: "Blok-A",
    rooms: 2,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "5.60m²", dimensions: "3.00m x 1.80m" },
      { name: "Yotoqxona (1)", sqm: "10.00m²", dimensions: "4.00m x 2.50m" },
      { name: "Yotoqxona (2)", sqm: "12.00m²", dimensions: "4.00m x 3.00m" },
      { name: "Hammom", sqm: "3.20m²", dimensions: "1.80m x 1.80m" },
      { name: "Oshxona", sqm: "9.50m²", dimensions: "3.50m x 2.70m" },
      { name: "Mehmonxona", sqm: "18.95m²", dimensions: "5.50m x 3.40m" },
      { name: "Hojotxona", sqm: "2.97m²", dimensions: "1.80m x 1.65m" },
      { name: "Ayvan", sqm: "5.00m²", dimensions: "3.00m x 1.65m" },
    ],
    totalArea: "67.22m²",
  },
  {
    id: "a-2-2",
    title: "2 xonali xonadon",
    blockName: "Blok-A",
    rooms: 2,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "6.00m²", dimensions: "3.00m x 2.00m" },
      { name: "Yotoqxona (1)", sqm: "11.20m²", dimensions: "4.00m x 2.80m" },
      { name: "Yotoqxona (2)", sqm: "13.50m²", dimensions: "4.50m x 3.00m" },
      { name: "Hammom", sqm: "4.00m²", dimensions: "2.00m x 2.00m" },
      { name: "Oshxona", sqm: "10.50m²", dimensions: "3.50m x 3.00m" },
      { name: "Mehmonxona", sqm: "20.00m²", dimensions: "5.00m x 4.00m" },
      { name: "Hojotxona", sqm: "3.20m²", dimensions: "2.00m x 1.60m" },
      { name: "Ayvan", sqm: "5.40m²", dimensions: "3.00m x 1.80m" },
    ],
    totalArea: "73.80m²",
  },
  // Блок A - 3 комнатные
  {
    id: "a-3-1",
    title: "3 xonali xonadon",
    blockName: "Blok-A",
    rooms: 3,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "7.60m²", dimensions: "3.00m x 2.50m" },
      { name: "Yotoqxona (1)", sqm: "12.00m²", dimensions: "4.00m x 3.00m" },
      { name: "Yotoqxona (2)", sqm: "13.00m²", dimensions: "4.50m x 2.90m" },
      { name: "Yotoqxona (3)", sqm: "11.50m²", dimensions: "4.00m x 2.90m" },
      { name: "Hammom", sqm: "4.20m²", dimensions: "2.00m x 2.10m" },
      { name: "Oshxona", sqm: "10.50m²", dimensions: "3.50m x 3.00m" },
      { name: "Mehmonxona", sqm: "22.95m²", dimensions: "6.00m x 3.80m" },
      { name: "Hojotxona", sqm: "3.50m²", dimensions: "2.00m x 1.75m" },
      { name: "Ayvan", sqm: "6.00m²", dimensions: "3.00m x 2.00m" },
    ],
    totalArea: "91.25m²",
  },
  // Блок B - 1 комнатные
  {
    id: "b-1-1",
    title: "1 xonali xonadon",
    blockName: "Blok-B",
    rooms: 1,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "4.80m²", dimensions: "2.40m x 2.00m" },
      { name: "Yotoqxona", sqm: "13.00m²", dimensions: "4.00m x 3.25m" },
      { name: "Hammom", sqm: "3.40m²", dimensions: "1.70m x 2.00m" },
      { name: "Oshxona", sqm: "8.75m²", dimensions: "3.50m x 2.50m" },
      { name: "Mehmonxona", sqm: "17.50m²", dimensions: "5.00m x 3.50m" },
      { name: "Ayvan", sqm: "4.00m²", dimensions: "2.50m x 1.60m" },
    ],
    totalArea: "51.45m²",
  },
  // Блок B - 2 комнатные
  {
    id: "b-2-1",
    title: "2 xonali xonadon",
    blockName: "Blok-B",
    rooms: 2,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "6.20m²", dimensions: "3.10m x 2.00m" },
      { name: "Yotoqxona (1)", sqm: "11.50m²", dimensions: "4.00m x 2.90m" },
      { name: "Yotoqxona (2)", sqm: "13.20m²", dimensions: "4.40m x 3.00m" },
      { name: "Hammom", sqm: "3.80m²", dimensions: "1.90m x 2.00m" },
      { name: "Oshxona", sqm: "10.00m²", dimensions: "4.00m x 2.50m" },
      { name: "Mehmonxona", sqm: "19.50m²", dimensions: "6.00m x 3.25m" },
      { name: "Hojotxona", sqm: "3.10m²", dimensions: "1.55m x 2.00m" },
      { name: "Ayvan", sqm: "5.20m²", dimensions: "2.60m x 2.00m" },
    ],
    totalArea: "72.50m²",
  },
  // Блок B - 3 комнатные
  {
    id: "b-3-1",
    title: "3 xonali xonadon",
    blockName: "Blok-B",
    rooms: 3,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "7.60m²", dimensions: "3.00m x 2.50m" },
      { name: "Yotoqxona (1)", sqm: "12.00m²", dimensions: "3.00m x 4.00m" },
      { name: "Yotoqxona (2)", sqm: "14.00m²", dimensions: "4.00m x 3.50m" },
      { name: "Yotoqxona (3)", sqm: "12.50m²", dimensions: "3.50m x 3.50m" },
      { name: "Hammom", sqm: "4.20m²", dimensions: "2.00m x 2.10m" },
      { name: "Oshxona", sqm: "11.50m²", dimensions: "4.00m x 2.90m" },
      { name: "Mehmonxona", sqm: "20.95m²", dimensions: "5.50m x 3.80m" },
      { name: "Hojotxona", sqm: "3.70m²", dimensions: "1.85m x 2.00m" },
      { name: "Ayvan", sqm: "6.50m²", dimensions: "3.25m x 2.00m" },
    ],
    totalArea: "92.95m²",
  },
  // Блок C - 1 комнатные
  {
    id: "c-1-1",
    title: "1 xonali xonadon",
    blockName: "Blok-C",
    rooms: 1,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "5.20m²", dimensions: "2.60m x 2.00m" },
      { name: "Yotoqxona", sqm: "14.00m²", dimensions: "4.00m x 3.50m" },
      { name: "Hammom", sqm: "3.80m²", dimensions: "1.90m x 2.00m" },
      { name: "Oshxona", sqm: "9.50m²", dimensions: "3.80m x 2.50m" },
      { name: "Mehmonxona", sqm: "19.00m²", dimensions: "5.00m x 3.80m" },
      { name: "Ayvan", sqm: "4.50m²", dimensions: "3.00m x 1.50m" },
    ],
    totalArea: "56.00m²",
  },
  // Блок C - 2 комнатные
  {
    id: "c-2-1",
    title: "2 xonali xonadon",
    blockName: "Blok-C",
    rooms: 2,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "6.50m²", dimensions: "3.25m x 2.00m" },
      { name: "Yotoqxona (1)", sqm: "12.50m²", dimensions: "5.00m x 2.50m" },
      { name: "Yotoqxona (2)", sqm: "14.00m²", dimensions: "4.00m x 3.50m" },
      { name: "Hammom", sqm: "4.20m²", dimensions: "2.10m x 2.00m" },
      { name: "Oshxona", sqm: "11.00m²", dimensions: "4.00m x 2.75m" },
      { name: "Mehmonxona", sqm: "21.00m²", dimensions: "6.00m x 3.50m" },
      { name: "Hojotxona", sqm: "3.50m²", dimensions: "1.75m x 2.00m" },
      { name: "Ayvan", sqm: "6.00m²", dimensions: "3.00m x 2.00m" },
    ],
    totalArea: "78.70m²",
  },
  // Блок C - 3 комнатные
  {
    id: "c-3-1",
    title: "3 xonali xonadon",
    blockName: "Blok-C",
    rooms: 3,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "8.00m²", dimensions: "3.20m x 2.50m" },
      { name: "Yotoqxona (1)", sqm: "13.50m²", dimensions: "4.50m x 3.00m" },
      { name: "Yotoqxona (2)", sqm: "15.00m²", dimensions: "5.00m x 3.00m" },
      { name: "Yotoqxona (3)", sqm: "13.00m²", dimensions: "4.00m x 3.25m" },
      { name: "Hammom", sqm: "4.50m²", dimensions: "2.25m x 2.00m" },
      { name: "Oshxona", sqm: "12.00m²", dimensions: "4.00m x 3.00m" },
      { name: "Mehmonxona", sqm: "24.00m²", dimensions: "6.00m x 4.00m" },
      { name: "Hojotxona", sqm: "4.00m²", dimensions: "2.00m x 2.00m" },
      { name: "Ayvan", sqm: "7.00m²", dimensions: "3.50m x 2.00m" },
    ],
    totalArea: "101.00m²",
  },
  {
    id: "c-3-1",
    title: "3 xonali xonadon",
    blockName: "Blok-C",
    rooms: 3,
    planImage: ImageRoom3,
    specifications: [
      { name: "Kich Xonasi", sqm: "8.00m²", dimensions: "3.20m x 2.50m" },
      { name: "Yotoqxona (1)", sqm: "13.50m²", dimensions: "4.50m x 3.00m" },
      { name: "Yotoqxona (2)", sqm: "15.00m²", dimensions: "5.00m x 3.00m" },
      { name: "Yotoqxona (3)", sqm: "13.00m²", dimensions: "4.00m x 3.25m" },
      { name: "Hammom", sqm: "4.50m²", dimensions: "2.25m x 2.00m" },
      { name: "Oshxona", sqm: "12.00m²", dimensions: "4.00m x 3.00m" },
      { name: "Mehmonxona", sqm: "24.00m²", dimensions: "6.00m x 4.00m" },
      { name: "Hojotxona", sqm: "4.00m²", dimensions: "2.00m x 2.00m" },
      { name: "Ayvan", sqm: "7.00m²", dimensions: "3.50m x 2.00m" },
    ],
    totalArea: "101.00m²",
  },
]

export const BuildingsInner = () => {
  const { t } = useTranslation("common")
  const [selectedBlock, setSelectedBlock] = useState<string>("block-a")
  const [selectedRooms, setSelectedRooms] = useState<number>(1)

  const dataBlocks = useMemo(
    () => [
      { value: "block-a", label: "A-blok" },
      { value: "block-b", label: "B-blok" },
      { value: "block-c", label: "C-blok" },
    ],
    [],
  )

  const tabsData = useMemo(
    () => [
      { value: 1, label: t("buildings_inner_tab_1") },
      { value: 2, label: t("buildings_inner_tab_2") },
      { value: 3, label: t("buildings_inner_tab_3") },
    ],
    [t],
  )

  const filteredApartments = useMemo(() => {
    const blockName = selectedBlock.replace("block-", "Blok-").toUpperCase()
    return apartmentsData.filter(
      (apt) =>
        apt.blockName.toLowerCase() === blockName.toLowerCase() &&
        apt.rooms === selectedRooms,
    )
  }, [selectedBlock, selectedRooms])

  return (
    <>
      <Box className={s.filterBox}>
        <Flex gap={"1rem"} align={"flex-end"}>
          <Box w={"50%"}>
            <Flex direction={"column"} gap={"0.5rem"}>
              <Text className={"input-label"}>
                {t("buildings_inner_select_block")}
              </Text>
              <Select
                placeholder={t("buildings_inner_select_block_placeholder")}
                className={"select"}
                rightSection={<IconDown />}
                data={dataBlocks}
                value={selectedBlock}
                onChange={(value) => setSelectedBlock(value || "block-a")}
              />
            </Flex>
          </Box>
          <Box w={"50%"}>
            <Flex w={"100%"} className={s.tab}>
              {tabsData.map((tab) => (
                <Text
                  component={"span"}
                  key={tab.value}
                  className={cx(
                    s.tabSpan,
                    selectedRooms === tab.value ? s.activeTab : "",
                  )}
                  onClick={() => setSelectedRooms(tab.value)}
                  style={{ cursor: "pointer" }}
                >
                  {tab.label}
                </Text>
              ))}
            </Flex>
          </Box>
        </Flex>
        <Grid gutter={"1.5rem"}>
          {filteredApartments.map((apartment) => (
            <Grid.Col key={apartment.id} span={4}>
              <ApartmentLayout
                planImage={apartment.planImage}
                title={apartment.title}
                blockName={apartment.blockName}
                specifications={apartment.specifications}
                totalArea={apartment.totalArea}
                rooms={apartment.rooms}
              />
            </Grid.Col>
          ))}
          {filteredApartments.length === 0 && (
            <Grid.Col span={12}>
              <Text ta="center" c="#70707B" my="2rem">
                {t("buildings_inner_not_found")}
              </Text>
            </Grid.Col>
          )}
        </Grid>
      </Box>
    </>
  )
}

interface ApartmentLayoutProps {
  title?: string
  blockName?: string
  planImage?: StaticImageData
  specifications?: Specification[]
  totalArea?: string
  rooms?: number
}

const ApartmentLayout = ({
  // title = "2 xonali xonadon",
  blockName = "Blok-A",
  planImage,
  specifications = [
    { name: "Kich Xonasi", sqm: "-5.60m²", dimensions: "3.00m x 1.80m" },
    { name: "Xonasi", sqm: "-6.00m²", dimensions: "3.00m x 2.00m" },
    { name: "Hammom", sqm: "-3.20m²", dimensions: "1.80m x 1.80m" },
    { name: "Oshxona", sqm: "-6.50m²", dimensions: "3.00m x 6.50m" },
    { name: "Mehmonxona", sqm: "-15.95m²", dimensions: "5.50m x 2.90m" },
    { name: "Yotoqxona", sqm: "-12.04m²", dimensions: "2.90m x 8.15m" },
    { name: "Hojotxona", sqm: "-2.97m²", dimensions: "1.80m x 1.85m" },
    { name: "Ayvan", sqm: "-", dimensions: "- " },
  ],
  totalArea = "65.85m²",
  rooms = 2,
}: ApartmentLayoutProps) => {
  const { t } = useTranslation("common")

  const apartmentTitle = t(`buildings_inner_apartment_${rooms}`)

  return (
    <div className={s.container}>
      {/* Header */}
      <div className={s.header}>
        <h2 className={s.title}>{apartmentTitle}</h2>
      </div>

      {/* Plan Image */}
      <div className={s.planContainer}>
        {planImage ? (
          <Image src={planImage} alt={apartmentTitle} className={s.planImage} />
        ) : (
          <div className={s.planPlaceholder}>
            <p>{t("buildings_inner_plan_placeholder")}</p>
          </div>
        )}
      </div>

      {/* Block Name */}
      <div className={s.blockHeader}>
        <h3 className={s.blockName}>{blockName}</h3>
      </div>

      {/* Specifications Table */}
      <table className={s.table}>
        <thead>
          <tr>
            <th>{t("buildings_inner_table_room_name")}</th>
            <th>{t("buildings_inner_table_area")}</th>
            <th>{t("buildings_inner_table_size")}</th>
          </tr>
        </thead>
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={index}>
              <td className={s.roomName}>{spec.name}</td>
              <td className={s.area}>{spec.sqm}</td>
              <td className={s.dimensions}>{spec.dimensions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Area */}
      <div className={s.totalArea}>
        <p className={s.totalLabel}>{t("buildings_inner_total_area")}</p>
        <p className={s.totalValue}>{totalArea}</p>
      </div>
    </div>
  )
}
