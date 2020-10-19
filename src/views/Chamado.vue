<template>
    <div id="page-chamado">
        <div class="background"></div>
        <header><h1>Abertura de Chamados</h1></header>
            <main>
                <form method="post" action="/registrar-demanda">
                    <div class="form-group">
                    <label for="agencia">Agência solicitante</label>
                    <select v-on:change="mudarAgencia" name="agencia" class="form-control" type="text" v-model="agencia">
                        <option value="DKS" selected>DKS</option>
                        <option value="VMO">VMO</option>
                        <option value="GLW">GLW</option>
                    </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="demandante">Demandante</label>
                        <select name="demandante" class="form-control" type="text" v-model="demandante">
                            <option v-for="user in users" v-bind:key="user.email" v-bind:value="user.email">{{user.name}} - {{user.email}}</option>
                        </select>
                    </div>

                    <!--<div class="form-group">
                        <label for="demandado">Demandado</label>
                        <select name="demandado" class="form-control" type="text" v-model="demandado">
                            <option v-for="user in users" v-bind:key="user.email" v-bind:value="user.email">{{user.name}} - {{user.email}}</option>
                        </select>
                    </div>-->

                    <div class="form-group">
                        <label for="demandado">Demandado</label>
                        <select disabled name="demandado" class="form-control" type="text" v-model="demandado">
                            <option selected="selected" value="matheusibrahim@dkseventos.com.br">Matheus Ibrahim - matheusibrahim@dkseventos.com.br</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="material">Material solicitado</label>
                        <input name="material" class="form-control" type="text" v-model="material"/>
                    </div>
                    
                    <div class="form-group">
                        <label for="dataLimite">Data limite para entrega</label>
                        <input name="dataLimite" class="form-control" type="text" v-model="dataLimite"/>
                    </div>

                    <div class="form-group">
                        <label for="comentario">Comente sobre a solicitação</label>
                        <textarea name="comentario" class="form-control" v-model="comentario"/>
                    </div>

                    <!--
                    <div class="form-group">
                        <label for="arquivos">Fazer upload dos arquivos</label>
                        <input name="arquivos" type="file" accept=".png, .jpg, .jpeg"/>
                    </div> -->

                    <div class="button-container btn-center">
                        <button type="submit" class="btn btn-primary" v-on:click="enviarDados">ENVIAR SOLICITAÇÃO</button>
                        <router-link to="/listagem-de-chamados"><button class="button-main">Ver fila de demandas</button></router-link>
                    </div>
                </form>
            </main>
            <footer><img src="../assets/dks.png"/></footer>
    </div>
</template>

<script>
import dks from '../assets/dks.png';
import vmo from '../assets/vmo.png';
import glw from '../assets/glw.png';

import axios from 'axios';

