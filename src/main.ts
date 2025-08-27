import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './js/components/App.vue';
import {VueAwesomePaginate} from "vue-awesome-paginate";
import '../src/css/styles.less';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.component('Pagination', VueAwesomePaginate);
app.mount('#app');
