import jwtDecode from 'jwt-decode'


const ACCESS_TOKEN_KEY = 'accessToken'

const isValidToken = (localToken) => {
  const decodedToken = jwtDecode(localToken)
  const currentTime = Date.now() / 1000
  return decodedToken.exp > currentTime
}


class localStorageService {
  ls = window.localStorage

  getValidAccessToken() {
    const localToken = this.ls.getItem(ACCESS_TOKEN_KEY)
    if(localToken && isValidToken(localToken)){
      return localToken
    }
  }

  setAccessToken(token) {
    this.ls.setItem(ACCESS_TOKEN_KEY, token)
  }

  removeAccessToken() {
    this.ls.removeItem(ACCESS_TOKEN_KEY)
  }

  getCurrentUser() {
    const token = this.ls.getItem(ACCESS_TOKEN_KEY)
    if(token){
      const user = jwtDecode(token).user
      return user
    }
  }

  setJsonItem(key, value) {
    value = JSON.stringify(value)
    this.ls.setItem(key, value)
    return true
  }

  getJsonItem(key) {
    let value = this.ls.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  }
}

export default new localStorageService()
