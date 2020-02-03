<template>
    <div>
        <Header></Header>
        <Alert></Alert>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './Header';
import Alert from './AlertMessage';
import Footer from './Footer';

export default {
    components:{
        Header,
        Alert,
        Footer,
    },
}
</script>