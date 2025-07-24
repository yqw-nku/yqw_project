// 引入样式
import './assets/styles/variables.css';
import './assets/styles/main.css';
import './assets/styles/login.css';

// 引入组件
import LoginComponent from './components/login.js';

// API服务预留接口
// 在实际项目中，您可以这样使用：
// import { configureApi, callApi } from './services/api';
// import { login } from './services/auth';

// 创建Vue应用
new Vue({
    el: '#app',
    components: {
        'login-page': LoginComponent
    },
    template: `
        <login-page></login-page>
    `
});