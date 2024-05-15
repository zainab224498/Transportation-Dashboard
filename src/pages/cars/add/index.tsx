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
  number: number
  num_seats: number
  has_individual_seats: string
  has_electricity: string
  has_internet: string
  is_vip: string
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
  has_individual_seats: yup.string().required(),
  has_electricity: yup.string().required(),
  has_internet: yup.string().required(),
  is_vip: yup.string().required(),
  number: yup
    .number()
    .typeError('Number field is required')
    .min(1, obj => showErrors('Seat Number ', obj.value.length, obj.min))
    .required(),
  num_seats: yup
    .number()
    .typeError('Seats Number field is required')
    .min(1, obj => showErrors('Seat Number ', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  has_individual_seats: '',
  has_electricity: '',
  has_internet: '',
  is_vip: '',
  number: Number(''),
  num_seats: Number('')
}

const AddCarForm = () => {
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
        <Typography variant='h6'>Add Car</Typography>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='number'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label=' Number'
                  onChange={onChange}
                  placeholder='65575'
                  error={Boolean(errors.number)}
                />
              )}
            />
            {errors.number && <FormHelperText sx={{ color: 'error.main' }}>{errors.number.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='num_seats'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Seats Number'
                  onChange={onChange}
                  placeholder='5'
                  error={Boolean(errors.num_seats)}
                />
              )}
            />
            {errors.num_seats && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.num_seats.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-has-individual-seats-select'
              error={Boolean(errors.has_individual_seats)}
              htmlFor='validation-has-individual-seats-select'
            >
              Individual Seats
            </InputLabel>
            <Controller
              name='has_individual_seats'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Individual Seats'
                  onChange={onChange}
                  error={Boolean(errors.has_individual_seats)}
                  labelId='validation-has-individual-seats-select'
                  aria-describedby='validation-has-individual-seats-select'
                >
                  <MenuItem value=''>Individual Seats</MenuItem>
                  <MenuItem value='true'>Have Individual Seats</MenuItem>
                  <MenuItem value='false'>Have Not Individual Seats</MenuItem>
                </Select>
              )}
            />
            {errors.has_individual_seats && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-has-individual-seats-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-has-electricity-select'
              error={Boolean(errors.has_electricity)}
              htmlFor='validation-has-electricity-select'
            >
              Electricity
            </InputLabel>
            <Controller
              name='has_electricity'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Electricity'
                  onChange={onChange}
                  error={Boolean(errors.has_electricity)}
                  labelId='validation-has-electricity-select'
                  aria-describedby='validation-has-electricity-select'
                >
                  <MenuItem value=''>Electricity</MenuItem>
                  <MenuItem value='true'> Has Electricity </MenuItem>
                  <MenuItem value='false'>Has Not Electricity</MenuItem>
                </Select>
              )}
            />
            {errors.has_electricity && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-has-electricity-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validahas-internettion--select'
              error={Boolean(errors.has_internet)}
              htmlFor='validation-has-internet-select'
            >
              Internet
            </InputLabel>
            <Controller
              name='has_internet'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Internet'
                  onChange={onChange}
                  error={Boolean(errors.has_internet)}
                  labelId='validation-has-internet-select'
                  aria-describedby='validation-has-internet-select'
                >
                  <MenuItem value=''>Internet</MenuItem>
                  <MenuItem value='true'>Has Internet </MenuItem>
                  <MenuItem value='false'>Has Not Internet</MenuItem>
                </Select>
              )}
            />
            {errors.has_internet && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-has-internet-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id='validation-is-vip-select' error={Boolean(errors.is_vip)} htmlFor='validation-is-vip-select'>
              VIP
            </InputLabel>
            <Controller
              name='is_vip'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='VIP'
                  onChange={onChange}
                  error={Boolean(errors.is_vip)}
                  labelId='validation-is-vip-select'
                  aria-describedby='validation-is-vip-select'
                >
                  <MenuItem value=''>VIP</MenuItem>
                  <MenuItem value='true'> Is VIP </MenuItem>
                  <MenuItem value='false'>Is Not VIP</MenuItem>
                </Select>
              )}
            />
            {errors.is_vip && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-is-vip-select'>
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

export default AddCarForm
