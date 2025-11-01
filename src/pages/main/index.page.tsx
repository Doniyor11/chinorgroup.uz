import { Box } from "@mantine/core"

import { Blog, Buildings, ChooseUs, Contact, Reviews } from "@/features"
import { FilterRoom } from "@/features/filter"

const HomePage = () => {
  return (
    <main>
      <Box className={"container"}>
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
