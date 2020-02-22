import Mock from 'mockjs'
import data from './data.json'

Mock.mock('http//196.128.6.23/api/food',{
    code: 0,
    data: data.foods
})
Mock.mock('http//196.128.6.23/api/comment',{
    code: 0,
    data: data.ratings
})
Mock.mock('http//196.128.6.23/api/seller',{
    code: 0,
    data: data.seller
})