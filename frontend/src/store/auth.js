import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)
    const router = useRouter()

    // 登录方法
    const login = async (credentials) => {
        try {
            const response = await axios.post('/api/login', credentials)

            // 保存token
            token.value = response.data.token

            // 根据"记住我"选项选择存储方式
            if (credentials.remember) {
                localStorage.setItem('authToken', response.data.token)
            } else {
                sessionStorage.setItem('authToken', response.data.token)
            }

            // 获取用户信息
            await fetchUser()

            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || '登录失败')
            } else {
                throw new Error('网络错误，请稍后重试')
            }
        }
    }

    // 获取用户信息
    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
            user.value = response.data
        } catch (error) {
            logout()
            throw error
        }
    }

    // 登出方法
    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('authToken')
        sessionStorage.removeItem('authToken')
        router.push('/login')
    }

    // 检查登录状态
    const checkAuth = () => {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
        if (storedToken) {
            token.value = storedToken
            return true
        }
        return false
    }

    return {
        user,
        token,
        login,
        logout,
        checkAuth,
        fetchUser
    }
})