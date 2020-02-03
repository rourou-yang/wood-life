// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 第三方套件會放在自己寫的套件之上
import axios from 'axios';   // 主要 AJAX 套件
import VueAxios from 'vue-axios';  // 將它轉為 Vue 的套件
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  }
});


Vue.component('Loading',Loading);
// Vue.filter(自定 filter 名稱, import 的 filter 名稱)
Vue.filter('currency',currencyFilter);
Vue.filter('date',dateFilter);

//前端 axios 請求附帶 Cookies 設定
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  if(to.meta.requiresAuth){
    // 若是前往的頁面需要驗證，則需 call api check
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if(response.data.success){
        next();   // 若是登入狀態，就放行
      }else{
        next({
          path: '/login',  // 未登入狀態，就叫他去登入 
        });
      };
    });  
  }else{
    next();   // 不需驗證的話就直接放行
  };
})
