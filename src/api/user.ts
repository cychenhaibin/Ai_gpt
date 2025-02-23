import http from '@/utils/request.ts'
// 个人信息
export  const getInfo = () => {
    return http.post('api/xlx-sso/user/getInfo')
}
// 用户账户总额查询
export  const getAccountQuota = () => {
    return http.get('api/xlx-sso/account/getAccountQuota')
}
// 账户明细
export  const getAccount = (data:object) => {
    return http.get('api/xlx-sso/account',data)
}
// 修改用户头像
export  const loginReginfoHead = (data:FormData) => {
    return http.post('api/xlx-sso/user/loginReginfo/head', data)
}
//修改密码-发送验证码验证身份
export const sendCheckCode = ()=>{
    return http.post('/api/xlx-sso/user/sendCheckCode')
}
//修改密码-验证码验证
export const modifyPasswordVerification = (verificationCode:string)=>{
    return http.post('/api/xlx-sso/user/modifyPasswordVerification',{verificationCode})
}
//修改密码
export const modifyPassword = (password:string,repassword:string)=>{
    return http.post('/api/xlx-sso/user/modifyPassword',{password,repassword})
}
//用户注销
export const userLogout = ()=>{
    return http.get('/api/xlx-sso/user/logout')
}
//修改手机号发送验证码
export const sendModifyphoneCheckCode = (phone:string,movePosX:any)=>{
    return http.get(`/api/xlx-sso/user/sendModifyphoneCheckCode?phone=${phone}&movePosX=${movePosX}`)
}
//修改手机号
export const modifyPhone = (phone:string,verificationCode:string)=>{
    return http.post('/api/xlx-sso/user/modifyphone',{phone,verificationCode})
}