export type CompanyType = {
  id: number
  name: string
  avatar: string
}

export type CompaniesAddressesType = {
  id: number
  company_id: number
  address_id: number
}

export type CompaniesPhonesType = {
  id: number
  company_id: number
  phone_id: number
}

export type EmployeesType = {
  id: number
  user_id: number
  company_id: number
}
