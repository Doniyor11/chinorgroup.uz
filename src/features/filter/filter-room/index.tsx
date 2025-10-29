import { Box, RangeSlider, Text } from "@mantine/core"
import React, { useState } from "react";
import s from "./index.module.css"

export const FilterRoom = () => {
  const [value, setValue] = useState<[number, number]>([0, 120])

  return (
    <Box className={s.filterRoom}>
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "10px 16px",
          background: "#fff",
        }}
      >
        <Text size="sm" c="dimmed">
          Площадь от{" "}
          <Text span fw={500} c="black">
            {value[0]} м²
          </Text>{" "}
          до{" "}
          <Text span fw={500} c="black">
            {value[1]} м²
          </Text>
        </Text>

        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={300}
          color="green"
          thumbSize={14}
          label={null}
          styles={{
            track: {
              height: 3,
            },
            bar: {
              backgroundColor: "green",
            },
            thumb: {
              border: "2px solid green",
              backgroundColor: "#fff",
              boxShadow: "0 0 0 2px #fff",
            },
          }}
        />
      </div>

    </Box>
  )
}
