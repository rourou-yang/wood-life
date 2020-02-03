<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="gap-setting">
            <h1 class="sc-title">您的購物車</h1>
            <!-- 一般顯示 -->
            <div class="cart-frame" v-if="cart.carts.length != 0">
                <div class="cart-table clear-space">
                    <div class="tb-head">
                        <div class="tb-first">
                            <div class="field tb-img"></div>
                            <div class="field tb-title">商品名稱</div>
                        </div>
                        <div class="tb-snd">
                            <div class="field qty">數量</div>
                        </div>
                        <div class="tb-thd">
                            <div class="field total">小計</div>
                        </div>
                    </div>
                    <div class="tb-list" v-for="item in cart.carts" :key="item.id">
                        <div class="tb-first">
                            <div class="field tb-img">
                                <span class="icon-delete" @click="removerCartItem(item.id)"><img src="../../assets/images/icon-close.png" alt=""></span>
                                <div class="product-img" :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
                            </div>
                            <div class="field tb-title">
                                <div>{{ item.product.title }}</div>
                                <div class="note color-focus" v-if="item.coupon">已套用優惠券</div>
                            </div>
                        </div>
                        <div class="tb-snd">
                            <div class="field qty">
                                <span class="f-name">數量</span>
                                <span class="f-txt">{{ item.qty }}</span>
                            </div>
                        </div>
                        <div class="tb-thd">
                            <div class="field total">
                                <span class="f-name">小計</span>
                                <span class="f-txt">{{ item.final_total | currency }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="tb-foot">
                        <div class="tb-final-title">總計</div>
                        <div class="tb-price">{{ cart.total | currency }}</div>
                    </div>
                    <div class="tb-foot color-focus" v-if="cart.total != cart.final_total">
                        <div class="tb-final-title">折扣價</div>
                        <div class="tb-price">{{ cart.final_total | currency }}</div>
                    </div>
                </div>

                <div class="coupon-wrap">
                    <div class="intro">✦ 輸入折扣碼「ohya」，和 WOOD LIFE 一同歡慶開幕吧！</div>
                    <div class="coupon clear-space">
                        <input type="text" placeholder="輸入折扣碼" class="coupon-input" v-model="coupon_code">
                        <button class="coupon-button" @click="addCouponCode">使用折扣碼</button>
                    </div>
                </div>

                <div class="btn-box">
                    <router-link class="btn-sample" to="checkout">前往結帳</router-link>
                </div>
            </div>
            
            <!-- 空車時顯示 -->
            <div class="cart-frame empty" v-if="cart.carts.length == 0">
                <p>目前沒有商品喲！</p>
                <div class="btn-box">
                    <router-link to="list" class="btn-sample">繼續逛逛</router-link>
                </div>
            </div>

        </div>  
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
            cart:{
                carts:[],
            },
            isLoading: false,
            coupon_code: '',
        };
    },
    methods:{
        getCart(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.cart = response.data.data;
                console.log(response);
                vm.isLoading = false;
            });   
        },
        removerCartItem(id){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.isLoading = true;
            this.$http.delete(url).then((response) => {
                vm.$bus.$emit('updateCart');
                vm.$bus.$emit('message:push', response.data.message,'warning');
                vm.isLoading = false;
                vm.getCart();
            });   
        },
        addCouponCode(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const coupon ={
                code: vm.coupon_code,
            };
            vm.isLoading = true;
            this.$http.post(url,{ data: coupon }).then((response) => {
                vm.getCart();
                vm.$bus.$emit('message:push', response.data.message,'warning');
            });     
        },
    },
    created(){
        this.getCart();
    },
}
</script>