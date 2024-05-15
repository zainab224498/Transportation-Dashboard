import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

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
export const fetchData = createAsyncThunk('companyData/fetchData', async (params: DataParams) => {
  const { q, dates, status } = params
  let url = `https://transport-api.axtro-soft.com/api/v1/company?q=${q}`

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
  return json.data
})

// ** Add Company
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: { name: string; avatar: File }) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('avatar', data.avatar)

  const response = await fetch('https://transport-api.axtro-soft.com/api/v1/company', {
    method: 'POST',
    headers: {
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    body: formData
  })

  const responseData = await response.json()
  console.log(responseData)
  console.log('Data successfully posted')
  return responseData
})

// ** Delete Company

export const deleteCompany = createAsyncThunk('appCompanies/deleteCompany', async (id: number | string) => {
  try {
    const response = await fetch(`https://transport-api.axtro-soft.com/api/v1/company/${id}`, {
      method: 'DELETE',
      headers: {
        'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
        Host: 'transport-api.axtro-soft.com',
        'User-Agent': 'PostmanRuntime/7.32.3',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      }
    })

    if (response.ok) {
      console.log('Company successfully deleted')
      return response.json()
    } else {
      console.error('Failed to delete company')
      throw new Error('Failed to delete company')
    }
  } catch (error) {
    console.error('Failed to delete company:', error)
    throw error
  }
})

/*
export const deleteCompany = createAsyncThunk('appCompanies/deleteCompany', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://transport-api.axtro-soft.com/api/v1/company/${id}`, {
      method: 'DELETE',
      headers: {
        'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
        Host: 'transport-api.axtro-soft.com',
        'User-Agent': 'PostmanRuntime/7.32.3',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      }
    })

    if (response.ok) {
      console.log('Company successfully deleted')
      return response.json()
    } else if (response.status === 404) {
      console.error('Company not found')
      return rejectWithValue('Company not found')
    } else {
      console.error('Failed to delete company')
      return rejectWithValue('Failed to delete company')
    }
  } catch (error) {
    console.error('Failed to delete company:', error)
    throw error
  }
})
*/
/*
export const deleteCompany = createAsyncThunk('appCompanies/deleteCompany', async (id: number | string) => {
  try {
    const response = await fetch(`https://transport-api.axtro-soft.com/api/v1/company/${id}`, {
      method: 'DELETE',
      headers: {
        'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
        Host: 'transport-api.axtro-soft.com',
        'User-Agent': 'PostmanRuntime/7.32.3',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      }
    })

    if (response.ok) {
      console.log('Company successfully deleted')
      return response.json()
    } else {
      console.error('Failed to delete company')
      throw new Error('Failed to delete company')
    }
  } catch (error) {
    console.error('Failed to delete company:', error)
    throw error
  }
})
*/
/*
export const deleteCompany = createAsyncThunk('appCompanies/deleteCompany', async (companyId: string) => {
  const response = await fetch(`https://transport-api.axtro-soft.com/api/v1/company/${companyId}`, {
    method: 'DELETE',
    headers: {
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    }
  })

  if (response.ok) {
    console.log('Company successfully deleted')
  } else {
    console.log('Failed to delete company')
  }
})
*/
/*
// ** Delete Company
export const deleteCompany = createAsyncThunk(
  'appInvoice/deleteData',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete('https://transport-api.axtro-soft.com/api/v1/company/${companyId}', {
      data: id
    })
    await dispatch(fetchData(getState().invoice.params))

    return response.data
  }
)
/*
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  // Create a new FormData object
  const formData = new FormData()

  // Iterate over the data object and append values to the FormData
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
      console.log('data hii33')
    } else {
      formData.append(key, JSON.stringify(value))
      console.log('data hii44')
      console.log(value)
      console.log(key)
    }
  })

  // Make the request to the desired URL using CORS Anywhere
  const apiUrl = 'https://transport-api.axtro-soft.com/api/v1/company'

  const response = await fetch(`http://localhost:8080/${apiUrl}`, {
    method: 'POST',
    body: formData
  })

  const responseData = await response.json()

  console.log(responseData.data)
  console.log('data hii22')
  console.log(responseData)
  return responseData
})

*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
      console.log('data hii33')
    } else {
      formData.append(key, JSON.stringify(value))
      console.log('data hii44')
      console.log(value)
      console.log(key)
    }
  })

  const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', {
    method: 'POST',
    body: formData
  })

  const responseData = await response.json()

  console.log(responseData.data)
  console.log('data hii22')
  console.log(responseData)
  return responseData
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
      console.log('data hii33')
    } else {
      formData.append(key, JSON.stringify(value))
      console.log('data hii4466')
      console.log(value)
      console.log('data hii11')
      console.log(key)
      console.log('data hii33')
    }
  })

  const response = await fetch('https://transport-api.axtro-soft.com/api/v1/company', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=--------------------------081383480279830853783154',
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      'Content-Length': '173',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    body: formData
  })

  const responseData = await response.json()
  console.log(responseData.data)
  console.log('data done well')
  console.log(responseData)
  return responseData
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const url = `http://transport-api.axtro-soft.com/api/v1/company`

  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, JSON.stringify(value))
    }
  })

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  })

  const json = await response.json()
  console.log('data done well')
  return json.data
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, JSON.stringify(value))
    }
  })

  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://transport-api.axtro-soft.com/api/v1/company')
  xhr.setRequestHeader('Content-Type', 'application/json')

  const responsePromise = new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText))
      }
    }
    xhr.onerror = function () {
      reject(new Error('Network request failed'))
    }
  })

  xhr.send(JSON.stringify(formData))
  const responseData = await responsePromise.then(response => JSON.parse(response))

  console.log(responseData.data)
  console.log('Data added successfully')
  console.log(responseData)

  return responseData
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
      console.log('data hii33')
    } else {
      formData.append(key, JSON.stringify(value))
      console.log('data hii4466')
      console.log(value)
      console.log('data hii11')
      console.log(key)
      console.log('data hii33')
    }
  })

  const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=--------------------------081383480279830853783154',
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      'Content-Length': '173',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    body: JSON.stringify(formData)
  })

  const responseData = await response.json()
  console.log(responseData.data)
  console.log('data done well')
  console.log(responseData)
  console.log('hy')
  console.log(JSON.stringify(formData))
  return responseData
})
*/

