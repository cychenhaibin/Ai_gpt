// 路由表
import Home from "@views/home/Home.vue";
// import UserConfig from "@views/user-config/UserConfig.vue"
import UserConfig from "@views/user-config/index.vue"
import Test from "@views/home/Test.vue"
import Chat from "@views/chat/index.vue"
export const RoutesArray = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/userConfig',
        name: 'userConfig',
        component: UserConfig,
    },
    {
        path: '/test',
        name: 'test',
        component: Test,
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
    },
]