import styled from 'styled-components'

export const RateCardContainer = styled.div`
    margin: auto;
    width: 200px;
    padding: 20px;
    h2 {
        color: grey;
        font-size: 1.6rem;
    }
    p {
        color: grey;
    }
`;

export const CurrencyContainer = styled.div`
    font-size: 1.5rem;
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const InlineTextLarge = styled.span`
    color: grey;
`;

export const InlineNumLarge = styled.span`
    // color variables can be moved to common file
    color: #3B84A3;
`;

export const ExchangeRate = styled.div`
    text-align: center;
    // color variables can be moved to common file
    color: #8DC1B0; 
    font-size: 1.8rem;
    margin: 10px;
    font-weight: 700;
`;