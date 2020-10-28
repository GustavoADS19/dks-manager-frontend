<template>
    <div class="listagem-chamados">
        <h1>Listagem de demandas</h1>
        <button v-if="loaded == true" class="refresh-button" v-on:click="refresh()">Recarregar lista</button>
        <h2 v-if="loaded == false">Carregando documentos..</h2>
        <ul v-if="loaded == true">
            <li v-for="(item, index) in items" v-bind:key="index" v-bind:data-id="item._id" v-bind:class="item.agencia.toLowerCase()">
                <hr>
                <h3>Material solicitado: {{ item.material }}</h3>
                <h4>Demandante: {{ item.demandante }}</h4>
                <h6>Data limite de entrega: {{ item.dataLimite }}</h6>
                <p>Descrição da demanda: {{ item.comentario }}</p>
                <h5>Andamento: <b class="status">{{ item.status }}</b></h5>
                <img v-if="item.agencia == 'DKS'" src="../assets/dks.png">
                <img v-if="item.agencia == 'VMO'" src="../assets/vmo.png">
                <img v-if="item.agencia == 'GLW'" src="../assets/glw.png">
                <hr>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .listagem-chamados{
        padding: 20px;
        background-image: url("../assets/background.png");
        background-attachment: fixed;
        background-size: 100vw;
        
    }

    .listagem-chamados h1{
        margin-bottom: 20px;
    }

    .listagem-chamados h5{
        margin: 25px 0;
    }

    .listagem-chamados li {
        list-style-type: none;
        color: white;
        padding: 0 20px;
        margin-bottom: 10px;
        background-color: rgba(55, 55, 55, 0.5);
    }

    .listagem-chamados img {
        width: 100px;
    }

    .listagem-chamados .refresh-button {
        background: #89f321;
        color: black;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 18px;
        outline: none;
    }

    .listagem-chamados .status {
        color: #89f321;
    }
</style>

<script>
import axios from 'axios';
import auth from '../utils/auth';

export default {
    data(){
        return {
            items: [],
            loaded: false
        }
    },
    methods:{
        refresh(){
            this.items = [];
            this.loaded = false;
            axios.get("https://dks-manager-backend.herokuapp.com/demands").then(res => {
                this.items = res.data;
                this.loaded = true;
            });
        },

        async authorize(){
            const result = await auth();
            if(result){
                this.refresh();
            } else {
                this.$router.push("/login");
            }
        }
    },
    mounted(){
        this.authorize();
    }
}
</script>