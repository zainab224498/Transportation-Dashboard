// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Import the Api instance from the new file
import api from 'src/store/api'

interface DataType {
  name: string
  calling_code: string
  country_id: number
}

interface Redux {
  dispatch: Dispatch<any>
}

// ** Fetch Provinces

export const fetchData = createAsyncThunk('provinceData/fetchData', async () => {
  const response = await api.get('/address/province?with=region:id,name;country.region:id,name,calling_code')

  console.log(response.data)

  return response.data
})

// ** Add Province
export const addProvince = createAsyncThunk('provinceData/addProvince', async (data: DataType) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('calling_code', data.calling_code)
  formData.append('country_id', data.country_id.toString())

  const response = await api.post(
    '/address/province',

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

// ** Delete province
export const deleteProvince = createAsyncThunk(
  'provinceData/deleteProvince',
  async (id: number | string, { dispatch }: Redux) => {
    const response = await api.delete(`/address/province/${id}`, {
      headers: {
        Authorization: 'Bearer 1|niEx7WiVLoDoFAgtFVC1SFSSuLpcc0TCAZAsuZ9d9530e2c2'
      }
    })
    dispatch(fetchData())

    console.log(response.data)

    return response.data
  }
)

export const provinceDataSlice = createSlice({
  name: 'provinceData',
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

export default provinceDataSlice.reducer
