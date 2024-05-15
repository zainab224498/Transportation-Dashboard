export type IdLayoutProps = {
  id: string | undefined
}

export type CitiesType = {
  id: number
  region_id: number
  region: {
    id: number
    name: string
  }
  province_id: number
  province: {
    id: number
    region: {
      id: number
      name: string
    }
  }
}

export type AddressesType = {
  id: number
  name: string
  region_id: number
  latitude: number
  longitude: number
  region: {
    id: number
    name: string
  }
}

export type CountriesType = {
  id: number
  region_id: number
  nationality: string
  region: {
    id: number
    name: string
    calling_code: string
  }
  provinces: ProvincesType
}

export type ProvincesType = {
  id: number
  region_id: number
  region: {
    id: number
    name: string
  }
  country_id: number
  country: {
    id: number
    region_id: number
    region: {
      id: number
      name: string
      calling_code: string
    }
  }
}

export type SingleCountryType = {
  country: CountriesType
  provinces: ProvincesType
}
