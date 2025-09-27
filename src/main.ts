import {createApp} from 'vue'
import {createPinia} from "pinia";
import App from './components/App.vue'
import '@/css/styles.less'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
