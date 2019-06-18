/**
 * 请求文件
 *  加载动画处理
 */
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './router'

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        // spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading()

    if (localStorage.eletoken) {
        //设置请求统一的请求header
        config.headers.Authorization = localStorage.eletoken
    }

    return config
}, error => {
    return Promise.reject(error)
})

//相应拦截
axios.interceptors.response.use(response => {
    //结束动画
    endLoading()
    return response
}, error => {
    //错误提醒
    endLoading()
    Message.error(error.response.data)
    //获取错误状态码
    const { status } = error.response
    if (status == 401) {
        Message.error('token失效，请重新登陆！')
        //清除token
        localStorage.removeItem('eletoken')
        //跳转到登陆页面
        router.push("/login")
    }
    return Promise.reject(error)
})


export default axios