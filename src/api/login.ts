import http from '@/utils/request.ts'
// 获取图片验证码
export  const getImageCode = (data: any) => {
    return http.post('api/xlx-sso/user/getImageCode',data)
}
// 校验滑块图形验证码并发送验证码
export const verifyImageCode = (data: any) => {
    return http.post('api/xlx-sso/user/verifyImageCode',data)
}

// 验证码登录
export const loginVerification = (data: any) => {
    return http.post('api/xlx-sso/user/loginVerification',data)
}
// 微信登录
export const getLoginParam = () => {
    return http.get('api/xlx-sso/oauth/wechat/getLoginParam')
}