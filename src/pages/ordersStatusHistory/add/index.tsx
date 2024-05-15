// ** React Imports
import { useState, forwardRef, ChangeEvent } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

interface Data {
  created_at: DateType
  old_status: string
  new_status: string
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const showErrors = (field: string, valueLen: number, min: number, isSubmitClicked: boolean) => {
  if (field === 'date' && isSubmitClicked && valueLen === 0) {
    return 'Date field is required'
  } else if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  created_at: yup.string().required(),
  old_status: yup.string().required(),
  new_status: yup.string().required()
})

const defaultValues = {
  created_at: null,
  old_status: '',
  new_status: ''
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const AddOrderStatusHistoryForm = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: Data) => {
   //** dispatch(addUser({ ...data })) **//
    console.log('done')
    reset()
  }

  const handleClose = () => {
    reset()
  }

  return (
    <Card>
      <Header>
        <Typography variant='h6'>Add Order Status History</Typography>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <DatePickerWrapper>
              <Controller
                name='created_at'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={e => onChange(e)}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Created Date'
                        error={Boolean(errors.created_at)}
                        aria-describedby='validation-basic-created_at'
                      />
                    }
                  />
                )}
              />
              {errors.created_at && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-created_at'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-old-status-select'
              error={Boolean(errors.old_status)}
              htmlFor='validation-old-status-select'
            >
              Old Status
            </InputLabel>
            <Controller
              name='old_status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Old Status'
                  onChange={onChange}
                  error={Boolean(errors.old_status)}
                  labelId='validation-old-status-select'
                  aria-describedby='validation-old-status-select'
                >
                  <MenuItem value=''>Old Status</MenuItem>
                  <MenuItem value='approved'> Approved </MenuItem>
                  <MenuItem value='pinding'>Pinding</MenuItem>
                  <MenuItem value='rejected'> Rejected</MenuItem>
                  <MenuItem value='canceled'>Canceled</MenuItem>
                </Select>
              )}
            />
            {errors.old_status && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-old-status-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-new-status-select'
              error={Boolean(errors.new_status)}
              htmlFor='validation-new-status-select'
            >
              New Status
            </InputLabel>
            <Controller
              name='new_status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='New Status'
                  onChange={onChange}
                  error={Boolean(errors.new_status)}
                  labelId='validation-new-status-select'
                  aria-describedby='validation-new-status-select'
                >
                  <MenuItem value=''>New Status</MenuItem>
                  <MenuItem value='approved'> Approved </MenuItem>
                  <MenuItem value='pinding'>Pinding</MenuItem>
                  <MenuItem value='rejected'> Rejected</MenuItem>
                  <MenuItem value='canceled'>Canceled</MenuItem>
                </Select>
              )}
            />
            {errors.new_status && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-new-status-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  )
}

export default AddOrderStatusHistoryForm
