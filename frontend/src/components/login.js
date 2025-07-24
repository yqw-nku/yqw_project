// 登录组件模块
export default {
    template: `
        <div class="login-container">
            <div class="login-left">
                <h2>欢迎来到知识库系统</h2>
                <p>登录您的账户，探索丰富的知识资源，管理您的个人文档库。</p>
                
                <div class="features">
                    <div class="feature">
                        <i class="fas fa-book"></i>
                        <div>
                            <h3>知识整合</h3>
                            <p>集中管理所有学习资料与文档</p>
                        </div>
                    </div>
                    <div class="feature">
                        <i class="fas fa-shield-alt"></i>
                        <div>
                            <h3>安全可靠</h3>
                            <p>企业级安全措施保护您的数据</p>
                        </div>
                    </div>
                    <div class="feature">
                        <i class="fas fa-sync-alt"></i>
                        <div>
                            <h3>多设备同步</h3>
                            <p>随时随地访问您的知识库</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="login-right">
                <div class="logo">
                    <h1><i class="fas fa-brain"></i> KnowBase</h1>
                    <p>您的个人知识管理中心</p>
                </div>
                
                <div v-if="statusMessage" :class="['status-message', statusClass]">
                    {{ statusMessage }}
                </div>
                
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="username">用户名</label>
                        <div class="input-with-icon">
                            <i class="fas fa-user"></i>
                            <input 
                                type="text" 
                                id="username" 
                                class="form-control" 
                                placeholder="请输入用户名" 
                                v-model="username"
                                :class="{ 'input-error': errors.username }"
                            >
                        </div>
                        <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">密码</label>
                        <div class="input-with-icon">
                            <i class="fas fa-lock"></i>
                            <input 
                                type="password" 
                                id="password" 
                                class="form-control" 
                                placeholder="请输入密码" 
                                v-model="password"
                                :class="{ 'input-error': errors.password }"
                            >
                        </div>
                        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
                    </div>
                    
                    <div class="remember-forgot">
                        <div class="remember-me">
                            <input type="checkbox" id="remember" v-model="rememberMe">
                            <label for="remember">记住我</label>
                        </div>
                        <a href="#" class="forgot-password">忘记密码?</a>
                    </div>
                    
                    <button type="submit" class="btn" :disabled="loading">
                        <span v-if="!loading">登录</span>
                        <span v-else><i class="fas fa-spinner fa-spin"></i> 登录中...</span>
                    </button>
                </form>
                
                <div class="divider">
                    <span>或使用其他方式登录</span>
                </div>
                
                <div class="social-login">
                    <div class="social-btn">
                        <i class="fab fa-google"></i>
                    </div>
                    <div class="social-btn">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="social-btn">
                        <i class="fab fa-microsoft"></i>
                    </div>
                </div>
                
                <div class="register-link">
                    还没有账户? <a href="#">立即注册</a>
                </div>
                
                <div class="api-config">
                    <h3><i class="fas fa-cog"></i> API配置</h3>
                    <p>配置后端API地址以连接到您的服务器。默认地址为 <code>{{ defaultApiUrl }}</code></p>
                    <div class="api-url">
                        <input type="text" v-model="apiUrl" placeholder="输入API端点">
                        <button @click="saveApiConfig">保存</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,
            errors: {
                username: '',
                password: ''
            },
            loading: false,
            statusMessage: '',
            statusClass: '',
            apiUrl: '',
            defaultApiUrl: '/api/v1/auth/login'
        };
    },
    methods: {
        validateForm() {
            this.errors = { username: '', password: '' };
            let isValid = true;

            if (!this.username.trim()) {
                this.errors.username = '请输入用户名';
                isValid = false;
            }

            if (!this.password) {
                this.errors.password = '请输入密码';
                isValid = false;
            } else if (this.password.length < 6) {
                this.errors.password = '密码长度至少为6位';
                isValid = false;
            }

            return isValid;
        },

        async login() {
            if (!this.validateForm()) return;

            this.loading = true;
            this.statusMessage = '';

            try {
                // 在实际应用中，这里将调用API服务
                // const response = await authService.login(this.username, this.password);

                // 模拟API响应
                if (this.username === 'admin' && this.password === 'password123') {
                    // 模拟成功响应
                    const response = {
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                        user: {
                            id: 1,
                            name: '管理员',
                            email: 'admin@example.com'
                        }
                    };

                    this.handleLoginSuccess(response);
                } else {
                    // 模拟错误响应
                    throw new Error('用户名或密码不正确');
                }
            } catch (error) {
                this.handleLoginError(error);
            } finally {
                this.loading = false;
            }
        },

        handleLoginSuccess(response) {
            this.statusMessage = '登录成功！正在跳转...';
            this.statusClass = 'status-success';

            // 在实际应用中，这里将保存token
            // authService.saveAuth(response.token, this.rememberMe);

            // 在实际应用中，这里将跳转到主页面
            setTimeout(() => {
                // router.push('/dashboard');
                this.statusMessage = '跳转成功！在实际应用中，这里将进入主界面。';
            }, 2000);
        },

        handleLoginError(error) {
            const message = error.response?.data?.message || error.message || '登录失败，请稍后再试';
            this.statusMessage = message;
            this.statusClass = 'status-error';
        },

        saveApiConfig() {
            // 在实际应用中，这里将调用API配置服务
            // apiService.configureApi(this.apiUrl);

            localStorage.setItem('apiEndpoint', this.apiUrl);
            this.statusMessage = 'API配置已保存！';
            this.statusClass = 'status-success';
            setTimeout(() => {
                this.statusMessage = '';
            }, 3000);
        }
    },
    mounted() {
        // 从本地存储加载保存的API配置
        const savedApiUrl = localStorage.getItem('apiEndpoint');
        if (savedApiUrl) {
            this.apiUrl = savedApiUrl;
        }
    }
};