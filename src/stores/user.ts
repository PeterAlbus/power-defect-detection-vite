import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        id: '',
        username: '未登录',
        email: '',
        gmtCreate: ''
    }),
    actions: {
        updateUser(user:any){
            this.id=user.id
            this.username=user.username
            this.email=user.email
            this.gmtCreate=user.gmtCreate
            // console.log('user',user)
            localStorage.setItem('user',JSON.stringify(user))
        },
        logout(){
            this.id=''
            this.username='未登录'
            this.email=''
            this.gmtCreate=''
            localStorage.removeItem('user')
        }
    }
})
