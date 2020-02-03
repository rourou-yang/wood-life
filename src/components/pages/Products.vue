<template>
    <div>
        <loading :active.sync="isLoading"></loading>
         <div class="text-right mt-4">
            <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="150">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td class="text-right">
                        {{ item.origin_price | currency }}
                    </td>
                    <td class="text-right">
                        {{ item.price | currency }}
                    </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
        
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" @change="uploadFile">
                        </div>
                        <img :src="tempProduct.imageUrl"
                        class="img-fluid" alt="">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" v-model="tempProduct.title">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            placeholder="請輸入分類" v-model="tempProduct.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                            placeholder="請輸入單位" v-model="tempProduct.unit">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                            placeholder="請輸入原價" v-model="tempProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            placeholder="請輸入售價" v-model="tempProduct.price">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled" v-model="tempProduct.is_enabled"
                            :true-value="1" :false-value="0">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
                </div>
            </div>
        </div>

        <!-- delete Modal -->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="delProduct"
                    >確認刪除</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';

export default {
    data(){
        return{
            products: [], 
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading: false,
            status:{
                fileUploading: false,
            },
        };
    },
    components:{
        Pagination,
    },
    methods: {
        getProducts(page = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                // 把產品資料存起來
                vm.products = response.data.products;
                vm.isLoading = false;
                vm.pagination = response.data.pagination;
                // console.log(response.data.pagination);
            });
        },
        openModal(isNew, item){
            if(isNew){
                // 新建資料的話，就把變數清空，並把 this.isNew 改為 true
                this.tempProduct = {};
                this.isNew = true;
            }else{
                // 編輯舊資料
                // 因為物件有傳參考的特性，不能直接寫 this.tempProduct = item
                // 用 Object.assign 這個寫法可以將這item的值寫進一個空物件裡
                // 並且避免二者有參考的特性
                this.tempProduct = Object.assign({}, item);
                this.isNew = false;
            };
            $('#productModal').modal('show');
        },
        openDelProductModal(item){
            const vm = this;
            $('#delProductModal').modal('show');
            // 把這個 item 的資料存下來
            vm.tempProduct = Object.assign({},item);
        },
        delProduct(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
                // 刪除完成後，關掉 modal 並更新產品列表
                $('#delProductModal').modal('hide');
                vm.isLoading = false;
                vm.getProducts();
            });
        },
        updateProduct(){
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
            let httpMethod = 'post';
            const vm = this;
            if(!vm.isNew){
                // 當不是新的，就要改用編輯商品的 API
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod = 'put';
            };
            this.$http[httpMethod](api,{ data: vm.tempProduct }).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    $('#productModal').modal('hide');
                    vm.getProducts(); //更新產品資料
                }else{
                    $('#productModal').modal('hide');
                    vm.getProducts();
                    console.log('新增失敗！');
                };
            });            
        },
        uploadFile(){
            console.log(this); //從此看如何取得「上傳檔案」的路徑
            const uploadedFile = this.$refs.files.files[0];
            const vm = this;
            const formData = new FormData();
            formData.append('file-to-upload',uploadedFile);
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
            vm.status.fileUploading = true;
            this.$http.post(url,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response.data);
                vm.status.fileUploading = false;
                // 上傳成功就把圖存起來
                if(response.data.success){
                    // vm.tempProduct.imageUrl = response.data.imageUrl;
                    // 這樣寫入會失敗，改用  vm.$set 強制寫入
                    vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
                }else{
                    this.$bus.$emit('message:push', response.data.message,'danger');
                };
            })
        },
    },
    created(){
        this.getProducts(); // 建立後觸發
    },
}
</script>