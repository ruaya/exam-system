const IS_DEV = process.env.NODE_ENV !== 'production'
const API_URL = IS_DEV ? 'http://localhost:8000/api/' : ''

export default {
  IS_DEV,
  API_URL
}