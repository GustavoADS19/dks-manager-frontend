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
            <input type="email" name="email" class="form-control"/>
        </div>
        <div class="form-group">
            <label for="password">Senha</label>
            <br>
            <input type="password" name="password" class="form-control"/>
        </div>
        </form>
        <router-link to="/registro">Registrar um usuário</router-link>
        <button class="btn">LOGAR</button>
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
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        min-height: 600px;
        background-image: url("../assets/background.png");
        background-size: 100vw;
    }

    .login-title {
        text-align: center;
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
</style>