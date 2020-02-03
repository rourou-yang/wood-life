<template>
    <div>
        <div class="gap-setting">
            <div class="process-step clear-space">
                <div class="step active">1 填寫資訊</div>
                <div class="step">2 確認付款</div>
                <div class="step">3 完成訂單</div>
            </div>
            <div class="cart-frame">
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
            </div>

            <div class="cart-frame">
                <form class="col-md-12" @submit.prevent="createOrder">
                    <p class="sc-title">收件人資訊</p>
                    <div class="form-group">
                    <label for="useremail">Email</label>
                    <input type="email" class="form-control" name="email" id="useremail"
                        :class="{'is-invalid': errors.has('email')}" v-model="form.user.email"
                        v-validate="'required'" placeholder="請輸入 Email" required>
                    <span class="text-danger" v-if="errors.has('email')">
                        {{ errors.first('email') }}
                    </span>
                    </div>
                
                    <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input type="text" class="form-control" name="name" id="username"
                        :class="{'is-invalid': errors.has('name')}"
                        v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
                    <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                    </div>
                
                    <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                    </div>
                
                    <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="text" class="form-control" name="address" 
                        :class="{'is-invalid': errors.has('address')}"
                        id="useraddress" v-model="form.user.address"
                        placeholder="請輸入地址" v-validate="'required'">
                    <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                    </div>
                
                    <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="5" v-model="form.message"></textarea>
                    </div>
                    <div class="text-center">
                        <button class="btn-sample">送出訂單</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cart:{
                carts:[],
            },
            form:{
                user:{
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
        };
    },
    methods: {
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
        createOrder(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.$http.post(url,{ data: vm.form }).then((response) => {
                        // 成功送出訂單的話
                        if(response.data.success){
                            vm.$bus.$emit('updateCart');
                            vm.$bus.$emit('message:push', response.data.message,'warning');
                            vm.$router.push(`checkout/${response.data.orderId}`);
                        };
                    });
                } else{
                    vm.$bus.$emit('updateCart');
                    vm.$bus.$emit('message:push', '欄位不完整','danger');
                };
            });
        },        
    },
    created(){
        this.getCart();
    },
}
</script>