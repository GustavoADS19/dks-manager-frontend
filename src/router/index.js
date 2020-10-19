import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Login.vue';
import Registro from '../views/Registro.vue';
import Chamado from '../views/Chamado.vue';
import ListagemDeChamados from "../views/ListagemDeChamados.vue";

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
    path: '/listagem-de-chamados',
    name: 'Listagem de Chamados',
    component: ListagemDeChamados 
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
