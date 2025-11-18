import { Box, Loader } from "@mantine/core"
import React, { ReactNode } from "react"

import { Footer } from "@/widgets/layouts/footer"
import { Navbar } from "@/widgets/layouts/navbar"

interface ILayout {
  children?: ReactNode
}

export const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Box
        w={"100%"}
        bg={"#fff"}
        pos={"sticky"}
        top={0}
        style={{ zIndex: 1001 }}
      >
        <Navbar />
      </Box>
      {children ? children : <Loader />}
      <Footer />
    </>
  )
}
