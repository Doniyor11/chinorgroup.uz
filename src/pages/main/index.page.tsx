import { Box } from "@mantine/core"

import {
  Blog,
  Buildings,
  ChooseUs,
  Contact,
  FilterRoom,
  Hero,
  Reviews,
} from "@/features"

const HomePage = () => {
  return (
    <main>
      <Box className={"container"}>
        <Hero />
        <Buildings />
        <ChooseUs />
        <Reviews />
        <FilterRoom />
        <Blog />
        <Contact />
      </Box>
    </main>
  )
}

export default HomePage
