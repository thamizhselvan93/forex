import React from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Form from '../components/Form/Form';
import RateCard from '../components/RateCard/RateCard';
import { ImageContainer } from './style'; 
import logo from './logo.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRateCard: false,
      error: false,
      errorMessage: '',
      rateData: {},
    };
  }

  successState = (data) => {
    this.setState({error: false});
    this.setState({rateData: data});
    this.setState({showRateCard: true});
  };

  hideRateCard = () => {
    this.setState({error: false});
    this.setState({showRateCard: false});
  };

  errorState = (data) => {
    this.setState({error: true});
    this.setState({errorMessage: data.errorMessage})
  }

  render() {
     return (
       <div>
        { !this.state.showRateCard && 
          <Container maxWidth="md">
            <Grid item xs={12} sm={12}>
              <Box textAlign='center' >
                <ImageContainer src={logo} alt="Logo" />
              </Box>
            </Grid>
            <Form handleSuccessState={this.successState} handleErrorState={this.errorState} />
            { this.state.error && <Alert severity="error">{this.state.errorMessage}</Alert>}
          </Container>
        }
        { this.state.showRateCard && !this.state.error &&      
          <Container maxWidth="sm">
            <Grid item xs={12} sm={12}>
              <Box textAlign='center' >
                <ImageContainer src={logo} alt="Logo" />
              </Box>
            </Grid>
            <RateCard forexInfo={this.state.rateData.forexData} userData={this.state.rateData.userData} handleSubmitRateCard={this.hideRateCard} />
          </Container>
        }
       </div>
     )
  }
}
export default Home;



