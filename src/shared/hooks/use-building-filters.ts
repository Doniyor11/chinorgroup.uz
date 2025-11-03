import { useMemo, useState } from "react"

import type { Building, BuildingFilters } from "../types/buildings"

export const useBuildingFilters = (buildings: Building[]) => {
  const [filters, setFilters] = useState<BuildingFilters>({
    city: "Ташкент",
    priceRange: [0, 300],
    areaRange: [0, 150],
  })

  const filteredBuildings = useMemo(() => {
    return buildings.filter((building) => {
      // Фильтр по городу
      if (filters.city && building.city !== filters.city) {
        return false
      }

      // Фильтр по комплексу
      if (
        filters.complex &&
        filters.complex !== "" &&
        building.name !== filters.complex
      ) {
        return false
      }

      // Фильтр по количеству комнат
      if (filters.rooms) {
        const hasRooms = building.apartments.some(
          (apt) => apt.rooms === filters.rooms && apt.isAvailable,
        )
        if (!hasRooms) return false
      }

      // Фильтр по цене
      const minPrice = Math.min(...building.apartments.map((apt) => apt.price))
      if (
        minPrice < filters.priceRange[0] * 1000000 ||
        minPrice > filters.priceRange[1] * 1000000
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
            apt.area >= filters.areaRange[0] &&
            apt.area <= filters.areaRange[1],
        )
        if (!hasMatchingArea) return false
      }

      // Фильтр по дате сдачи
      if (filters.completionYear) {
        const buildingYear = new Date(building.completionDate).getFullYear()
        const filterYear = filters.completionYear

        if (filterYear === "Сдан" && buildingYear > new Date().getFullYear()) {
          return false
        } else if (
          filterYear !== "Сдан" &&
          !filterYear.includes("+") &&
          buildingYear !== parseInt(filterYear)
        ) {
          return false
        } else if (
          filterYear.includes("+") &&
          buildingYear < parseInt(filterYear.replace("+", ""))
        ) {
          return false
        }
      }

      return true
    })
  }, [buildings, filters])

  const updateFilter = <K extends keyof BuildingFilters>(
    key: K,
    value: BuildingFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      city: "Ташкент",
      priceRange: [0, 300],
      areaRange: [0, 150],
    })
  }

  const hasActiveFilters = () => {
    return !!(
      filters.city ||
      (filters.complex && filters.complex !== "") ||
      filters.rooms ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 300 ||
      filters.areaRange[0] !== 0 ||
      filters.areaRange[1] !== 150 ||
      filters.completionYear
    )
  }

  return {
    filters,
    filteredBuildings,
    updateFilter,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
  }
}
