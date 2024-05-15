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
  type: string
  start_address_id: number
  end_address_id: number
  cost: number
  working_days: string
  start_time: string
  arrive_time: string
  has_breaks: string
  date: string
  is_special_for_students: string
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
  type: yup.string().required(),
  working_days: yup.string().required(),
  start_time: yup.string().required(),
  arrive_time: yup.string().required(),
  has_breaks: yup.string().required(),
  date: yup.string().required(),
  is_special_for_students: yup.string().required(),
  start_address_id: yup
    .number()
    .typeError('Start Address Id field is required')
    .min(1, obj => showErrors('Start Address Id ', obj.value.length, obj.min))
    .required(),
  end_address_id: yup
    .number()
    .typeError('End Address Id field is required')
    .min(1, obj => showErrors('End Address Id ', obj.value.length, obj.min))
    .required(),
  cost: yup
    .number()
    .typeError('Cost field is required')
    .min(1, obj => showErrors('Cost ', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  type: '',
  working_days: '',
  has_breaks: '',
  is_special_for_students: '',
  start_time: null,
  arrive_time: null,
  date: null,
  start_address_id: Number(''),
  end_address_id: Number(''),
  cost: Number('')
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})
const AddTripForm = () => {
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
        <Typography variant='h6'>Add Trip</Typography>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id='validation-type-select' error={Boolean(errors.type)} htmlFor='validation-type-select'>
              Type
            </InputLabel>
            <Controller
              name='type'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Type'
                  onChange={onChange}
                  error={Boolean(errors.type)}
                  labelId='validation-type-select'
                  aria-describedby='validation-type-select'
                >
                  <MenuItem value=''>Type</MenuItem>
                  <MenuItem value='round_trip '> Round Trip </MenuItem>
                  <MenuItem value='outbound'>Outbound</MenuItem>
                  <MenuItem value='inbound'> Inbound </MenuItem>
                </Select>
              )}
            />
            {errors.type && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-type-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='start_address_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Start Address Id'
                  onChange={onChange}
                  placeholder='65'
                  error={Boolean(errors.start_address_id)}
                />
              )}
            />
            {errors.start_address_id && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.start_address_id.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='end_address_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='End Address Id'
                  onChange={onChange}
                  placeholder='65'
                  error={Boolean(errors.end_address_id)}
                />
              )}
            />
            {errors.end_address_id && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.end_address_id.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='cost'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Cost'
                  onChange={onChange}
                  placeholder='65'
                  error={Boolean(errors.cost)}
                />
              )}
            />
            {errors.cost && <FormHelperText sx={{ color: 'error.main' }}>{errors.cost.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-working-days-select'
              error={Boolean(errors.working_days)}
              htmlFor='validation-working-days-select'
            >
              Working Days
            </InputLabel>
            <Controller
              name='working_days'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Working Days'
                  onChange={onChange}
                  error={Boolean(errors.working_days)}
                  labelId='validation-working-days-select'
                  aria-describedby='validation-working-days-select'
                >
                  <MenuItem value=''>Working Days</MenuItem>
                  <MenuItem value='0'> Sunday </MenuItem>
                  <MenuItem value='1'>Monday</MenuItem>
                  <MenuItem value='2'> Tuesday </MenuItem>
                  <MenuItem value='3'>Wednesday</MenuItem>
                  <MenuItem value='4'> Thursday </MenuItem>
                  <MenuItem value='5'>Friday</MenuItem>
                  <MenuItem value='6'> Saturday </MenuItem>
                </Select>
              )}
            />
            {errors.working_days && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-working-days-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ mb: 4 }}>
            <DatePickerWrapper>
              <Controller
                name='start_time'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    showTimeSelect
                    timeIntervals={15}
                    showTimeSelectOnly
                    onChange={e => onChange(e)}
                    dateFormat='h:mm aa'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Start Time'
                        error={Boolean(errors.start_time)}
                        aria-describedby='validation-basic-start-time'
                      />
                    }
                  />
                )}
              />
              {errors.start_time && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-start-time'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <Box sx={{ mb: 4 }}>
            <DatePickerWrapper>
              <Controller
                name='arrive_time'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    showTimeSelect
                    timeIntervals={15}
                    showTimeSelectOnly
                    onChange={e => onChange(e)}
                    dateFormat='h:mm aa'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Arrive Time'
                        error={Boolean(errors.arrive_time)}
                        aria-describedby='validation-basic-arrive-time'
                      />
                    }
                  />
                )}
              />
              {errors.arrive_time && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-arrive-time'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-has-breaks-select'
              error={Boolean(errors.has_breaks)}
              htmlFor='validation-has-breaks-select'
            >
              Breaks
            </InputLabel>
            <Controller
              name='has_breaks'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Breaks'
                  onChange={onChange}
                  error={Boolean(errors.has_breaks)}
                  labelId='validation-has-breaks-select'
                  aria-describedby='validation-has-breaks-select'
                >
                  <MenuItem value=''>Breaks</MenuItem>
                  <MenuItem value='true'> Have Breaks </MenuItem>
                  <MenuItem value='false'>Does Not Have Breaks</MenuItem>
                </Select>
              )}
            />
            {errors.has_breaks && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-has-breaks-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ mb: 4 }}>
            <DatePickerWrapper>
              <Controller
                name='date'
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
                        label='Date'
                        error={Boolean(errors.date)}
                        aria-describedby='validation-basic-date'
                      />
                    }
                  />
                )}
              />
              {errors.date && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-date'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-is-special-for-students-select'
              error={Boolean(errors.is_special_for_students)}
              htmlFor='validation-is-special-for-students-select'
            >
              Special
            </InputLabel>
            <Controller
              name='is_special_for_students'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Special'
                  onChange={onChange}
                  error={Boolean(errors.is_special_for_students)}
                  labelId='validation-is-special-for-students-select'
                  aria-describedby='validation-is-special-for-students-select'
                >
                  <MenuItem value=''>Special</MenuItem>
                  <MenuItem value='true'>Is Special For Students </MenuItem>
                  <MenuItem value='false'>Is Not Special For Students</MenuItem>
                </Select>
              )}
            />
            {errors.is_special_for_students && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-is-special-for-students-select'>
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

export default AddTripForm
