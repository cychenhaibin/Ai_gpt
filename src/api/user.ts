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
export  const getAccount = () => {
    return http.get('api/xlx-sso/account')
}