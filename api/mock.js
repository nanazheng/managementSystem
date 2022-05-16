import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'
import userApi from './mockServeData/user.js'

Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/user/createUser', 'post', userApi.createUser)
Mock.mock(/user\/updateUser/, 'post', userApi.updateUser)
Mock.mock(/user\/getUserLists/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'post', userApi.deleteUser)