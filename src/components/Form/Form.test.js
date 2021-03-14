import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

test('check if form and all input field displays', () => {
    const { getByTestId } = render(<Form />);
    const form  = getByTestId('form');
    const firstName = getByTestId('firstName');
    const lastName = getByTestId('lastName');
    const mobile = getByTestId('mobile');
    const email = getByTestId('email');
    const fromCurrency = getByTestId('fromCurrency');
    const toCurrency = getByTestId('toCurrency');
    const amount = getByTestId('amount');
    const getQuote = getByTestId('getQuote');
    expect(form).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(mobile).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(fromCurrency).toBeInTheDocument();
    expect(toCurrency).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
    expect(getQuote).toBeInTheDocument();
})


test("First name accepts input", () => {
    const { getByTestId } = render(<Form />);
    const firstName = getByTestId('firstName');
    expect(firstName.value).toBe('');
    fireEvent.change(firstName, { target: { value: 'thamil' } });
    expect(firstName.value).toBe('thamil');
});

test("Last name accepts input", () => {
    const { getByTestId } = render(<Form />);
    const lastName = getByTestId('lastName');
    expect(lastName.value).toBe('');
    fireEvent.change(lastName, { target: { value: 'thamil' } });
    expect(lastName.value).toBe('thamil');
});

test("Email accepts input", () => {
    const { getByTestId } = render(<Form />);
    const email = getByTestId('email');
    expect(email.value).toBe('');
    fireEvent.change(email, { target: { value: 'thamil@thamil.me' } });
    expect(email.value).toBe('thamil@thamil.me');
});

test("Amount name accepts input", () => {
    const { getByTestId } = render(<Form />);
    const amount = getByTestId('amount');
    expect(amount.value).toBe('');
    fireEvent.change(amount, { target: { value: '1000' } });
    expect(amount.value).toBe('1000');
});

test("Amount name only number", () => {
    const { getByTestId } = render(<Form />);
    const amount = getByTestId('amount');
    expect(amount.value).toBe('');
    fireEvent.change(amount, { target: { value: 'faasf' } });
    expect(amount.value).toBe('');
});

test("Mobile accepts input", () => {
    const { getByTestId } = render(<Form />);
    const mobile = getByTestId('mobile');
    expect(mobile.value).toBe('');
    fireEvent.change(mobile, { target: { value: '412998365' } });
    expect(mobile.value).toBe('412998365');
});

test("Mobile accepts only number", () => {
    const { getByTestId } = render(<Form />);
    const mobile = getByTestId('mobile');
    expect(mobile.value).toBe('');
    fireEvent.change(mobile, { target: { value: 'gsdggsd' } });
    expect(mobile.value).toBe('');
});

test("To Currency accepts input", () => {
    const { getByTestId } = render(<Form />);
    const toCurrency = getByTestId('toCurrency');
    expect(toCurrency.value).toBe('');
    fireEvent.select(toCurrency, { target: { value: 'INR' } });
    expect(toCurrency.value).toBe('INR');
});

test("From Currency accepts input", () => {
    const { getByTestId } = render(<Form />);
    const fromCurrency = getByTestId('fromCurrency');
    expect(fromCurrency.value).toBe('');
    fireEvent.select(fromCurrency, { target: { value: 'AUD' } });
    expect(fromCurrency.value).toBe('AUD');
});
