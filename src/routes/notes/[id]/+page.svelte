<script>
  import {updateNote} from '$lib/api'
  import { goto } from '$app/navigation';
    export let data;
    export let error = '';
    console.log(data)


    // Función para actualizar la nota
  async function handleUpdate() {
    if (data.props.note.nombre_tarea.trim()) {
      try {
        await updateNote(data.props.note.id, data.props.note.nombre_tarea, data.props.note._user.id); // Actualiza la nota con el nuevo nombre
        goto('/dashboard'); // Redirige al dashboard tras la actualización
      } catch (error) {
        console.error("Error al actualizar la nota:", error);
      }
    }
  }

  // Ejecuta `handleUpdate` al presionar `Enter` en el campo de entrada
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  }
</script>

    <div class="flex flex-col gap-5 p-5">
 
        <h1 class="text-3xl font-bold">{data.props.note.nombre_tarea}</h1>
          {#if error}
            <p>Error: {error}</p>
          {:else if data.props.note}
          <div class="flex flex-col gap-3">
            <h2 class="font-medium">Editar Nota</h2>
            <h3 class="font-medium">user_id_usuario:{data.props.note._user.id}</h3>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" bind:value={data.props.note.nombre_tarea} on:keydown={handleKeydown} />
          </div>
        {:else}
          <p>Cargando los datos de la nota...</p>
        {/if}

    </div>