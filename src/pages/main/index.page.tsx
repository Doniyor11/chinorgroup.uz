import { Box } from "@mantine/core";



import { Blog, Contact } from "@/features"


const HomePage = () => {
  return (
    <main>
      <Box className={"container"}>
        <Blog/>
        <Contact/>
      </Box>
    </main>
  )
}

export default HomePage
