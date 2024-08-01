<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRoute, useRouter } from 'vue-router'
    import { format } from 'date-fns'
    import { store } from '../store'
    import { API_URL } from '../constants'

    const route = useRoute();
    const router = useRouter ();

    const formulario = ref({
        comentario: '',
        carnet: '',
        id_falta:'',
        bimestre: 1,
        fecha: ''
    });

    onMounted(()=> {
        axios.get(`${API_URL}/api/registroFaltas/${route.params.idRegistro}`).then((Response) => {
            const res = Response.data.body[0]
            formulario.value = res;
        })
    })

    function actulizarRegistro(){
        const alumno = store.getAlumno(formulario.value.carnet);
        const data = {
            ...formulario.value,
            idGrado: alumno.id_grado,
            fecha: format(formulario.value.fecha, "yyyy-MM-dd"),
            hora: format(formulario.value.fecha, "HH:mm")
        }
        console.log(data);
        axios.put(`${API_URL}/api/registroFaltas`, data).then((response) => {
            console.log('Exito');
            router.push('/registro-faltas');
        })
    }

</script>

<template>
    <div class="container">
        <div class="mb-3">
            <label for="comentario" class="form-label">Comentario</label>
            <input type="text" class="form-control" id="comentario" placeholder="Ingrese comentario" v-model="formulario.comentario"> 
        </div>

        <div class="mb-3">
            <label for="registroFaltas" class="from-label">Carnet</label>
            <select class="form-select" aria-label="select de faltas" v-model="formulario.carnet">
                <option selected disabled> Seleccione un carnet</option>
                <option :value="alumno.carnet" v-for="alumno in store.state.alumnos">
                    {{ alumno.carnet }} - {{ alumno.nombres }} {{ alumno.apellidos }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label for="bimestre" class="from-label">Bimestre</label>
            <select class="form-select" aria-label="select de faltas" v-model="formulario.bimestre">
                <option selected disabled>Seleccione un bimestre</option>
                <option :value="1">Primero</option>
                <option :value="2">Segundo</option>
                <option :value="3">Tercero</option>
                <option :value="4">Cuarto</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="registroFaltas" class="from-label">Falta</label>
            <select class="form-select" aria-label="select de faltas" v-model="formulario.id_falta">
                <option selected disabled>Seleccione una falta</option>
                <option :value="falta.id_falta" v-for="falta in store.state.faltas">
                    {{ falta.falta }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label for="fecha" class="from-label">Fecha y hora</label>
            <VueDatePicker v-model="formulario.fecha"></VueDatePicker>
        </div>

        <div class="d-flex justify-content-between">
            <router-link :to="'/registro-faltas'"> 
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>
            <button @click="actulizarRegistro" class="btn btn-primary">Actualizar</button>
        </div>

    </div>
</template>