<template>
    <div>
        <a class="item-pic-wrap" @click.prevent="productInfo(cardData.id)">
            <div class="item-pic" :style="{backgroundImage:`url(${cardData.imageUrl})`}"></div>
        </a>
        <div class="item-title">{{ cardData.title }}</div>
        <div class="price">
            <div class="origin-p">{{ cardData.origin_price | currency }}元</div>
            <div class="sale-p">{{ cardData.price | currency }} 元</div>
        </div>
        <div class="quick-buy">
            <a class="button" @click.prevent="addToCart(cardData.id,1)">
                <img src="../assets/images/icon-cart.png" alt="">立即選購
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cardData'],
    methods:{
        productInfo(id){
            // 用 $router.push 和 取得的 id 進去某商品頁
            const vm = this;
            vm.$router.push(`product/${id}`);
        },
        addToCart(id,qty){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const cart = {  // 定義資料結構
                product_id: id,
                qty // 這是ｅs6 的屬性縮寫，原為 qty:qty
            };
            vm.isLoading = true; 
            this.$http.post(url,{ data: cart }).then((response) => {
               console.log(response);
                vm.$bus.$emit('updateCart');
                vm.$bus.$emit('message:push', response.data.message,'warning');
                vm.isLoading = false;
            });            
        },
    },
}
</script>