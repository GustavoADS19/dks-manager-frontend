<template>
    <div class="register-container">
        <div class="register-title">
            <h1>Registrar usuário</h1>
        </div>
        <form>
        <div class="form-group">
            <label for="nome">Nome Completo</label>
            <br>
            <input type="text" name="nome" class="form-control"/>
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <br>
            <input type="email" name="email" class="form-control"/>
            <p>OBS: o email deve obrigatóriamente finalizar com <b>@dkseventos.com.br</b>, <b>@vmoturismo.com.br</b>, <b>@vmoeventos.com.br</b>, <b>@glweventos.com.br</b></p>
        </div>
        <div class="form-group">
            <label for="password">Senha</label>
            <br>
            <input type="password" name="password" class="form-control"/>
        </div>
        </form>
        <router-link to="/login">Já possui uma conta? Faça o login.</router-link>
        <button class="btn">REGISTRAR</button>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },

    methods:{
        
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