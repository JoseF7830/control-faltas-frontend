<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_URL } from '../constants'
import {useToast} from 'vue-toast-notification'

const router = useRouter()
const toast = useToast()

const formulario = ref({
    falta: ''
});

function crearFalta(){
    console.log(formulario.value);
    axios.post(`${API_URL}/api/faltas`, formulario.value).then((response) => {
        console.log('Exito');
        router.push('/faltas');
        toast.success('Falta creada con exito!')
    });
}

function validarFalta(){
    return formulario.value.falta === ''
}

</script>

<template>
     <div class="container mt-4">
        <div class="mb-3">
            <label for="falta" class="form-label">Falta</label>
            <input type="text" class="form-control" id="falta" placeholder="ingrese falta..." v-model="formulario.falta">
        </div>
       
        <div class="d-flex justify-content-between">
            <router-link :to="'/faltas'">
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>

            <button @click="crearFalta" :disabled="validarFalta()" class="btn btn-primary">Ingresar Falta</button>
        </div>
        </div>
        
</template>

