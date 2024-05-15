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
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

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

interface State {
  password: string
  showPassword: boolean
}

interface Data {
  first_name: string
  last_name: string
  father_name: string
  mother_name: string
  password: string
  email: string
  birthday: string
  is_phone_confirmed: string
  is_email_confirmed: string
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
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  father_name: yup.string().required(),
  mother_name: yup.string().required(),
  birthday: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  is_phone_confirmed: yup.string().required(),
  is_email_confirmed: yup.string().required()
})

const defaultValues = {
  first_name: '',
  last_name: '',
  father_name: '',
  mother_name: '',
  birthday: null,
  email: '',
  password: '',
  is_email_confirmed: '',
  is_phone_confirmed: ''
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const AddUserForm = () => {
  // ** States
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  })

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

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

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
        <Typography variant='h6'>Add User</Typography>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='first_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='First Name'
                  onChange={onChange}
                  placeholder='Haya'
                  error={Boolean(errors.first_name)}
                />
              )}
            />
            {errors.first_name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.first_name.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='last_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Last Name'
                  onChange={onChange}
                  placeholder='Alqadi'
                  error={Boolean(errors.last_name)}
                />
              )}
            />
            {errors.last_name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.last_name.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='father_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Father Name'
                  onChange={onChange}
                  placeholder='Iyad'
                  error={Boolean(errors.father_name)}
                />
              )}
            />
            {errors.father_name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.father_name.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='mother_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Mother Name'
                  onChange={onChange}
                  placeholder='Tamara'
                  error={Boolean(errors.mother_name)}
                />
              )}
            />
            {errors.mother_name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.mother_name.message}</FormHelperText>
            )}
          </FormControl>
          <Box sx={{ mb: 4 }}>
            <DatePickerWrapper>
              <Controller
                name='birthday'
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
                        label='Birthday'
                        error={Boolean(errors.birthday)}
                        aria-describedby='validation-basic-birthday'
                      />
                    }
                  />
                )}
              />
              {errors.birthday && (
                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-birthday'>
                  This field is required
                </FormHelperText>
              )}
            </DatePickerWrapper>
          </Box>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  placeholder='carterleonard@gmail.com'
                  aria-describedby='validation-basic-email'
                />
              )}
            />
            {errors.email && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
              Password
            </InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <OutlinedInput
                  value={value}
                  label='Password'
                  onChange={onChange}
                  id='validation-basic-password'
                  error={Boolean(errors.password)}
                  type={state.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-is-email-confirmed-select'
              error={Boolean(errors.is_email_confirmed)}
              htmlFor='validation-is-email-confirmed-select'
            >
              Email Confirmed
            </InputLabel>
            <Controller
              name='is_email_confirmed'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Email Confirmed'
                  onChange={onChange}
                  error={Boolean(errors.is_email_confirmed)}
                  labelId='validation-is-email-confirmed-select'
                  aria-describedby='validation-is-email-confirmed-select'
                >
                  <MenuItem value=''>Email Confirmed</MenuItem>
                  <MenuItem value='true'> Email Is Confirmed </MenuItem>
                  <MenuItem value='false'>Email Is Not Confirmed</MenuItem>
                </Select>
              )}
            />
            {errors.is_email_confirmed && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-is-email-confirmed-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel
              id='validation-is-phone-confirmed-select'
              error={Boolean(errors.is_email_confirmed)}
              htmlFor='validation-is-phone-confirmed-select'
            >
              Phone Confirmed
            </InputLabel>
            <Controller
              name='is_phone_confirmed'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Phone Confirmed'
                  onChange={onChange}
                  error={Boolean(errors.is_phone_confirmed)}
                  labelId='validation-is-phone-confirmed-select'
                  aria-describedby='validation-is-phone-confirmed-select'
                >
                  <MenuItem value=''>Phone Confirmed</MenuItem>
                  <MenuItem value='true'> Phone Is Confirmed </MenuItem>
                  <MenuItem value='false'>Phone Is Not Confirmed</MenuItem>
                </Select>
              )}
            />
            {errors.is_phone_confirmed && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-is-phone-confirmed-select'>
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

export default AddUserForm
