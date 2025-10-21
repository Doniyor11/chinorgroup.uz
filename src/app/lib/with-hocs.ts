import compose from "compose-function"

import { WithReactquery } from "@/app/lib/with-react-query.tsx"

import { WithMantine } from "./with-mantine"
import { WithToastify } from "./with-toastify"

export const withHocs = compose(WithToastify, WithMantine, WithReactquery)
