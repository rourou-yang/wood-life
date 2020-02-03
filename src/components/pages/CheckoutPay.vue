<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="gap-setting">
            <div class="process-step clear-space">
                <div class="step">1 填寫資訊</div>
                <div class="step" :class="{'active': order.is_paid == false}">2 確認付款</div>
                <div class="step" :class="{'active': order.is_paid}">3 完成訂單</div>
            </div>
            <div class="cart-frame">
                <form class="col-md-12" @submit.prevent="payOrder">
                <table class="table">
                    <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>小計</th>
                    </thead>
                    <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                        <td class="align-middle">{{ item.product.title }}</td>
                        <td class="align-middle">{{ item.qty }}</td>
                        <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="2" class="text-right">總計</td>
                        <td class="text-right">{{ order.total }}</td>
                    </tr>
                    </tfoot>
                </table>

                <table class="table">
                    <tbody>
                    <tr>
                        <th width="150">Email</th>
                        <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                        <th>付款狀態</th>
                        <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="text-center" v-if="order.is_paid === false">
                    <button class="btn btn-danger" @click="payOrder">確認付款去</button>
                </div>
                <div class="text-center" v-if="order.is_paid === true">
                    <router-link class="btn-sample" to="/list">繼續逛逛</router-link>
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
      order: {
        user:{},
      },
      orderID: '',
      isLoading: false,
    };
  },
  methods: {
    getOrder(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderID}`;
      this.$http.get(url).then((response) => {
          console.log(response);
          vm.order = response.data.order;
      });           
    },
    payOrder(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderID}`;
      vm.isLoading = true;  
      this.$http.post(url).then((response) => {
        if(response.data.success){
          // 付款成功就重 load 資料，並顯示訊息 
          vm.getOrder();
          vm.$bus.$emit('message:push', response.data.message,'warning');
          vm.isLoading = false;  
        };
      });       
    },
  },
  created(){
    const vm = this;
    vm.orderID = vm.$route.params.orderID;// 取得 訂單ID
    vm.getOrder();
  },
}
</script>