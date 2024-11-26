// type Quota = {
//   maxEventsPerMonth: number
//   maxEventCategories: number
// }
export const FREE_QUOTA = {
  maxEventCategories: 100,
  maxEventsPerMonth: 3,
} as const

export const PRO_QUOTA = {
  maxEventCategories: 1000,
  maxEventsPerMonth: 10,
} as const
