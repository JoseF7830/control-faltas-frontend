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
    carnet: '',
    nombres: '',
    apellidos: '',
    idGrado: ''
});

function crearAlumno() {
    console.log(formulario.value);
    axios.post(`${API_URL}/api/alumno`, formulario.value).then((response) => {
        router.push('/alumnos')
        toast.success('Alumno creado con exito!')
    });
}

function validarAlumno() {
    return formulario.value.carnet === '' ||
    formulario.value.nombres === '' ||
    formulario.value.apellidos === '' ||
    formulario.value.idGrado === ''
}
</script>

<template>
    <div class="container mt-4">
        <div class="mb-3">
            <label for="carnet" class="form-label">Carnet</label>
            <input type="text" class="form-control" id="carnet" placeholder="ingrese carnet..." v-model="formulario.carnet">
        </div>
        <div class="mb-3">
            <label for="nombres" class="form-label">Nombres</label>
            <input type="text" class="form-control" id="nombres" placeholder="ingrese nombres..." v-model="formulario.nombres">
        </div>
        <div class="mb-3">
            <label for="apellidos" class="form-label">Apellidos</label>
            <input type="text" class="form-control" id="apellidos" placeholder="ingrese apellidos..." v-model="formulario.apellidos">
        </div>
        <div class="mb-3">
            <label for="alumno" class="from-label">Grado</label>
            <select class="form-select" aria-label="select de grados" v-model="formulario.idGrado">
                <option selected value="" disabled>Seleccione un grado</option>
                <option :value="grado.id_grado" v-for="grado in store.state.grados">
                    {{ grado.grado }} {{ grado.carrera }} "{{ grado.seccion }}" {{ grado.plan }}
                </option>
            </select>
        </div>
        <div class="d-flex justify-content-between">
            <router-link :to="'/alumnos'"> 
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>
            <button @click="crearAlumno" :disabled="validarAlumno()" class="btn btn-primary">Ingresar Alumno</button>
        </div>
    </div>
</template>