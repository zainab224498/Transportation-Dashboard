export type TripsType = {
  id: number
  status: string
  date: string
  cost: number
  is_special_for_students: boolean
  working_days: number
  arrive_time: string
  start_time: string
  company_id: number
  has_breaks: boolean
  start_address_id: number
  end_address_id: number
  car_id: number
  driver_id: number
  type: string
}

export type SeatsType = {
  id: number
  status: string
  name: string
  last_name: string
  gender: string
  father_name: string
  mother_name: string
  order_id: number
  passenger_id: number
  seat_number: number
  DisembarkationPlaces_id: number
  BoardingPlaces_id: number
}
