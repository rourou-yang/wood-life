<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="gap-setting">
            <div class="list-banner"><h1>商品列表</h1></div>
            <div class="regular-size clear-space pd-page">
                <ul class="classify-board">
                    <li>
                        <a href="javascript:;" class="classify" 
                        :class="{'act': filterName ==='all'}"
                        @click="filterProduct('all')">所有商品</a>
                    </li>	
                    <li>
                        <a href="javascript:;" class="classify"
                        :class="{'act': filterName ==='餐具'}"
                        @click="filterProduct('餐具')">餐具</a>
                    </li>	
                    <li>
                        <a href="javascript:;" class="classify"
                        :class="{'act': filterName ==='擺飾'}"
                        @click="filterProduct('擺飾')">擺飾</a>
                    </li>	
                    <li>
                        <a href="javascript:;" class="classify"
                        :class="{'act': filterName ==='雜貨'}"
                        @click="filterProduct('雜貨')">雜貨</a>
                    </li>	
                </ul>
                <div class="product-list">
                    <div class="item-box" v-for="item in filteredProducts" :key="item.id">
                        <Card :card-data="item"></Card>
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<script>
import Card from '../Card';

export default {
    data(){
        return{
            products: [],
            filteredProducts: {},
            isLoading: false,
            filterName: 'all',
        };
    },
    components:{
        Card,
    },
    methods:{
        getProducts(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                console.log(response.data);
                vm.products = response.data.products;
                // 篩選
                if( vm.filterName === 'all' ){
                    vm.filteredProducts = Object.assign({}, vm.products);
                }else{
                    vm.filteredProducts = vm.products.filter(function(item){
                        if( item.category === vm.filterName ){
                            return true;
                        };
                    });
                };
                vm.isLoading = false;
            });
        }, 
        filterProduct(name){
            const vm = this;
            vm.filterName = name;
            vm.getProducts(vm.filterName);
        },     
    },
    created(){
        const vm = this;
        vm.getProducts();
    },
}
</script>

<style lang="scss" scoped>
// list
.list-banner{
    width: 100%;
    height: 220px;
    position: relative;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(../../assets/images/banner.jpg);
    h1{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        color: rgba(255,255,255,.8);

    }
}
.classify-board{
    display: inline-block;
    vertical-align: top;
    text-align: center;
    width: 200px;
    margin-right: 30px;
    .classify{
        display: block;
        padding: 10px 0;
        color: #D0B8AC;
        font-size: 16px;
        border: 1px solid #EFE5DC;
        transition: .3s;
        &:hover{
            background-color: rgba(239, 229, 220, 0.5);
            color: #998675;
        }
        &.act{
            background-color: #EFE5DC;
            color: #998675;
        }
    }
    li + li .classify{
        border-top: none;
    }
}
.pd-page{
    padding: 30px 10px;
}
.product-list{
    display: inline-block;
    width: calc(100% - 230px);
}
@media (max-width: 780px){
    .classify-board{
        display: block;
        width: 90%;
        margin: 0 auto 30px;
        li{
            display: inline-block;
            width: 50%;
        }
        li + li .classify{
            border-top: 1px solid #EFE5DC;
        }
    }
    .product-list{
        display: block;
        width: 90%;
        margin: auto;
    }
};
</style>
