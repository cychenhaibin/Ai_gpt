import http from '@/utils/request.ts'
// 查询充值套餐
export const getpackage = () => {
    return http.get('api/xlx-sso/account/getpackage')
}

//支付套餐-pc端支付宝二维码支付
export const alipayScanPay = (data:number)=>{
    return http.get(`/api/xlx-sso/alipay/scanPay?tokensPriceId=${data}`)
}

//支付套餐-pc端口微信二维码支付
export const wxpayNative = (data:number)=>{
    return http.get(`/api/xlx-sso/wxpay/native?tokensPriceId=${data}`)
}

export const tokensOrder = (data:number) => {
    return http.get(`api/xlx-sso/tokensOrder/get?orderNo=${data}`)
}