//8888
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('avatar', data.avatar);

  const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    body: formData
  });

  const responseData = await response.json();
  console.log(responseData);
  console.log('Data successfully posted');
  return responseData;
});
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('avatar', data.avatar)

  formData.append('jsonPayload', JSON.stringify(formData))

  const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    body: JSON.stringify(formData)
  })

  const responseData = await response.json()
  console.log(responseData)
  console.log('Data successfully posted')
  return responseData
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('avatar', data.avatar)

  console.log(data.name)
  console.log(typeof data.name)
  console.log('1q1q')
  console.log(data.avatar)
  console.log('1w1w')
  console.log(typeof data.avatar)

  const response = await fetch('https://transport-api.axtro-soft.com/api/v1/company', {
    method: 'POST',
    headers: {
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    body: formData
  })

  const responseData = await response.json()
  console.log(responseData)
  console.log('Data successfully posted')
  return responseData
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData();

  formData.append('name', data.name);

  if (data.avatar instanceof File) {
    formData.append('avatar', data.avatar);
  }

  const jsonPayload = {
    name: data.name,
    avatar: null, // Exclude the avatar field from the JSON payload
    additionalData: 'example',
  };

  formData.append('jsonPayload', JSON.stringify(jsonPayload));

  try {
    const response = await fetch('https://transport-api.axtro-soft.com/api/v1/company', {
      method: 'POST',
      headers: {
        'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
        Host: 'transport-api.axtro-soft.com',
        'User-Agent': 'PostmanRuntime/7.32.3',
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add company');
    }

    const responseData = await response.json();
    console.log(responseData);
    console.log('Data successfully posted');
    return responseData;
  } catch (error) {
    // Handle any errors during the request
    console.error('Error:', error.message);
    throw error;
  }
});
*/

/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  formData.append('name', data.name)

  // Check if the 'avatar' value is a valid image file
  if (data.avatar instanceof File) {
    formData.append('avatar', data.avatar)
    console.log('jj')
  } else {
    console.log(data.avatar)
    console.log('dd')
    console.log(data.name)
    console.log('aaz')
    throw new Error('The avatar field must be an image.')
  }

  const jsonPayload = {
    name: data.name,
    additionalData: 'example'
  }

  formData.append('jsonPayload', JSON.stringify(jsonPayload))

  const response = await fetch('https://transport-api.axtro-soft.com/api/v1/company', {
    method: 'post',
    headers: {
      'Postman-Token': '754fba72-348a-4dde-9324-1dd8ec988d91',
      Host: 'transport-api.axtro-soft.com',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive'
    },
    body: formData
  })

  const responseData = await response.json()
  console.log(responseData)
  console.log('Data successfully posted')
  return responseData
})
*/
//77777
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, JSON.stringify(value))
    }
  })

  const requestOptions = {
    method: 'POST',
    body: formData
  }

  try {
    const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', requestOptions)
    const responseData = await response.json()

    // Log the response data to the console
    console.log(responseData.data)
    console.log('data hii22')
    console.log(responseData)

    // Return the response data
    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
})
*/
/*
export const addCompany = createAsyncThunk(
  'appCompanies/addCompany',
  async (data: { [key: string]: File | string }, { getState, dispatch }: Redux) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(data))

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    try {
      const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', requestOptions)
      const responseData = await response.json()

      // Log the response data to the console
      console.log(responseData)

      // Dispatch the action to fetch data
      dispatch(fetchData(getState().user.params))
      console.log(responseData.data)
      console.log('data hii22')

      return responseData
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
*/
/*
export const addCompany = createAsyncThunk(
  'appCompanies/addCompany',
  async (data: DataObject, { getState, dispatch }: Redux) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
        console.log('data hii33')
      } else {
        formData.append(key, JSON.stringify(value))
        console.log('data hii44')
        console.log(value)
        console.log(key)
      }
    })

    const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    })

    const responseData = await response.json()
    dispatch(fetchData(getState().company.params))
    console.log(responseData.data)
    console.log('data hii22')
    console.log(responseData)
    return responseData
  }
)
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
      console.log('data hii33')
    } else {
      formData.append(key, JSON.stringify(value))
      console.log('data hii4466')
      console.log(value)
      console.log('data hii11')
      console.log(key)
      console.log('data hii33')
    }
  })

  const response = await fetch('http://transport-api.axtro-soft.com/api/v1/company', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData
  })

  const responseData = await response.json()
  console.log(responseData.data)
  console.log('data done well')
  console.log(responseData)
  return responseData
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
      console.log('data hii33')
    } else {
      formData.append(key, JSON.stringify(value))
      console.log('data hii44')
      console.log(value)
      console.log(key)
    }
  })

  try {
    const response = await axios.post('https://transport-api.axtro-soft.com/api/v1/company', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const responseData = response.data
    console.log(responseData.data)
    console.log('data hii22')
    console.log(responseData)
    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
})
*/
/*
// Create a new instance of the mock adapter
const mock = new MockAdapter(axios)

// Mock the POST request
mock.onPost('https://transport-api.axtro-soft.com/api/v1/company').reply(200, {
  data: 'Mocked response data'
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
      console.log('data hii33')
    } else {
      formData.append(key, JSON.stringify(value))
      console.log('data hii44')
      console.log(value)
      console.log('data hii88')
      console.log(key)
    }
  })

  try {
    const response = await axios.post('https://transport-api.axtro-soft.com/api/v1/company', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const responseData = response.data
    console.log('data h1')
    console.log(responseData.formData)
    console.log('data h2')
    console.log(formData)
    console.log('data h3')
    console.log(responseData)
    console.log('data h4')
    console.log(responseData.data)
    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject, { dispatch }) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, JSON.stringify(value))
    }
  })

  try {
    const response = await axios.post('http://transport-api.axtro-soft.com/api/v1/company', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const responseData = response.data

    // Dispatch an action with the responseData
    dispatch({ type: 'appCompanies/addCompanySuccess', payload: responseData })

    console.log('data h1')
    console.log(responseData.formData)
    console.log('data h2')
    console.log(formData)
    console.log('data h3')
    console.log(responseData)
    console.log('data h4')
    console.log(responseData.data)

    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
})
*/
/*
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data: DataObject, { dispatch }) => {
  try {
    const response = await axios.post('http://transport-api.axtro-soft.com/api/v1/company', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseData = response.data

    // Dispatch an action with the responseData
    dispatch({ type: 'appCompanies/addCompanySuccess', payload: responseData })
    console.log('data h1')
    console.log(responseData)
    console.log('data h2')
    console.log('data h3')
    console.log(responseData)
    console.log('data h4')
    console.log(responseData.data)

    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
})
*/

