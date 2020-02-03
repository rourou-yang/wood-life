<template>
    <header>
        <div class="regular-size">
			<div class="hamburger-box" @click="openNav">
				<div class="hamburger">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
            <router-link class="h-logo" to="/">
                <img src="../assets/images/logo.png" alt="">
            </router-link>
            <nav class="h-nav">
                <ul>
                    <li>
                        <router-link class="h-link" to="/list">商品列表</router-link>
                    </li>
                    <li>
                        <router-link class="h-link" to="/order">我的訂單</router-link>
                    </li>
                </ul>
            </nav>
            <div class="h-side">
                <router-link class="features cart" to="/shopcart">
                    <span class="counter" v-if="cart.length">{{ cart.length }}</span>
                    <img src="../assets/images/icon-cart.png" alt="">
                </router-link>
                <router-link class="features" to="/login">
                    <img src="../assets/images/icon-settings.png" alt="">
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
            cart: [],
        };
    },
    methods:{
        getCart(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.cart = response.data.data.carts;
                vm.isLoading = false;
            });   
        },       
        openNav(){
            $('.hamburger, .h-nav').toggleClass('open');
        }, 
    },
    created(){
        const vm = this;
        // 這裡是為了拿到購物車內的數量
        vm.getCart();
        // 註冊「updateCart」方法，讓子元件可以觸發
        vm.$bus.$on('updateCart', () => {
            vm.getCart();
        });
    },
}
</script>