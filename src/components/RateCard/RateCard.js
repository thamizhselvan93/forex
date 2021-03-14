import React from 'react';
import { Card, Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { CurrencyContainer, ExchangeRate, InlineTextLarge, InlineNumLarge, RateCardContainer } from './style';

export default function RateCard(props) {
    
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
        <Card>
            <RateCardContainer data-testid="rateCardContainer">
                {/*TODO  Text can be moved to en.json for internationalization */}
                <h2> OFX Customer Rate </h2>
                <ExchangeRate>  {props.forexInfo.CustomerRate} </ExchangeRate>
                <p>From </p> 
                <CurrencyContainer>
                    <InlineTextLarge> {props.userData.fromCurrency}  </InlineTextLarge>  <InlineNumLarge> {props.userData.amount}</InlineNumLarge>
                </CurrencyContainer>
                <p> To </p>
                <CurrencyContainer>
                    <InlineTextLarge> {props.userData.toCurrency}  </InlineTextLarge>  <InlineNumLarge> {props.forexInfo.CustomerAmount}</InlineNumLarge>
                </CurrencyContainer>  
                <Grid item xs={12} sm={12}>
                    <Box textAlign='center' >
                        <Button color="primary" className={classes.button} size="large" variant="contained"  onClick={() => { props.handleSubmitRateCard(); }}>
                            Start New Quote
                        </Button>
                    </Box>
                </Grid>
            </RateCardContainer>

        </Card>
    );
}