/*
export const addCompany = createAsyncThunk(
  'appCompanies/addCompany',
  async (data: DataObject, { getState, dispatch }: Redux) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
        console.log('data hii22')
      } else {
        formData.append(key, JSON.stringify(value))
        console.log('data hii44')
      }
    })
    const url = 'http://transport-api.axtro-soft.com/api/v1/company' // Replace with the actual URL for posting data

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      })
      const responseData = await response.json()

      // Log the response data to the console
      console.log(responseData.data)
      console.log('data hii22')
      console.log(responseData)

      // Dispatch the action to fetch data
      dispatch(fetchData(getState().company.params))

      // Return the response data
      return responseData
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
*/

/*
export const addCompany = createAsyncThunk(
  'appCompanies/addCompany',
  async (data: { [key: string]: File | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('http://transport-api.axtro-soft.com/api/v1/company', {
      data
    })
    dispatch(fetchData(getState().company.params))
    console.log('data hii22')
    console.log(response.data)

    return response.data
  }
)
*/
/*
export const addCompany = createAsyncThunk(
  'appCompanies/addCompany',
  async (data: { [key: string]: File | string }, { getState, dispatch }: Redux) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, value)
      }
    })
    const url = 'http://transport-api.axtro-soft.com/api/v1/company' // Replace with the actual URL for posting data

    try {
      const response = await axios.post(url, formData)

      // Log the response data to the console
      console.log('data hii22')
      console.log(response.data)

      // Dispatch the action to fetch data
      dispatch(fetchData(getState().company.params))

      // Return the response data
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)
*/
export const companyDataSlice = createSlice({
  name: 'companyData',
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

export default companyDataSlice.reducer
