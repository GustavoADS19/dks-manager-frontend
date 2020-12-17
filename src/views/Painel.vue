<template>
    <div class="listagem-chamados">
        <h1>Listagem de demandas</h1>
        <button v-if="loaded == true" class="refresh-button" v-on:click="refresh()"><b>Recarregar lista</b></button>
        <router-link to="/abrir-chamado"><button v-if="loaded == true" class="refresh-button"><b>Abrir Chamado</b></button></router-link>
        <h2 class="not-found" v-if="loaded == true && items.length == 0">Nenhuma demanda foi registrada para você ainda.</h2>
        <h2 v-if="loaded == false">Carregando documentos..</h2>
        <ul v-if="loaded == true">
            <li v-for="(item, index) in items" v-bind:key="index" v-bind:data-demand="item.demandId" v-bind:data-id="item._id" v-bind:class="item.agencia.toLowerCase()">
                <h3>Material solicitado: {{ item.material }}</h3>
                <h4>Demandante: {{ item.demandante }}</h4>
                <h6>Data limite de entrega: {{ item.dataLimite }}</h6>
                <p>Descrição da demanda: {{ item.comentario }}</p>
                <h5>Andamento: <b class="status" v-bind:data-demandid="item.id">{{ item.status }}</b></h5>
                <div class="update">
                    <h3>Atualizar andamento</h3>
                    <select v-bind:data-demandid="item.id" class="form-control" name="status">
                        <option value="Em análise">Em análise</option>
                        <option value="Em processo">Em processo</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Recusado">Recusado</option>
                    </select>
                    <button v-on:click="updateItem" v-bind:data-demandid="item.id">Atualizar</button>
                </div>
                <a v-bind:data-email="item.demandante" v-on:click="whatsapp" target="_blank" class="btn btn-message">Enviar mensagem</a>
                <a v-if="item.anexoPath != undefined" v-bind:href="'http://localhost:3333/' + item.anexoPath" target="_blank"><button v-if="item.anexoPath != null" class="anexo">Ver anexo</button></a>
                <br>
                <img v-if="item.agencia == 'DKS'" src="../assets/dks.png">
                <img v-if="item.agencia == 'VMO'" src="../assets/vmo.png">
                <img v-if="item.agencia == 'GLW'" src="../assets/glw.png">
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

    .listagem-chamados h4 {
        display: inline-block;
    }

    .listagem-chamados h5{
        margin: 25px 0 15px;
    }

    .listagem-chamados li {
        list-style-type: none;
        color: white;
        padding: 20px 20px;
        margin: 20px 0;
        background-color: rgba(55, 55, 55, 0.5);
        overflow: hidden;
    }

    .listagem-chamados li button {
        background: #89f321;
        color: black;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 18px;
        outline: none;
    }

    .listagem-chamados .btn-message {
        background: #89f321;
        color: black;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 18px;
        outline: none;
        display: inline-block;
        margin-bottom: 16px;
    }

    .listagem-chamados img {
        width: 100px;
    }

    .listagem-chamados select {
        max-width: 540px;
        margin-bottom: 12px;
    }

    .listagem-chamados .anexo {
        background: #89f321;
        color: black;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 18px;
        outline: none;
        transform: translateY(-5px);
        margin-left: 6px;
        display: inline-block;
    }

    .listagem-chamados .refresh-button {
        background: #89f321;
        color: black;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 18px;
        outline: none;
        margin-right: 8px;
    }

    .listagem-chamados .status {
        color: #89f321;
    }

    .listagem-chamados .not-found {
        margin-top: 16px;
    }

    .listagem-chamados .update {
        margin-bottom: 16px;
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
            axios.get("https://backend-dksmanager-com-br.umbler.net/demands?email=" + localStorage.getItem("email")).then(res => {
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
        },

        updateItem(event) {
            const itemId = event.target.dataset.demandid;
            const statusValue = document.querySelector(`select[data-demandid="${itemId}"]`).value;

            const data = {
                id: itemId,
                status: statusValue
            };
            axios.post("http://localhost:3333/update-demand", data).then(res => {
                const statusText = document.querySelector(`b[data-demandid="${itemId}"]`);
                statusText.innerHTML = statusValue;
            });
        },

        whatsapp(event) {
            const email = event.target.dataset.email;
            axios.post(`https://backend-dksmanager-com-br.umbler.net/user`, { userMail: email }).then(res => { 
                return window.open(`https://api.whatsapp.com/send?phone=+55${res.data[0].whatsapp}&text=Olá,%20boa%20tarde`, "_blank");
            });
        }
    },
    mounted(){
        this.authorize().then(()=> {
            this.refresh();
        });
    }
}
</script>