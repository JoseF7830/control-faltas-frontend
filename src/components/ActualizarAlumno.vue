<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRoute, useRouter }  from 'vue-router'
    import { store } from '../store'
    import { API_URL } from '../constants'
    import {useToast} from 'vue-toast-notification'
    const toast = useToast()

    const route = useRoute();
    const router = useRouter();

    const formulario = ref({
        nombres: '',
        apellidos: '',
        id_grado: ''
    });

    onMounted(() => {
        axios.get(`${API_URL}/api/alumno/${route.params.carnet}`).then((response) => {
            console.log(response.data.body[0]);
            formulario.value = response.data.body[0];
        })
    })

    function actualizarAlumno(){
        console.log(formulario.value);
        axios.put(`${API_URL}/api/alumno`, formulario.value).then((response) => {
            router.push('/alumnos');
            toast.success('Alumno modificado con exito!')
        })
    }
</script>

<template>
    <div class="container mt-4">
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
            <select class="form-select" aria-label="select de grados" v-model="formulario.id_grado">
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
            <button @click="actualizarAlumno" class="btn btn-primary">Actualizar</button>
        </div>
    </div>
</template>