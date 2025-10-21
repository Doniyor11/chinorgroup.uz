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
      <Box w={'100%'} bg={'#fff'}>
        <Navbar />
      </Box>
      {children ? children : <Loader />}
      <Footer />
    </>
  )
}
