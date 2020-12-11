<template>
    <div class="register-container">
        <div class="register-title">
            <h1>Registrar usuário</h1>
        </div>
        <form>
        <div class="form-group">
            <label for="nome">Nome Completo</label>
            <br>
            <input required="required" type="text" name="nome" class="form-control" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <br>
            <input required="required" type="email" name="email" class="form-control" v-model="email"/>
            <p>OBS: o email deve obrigatóriamente finalizar com <b>@dkseventos.com.br</b>, <b>@vmoturismo.com.br</b>, <b>@vmoeventos.com.br</b>, <b>@glweventos.com.br</b></p>
        </div>
        <div class="form-group">
            <label for="password">Senha</label>
            <br>
            <input required="required" type="password" name="password" class="form-control" v-model="password"/>
        </div>
        <div class="form-group">
            <label for="confirm-password">Confirmar senha</label>
            <br>
            <input required="required" type="password" name="confirm-password" class="form-control" v-model="passwordCheck"/>
        </div>
        <div class="form-group">
            <label for="whatsapp">Telefone (Whatsapp)</label>
            <br>
            <input required="required" type="text" name="whatsapp" class="form-control" v-model="whatsapp"/>
        </div>
        <b><router-link to="/login">Já possui uma conta? Faça o login.</router-link></b>
        <div class="btn-container">
            <button type="submit" class="btn register" v-on:click="registerUser">REGISTRAR</button>
        </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
            whatsapp: ''
        }
    },

    methods:{
        registerUser(event){
            event.preventDefault();

            const name = this.name;
            const email = this.email;
            const password = this.password;
            const whatsapp = this.whatsapp;
            
            const data = { name, email, password, whatsapp };
            if(name.trim() !== "" && email.trim() !== "" && password.trim() !== "" && whatsapp.trim() !== ""){
                if(password == this.passwordCheck){
                    axios.post("https://backend-dksmanager-com-br.umbler.net/create-user", data).then((response)=>{
                        alert("Usuário registrado com sucesso!");
                        this.$router.push("/login");
                    });
                } else {
                    alert("As senhas não batem!");
                }
            } else {
                alert("Preencha todos os campos!");
            }
        }
    }
}
</script>

<style scoped>
    .register-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        min-height: 700px;
        background-image: url("../assets/background.png");
        background-size: 100vw;
    }

    .register-container form {
        max-width: 450px;
        width: 80%;
    }

    .register-title {
        text-align: center;
    }

    .register-title h1 {
        margin-bottom: 12px;
    }

    .input-container{
        width: 300px;
    }

    .form-group{
        width: 100%;
        max-width: 500px;
        margin-bottom: 6px;
    }

    .btn-container {
        text-align: center;
    }

    .register{
        background-color: var(--color-dks);
        border: none;
        font-weight: bolder;
        font-size: 26px;
        border-radius: 6px;
        margin-top: 40px;
        margin-bottom: 40px;
        color: white;
        padding: 5px 40px;
    }

    a{
        color: var(--color-dks);
    }

    b{
        color: var(--color-dks);
    }

    p{
        font-size: 12px;
        margin-top: 8px;
    }
</style>