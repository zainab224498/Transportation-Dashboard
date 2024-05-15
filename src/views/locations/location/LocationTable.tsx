import React, { useState, useEffect } from 'react'
import {
  Typography,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material'

interface IData {
  id: number
  calling_code: number
  country_id: string
  region: {
    name: string
  }
}

const LocationTable = () => {
  const [data, setData] = useState<IData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://transport-api.axtro-soft.com/api/v1/location/get-locations')
        const json = await response.json()
        setData(json.data)
        setLoading(false)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Data fetched from API:</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Calling Code</TableCell>
                <TableCell>Region Name</TableCell>
              </TableRow>
            </TableHead>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.calling_code}</TableCell>
                <TableCell>{item.region.name}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default LocationTable
