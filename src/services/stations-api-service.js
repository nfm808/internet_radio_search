import TokenService from '../services/token-service'
import {config} from '../config'

const StationsApiService = {
  getGenres() {
    return fetch(`${config.API_ENDPOINT}genres`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getList(genre) {
    return fetch(`${config.API_ENDPOINT}list?genre=${genre}`, {
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getStationPlayUrl(stationuuid) {
    return fetch(`${config.API_ENDPOINT}audio?uuid=${stationuuid}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getServerStatus() {
    return fetch(`${config.API_ENDPOINT}status`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default StationsApiService
