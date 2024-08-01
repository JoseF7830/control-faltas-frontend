<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import {useConfirm} from 'primevue/useconfirm'
import { store } from '../store'
import { API_URL } from '../constants'


const confirm = useConfirm()

onMounted(() => {
  console.log('App lista para usarse')
  axios.get(`${API_URL}/api/usuarios`).then((response) => {
    store.setUsuarios(response.data.body)
  })
});

function eliminarUsuario(id_usuario) {
    const usuario = store.getUsuario(id_usuario);
    confirm.require({
        message: `Estas seguro que quieres eliminar al usuario: "${usuario.nombre}" "${usuario.username}"`,
        header: 'Eliminar usuario',
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
            axios.delete(`${API_URL}/api/usuarios/${id_usuario}`).then(() => {
                axios.get (`${API_URL}/api/usuarios`).then((response) =>{
                    store.setAlumnos(response.data.body)
                });
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
        <h1>Usuarios</h1>
        <router-link to="/crear-usuario">
      <button type="button" class="btn btn-primary">Agregar</button>
    </router-link>
    </div>
    <div class="px-1">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <td><b>Id_Usuario</b></td>
                    <td><b>Username</b></td>
                    <td><b>Pasword</b></td>
                    <td><b>Nombre</b></td>
                    <td><b>Rol</b></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in store.state.usuarios">
                    <td>{{ usuario.id_usuario }}</td>
                    <td> {{ usuario.username }}</td>
                    <td>{{ usuario.password }}</td>
                    <td>{{ usuario.nombre }}</td>
                    <td>{{ usuario.rol }}</td>
                    <td class="mx-auto">
                        <router-link :to="'/actualizar-usuario/' + usuario.id_usuario">
                            <button type="button" class="btn btn-primary mx-3"><i class="bi bi-pencil-fill"></i></button>
                        </router-link>

                        <button type="button" class="btn btn-danger" @click="eliminarUsuario(usuario.id_usuario)"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>