import promptSync from 'prompt-sync';
const ESTADOS = {
    1: "Pendiente",
    2: "En Curso",
    3: "Terminada",
    4: "Cancelada"
};
const DIFICULTADES = {
    1: "Fácil",
    2: "Medio",
    3: "Difícil"
};
const DIFICULTAD_EMOJIS = {
    1: "⭐",
    2: "⭐⭐",
    3: "⭐⭐⭐"
};
let tareas = [];
function agregarTarea() {
    console.log("Agregar nueva tarea");
    let titulo = prompt("Título (requerido, máx 100): ");
    if (!titulo || titulo.length > 100) {
        console.log("❌ Título inválido");
        return;
    }
    let descripcion = prompt("Descripción (opcional, máx 500): ");
    if (descripcion.length > 500) {
        console.log("❌ Descripción demasiado larga.");
        return;
    }
    let vencimiento = prompt("Fecha de vencimiento (formato AAAA-MM-DD): ");
    let fechaVencimiento = vencimiento ? new Date(vencimiento) : null;
    if (vencimiento && isNaN(fechaVencimiento)) {
        console.log("❌ Fecha inválida.");
        return;
    }
    let dificultadInput = prompt("Dificultad (1: Fácil ⭐, 2: Medio ⭐⭐, 3: Difícil ⭐⭐⭐)");
    let dificultadNum = parseInt(dificultadInput, 10);
    let dificultad = Number.isNaN(dificultadNum) ? 1 : dificultadNum;
    if (![1, 2, 3].includes(dificultad)) {
        console.log("❌ Dificultad inválida.");
        return;
    }
    let nuevaTarea = {
        titulo,
        descripcion,
        estado: 1,
        creacion: new Date(),
        ultimaEdicion: new Date(),
        vencimiento: fechaVencimiento,
        dificultad
    };
    tareas.push(nuevaTarea);
    console.log("✅ Tarea agregada con éxito.");
}
function verTareas(filtroEstado = 0) {
    console.log("Lista de Tareas");
    let tareasFiltradas = filtroEstado === 0
        ? tareas
        : tareas.filter(t => t.estado === filtroEstado);
    if (tareasFiltradas.length === 0) {
        console.log("📭 No hay tareas que coincidan.");
        return;
    }
    for (let i = 0; i < tareasFiltradas.length; i++) {
        let tarea = tareasFiltradas[i];
        console.log("\nTarea #" + (i + 1));
        console.log("Título: " + tarea.titulo);
        if (tarea.descripcion && tarea.descripcion.length > 0) {
            console.log("Descripción: " + tarea.descripcion);
        }
        console.log("Estado: " + ESTADOS[tarea.estado]);
        console.log("Creada: " + tarea.creacion.toLocaleString());
        if (tarea.vencimiento) {
            console.log("Vence: " + tarea.vencimiento.toLocaleDateString());
        }
        console.log("Dificultad: " + DIFICULTADES[tarea.dificultad] + " " + DIFICULTAD_EMOJIS[tarea.dificultad]);
    }
}
function buscarTarea() {
    let consulta = prompt("Buscar tarea (parte del título): ");
    let resultados = [];
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].titulo.toLowerCase().includes(consulta)) {
            resultados.push(tareas[i]);
        }
    }
    if (resultados.length === 0) {
        console.log("No se encontraron tareas que coincidan.");
    } else {
        console.log("Se encontraron " + resultados.length + " tarea(s):");
        for (let i = 0; i < resultados.length; i++) {
            let tarea = resultados[i];
            console.log((i + 1) + ". " + tarea.titulo + " (" + ESTADOS[tarea.estado] + ")");
        }
    }
}
function menuVerTareas() {
    while (true) {
        console.log(`\n1- Todas\n2- Pendientes\n3- En Curso\n4- Terminadas\n5- Volver`);
        let op = prompt("Selecciona una opción: ");
        switch (op) {
            case "1":
                verTareas(0);
                break;
            case "2":
                verTareas(1);
                break;
            case "3":
                verTareas(2);
                break;
            case "4":
                verTareas(3);
                break;
            case "5":
                return;
            default:
                console.log("❌ Opción inválida.");
        }
    }
}
function cambiarEstadoTarea() {
    if (tareas.length === 0) {
        console.log("📭 No hay tareas para cambiar.");
        return;
    }
    console.log("Cambiar estado de tarea:");
    for (let i = 0; i < tareas.length; i++) {
        console.log(`${i + 1}. ${tareas[i].titulo} (${ESTADOS[tareas[i].estado]})`);
    }
    let index = parseInt(prompt("Seleccioná el número de tarea a modificar: ")) - 1;
    if (isNaN(index) || index < 0 || index >= tareas.length) {
        console.log("❌ Número inválido.");
        return;
    }
    console.log("Estados posibles:");
    console.log("1- Pendiente");
    console.log("2- En Curso");
    console.log("3- Terminada");
    console.log("4- Cancelada");
    let nuevoEstado = parseInt(prompt("Elegí el nuevo estado (1-4): "));
    if (![1, 2, 3, 4].includes(nuevoEstado)) {
        console.log("❌ Estado inválido.");
        return;
    }
    tareas[index].estado = nuevoEstado;
    tareas[index].ultimaEdicion = new Date();
    console.log("✅ Estado actualizado.");
}
function editarTarea() {
    if (tareas.length === 0) {
        console.log("📭 No hay tareas para editar.");
        return;
    }
    console.log("Editar tarea:");
    for (let i = 0; i < tareas.length; i++) {
        console.log(`${i + 1}. ${tareas[i].titulo}`);
    }
    let index = parseInt(prompt("Seleccioná el número de tarea a editar: ")) - 1;
    if (isNaN(index) || index < 0 || index >= tareas.length) {
        console.log("❌ Número inválido.");
        return;
    }
    let tarea = tareas[index];
    let nuevoTitulo = prompt(`Nuevo título (actual: "${tarea.titulo}"):`);
    if (nuevoTitulo && nuevoTitulo.length <= 100) {
        tarea.titulo = nuevoTitulo;
    }
    let nuevaDesc = prompt(`Nueva descripción (actual: "${tarea.descripcion || "ninguna"}"):`);
    if (nuevaDesc.length <= 500) {
        tarea.descripcion = nuevaDesc;
    }
    let nuevoVenc = prompt(`Nueva fecha de vencimiento (actual: ${tarea.vencimiento ? tarea.vencimiento.toLocaleDateString() : "ninguna"}, formato AAAA-MM-DD):`);
    if (nuevoVenc) {
        let nuevaFecha = new Date(nuevoVenc);
        if (!isNaN(nuevaFecha)) {
            tarea.vencimiento = nuevaFecha;
        }
    }
    let nuevaDif = parseInt(prompt(`Nueva dificultad (1: Fácil ⭐, 2: Medio ⭐⭐, 3: Difícil ⭐⭐⭐) [actual: ${DIFICULTADES[tarea.dificultad]}]:`));
    if ([1, 2, 3].includes(nuevaDif)) {
        tarea.dificultad = nuevaDif;
    }
    tarea.ultimaEdicion = new Date();
    console.log("✅ Tarea actualizada.");
}
function menuPrincipal() {
    console.log("Hola Alexis 👋, ¿qué deseas hacer?");
    while (true) {
console.log(`\n1- Ver tareas`);
console.log(`2- Buscar una tarea`);
console.log(`3- Agregar una tarea`);
console.log(`4- Cambiar estado de una tarea`);
console.log(`5- Editar una tarea`);
console.log(`6- Salir`);
        let opcion = prompt("Selecciona una opción: ");
        switch (opcion) {
    case "1":
        menuVerTareas();
        break;
    case "2":
        buscarTarea();
        break;
    case "3":
        agregarTarea();
        break;
    case "4":
        cambiarEstadoTarea();
        break;
    case "5":
        editarTarea();
        break;
    case "6":
        console.log("👋 ¡Hasta luego!");
        return;
    default:
        console.log("❌ Opción inválida. Intenta de nuevo.");
}
    }
     }
menuPrincipal(); 
