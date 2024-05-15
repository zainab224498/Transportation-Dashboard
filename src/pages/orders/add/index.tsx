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
  seats_count: number
  adjacent_seats: number
  guid: string
  passenger_info: string
  bags_count: number
  children_count: number
  created_at: string
  updated_at: string
  deleted_at: string
  payment_type: string
  status: string
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
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
  guid: yup.string().required(),
  passenger_info: yup.string().required(),
  payment_type: yup.string().required(),
  status: yup.string().required(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
  deleted_at: yup.string().required(),
  seats_count: yup
    .number()
    .typeError('Seats Count field is required')
    .min(1, obj => showErrors('Seats Count ', obj.value.length, obj.min))
    .required(),
  adjacent_seats: yup
    .number()
    .typeError('Adjacent Seats field is required')
    .min(1, obj => showErrors('Adjacent Seats ', obj.value.length, obj.min))
    .required(),
  bags_count: yup
    .number()
    .typeError('Bags Count field is required')
    .min(1, obj => showErrors('Bags Count ', obj.value.length, obj.min))
    .required(),
  children_count: yup
    .number()
    .typeError('Children Count field is required')
    .min(1, obj => showErrors('Children Count ', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  guid: '',
  passenger_info: '',
  payment_type: '',
  status: '',
  created_at: null,
  updated_at: null,
  deleted_at: null,
  seats_count: Number(''),
  adjacent_seats: Number(''),
  bags_count: Number(''),
  children_count: Number('')
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})
const AddOrderForm = () => {
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
        <Typography variant='h6'>Add Order</Typography>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='seats_count'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Seats Count'
                  onChange={onChange}
                  placeholder='65'
                  error={Boolean(errors.seats_count)}
                />
              )}
            />
            {errors.seats_count && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.seats_count.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='adjacent_seats'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Adjacent Seats'
                  onChange={onChange}
                  placeholder='2'
                  error={Boolean(errors.adjacent_seats)}
                />
              )}
            />
            {errors.adjacent_seats && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.adjacent_seats.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='guid'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Guid'
                  onChange={onChange}
                  placeholder='Lara'
                  error={Boolean(errors.guid)}
                />
              )}
            />
            {errors.guid && <FormHelperText sx={{ color: 'error.main' }}>{errors.guid.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='passenger_info'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Passenger Info'
                  onChange={onChange}
                  placeholder='Married'
                  error={Boolean(errors.passenger_info)}
                />
              )}
            />
            {errors.passenger_info && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.passenger_info.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='bags_count'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Bags Count'
                  onChange={onChange}
                  placeholder='59'
                  error={Boolean(errors.bags_count)}
                />
              )}
            />
            {errors.bags_count && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.bags_count.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='children_count'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Children Count'
                  onChange={onChange}
                  placeholder='4'
                  error={Boolean(errors.children_count)}
                />
              )}
            />
            {errors.children_count && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.children_count.message}</FormHelperText>
            )}
          </FormControl>
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
                        aria-describedby='validation-basic-date-time'
                      />
                    }
                  />
                )}
              />
              {errors.created_at && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-date-time'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <Box sx={{ mb: 4 }}>
            <DatePickerWrapper>
              <Controller
                name='updated_at'
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
                        label='Updated Date'
                        error={Boolean(errors.updated_at)}
                        aria-describedby='validation-basic-date-time'
                      />
                    }
                  />
                )}
              />
              {errors.updated_at && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-date-time'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <Box sx={{ mb: 4 }}>
            <DatePickerWrapper>
              <Controller
                name='deleted_at'
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
                        label='Deleted Date'
                        error={Boolean(errors.deleted_at)}
                        aria-describedby='validation-basic-date-time'
                      />
                    }
                  />
                )}
              />
              {errors.deleted_at && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-date-time'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-payment-type-select'
              error={Boolean(errors.payment_type)}
              htmlFor='validation-payment-type-select'
            >
              Payment Type
            </InputLabel>
            <Controller
              name='payment_type'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Payment Type'
                  onChange={onChange}
                  error={Boolean(errors.payment_type)}
                  labelId='validation-payment-type-select'
                  aria-describedby='validation-payment-type-select'
                >
                  <MenuItem value=''>Payment Type</MenuItem>
                  <MenuItem value='cash'> Cash </MenuItem>
                  <MenuItem value='credit_card'>Credit Card</MenuItem>
                  <MenuItem value='paypal'> Paypal </MenuItem>
                  <MenuItem value='bitcoin'>Bitcoin</MenuItem>
                </Select>
              )}
            />
            {errors.payment_type && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-payment-type-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id='validation-status-select' error={Boolean(errors.status)} htmlFor='validation-status-select'>
              Status
            </InputLabel>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Status'
                  onChange={onChange}
                  error={Boolean(errors.status)}
                  labelId='validation-Status-select'
                  aria-describedby='validation-Status-select'
                >
                  <MenuItem value=''>Status</MenuItem>
                  <MenuItem value='approved'> Approved </MenuItem>
                  <MenuItem value='pinding'>Pinding</MenuItem>
                  <MenuItem value='rejected'> Rejected </MenuItem>
                  <MenuItem value='canceled'>Canceled</MenuItem>
                </Select>
              )}
            />
            {errors.status && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-Status-select'>
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

export default AddOrderForm
