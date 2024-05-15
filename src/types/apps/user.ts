export type UsersType = {
  id: number
  first_name: string
  last_name: string
  father_name: string
  mother_name: string
  password: string
  email: string
  birthday: string
  is_phone_confirmed: boolean
  is_email_confirmed: boolean
  status: string
}

export type UsersPhonesType = {
  id: number
  user_id: number
  phone_id: number
  type: string
  calling_code_id: number
  status: string
  order_id: number
  amount: number
  date_time: string
}

export type PassengersType = {
  id: number
  status: string
  seat_id: number
  user_id: number
  trip_id: number
  country_residence_id: number
  job_id: number
  gender: string
  permanent_address_residence_id: number
  current_address_residence_id: number
}
