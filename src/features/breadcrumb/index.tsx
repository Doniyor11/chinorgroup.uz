import { Box } from "@mantine/core"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import React from "react"

import s from "./index.module.scss"

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  showHomeIcon?: boolean
}

export const BreadcrumbCustom = ({
  items,
  className,
  showHomeIcon = true,
}: BreadcrumbProps) => {
  return (
    <Box bg={"#18181B"}>
      <Box className={"container"}>
        <nav
          aria-label="Breadcrumb"
          className={`${s.breadcrumb} ${className || ""}`}
        >
          <ol className={s.breadcrumbList}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1
              const isFirst = index === 0

              return (
                <li key={index} className={s.breadcrumbItem}>
                  {index > 0 && (
                    <ChevronRight className={s.separator} aria-hidden="true" />
                  )}

                  {item.href && !isLast ? (
                    <Link href={item.href} className={s.link}>
                      {isFirst && showHomeIcon && item.icon && (
                        <span className={s.icon}>{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <span
                      className={isLast ? s.current : s.inactiveText}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {isFirst && showHomeIcon && item.icon && (
                        <span className={s.icon}>{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </Box>
    </Box>
  )
}

// Convenience component for common home icon
BreadcrumbCustom.HomeIcon = () => <Home className={s.homeIcon} />
