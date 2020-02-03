<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="gap-setting">
            <div class="product-cont">
                <div class="side left">
                    <div class="pd-pic" :style="{backgroundImage:`url(${product.imageUrl})`}"></div>
                </div>
                <div class="side right">
                    <h1>{{ product.title }}</h1>
                    <div class="tag">{{ product.category }}</div>
                    <div class="content">
                        {{ product.description }}
                    </div>
                    <div class="price">
                        <div class="origin-p">原價 {{ product.origin_price | currency }} 元</div>
                        <div class="sale-p">{{ product.price | currency }} 元</div>
                    </div>
                    <select name="" class="pd-selector" v-model="product.buyNum" >
                        <option v-for="num in 10" :key="num" :value="num">選購 {{ num }} {{product.unit}}</option>
                    </select>
                    <a href="javascript:;" class="btn-buy" @click.prevent="addtoCart(product.id, product.buyNum)">
                        <img src="../../assets/images/icon-cart.png" alt="">加入購物車
                    </a>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    data(){
        return{
            productID: '', // 這個商品 id
            product:{}, // 裝這個產品的資料
            isLoading: false,
        };
    },
    methods:{
        getProduct(id){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.isLoading = true; 
            this.$http.get(url).then((response) => {
                vm.product = response.data.product;
                // 預設 選購數量是一
                vm.$set(vm.product, "buyNum", 1);
                vm.isLoading = false;
            });
        },
        addtoCart(id,qty){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const cart = {  // 定義資料結構
                product_id: id,
                qty // 這是ｅs6 的屬性縮寫，原為 qty:qty
            };
            vm.isLoading = true; 
            this.$http.post(url,{ data: cart }).then((response) => {
            //    console.log(response);
                vm.$bus.$emit('updateCart');
                vm.$bus.$emit('message:push', response.data.message,'warning');
                vm.isLoading = false;
            });

        },
    },
    created(){
        const vm = this;
        // 取得網址參數：把商品 id 存起來
        vm.productID = vm.$route.params.id;
        vm.getProduct(vm.productID);
    },
}
</script>


<style lang="scss" scoped>
// product
.product-cont{
    width: 100%;
    max-width: 900px;
    margin: 20px auto;
    padding: 0 15px;
    font-size: 0;
    .side{
        display: inline-block;
        vertical-align: top;
        width: calc((100% - 20px)/2);
        font-size: 16px;
    }
    .side + .side{
        margin-left: 20px;
    }
    .pd-pic{
        width: 100%;
        padding-bottom: 100%;
        background-image: url(../../assets/images/sample-pic.jpg);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    h1{
        position: relative;
        font-size: 28px;
        margin: 0 0 15px 0;
        padding-left: 25px;
        &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 2px;
            display: block;
            width: 14px;
            height: 36px;
            background-color: #736357;
        }
    }
    .tag{
        display: inline-block;
        padding: 5px 12px;
        background-color: #FFEDE3;
        color: #534741;
        font-size: 14px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .content{
        line-height: 1.6;
        color: #666;
        margin-bottom: 20px;
    }
    .price{
        position: relative;
        text-align: right;
    }
    .origin-p{
        position: absolute;
        left: 0;
        bottom: 0;
        color: #B3B3B3;
        text-decoration: line-through;
    }
    .sale-p{
        font-size: 20px;
        color: #C1272D;
    }
    .pd-selector{
        display: block;
        width: 100%;
        height: 40px;
        font-size: 16px;
        border: 1px solid #B3B3B3;
        margin: 10px 0;
    }
    .btn-buy{
        display: block;
        text-align: center;
        font-size: 18px;
        background-color: #FFBF69;
        padding: 15px 0;
        border-radius: 5px;
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        position: relative;
        overflow: hidden;
        &:before{
            content: "";
            position: absolute;
            z-index: -1;
            left: 0;
            right: 100%;
            bottom: 0;
            background: #efaf5a;
            height: 4px;
            transition-property: right;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;            
        }
        &:hover:before, &:focus:before, &:active:before{
            right: 0;
        }
        &:hover{
            color: #333;
        }
        img{
            width: 22px;
            vertical-align: -3px;
            margin-right: 6px;
        }
    }
} 
@media (max-width: 780px){
.product-cont{
    .side{
        display: block;
        width: 95%;
        margin: auto;
    }
    .side + .side{
        margin-left: auto;
        margin-top: 20px;
    }
}

};   
</style>
