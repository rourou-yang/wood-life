<template>
    <div>
        <div class="swiper-container ind-banner-wrap">
            <swiper :options="swiperOption" class="ind-banner-wrap">
                <swiper-slide class="ind-banner pic1">
                    <p>Decorate your home</p>
                </swiper-slide>
                <swiper-slide class="ind-banner pic2">
                    <p>木質 × 溫度</p>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
 
import { swiper, swiperSlide } from 'vue-awesome-swiper'
 
export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
            autoplay: {
                delay: 5000,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        }
      }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style lang="scss" scoped>
.ind-banner{
    width: 100%;
    position: relative;
    padding-bottom: 40%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    &.pic1{
        background-image: url('../assets/images/ind-banner.jpg');
    }
    &.pic2{
        background-image: url('../assets/images/ind-banner2.jpg');
    }
    p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        opacity: 0.8; 
        font-size: 40px;
        text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    }
}
.swiper-pagination{
    .swiper-pagination-bullet{
        background: #fff;
        opacity: 0.3;
    }
    .swiper-pagination-bullet-active{
        background: #ffc67a;
    }
}
@media (max-width: 780px){
.ind-banner{
    padding-bottom: 50%;
}
}
</style>
