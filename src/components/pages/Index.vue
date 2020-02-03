<template>
    <div>
        <div class="gap-setting">
            <Slider></Slider>
            <div class="types-wrap">
                <router-link to="list" class="type-box first">
                    <div class="pic pic1"></div>
                    <span class="type-name">餐具</span>
                </router-link>
                <router-link to="list" class="type-box">
                    <div class="pic pic2"></div>
                    <span class="type-name">擺飾</span>
                </router-link>
                <router-link to="list" class="type-box">
                    <div class="pic pic3"></div>
                    <span class="type-name">雜貨</span>
                </router-link>
            </div>

            <div class="regular-size clear-space item-list">
                <div class="item-box" v-for="item in list" :key="item.id">
                    <Card :card-data="item"></Card>
                </div>
            </div>            
        </div>       
    </div>
</template>

<script>
import Card from '../Card';
import Slider from '../IndexSlider';

export default {
    data(){
        return{
            list: [],
        };
    },
    components:{
        Card,
        Slider,
    },
    methods:{
        getProduct(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            this.$http.get(url).then((response) => {
                let arry = response.data.products;
                // 只取六筆資料
                vm.list = arry.slice(3,9);
            });
        },
    },
    created(){
        this.getProduct();
    },
}
</script>

<style lang="scss" scoped>
// index
.types-wrap{
    width: 90%;
    max-width: 900px;
    margin: 30px auto 30px;
    font-size: 0;
}
.type-box{
    width: calc((100% - 40px)/3);
    display: inline-block;
    vertical-align: top;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
    transform: scale(1);
    transition: .3s;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
    overflow: hidden;
    &:before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.2);
    }
    &:hover{
        transform: scale(0.95);
    }
    .pic{
        width: 100%;
        padding-bottom: 60%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .pic1{
        background-image: url(../../assets/images/type-pic.jpg);
    }
    .pic2{
        background-image: url(../../assets/images/type-pic2.jpg);
    }
    .pic3{
        background-image: url(../../assets/images/type-pic3.jpg);
    }
    .type-name{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        font-size: 20px;
        letter-spacing: 5px;
        text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
    }
}
.type-box + .type-box{
    margin-left: 20px;
} 
.item-list{
    margin: 20px auto;
    padding: 0 10px;
}
@media (max-width: 780px){
.type-box{
    width: calc((100% - 40px)/2);
    margin-left: 0;
    &.first{
        display: block;
        margin: 0 auto 15px;
    }
}  
.type-box + .type-box{
    margin: 0 10px ;
}  
}
</style>
