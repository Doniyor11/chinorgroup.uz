import { QueryClientProvider } from "@tanstack/react-query"
import { ComponentType } from "react"

import { queryClient } from "@/shared/libs/query-client"

export const WithReactquery =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) => (
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
    </QueryClientProvider>
  )
