<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >編輯</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: { // 編輯時暫存用
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: '',
      },
      due_date: new Date(),
      isNew: false,
      isLoading: false,
    };
  },   
  watch: {
    due_date() {
      const vm = this;
      // 因為一般 timestamp 取得的是「秒數」，但在 JavaScript 中要帶入的是「毫秒」
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  }, 
  methods:{
      getCoupons(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
            // 把優惠券資訊存起來
            vm.coupons = response.data.coupons;
            vm.isLoading = false;
        });
      },
      openCouponModal(isNew, item){
          const vm = this;
          vm.isNew = isNew;
          $('#couponModal').modal('show');
          if(vm.isNew){
            vm.tempCoupon = {};
          }else{
              vm.tempCoupon = Object.assign({}, item);
              const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
              vm.due_date = dateAndTime[0];
          };
      },
      updateCoupon(){
        const vm = this;
        vm.isLoading = true;
        if(vm.isNew){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            this.$http.post(api, { data: vm.tempCoupon }).then((response) => {
                $('#couponModal').modal('hide');
                vm.isLoading = false;
                vm.getCoupons();
            });
        }else{
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
            this.$http.put(api, { data: vm.tempCoupon }).then((response) => {
                $('#couponModal').modal('hide');
                vm.isLoading = false;
                vm.getCoupons();
            });
        };
      },
  }, 
  created(){
      this.getCoupons();
  },
}
</script>
