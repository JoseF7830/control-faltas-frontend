<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { API_URL } from '../constants'

const router = useRouter()

const formulario = ref({
    username: '',
    password: ''
});

function login(event) {
    event.preventDefault();
    axios.post(`${API_URL}/api/login`, formulario.value).then((response) => {
        console.log(response.data.body)
        store.setUser(response.data.body)
        Cookies.set('token', response.data.body.token)
        router.push('/faltas')
    })
}

</script>

<template>
<div class="contenedor ">
  <div class="wrapper">
    <span class="bg-animate">

    </span>
        <div class="form-box login">
            <h2>Login</h2>
            <form action="#" @submit="login($event)">
                <div class="input-box">
                    <input type="text" required v-model="formulario.username">
                    <label for="">Username</label>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="password" required v-model="formulario.password">
                    <label for="">Password</label>
                    <i class='bx bxs-lock-alt' ></i>
                </div>
                <button type="submit" class="btn-cyan">Login</button>
            </form>
        </div>
        <div class="info-text login">
            <h2>CETACH 2</h2>
            <p>Centro de Estudios Tecnicos y Avanzados de 
                Chimaltenango
            </p>
        </div>
    </div>
</div>

</template>


<style scoped>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins','sans-serif';
}

body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    
}



.wrapper{
    position:relative;
    width: 750px;
    height: 450px;
    background: #081b29;
    border: 2px solid #0ef;
    box-shadow: 0 0 25px #0ef;
    overflow: hidden;
   
}

.wrapper form{
    align-items: center;
}

.wrapper .form-box{
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
}

.wrapper .form-box.login{
    left: 0;
    padding: 0 60px 0 40px;
    
}

.form-box h2{
    font-size: 32px;
    color: #fff;
    text-align: center;
   
}

.form-box .input-box{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 25px 0;
}

.input-box input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid #fff;
    padding-right: 23px;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    transition: .5s;
}

.input-box input:focus,
.input-box input:valid{
    border-bottom-color: #0ef;
}

.input-box label{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size:16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.input-box input:focus~label,
.input-box input:valid~label{
    top: -5px;
    color:  #0ef;
}


.input-box i{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 18px;
    color: #fff;
    transition: .5s;
}

.input-box input:focus~i,
.input-box input:valid~i{
    color: #0ef;
}

.form-box .logreg-link{
    font-size: 14.5px;
    color: #fff;
    text-align: center;
    margin: 20px 0 10px;
}

.logreg-link p a{
    color: #0ef;
    text-decoration: none;
    font-weight: 600;
}

.logreg-link p a:hover{
    text-decoration: underline;
}

.contenedor{
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.wrapper .info-text{
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
}

.wrapper .info-text.login{
    right: 0;
    text-align: right;
    padding: 0 40px 60px 150px;
}

.info-text h2{
    font-size: 36px;
    color: #fff;
    line-height: 1.3;
    text-transform: uppercase;
}

.info-text p{
    font-size: 16px;
    color: #fff;
}

.wrapper .bg-animate {
    position: absolute;
    top: -4px;
    right: 0;
    width: 850px;
    height: 600px;
    background: linear-gradient(45deg, #081b29, #0ef);
    border-bottom: 3px solid #0ef;
    transform: rotate(10deg) skewY(40deg);
    transform-origin: bottom right;
    
}
</style>