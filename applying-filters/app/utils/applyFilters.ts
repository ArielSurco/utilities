import type { FilterValidation } from '../types/FilterValidation'

export const applyFilters = <T>(data: T[], filters: FilterValidation<T>[]): T[] => {
  return data.filter((dataItem) => filters.every((filter) => filter(dataItem)))
}
