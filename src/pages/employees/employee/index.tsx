// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import EmployeesTable from 'src/views/employees/employee/EmployeesTable'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Employees = () => {
  return (
    <ApexChartWrapper>
      <Grid item xs={12} lg={8}>
        <EmployeesTable />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Employees
