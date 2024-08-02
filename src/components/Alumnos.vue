<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import {useConfirm} from 'primevue/useconfirm'
import { store } from '../store'
import { API_URL } from '../constants'
import {useToast} from 'vue-toast-notification'

const confirm = useConfirm()
const toast = useToast()

onMounted(() => {
  console.log('App lista para usarse')
  axios.get(`${API_URL}/api/alumno`).then((response) => {
    store.setAlumnos(response.data.body)
  })
});

function eliminarAlumno(carnet) {
    const alumno = store.getAlumno(carnet);
    confirm.require({
        message: `Estas seguro que quieres eliminar al alumno: "${alumno.nombres}" "${alumno.apellidos}"`,
        header: 'Eliminar alumno',
        icon: 'bi bi-trash3-fill',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Aceptar'
        },
        accept: () => {
            axios.delete(`${API_URL}/api/alumno/${carnet}`).then(() => {
                axios.get (`${API_URL}/api/alumno`).then((response) =>{
                    store.setAlumnos(response.data.body)
                });
                toast.success('Alumno eliminado con exito!')
            });
        },
        reject: () => {
            console.log('Cancelo');
        }
    }); 
}
</script>

<template>
    <div class="d-flex justify-content-between p-2 mt-2">
        <h1>Alumnos</h1>
        <router-link to="/crear-alumno">
      <button type="button" class="btn btn-primary">Agregar</button>
    </router-link>
    </div>
    <div class="px-1">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <td><b>Carnet</b></td>
                    <td><b>Nombres</b></td>
                    <td><b>Apellidos</b></td>
                    <td><b>Id_grado</b></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="alumnos in store.state.alumnos">
                    <td>{{ alumnos.carnet }}</td>
                    <td> {{ alumnos.nombres }}</td>
                    <td>{{ alumnos.apellidos }}</td>
                    <td>{{ alumnos.id_grado }}</td>
                    <td class="mx-auto">
                        <router-link :to="'/actualizar-alumno/' + alumnos.carnet">
                            <button type="button" class="btn btn-primary mx-3"><i class="bi bi-pencil-fill"></i></button>
                        </router-link>

                        <button type="button" class="btn btn-danger" @click="eliminarAlumno(alumnos.carnet)"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>