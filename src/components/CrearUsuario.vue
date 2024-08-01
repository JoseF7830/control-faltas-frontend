<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import {useToast} from 'vue-toast-notification'
 import { API_URL } from '../constants'
import { store } from '../store'

const router = useRouter()
const toast = useToast()

const formulario = ref({
    username: '',
    password: '',
    nombre: '',
    rol: 'digitador'
});

function crearUsuario() {
    console.log(formulario.value);
    axios.post(`${API_URL}/api/usuarios`, formulario.value).then((response) => {
        router.push('/usuarios')
        toast.success('Usuario creado con exito!')
    });
}

function validarUsuario() {
    return formulario.value.username === '' ||
    formulario.value.password === '' ||
    formulario.value.nombre === '' ||
    formulario.value.rol === ''
}
</script>

<template>
    <div class="container mt-4">
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" placeholder="ingrese username..." v-model="formulario.username">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="text" class="form-control" id="password" placeholder="ingrese password..." v-model="formulario.password">
        </div>
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" placeholder="ingrese nombre..." v-model="formulario.nombre">
        </div>
        <div class="mb-3">
            <label for="rol" class="from-label">Rol</label>
            <select class="form-select" aria-label="select de rol" v-model="formulario.rol">
                <option selected disabled>Seleccione el rol</option>
                <option value="super_admin">Super Administrador</option>
                <option value="administrador">Administrador</option>
                <option value="digitador">Digitador</option>
            </select>
        </div>
        <div class="d-flex justify-content-between">
            <router-link :to="'/usuarios'"> 
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>
            <button @click="crearUsuario" :disabled="validarUsuario()" class="btn btn-primary">Ingresar Usuario</button>
        </div>
    </div>
</template>