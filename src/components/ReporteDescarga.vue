<template>
    <div>
        <div class="d-flex justify-content-end p-4">
            <button class="btn btn-primary mx-2" @click="createExcel">
                <i class="bi bi-file-earmark-excel"></i> Excel (.xlsm)
            </button>
            <button class="btn btn-primary mx-2" @click="createPdf">
                <i class="bi bi-file-earmark-pdf"></i> PDF (.pdf)
            </button>
        </div>
        <div id="reporte-descarga" class="p-4">
            <h2 style="color: #000">{{ store.state.reporte.titulo }}</h2>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <td>Carnet</td>
                        <td>Hora</td>
                        <td>Fecha</td>
                        <td>Nombre</td>
                        <td>Grado</td>
                        <td>Carrera</td>
                        <td>Seccion</td>
                        <td>Bimestre</td>
                        <td>Falta</td>
                        <td>Comentario</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="registro in store.state.reporte.registros">
                        <td>{{ registro.carnet }}</td>
                        <td>{{ registro.hora }}</td>
                        <td>{{ format(registro.fecha, 'dd/MM/yyyy') }}</td>
                        <td>{{ store.getAlumno(registro.carnet).nombres }} {{ store.getAlumno(registro.carnet).apellidos }}</td>
                        <td>{{ store.getGrado(registro.id_grado).grado }}</td>
                        <td>{{ store.getGrado(registro.id_grado).carrera }}</td>
                        <td>{{ store.getGrado(registro.id_grado).seccion }}</td>
                        <td>{{ registro.bimestre }}</td>
                        <td>{{ store.getFalta(registro.id_falta).falta }}</td>
                        <td>{{ registro.comentario }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-between mb-4 p-4">
            <router-link :to="'/registro-faltas'"> 
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { store } from '../store';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

function createPdf() {
    const element = document.getElementById('reporte-descarga');
    const opt = {
        margin: 0.5,
        filename: store.state.reporte.titulo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(element).set(opt).save();
}

function formatTime(time) {
  const t = time.split(':');
  return `${t[0]}:${t[1]}`;
}

function createExcel() {
    const fecha = format(Date.now(), 'dd-MM-yyyy')
    const registros = store.state.reporte.registros.map((registro) => {
        return {
            carnet: registro.carnet,
            hora: formatTime(registro.hora),
            fecha: format(registro.fecha, 'dd/MM/yyyy'),
            nombre: store.getAlumno(registro.carnet).nombres + " " + store.getAlumno(registro.carnet).apellidos,
            grado: store.getGrado(registro.id_grado).grado,
            carrera: store.getGrado(registro.id_grado).carrera,
            seccion: store.getGrado(registro.id_grado).seccion,
            bimestre: registro.bimestre,
            falta: store.getFalta(registro.id_falta).falta,
            comentario: registro.comentario
        }
    });
    const data = registros.map((registro) => {
        return Object.values(registro)
    });
    const worksheet = XLSX.utils.json_to_sheet(registros);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Reporte de faltas ${fecha}`);

    XLSX.writeFile(workbook, `${store.state.reporte.titulo}.xlsx`);
}
</script>