export default {
    data(){
        return {
            agencia: 'DKS',
            demandante: '',
            demandado: 'matheusibrahim@dkseventos.com.br',
            material: '',
            dataLimite: '',
            comentario: '',
            users: [{
                name: "Matheus Ibrahim",
                email: "matheusibrahim@dkseventos.com.br"
            },
            {
                name: "Alexandre Oliboni",
                email: "alexandreoliboni@dkseventos.com.br"
            },
            {
                name: "Camila Pontremoli",
                email: "camilapontremoli@dkseventos.com.br"
            },
            {
                name: "Daniel Klein",
                email: "danielklein@dkseventos.com.br"
            },
            {
                name: "Eder Lima",
                email: "ederlima@dkseventos.com.br"
            },
            {
                name: "Elini Jaudy",
                email: "producaoexecutiva@dkseventos.com.br"
            },
            {
                name: "Eloisa Campana",
                email: "eloisacampana@vmoeventos.com.br"
            },
            {
                name: "Ellen Araujo",
                email: "ellenaraujo@dkseventos.com.br"
            },
            {
                name: "Katia Greco",
                email: "financeiro@dkseventos.com.br"
            },
            {
                name: "Marcelo Ferreira",
                email: "ferreiradmkt@gmail.com"
            },
            {
                name: "Marcelo Moraes",
                email: "administrativo@dkseventos.com.br"
            },
            {
                name: "Oliver Menck",
                email: "olivermenck@dkseventos.com.br"
            },
            {
                name: "Samara Hassan",
                email: "samarahassan@dkseventos.com.br"
            },
            {
                name: "Thiago Dantas",
                email: "thiagodantas@dkseventos.com.br"
            },
            {
                name: "Thiago Gonçalo",
                email: "thiagogoncalo@dkseventos.com.br"
            },
            {
                name: "Victor Moraes",
                email: "victormoraes@dkseventos.com.br"
            },
            {
                name: "Wellington Lima",
                email: "wellingtonlima@dkseventos.com.br"
            }]
        }
    },

    methods:{
        mudarAgencia(event) {
            const img = document.querySelector("footer img"); 
            const button = document.querySelector("button[type=submit]");

            switch(event.target.value){
                case "DKS":{
                    img.src = dks;
                    button.style.backgroundColor = "var(--color-dks)";
                    break;
                }
                case "VMO":{
                    img.src = vmo;
                    button.style.backgroundColor = "var(--color-vmo)";
                    break;
                }
                case "GLW":{
                    img.src = glw;
                    button.style.backgroundColor = "var(--color-glw)";
                    break;
                }
                default:{
                    img.src = dks;
                    break;
                }
            }
        },

        enviarDados(){
            event.preventDefault();

            const img = document.querySelector("footer img"); 
            const button = document.querySelector("button[type=submit]");

            const agencia = this.agencia;
            const demandante = this.demandante;
            const demandado = this.demandado;
            const material = this.material;
            const dataLimite = this.dataLimite
            const comentario = this.comentario;

            const data = {agencia, demandante, demandado, material, dataLimite, comentario};
            
            if(this.agencia.trim() !== "" && this.demandante.trim() !== "" && this.demandado.trim() !== "" && this.material.trim() !== "" && this.dataLimite.trim() !== "" && this.comentario.trim() !== ""){
              axios.post("https://dks-manager-backend.herokuapp.com/register-demand", data).then((res)=> {
                this.agencia = "DKS";
                this.demandante = "";
                this.demandado = "";
                this.material = "";
                this.dataLimite = "";
                this.comentario = "";

                img.src = dks;
                button.style.backgroundColor = "var(--color-dks)";

                alert("Solicitação feita com sucesso!");
              }); 
            } else {
                alert("Preencha todos os campos!");
            }
        }
    }

}
</script>

<style scoped>
    #page-chamado {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 40px;
        margin: auto;
    }

    #page-chamado main .button-main {
        background: #89f321;
        color: black;
        border: none;
        padding: 8px 12px;
        margin-left: 12px;
        border-radius: 8px;
        font-size: 14px;
        outline: none;
    }

    #page-chamado main .button-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #page-chamado .background{
        position: fixed;
        z-index: -3;
        background-image: url("../assets/background.png");
        width: 100vh;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    #page-chamado header{
        margin-bottom: 20px;
    }

    #page-chamado header h1{
        font-weight: bolder;
    } 

    #page-chamado main{
        width: 100%;
        max-width: 600px;
    }

    #page-chamado form .form-group{
        width: 100%;
        margin-bottom: 6px;
    }

    #page-chamado form .form-group input[type=file]{
        display: block;
    }

    #page-chamado form button{
        background-color: var(--color-dks);
        border: none;
        font-weight: bolder;
        font-size: 26px;
        border-radius: 6px;
        margin: 40px 0;
    }
    
    #page-chamado form .btn-center{
        text-align: center;
        margin-top: 16px;
    }

    #page-chamado footer img{
        margin-top: 16px;
        width: 128px;
    }

    #page-chamado footer{
        text-align: center;
    }
</style>