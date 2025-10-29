import { Box } from "@mantine/core";



import { Blog, Contact } from "@/features"
import { FilterRoom } from "@/features/filter"


const HomePage = () => {
  return (
    <main>
      <Box className={"container"}>
        <FilterRoom/>
        <Blog/>
        <Contact/>
      </Box>
    </main>
  )
}

export default HomePage
