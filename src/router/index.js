import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'
import CustomerOrder from '@/components/pages/CustomerOrder'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Orders from '@/components/pages/Orders'
import Coupons from '@/components/pages/Coupons'

// front
import Home from '@/components/Home'
import Index from '@/components/pages/Index'
import List from '@/components/pages/List'
import Order from '@/components/pages/Order'
import Product from '@/components/pages/Product'
import ShoppingCart from '@/components/pages/ShoppingCart'
import Checkout from '@/components/pages/Checkout'
import CheckoutPay from '@/components/pages/CheckoutPay'

Vue.use(Router)

export default new Router({
	// 切換路由時回到畫面頂部
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Index',
          component: Index,
        },    
        {
          path: 'list',
          name: 'List',
          component: List,
        },  
        {
          path: 'order',
          name: 'Order',
          component: Order,
        }, 
        {
          path: 'product/:id', // 用動態路由去商品明細頁
          name: 'Product',
          component: Product,
        },     
        {
          path: 'shopcart',
          name: 'ShoppingCart',
          component: ShoppingCart,
        },    
        {
          path: 'checkout',
          name: 'Checkout',
          component: Checkout,
        },   
        {
          path: 'checkout/:orderID', // 用動態路由去結帳頁
          name: 'CheckoutPay',
          component: CheckoutPay,
        }, 
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: '/test',
      name: 'Dashboard2',
      component: Dashboard,
      children:[
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderID', //動態路由切換
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }
      ]
    },
  ]
})
