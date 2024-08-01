<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { format } from 'date-fns'
    import { API_URL } from '../constants'
    import { store } from '../store'

    const router = useRouter()

    const formulario = ref({
        comentario: '',
        carnet: '',
        idFalta:'',
        bimestre: 1,
        fecha: ''
    });

    function crearRegistroFalta() {
        const alumno = store.getAlumno(formulario.value.carnet);
        const data = {
            ...formulario.value,
            idGrado: alumno.id_grado,
            fecha: format(formulario.value.fecha, "yyyy-MM-dd HH:mm:ss"),
            hora: format(formulario.value.fecha, "HH:mm")
        }

        axios.post(`${API_URL}/api/registroFaltas`, data).then((response) => {
            const res = response.data.body;
            
            if (res.debeCrearCita) {
                router.push(`/crear-cita/${res.insertId}`);
            } else {
                router.push('/registro-faltas');
            }
        });
    }

    function validarRegistroFalta(){
        return formulario.value.comentario === '' ||
        formulario.value.hora === '' ||
        formulario.value.carnet === '' ||
        formulario.value.idFalta === ''
    }

</script>

<template>
    <div class="container">
        <div class="mb-3">
            <label for="comentario" class="form-label">Comentario</label>
            <input type="text" class="form-control" id="comentario" placeholder="ingrese comentario..." v-model="formulario.comentario">
        </div>

        <div class="mb-3">
            <label for="registroFaltas" class="from-label">Carnet</label>
            <select class="form-select" aria-label="select de faltas" v-model="formulario.carnet">
                <option selected disabled>Seleccione un carnet</option>
                <option :value="alumno.carnet" v-for="alumno in store.state.alumnos">
                    {{ alumno.carnet }} - {{ alumno.nombres }} {{ alumno.apellidos }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label for="bimestre" class="from-label">Bimestre</label>
            <select class="form-select" aria-label="select de faltas" v-model="formulario.bimestre">
                <option selected disabled>Seleccione un bimestre</option>
                <option :value="1">I</option>
                <option :value="2">II</option>
                <option :value="3">III</option>
                <option :value="4">IV</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="registroFaltas" class="from-label">Falta</label>
            <select class="form-select" aria-label="select de faltas" v-model="formulario.idFalta">
                <option selected disabled>Seleccione una falta</option>
                <option :value="falta.id_falta" v-for="falta in store.state.faltas">
                    {{ falta.falta }}
                </option>
            </select>
        </div>

        <div class="mb-3">
            <label for="fecha" class="from-label">Fecha y hora</label>
            <VueDatePicker v-model="formulario.fecha" auto-apply></VueDatePicker>
        </div>
        <div class="d-flex justify-content-between">
            <router-link :to="'/registro-faltas'"> 
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>
            <button @click="crearRegistroFalta" :disabled="validarRegistroFalta()" class="btn btn-primary">Ingresar registro</button>
        </div>
    </div>
</template>