import React from 'react';
import { Box, Button, Grid, TextField, InputLabel, MenuItem, Select, InputAdornment  } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as yup from 'yup';
import currencies from "../../constants/currencies.json";

export default function Form(props) {

  // Mobile number regex  
  const mobileRegExp = /^[0-9]{9,10}$/

  //  Yup Validation 
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email'),
    firstName: yup
      .string('Enter your first name')
      .required('First Name is required'),
    lastName: yup
      .string('Enter your last name')
      .required('Last Name is required'),
    mobileNumber: yup
      .string('Enter your Mobile number')
      .matches(mobileRegExp, 'Mobile number is not valid'),
    amount: yup
      .string('Enter the Amount')
      .required('Amount is required'),
    fromCurrency: yup
      .string('Enter the From Currency')
      .required('From Currency is required'),
    toCurrency: yup
      .string('Enter the To Currency')
      .required('To Currency is required')
  });

  // formik initialization
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      amount: '',
      toCurrency: '',
      fromCurrency: ''
    },
    validationSchema: validationSchema,
    // TODO  API Call can be moved to separate file under services 
    onSubmit: (values) => {
      fetch("https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/" + values.fromCurrency + "/" + values.toCurrency + "/" + values.amount + "?format=json")
      .then(res => res.json())
      .then(
        (result) => {
            result.Errors ? props.handleErrorState({ error: true, errorMessage: result.Message }) : props.handleSuccessState({forexData: result, userData: values});
        },
        (error) => {
            // TODO Error handling can be added
        });
    },
  });

  const useStyles = makeStyles(theme => ({
    button: {
      borderRadius: "5em",
      backgroundColor: "#367AAD",
      '&:hover': {
        backgroundColor: "#367AAD",
       },
    }
  }));

  const classes = useStyles();

  return (
      <form onSubmit={formik.handleSubmit} data-testid="form">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {/* TODO Component can be reused by creating new components and using them as child component */}
            <TextField 
              id="firstName"
              required 
              fullWidth 
              label="First Name" 
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              inputProps={{
                'data-testid': 'firstName'
              }}
            /> 
          </Grid>
           {/* TODO Component can be reused */}
          <Grid item xs={12} sm={6}>
            <TextField 
              id="lastName"
              required 
              fullWidth 
              label="Last Name" 
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              inputProps={{
                'data-testid': 'lastName'
              }}
            /> 
          </Grid>

          <Grid item xs={12}>
            <TextField 
              id="email"
              fullWidth 
              label="Email" 
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              inputProps={{
                'data-testid': 'email'
              }}
            />             
          </Grid>

          <Grid item xs={12}>
            <TextField 
                id="mobileNumber"
                fullWidth 
                label="Mobile Number"
                type="number"
                inputMode="numeric" 
                variant="outlined"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                inputProps={{
                    'data-testid': 'mobile'
                  }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">+61</InputAdornment>,
                }}
              />             
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel fullWidth required id="fromCurrency-label">From Currency</InputLabel>
            <Select
              labelId="fromCurrency-label"
              id="fromCurrency"
              fullWidth
              variant="outlined"
              type="number"
              inputMode="numeric"
              value={formik.values.fromCurrency}
              onChange={formik.handleChange("fromCurrency")}
              error={formik.touched.fromCurrency && Boolean(formik.errors.fromCurrency)}
              helperText={formik.touched.fromCurrency && formik.errors.fromCurrency}
              inputProps={{
                'data-testid': 'fromCurrency'
              }}
              >    
              {currencies.map(currency => (
                <MenuItem key={currency.value} value={currency.value}>
                  {currency.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel fullWidth required id="toCurrency-label">To Currency</InputLabel>
            <Select
              labelId="toCurrency-label"
              id="toCurrency"
              fullWidth
              variant="outlined"
              type="number"
              inputMode="numeric"
              value={formik.values.toCurrency}
              onChange={formik.handleChange("toCurrency")}
              error={formik.touched.toCurrency && Boolean(formik.errors.toCurrency)}
              helperText={formik.touched.toCurrency && formik.errors.toCurrency}
              inputProps={{
                'data-testid': 'toCurrency'
              }}
              >
              {currencies.map(currency => (
                <MenuItem key={currency.value} value={currency.value}>
                  {currency.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
              id="amount"
              label="Amount"
              required 
              fullWidth 
              type="number"
              inputMode="numeric"  
              variant="outlined"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              inputProps={{
                'data-testid': 'amount'
              }}
            /> 
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box textAlign='center' >
                <Button color="primary" className={classes.button} data-testid="getQuote" size="large" variant="contained"  type="submit">
                Get Quote
                </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

  );
}