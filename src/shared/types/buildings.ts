export interface Building {
  id: string
  name: string
  location: string
  city: string
  image: string
  priceFrom: number
  totalApartments: number
  availableApartments: number
  completionDate: string
  tags?: string[]
  apartments: Apartment[]
}

export interface Apartment {
  id: string
  buildingId: string
  rooms: number
  price: number
  area: number
  floor: number
  isAvailable: boolean
}

export interface BuildingFilters {
  city?: string
  complex?: string
  rooms?: number
  priceRange: [number, number]
  areaRange: [number, number]
  completionYear?: string
}

export interface RoomFilters {
  rooms: number
  complex?: string
  price: number
  initialPaymentPercent: number
  initialPaymentAmount: number
}
