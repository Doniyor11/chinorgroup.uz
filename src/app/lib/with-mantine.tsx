import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { ComponentType } from "react"

export const WithMantine =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) => (
    <MantineProvider>
      <Notifications />
      <Component {...props} />
    </MantineProvider>
  )
