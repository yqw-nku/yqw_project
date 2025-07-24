<template>
  <div class="login-card w-full max-w-md mx-4 bg-white">
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-10">
      <div class="flex items-center justify-center">
        <div class="logo bg-white p-3 rounded-full shadow-lg">
          <img src="../assets/logo.svg" alt="知识库系统" class="w-12 h-12">
        </div>
      </div>
      <h1 class="text-3xl font-bold text-white text-center mt-4">知识库系统</h1>
      <p class="text-indigo-200 text-center mt-2">积累知识 · 创造价值</p>
    </div>

    <div class="px-8 py-10">
      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <div class="mb-6">
          <label for="username" class="block text-gray-700 text-sm font-medium mb-2">用户名</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <input
                type="text"
                id="username"
                v-model="username"
                class="input-field pl-10"
                placeholder="请输入用户名"
                required
            >
          </div>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-medium mb-2">密码</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input
                type="password"
                id="password"
                v-model="password"
                class="input-field pl-10"
                placeholder="请输入密码"
                required
            >
          </div>
        </div>

        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <input
                type="checkbox"
                id="remember"
                v-model="remember"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            >
            <label for="remember" class="ml-2 block text-sm text-gray-700">记住我</label>
          </div>
          <a href="#" class="text-sm text-indigo-600 hover:underline">忘记密码?</a>
        </div>

        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
        >
          <span v-if="!loading">登录系统</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            登录中...
          </span>
        </button>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            还没有账号?
            <a href="#" class="text-indigo-600 font-medium hover:underline">立即注册</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const username = ref('')
const password = ref('')
const remember = ref(false)
const errorMessage = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    await authStore.login({
      username: username.value,
      password: password.value,
      remember: remember.value
    })

    // 登录成功后跳转到仪表盘
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.message || '登录失败，请检查用户名和密码'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.logo {
  transition: transform 0.5s ease;
}

.logo:hover {
  transform: rotate(5deg);
}
</style>