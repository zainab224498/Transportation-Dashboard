// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Import the Api instance from the new file
import api from 'src/store/api'

interface DataType {
  calling_code: string
  name: string
  nationality: string
}

interface Redux {
  dispatch: Dispatch<any>
}

// ** Fetch Countries

export const fetchData = createAsyncThunk('countryData/fetchData', async () => {
  const response = await api.get('/address/country?with=region:id,name,calling_code;provinces:id,region_id,country_id')

  console.log(response.data)

  return response.data
})

// ** Add Country
export const addCountry = createAsyncThunk('countryData/addCountry', async (data: DataType) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('calling_code', data.calling_code)
  formData.append('nationality', data.nationality)

  const response = await api.post(
    '/address/country',

    formData,
    {
      headers: {
        Authorization: 'Bearer 1|niEx7WiVLoDoFAgtFVC1SFSSuLpcc0TCAZAsuZ9d9530e2c2'
      }
    }
  )

  console.log(response.data)

  return response.data
})

// ** Edit Country
export const editCountry = createAsyncThunk(
  'countryData/editCountry',
  async ({ id, data }: { id: number | string; data: DataType }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('calling_code', data.calling_code)
    formData.append('nationality', data.nationality)

    const response = await api.put(
      `/address/country/${id}`,

      formData,
      {
        headers: {
          Authorization: 'Bearer 1|niEx7WiVLoDoFAgtFVC1SFSSuLpcc0TCAZAsuZ9d9530e2c2'
        }
      }
    )

    console.log(response.data)

    return response.data
  }
)

// ** Delete Country
export const deleteCountry = createAsyncThunk(
  'countryData/deleteCountry',
  async (id: number | string, { dispatch }: Redux) => {
    const response = await api.delete(`/address/country/${id}`, {
      headers: {
        Authorization: 'Bearer 1|niEx7WiVLoDoFAgtFVC1SFSSuLpcc0TCAZAsuZ9d9530e2c2'
      }
    })
    dispatch(fetchData())

    console.log(response.data)

    return response.data
  }
)

export const countryDataSlice = createSlice({
  name: 'countryData',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
    })
  }
})

export default countryDataSlice.reducer
