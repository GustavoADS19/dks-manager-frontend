import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Login.vue';
import Registro from '../views/Registro.vue';
import Chamado from '../views/Chamado.vue';
import Painel from "../views/Painel.vue";

Vue.use(VueRouter);

  const routes = [
  {
    path: '/abrir-chamado',
    name: 'Abrir Chamado',
    component: Chamado
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/painel',
    name: 'Painel',
    component: Painel 
  },
  {
    path: '/*',
    redirect: "/abrir-chamado"
  }
];

const router = new VueRouter({
  routes
});

export default router;
