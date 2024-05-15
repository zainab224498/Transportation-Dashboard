import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface DataParams {
  q: string
  dates?: Date[]
  status: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface DataObject {
  [key: string]: File | string
}

// ** Fetch Companies
export const fetchData = createAsyncThunk('cityData/fetchData', async (params: DataParams) => {
  const { q, dates, status } = params
  let url = `https://transport-api.axtro-soft.com/api/v1/address/city?with=region:id,name;province.region:id,name&q=${q}`

  if (status) {
    url += `&status=${status}`
  }

  // Check if the dates parameter is defined and has at least one element
  let datesToUse = ''
  if (dates && dates.length) {
    datesToUse = dates.map(date => date.toISOString()).join(',')
  } else {
    // If the dates parameter is undefined or empty, use the current date
    const currentDate = new Date().toISOString()
    datesToUse = currentDate
  }
  url += `&dates=${datesToUse}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
      // Add any other headers that your API requires
    },
    method: 'GET'
  })

  const json = await response.json()
  console.log(json.data)
  return json.data
})

export const cityDataSlice = createSlice({
  name: 'cityData',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      state.params = action.payload
      state.allData = action.payload
      state.total = action.payload
    })
  }
})

export default cityDataSlice.reducer
