import axios from './axios'

export const getMenu = (params) => {
  return axios.request({
    url: '/permission/get/Menu',
    method: 'post',
    data: params
  })
}

export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}