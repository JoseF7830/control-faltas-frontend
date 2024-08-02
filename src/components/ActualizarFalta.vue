<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRoute, useRouter } from 'vue-router'
    import { API_URL } from '../constants';
    import {useToast} from 'vue-toast-notification'

    const route = useRoute();
    const router = useRouter();
    const toast = useToast()

    const formulario = ref({
        falta: ''
    });

    onMounted(()=> {
        axios.get(`${API_URL}/api/faltas/${route.params.idFalta}`).then((response) => {
            console.log(response.data.body[0]);
            formulario.value = response.data.body[0];
        })
    }) 

    function actualizarFalta(){
        console.log(formulario.value);
        axios.put(`${API_URL}/api/faltas`, formulario.value).then((response) => {
            console.log('Exito');
            router.push('/faltas');
            toast.success('Falta modificada con exito!')
        })
    }
</script>

<template>
    <div class="container">
        <div class="mb-3">
            <label for="carrera" class="form-label">Falta</label>
            <input type="text" class="form-control" id="falta" placeholder="ingrese falta..." v-model="formulario.falta">
        </div>

        <div class="d-flex justify-content-between">
            <router-link :to="'/faltas'">
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>
            <button @click="actualizarFalta" class="btn btn-primary">Actualizar</button>
        </div>
    </div>
</template>