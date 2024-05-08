

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

    
    <article>
        <h1>{data.props.note.nombre_tarea}</h1>
    </article>

    {#if error}
      <p>Error: {error}</p>
    {:else if data.props.note}
    <div>
      <h2>Editar Nota</h2>
      <h3>user_id_usuario {data.props.note._user.id}</h3>
      <input type="text" bind:value={data.props.note.nombre_tarea} on:keydown={handleKeydown} />
    </div>
  {:else}
    <p>Cargando los datos de la nota...</p>
  {/if}