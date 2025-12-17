import { useCallback, useMemo, useState } from "react"

import type { Building, BuildingFilters } from "../types/buildings"

// Тип возвращаемого значения хука

export const useBuildingFilters = (buildings: Building[]) => {
  const [filters, setFilters] = useState<BuildingFilters>({
    city: "Ташкент",
    priceRange: [430, 1500],
    areaRange: [33, 90],
  })

  const [appliedFilters, setAppliedFilters] = useState<BuildingFilters>({
    city: "Ташкент",
    priceRange: [430, 1500],
    areaRange: [33, 90],
  })

  const filteredBuildings = useMemo(() => {
    return buildings.filter((building) => {
      // Фильтр по городу
      if (appliedFilters.city && building.city !== appliedFilters.city) {
        return false
      }

      // Фильтр по комплексу
      if (
        appliedFilters.complex &&
        appliedFilters.complex !== "" &&
        building.name !== appliedFilters.complex
      ) {
        return false
      }

      // Фильтр по количеству комнат
      if (appliedFilters.rooms) {
        const hasRooms = building.apartments.some(
          (apt) => apt.rooms === appliedFilters.rooms && apt.isAvailable,
        )
        if (!hasRooms) return false
      }

      // Фильтр по цене
      const minPrice = Math.min(...building.apartments.map((apt) => apt.price))
      if (
        minPrice < appliedFilters.priceRange[0] * 1000000 ||
        minPrice > appliedFilters.priceRange[1] * 1000000
      ) {
        return false
      }

      // Фильтр по площади
      const availableApartments = building.apartments.filter(
        (apt) => apt.isAvailable,
      )
      if (availableApartments.length > 0) {
        const hasMatchingArea = availableApartments.some(
          (apt) =>
            apt.area >= appliedFilters.areaRange[0] &&
            apt.area <= appliedFilters.areaRange[1],
        )
        if (!hasMatchingArea) return false
      }

      // Специальный фильтр: если площадь > 90м², показываем только Bag'ishamal
      if (
        appliedFilters.areaRange[0] > 90 ||
        appliedFilters.areaRange[1] > 90
      ) {
        const maxArea = Math.max(
          appliedFilters.areaRange[0],
          appliedFilters.areaRange[1],
        )
        if (maxArea > 90 && !building.name.includes("Bag'ishamal")) {
          return false
        }
      }

      // Фильтр по дате сдачи
      if (appliedFilters.completionYear) {
        const buildingYear = new Date(building.completionDate).getFullYear()
        const filterYear = appliedFilters.completionYear

        if (filterYear === "Сдан") {
          // Показываем только сданные объекты (год <= текущий год)
          if (buildingYear > new Date().getFullYear()) {
            return false
          }
        } else {
          // Для конкретного года показываем только объекты с этим годом сдачи
          if (buildingYear !== parseInt(filterYear)) {
            return false
          }
        }
      }

      return true
    })
  }, [buildings, appliedFilters])

  const updateFilter = useCallback(
    <K extends keyof BuildingFilters>(key: K, value: BuildingFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters)
  }, [filters])

  const clearFilters = useCallback(() => {
    const initialFilters = {
      city: "Ташкент",
      priceRange: [430, 1500] as [number, number],
      areaRange: [33, 90] as [number, number],
    }
    setFilters(initialFilters)
    setAppliedFilters(initialFilters)
  }, [])

  const hasActiveFilters = useMemo(() => {
    return !!(
      (appliedFilters.complex && appliedFilters.complex !== "") ||
      appliedFilters.rooms ||
      appliedFilters.priceRange[0] !== 430 ||
      appliedFilters.priceRange[1] !== 1500 ||
      appliedFilters.areaRange[0] !== 33 ||
      appliedFilters.areaRange[1] !== 90 ||
      appliedFilters.completionYear
    )
  }, [appliedFilters])

  return {
    filters,
    filteredBuildings,
    updateFilter,
    applyFilters,
    clearFilters,
    hasActiveFilters,
  }
}
