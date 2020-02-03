<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="gap-setting">
      <div class="regular-size">
        <h1 class="sc-title">我的訂單</h1>
        <div class="order-table clear-space">
          <div class="ot-head">
            <div class="ot-td date">購買日期</div>
            <div class="ot-td id">訂單編號</div>
            <div class="ot-td content">訂單內容</div>
            <div class="ot-td total">總金額</div>
            <div class="ot-td status">付款狀態</div>
          </div>
          <div class="ot-row" v-for="order in orders" :key="order.id">
            <div class="ot-td date">
              <span class="mb-title">購買日期</span>
              <div class="text">{{ order.create_at | date }}</div>
            </div>
            <div class="ot-td id">
              <span class="mb-title">訂單編號</span>
              <div class="text">{{ order.id }}</div>
            </div>
            <div class="ot-td content">
              <span class="mb-title">訂單內容</span>
              <div class="text">
                <p v-for="(product,i) in order.products" :key="i">
                  {{ product.product.title }} *{{ product.qty }}
                </p>
              </div>
            </div>
            <div class="ot-td total">
              <span class="mb-title">總金額</span>
              <div class="text">{{ order.total }}</div>
            </div>
            <div class="ot-td status">
              <span class="mb-title">付款狀態</span>
              <div class="text">
                <span v-if="order.is_paid">已付款</span>
                <span v-else>尚未付款</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Pagination from '../Pagination';

export default {
    data() {
        return{
            orders: [], 
            isNew: false,
            pagination: {},
            isLoading: false,
        };
    },
    components:{
        Pagination, // 插入的元件
    },
    methods:{
        getOrders(page = 1){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                console.log(response);
                // 取得訂單和頁數
                vm.orders = response.data.orders;
                vm.pagination =response.data.pagination;
                vm.isLoading = false;
            });            
        },
    },
    computed:{
      sortOrder() {
        const vm = this;
        let newOrder = [];
        if (vm.orders.length) {
          newOrder = vm.orders.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
          });
        }
        return newOrder;
      },
    },
    created(){
        this.getOrders();
    },
}
</script>

<style lang="scss" scoped>
// order
.order-table{
    width: 100%;
    padding: 0 15px;
    margin-bottom: 25px;
    .ot-head{
        font-weight: bold;
        padding-bottom: 5px;
    }
    .ot-head, .ot-row{
        border-bottom: 1px solid #ccc;
    }
    .ot-td{
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        padding: 10px;
        &.date{
            width: 130px;
        }
        &.id{
            width: 230px;
        }
        &.total{
            width: 120px;
        }
        &.status{
            width: 100px;
        }
        &.content{
            width: calc(100% - 580px);
        }
        p{
          margin: 0;
        }
        p+p{
          margin-top: 5px;
        }
    }
    //mobile
    .mb-title{
        display: none;
    }
}
@media (max-width: 780px){
    .order-table{
        .ot-head{
            display: none;
        }
        .ot-head + .ot-row{
            border-top: 1px solid #ccc;
        }
        .ot-row{
            padding: 5px;
        }
        .ot-td{
            position: relative;
            display: block;
            padding: 5px 0;
            line-height: 1.6;
            &.date, &.id, &.content, &.total, &.status{
                width: 100%;
            }
            .text{
                padding-left: 85px;
            }
        }
        //mobile
        .mb-title{
            position: absolute;
            display: block;
            left: 0;
            top: 6px;
            color: #999;
        }
    }    
}
</style>
