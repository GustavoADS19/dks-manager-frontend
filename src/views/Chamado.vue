<template>
    <div id="page-chamado">
        <div class="background"></div>
        <header><h1>Abertura de Chamados</h1></header>
            <h2 v-if="loaded == false">Carregando..</h2>
            <main v-if="loaded == true">
                <form method="post">
                    <div class="form-group">
                    <label for="agencia">Agência solicitante</label>
                    <select required="required" v-on:change="mudarAgencia" name="agencia" class="form-control" type="text" v-model="agencia">
                        <option value="DKS" selected>DKS</option>
                        <option value="VMO">VMO</option>
                        <option value="GLW">GLW</option>
                    </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="demandante">Demandante</label>
                        <select disabled="disabled" required="required" name="demandante" class="form-control" type="text" v-model="demandante">
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
                        <select required="required" disabled name="demandado" class="form-control" type="text" v-model="demandado">
                            <option selected="selected" value="matheusibrahim@dkseventos.com.br">Matheus Ibrahim - matheusibrahim@dkseventos.com.br</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="material">Material solicitado</label>
                        <input required="required" name="material" class="form-control" type="text" v-model="material"/>
                    </div>
                    
                    <div class="form-group">
                        <label for="dataLimite">Data limite para entrega</label>
                        <input required="required" name="dataLimite" class="form-control" type="text" v-model="dataLimite"/>
                    </div>

                    <div class="form-group">
                        <label for="comentario">Comente sobre a solicitação</label>
                        <textarea required="required" name="comentario" class="form-control" v-model="comentario"/>
                    </div>

                    <div class="form-group">
                        <label for="anexo">Fazer upload dos arquivos</label>
                        <input name="anexo" type="file" accept=".png, .jpg, .jpeg .pdf .docx"/>
                    </div>

                    <div class="button-container btn-center">
                        <button type="submit" class="btn btn-primary" v-on:click="enviarDados">ENVIAR SOLICITAÇÃO</button>
                        <router-link to="/painel" class="btn btn-primary button-main"><b>Ver fila de demandas</b></router-link>
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
import auth from '../utils/auth';

export default {
    data(){
        return {
            agencia: 'DKS',
            demandante: '',
            demandado: 'matheusibrahim@dkseventos.com.br',
            material: '',
            dataLimite: '',
            comentario: '',
            users: [],
            loaded: false
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

        enviarDados(event){
            event.preventDefault();

            const anexoFile = document.querySelector("input[name=anexo]");
            const fileReader = new FileReader();

            fileReader.readAsDataURL(anexoFile.files[0]);

            fileReader.onloadend = () => {
                console.log(fileReader.result);

                const img = document.querySelector("footer img"); 
                const button = document.querySelector("button[type=submit]");

                const data = {
                    agencia: this.agencia,
                    demandante: this.demandante,
                    demandado: this.demandado,
                    material: this.material,
                    dataLimite: this.dataLimite,
                    comentario: this.comentario,
                    anexoData: fileReader.result
                };
           
                if(this.agencia.trim() !== "" && this.demandante.trim() !== "" && this.demandado.trim() !== "" && this.material.trim() !== "" && this.dataLimite.trim() !== "" && this.comentario.trim() !== ""){
                    button.disabled = true;
                    axios.post("https://backend-dksmanager-com-br.umbler.net/register-demand", data).then((res)=> {
                        this.agencia = "DKS";
                        this.demandante = "";
                        this.demandado = "";
                        this.material = "";
                        this.dataLimite = "";
                        this.comentario = "";

                        img.src = dks;
                        button.style.backgroundColor = "var(--color-dks)";

                        alert("Solicitação feita com sucesso!");
                        button.disabled = false;
                        this.$router.push("/painel");
                    }); 
                } else {
                    alert("Preencha todos os campos!");
                    button.disabled = false;
                }
            };
            /*
            const data = new FormData();

            data.append("agencia", this.agencia);
            data.append("demandante", this.demandante);
            data.append("demandado", this.demandado);
            data.append("material", this.material);
            data.append("dataLimite", this.dataLimite);
            data.append("comentario", this.comentario);
            data.append("demandImage", anexoFile.files[0]);
            */
        },

        async loadUsers(){
            axios.post("https://backend-dksmanager-com-br.umbler.net/users").then(res => {
                this.users = res.data;
                this.loaded = true;
                this.demandante = localStorage.email;
            }).catch(err => {
                throw err;
            });
        }
    },

    async mounted(){
        if(await auth() == false){
            this.$router.push("/login");
        } else {
            await this.loadUsers();
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