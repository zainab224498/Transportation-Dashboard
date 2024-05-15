// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import BoardingPlacesTable from 'src/views/boardingPlaces/boardingPlace/BoardingPlacesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const BoardingPlaces = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <BoardingPlacesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default BoardingPlaces
