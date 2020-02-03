<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': !pages.has_pre}">
                <a class="page-link" href="#" aria-label="Previous"
                    @click.prevent="updatePage(pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item" v-for="page in pages.total_pages" :key="page"
                :class="{'active': pages.current_page === page}">
                <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': !pages.has_next}">
                <a class="page-link" href="#" aria-label="Next"
                    @click.prevent="updatePage(pages.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Layout',
    props: ['pages'], // 外層的資料傳遞進來，改頭換面後，在內層專用的屬性名稱
    data() {
        return {
        msg: 'Welcome to Your Vue.js App',
        uid: '',
        };
    },
    methods:{
        updatePage(page){
            // 當按鈕被 click 觸發 update()，
            // 這時再使用 $emit 將 'emitPages' （元件上自定義的事件名稱）往外送
            this.$emit('emitPages',page);
        },
    },
}
</script>

<style lang="scss" scoped>
.pagination{
  margin: 25px 0;  
  justify-content: center;
}
</style>
