import axios from 'axios'

export const host="http://10.3.133.37:8088"
export const apiUrl = host +'/api'

const instance =axios.create({
    baseURL:apiUrl
})

// 拦截
instance.interceptors.request.use(function(config){
    let userinfo = localStorage.getItem("userinfo")
    try{
        userinfo = JSON.parse(userinfo) || {}
    }catch(err){
        userinfo ={}
    }
    if(userinfo.authorization){
        config.headers.Authorization = userinfo.authorization
    }
    return config;
},function(error){
    return Promise.reject(error)
})

export default instance