export type OrdersType = {
  id: number
  statuss: string
  payment_type: string
  adjacent_seats: number
  bags_count: number
  status: string
  children_count: number
  passenger_info: string
  trip_id: number
  transaction_id: number
  order_status_history_id: number
  user_id: number
  guid: string
  seats_count: number
  deleted_at: string
  created_at: string
  updated_at: string
}

export type OrdersStatusHistoryType = {
  id: number
  status: string
  order_id: number
  changed_by_user_id: number
  old_status: string
  new_status: string
  created_at: string
}
