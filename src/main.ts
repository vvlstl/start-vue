import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/components/App.vue';
import router from "@/router";
import {VueAwesomePaginate} from "vue-awesome-paginate";
import '@/css/styles.less';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('Pagination', VueAwesomePaginate);
app.mount('#app');
