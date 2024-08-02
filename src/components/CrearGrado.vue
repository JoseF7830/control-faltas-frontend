<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_URL } from '../constants'
import {useToast} from 'vue-toast-notification'
 
const router = useRouter()
const toast = useToast()

const formulario = ref({
    carrera: '',
    grado: '',
    seccion: '',
    plan: '',
    jornada: ''
});

function crearGrado() {
    console.log(formulario.value);
    axios.post(`${API_URL}/api/grados`, formulario.value).then((response) => {
        console.log('Exito');
        router.push('/grados');
        toast.success('Grado creado con exito!')
    });
}

function validarGrado(){
    return formulario.value.carrera === '' ||
    formulario.value.grado === '' ||
    formulario.value.seccion === '' ||
    formulario.value.plan === '' ||
    formulario.value.jornada === ''
}

</script>

<template>
    <div class="container mt-4">
        <div class="mb-3">
            <label for="carrera" class="form-label">Carrera</label>
            <input type="text" class="form-control" id="carrera" placeholder="ingrese carrera..." v-model="formulario.carrera">
        </div>
        <div class="mb-3">
            <label for="grado" class="form-label">Grado</label>
            <select class="form-select" aria-label="Select de grados" v-model="formulario.grado">
                <option selected disabled>Seleccione un grado</option>
                <option value="Primero">Primero</option>
                <option value="Segundo">Segundo</option>
                <option value="Tercero">Tercero</option>
                <option value="Cuarto">Cuarto</option>
                <option value="Quinto">Quinto</option>
                <option value="Sexto">Sexto</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="seccion" class="form-label">Seccion</label>
            <input type="text" class="form-control" id="seccion" placeholder="ingrese seccion..." v-model="formulario.seccion">
        </div>
        <div class="mb-3">
            <label for="plan" class="form-label">Plan</label>
            <input type="text" class="form-control" id="plan" placeholder="ingrese plan..." v-model="formulario.plan">
        </div>
        <div class="mb-3">
            <label for="jornada" class="form-label">Jornada</label>
            <input type="text" class="form-control" id="jornada" placeholder="ingrese jornada..." v-model="formulario.jornada">
        </div>
        <div class="d-flex justify-content-between">
            <router-link :to="'/grados'">
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>

            <button @click="crearGrado" :disabled="validarGrado()" class="btn btn-primary">Ingresar grado</button>
        </div>
    </div>
</template>