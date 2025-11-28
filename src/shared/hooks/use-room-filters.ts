import { useCallback, useMemo, useState } from "react"

import type { Apartment, Building, RoomFilters } from "../types/buildings"

export const useRoomFilters = (buildings: Building[]) => {
  const [filters, setFilters] = useState<RoomFilters>({
    rooms: 1,
    price: 0,
    initialPaymentPercent: 0,
    initialPaymentAmount: 0,
  })

  const filteredApartments = useMemo(() => {
    const apartments: (Apartment & { building: Building })[] = []

    buildings.forEach((building) => {
      building.apartments.forEach((apartment) => {
        if (apartment.rooms === filters.rooms && apartment.isAvailable) {
          // Фильтр по комплексу
          if (filters.complex && building.name !== filters.complex) {
            return
          }

          // Фильтр по цене
          if (filters.price > 0 && apartment.price > filters.price * 1000000) {
            return
          }

          apartments.push({
            ...apartment,
            building,
          })
        }
      })
    })

    return apartments
  }, [buildings, filters])

  const updateFilter = useCallback(
    <K extends keyof RoomFilters>(key: K, value: RoomFilters[K]) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value }

        // Автоматически пересчитываем первоначальный взнос при изменении цены или процента
        if (key === "price" || key === "initialPaymentPercent") {
          const price =
            key === "price" ? (value as number) : newFilters.price || 0
          const percent =
            key === "initialPaymentPercent"
              ? (value as number)
              : newFilters.initialPaymentPercent || 0

          newFilters.initialPaymentAmount = (price * percent) / 100
        }

        return newFilters
      })
    },
    [],
  )

  // Рассчитываем стандартную и подходящую рассрочку
  const calculateInstallment = (apartmentPrice: number) => {
    const standardMonths = 60
    const flexibleMonths = 48

    const standardDownPayment = apartmentPrice * 0.3 // 30%
    const flexibleDownPayment = apartmentPrice * 0.2 // 20%

    const standardMonthlyPayment =
      (apartmentPrice - standardDownPayment) / standardMonths
    const flexibleMonthlyPayment =
      (apartmentPrice - flexibleDownPayment) / flexibleMonths

    return {
      standard: {
        months: standardMonths,
        monthlyPayment: Math.round(standardMonthlyPayment),
        downPayment: Math.round(standardDownPayment),
      },
      flexible: {
        months: flexibleMonths,
        monthlyPayment: Math.round(flexibleMonthlyPayment),
        downPayment: Math.round(flexibleDownPayment),
      },
    }
  }

  const averagePrice = useMemo(() => {
    if (filteredApartments.length === 0) return 0
    const total = filteredApartments.reduce((sum, apt) => sum + apt.price, 0)
    return Math.round(total / filteredApartments.length)
  }, [filteredApartments])

  const installmentPlans = useMemo(() => {
    return calculateInstallment(averagePrice)
  }, [averagePrice])

  return {
    filters,
    filteredApartments,
    updateFilter,
    installmentPlans,
    averagePrice,
  }
}
