import http from '@/utils/request.ts'
// 个人信息
export  const getInfo = () => {
    return http.post('api/xlx-sso/user/getInfo')
}