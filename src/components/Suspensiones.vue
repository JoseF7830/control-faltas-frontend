<template>
    <div class="d-flex justify-content-between p-2 mt-2">
        <h1>Suspensiones</h1>
        <button type="button" class="btn btn-primary mx-2" @click="imprimir">
            <i class="bi bi-file-earmark-pdf"></i> PDF (.pdf)
        </button>
    </div>
    <div class="px-1" id="suspensiones">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <td><b>Carnet</b></td>
                    <td><b>Nombre</b></td>
                    <td><b>Grado</b></td>
                    <td><b>Comentario</b></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="suspension in suspensiones">
                    <td>{{ suspension.carnet }}</td>
                    <td>{{ store.getAlumno(suspension.carnet).nombres }} {{ store.getAlumno(suspension.carnet).apellidos }}</td>
                    <td>{{ store.getGrado(suspension.id_grado).grado }} {{ store.getGrado(suspension.id_grado).carrera }} {{ store.getGrado(suspension.id_grado).seccion }}</td>
                    <td>{{ suspension.comentario }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { store } from '../store';
import { API_URL } from '../constants'
const suspensiones = ref([]);

onMounted(() => {
    axios.get(`${API_URL}/api/suspensiones`)
        .then((respuesta) => {
            suspensiones.value = respuesta.data.body;
        });
});

function imprimir() {
    const element = document.getElementById('suspensiones');
    const opt = {
        margin: 0.5,
        filename: 'Reporte de suspensiones',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(element).set(opt).save();
}
</script>