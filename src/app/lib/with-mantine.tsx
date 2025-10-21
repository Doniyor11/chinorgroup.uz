import { MantineProvider } from "@mantine/core"
import { ComponentType } from "react"

export const WithMantine =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) => (
    <MantineProvider>
      <Component {...props} />
    </MantineProvider>
  )
