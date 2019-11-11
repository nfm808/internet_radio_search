export const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://myapidomain.com'
  : process.env.REACT_APP_TEST_PAYMENT_URI;

export const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_publishable'
  : process.env.REACT_APP_STRIPE_KEY_TEST;

export const config = {
  API_ENDPOINT: process.env.REACT_APP_API_TEST,
  TOKEN_KEY: ''
}