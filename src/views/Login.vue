<template>
    <div class="login-container">
        <div class="login-title">
            <img src="../assets/logo.png">
            <h1>DKS Manager</h1>
        </div>
        <form>
        <div class="form-group">
            <label for="email">E-mail</label>
            <br>
            <input type="email" name="email" class="form-control" v-model="email"/>
        </div>
        <div class="form-group">
            <label for="password">Senha</label>
            <br>
            <input type="password" name="password" class="form-control" v-model="password"/>
        </div>
        </form>
        <b><router-link to="/registro">Não possui um login? Clique aqui para realizar o cadastro.</router-link></b>
        <div class="log">
            <button v-bind:disabled="loading" class="btn" v-on:click="authenticateUser">LOGAR</button>
            <img src="../assets/loading.gif" v-if="loading == true">
        </div>
        <p v-if="failedLogin == true">O login não existe ou a senha está incorreta.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            email: '',
            password: '',
            loading: false,
            failedLogin: false
        }
    },

    methods:{
        authenticateUser(){
            this.loading = true;

            const data = {
                email: this.email,
                password: this.password
            };

            axios.post("https://backend-dksmanager-com-br.umbler.net/login", data).then( res => {
                console.log(res);
                if(res.data.message == "Authenticated successfully"){
                    localStorage.setItem("email", this.email);
                    localStorage.setItem("authorization", res.data.authorization);
                    this.$router.push("/abrir-chamado");
                } else {
                    this.failedLogin = true;
                }
                this.loading = false;
            }).catch(err =>{
                console.log(err);
                this.loading = false;
                this.failedLogin = true;
            });
        }
    }
}
</script>

<style scoped>
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        min-height: 600px;
        width: 100%;
        background-image: url("../assets/background.png");
        background-size: 100vw;
    }

    .login-container b {
        padding: 12px;
    }

    .login-title {
        text-align: center;
    }

    .login-container form {
        width: 80%;
        max-width: 450px;
    }

    .input-container{
        width: 300px;
    }

    .form-group{
        width: 100%;
        max-width: 500px;
        margin-bottom: 6px;
    }

    button{
        background-color: var(--color-dks);
        border: none;
        font-weight: bolder;
        font-size: 26px;
        border-radius: 6px;
        margin: 40px 0;
        color: white;
        padding: 5px 40px;
    }

    button:hover{
        color: white;
    }

    form { 
        width: 450px;
    }

    a{
        color: var(--color-dks);;
    }

    .log{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .log img {
        margin-left: 12px;
    }

    p {
        color: var(--color-dks);
    }
</style>