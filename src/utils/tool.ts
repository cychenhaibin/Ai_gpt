import {customRef, ref} from 'vue'
// 防抖
export function debounce(value:string, delay:number){
    let timer
    return customRef((track,trigger)=>{
        let timeout:any = ref<number | null>(null)
        return {
            get() {
                track()    // 追踪依赖
                return value
            },
            set(newValue){
                clearTimeout(timeout)
                timeout = setTimeout(()=>{
                    value = newValue
                    trigger()   // 触发更新
                },delay)
            }
        }
    })
}

// 节流
export function throttle(func:Function,delay:number){
    let oo = true
    return function(){
        if(!oo) return
        oo = false
        func.apply(this, arguments)
        setTimeout(()=>{
            oo = true
        },delay)
    }
}