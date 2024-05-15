export type RegionsType = {
  id: number
  name: string
}

export type CountriesType = {
  id: number
  nationality: string
  calling_code: number
}

export type CitiesType = {
  id: number
  province_id: number
}

export type ProvincesType = {
  id: number
  country_id: number
  calling_code: number
}
