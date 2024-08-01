<template>
    <div class="d-flex justify-content-between p-2 mt-2">
        <h1>Citas</h1>
    </div>
    <div class="px-1">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <td><b>Fecha</b></td>
                    <td><b>Hora</b></td>
                    <td><b>Usuario</b></td>
                    <td><b>Alumno</b></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cita in store.state.citas">
                    <td>{{ format(cita.fecha, 'dd/MM/yyyy') }}</td>
                    <td> {{ formatTime(cita.hora) }}</td>
                    <td>{{ store.getUsuario(cita.id_usuario).nombre }}</td>
                    <td>{{ store.getAlumno(cita.carnet).nombres }} {{ store.getAlumno(cita.carnet).apellidos }}</td>
                    <td class="mx-auto">
                        <button type="button" class="btn btn-success" v-if="cita.atendida === 0" @click="atenderCita(cita)">
                            Atender
                        </button>
                        <span v-if="cita.atendida === 1">Atendida</span>
                        <router-link :to="`/imprimir-cita/${cita.id_cita}`">
                            <button class="btn btn-primary mx-2"><i class="bi bi-printer"></i></button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Dialog v-model:visible="visible" modal header="Atender cita" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8 d-flex align-items-center justify-content-between">
            ¿El alumno sera suspendido? <ToggleSwitch v-model="checked" />
        </span>
        <div class="flex items-center gap-4 mb-4 mt-4" v-if="checked">
            <label for="username" class="font-semibold w-24">Comentario</label>
            <textarea class="form-control" v-model="comentario" />
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Marcar como atendida" @click="marcarCita"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { store } from '../store';
import { format } from 'date-fns';
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Button from 'primevue/button';
import { API_URL } from '../constants';

onMounted(() => {
    getCitas();
});

const visible = ref(false);
const citaSeleccionada = ref({});
const checked = ref(false);
const comentario = ref('');

function getCitas() {
    axios.get(`${API_URL}/api/citas`)
        .then((response) => {
            store.setCitas(response.data.body);
        });
}

function formatTime(time) {
    const t = time.split(':');
    return `${t[0]}:${t[1]}`;
}

function atenderCita(cita) {
    visible.value = true;
    checked.value = false;
    comentario.value = '';
    citaSeleccionada.value = cita;
}

function marcarCita() {
    axios.put(`${API_URL}/api/citas/${citaSeleccionada.value.id_cita}`, {
        id_cita: citaSeleccionada.value.id_cita,
        atendida: true
    }).then((response) => {
        if (!!checked.value) {
            const alumno = store.getAlumno(citaSeleccionada.value.carnet);
            axios.post(`${API_URL}/api/suspensiones`, {	
                comentario: comentario.value,
                carnet: alumno.carnet,
                id_grado: alumno.id_grado
            }).then((rSuspension) => {
                visible.value = false;
                getCitas();
            });
        }
    });
}
</script>