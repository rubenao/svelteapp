<script>
    import { onMount } from 'svelte';
    import { getUserData } from '$lib/api';
    import {getUserNotes} from '$lib/api'
    import {deleteNote} from '$lib/api'
    import {createNote} from '$lib/api'
    import { goto } from '$app/navigation';
  
    let user = null;
    let error = '';
    let notes = [];
    let newTaskName = '';
  
    onMount(async () => {
      try {
        user = await getUserData();
        notes = await getUserNotes(user.id);
      } catch (e) {
        error = e.message;
      }
    });

     // Función para crear una nueva nota
    async function addNote() {
    if (!newTaskName.trim()) return;

    try {
      const newNote = await createNote(newTaskName, user.id);
      notes = [...notes, newNote];
      console.log(newNote)
      newTaskName = ''; // Reset input field
    } catch (e) {
      error = e.message;
        }
    }

    // Crear una nueva nota al presionar Enter en el input
    function handleKeydown(event) {
    if (event.key === 'Enter') {
      addNote();
    }
  }



    // Función para eliminar una nota específica
    async function removeNote(id) {
    try {
      await deleteNote(id);
      notes = notes.filter(note => note.id !== id);
    } catch (e) {
      error = e.message;
    }
  }


  function logout() {
    sessionStorage.removeItem('auth_token'); // Elimina el token de autenticación
    goto('/login'); // Redirige al usuario a la página de login
  }
  
</script> 
  
  {#if error}
    <p>{error}</p>
  {:else if user}
    <div>
      <h1>Todo App</h1>
      <p>Bienvenido, {user.name}!</p>
      <p>Email: {user.email}</p>

      <h2>Crear nueva nota</h2>
      <input type="text" bind:value={newTaskName} on:keydown={handleKeydown} placeholder="Escribe una tarea" name="nombre_tarea" required>
  
      <h2>Tus notas</h2>
      {#if notes.length > 0}
        <ul>
          {#each notes as note}
            <li>
              <strong>{note.nombre_tarea}</strong>
              <button on:click={() => goto(`/notes/${note.id}`)}>Editar</button>
              <button on:click={() => removeNote(note.id)}>Eliminar</button>
            </li>
          {/each}
        </ul>
      {:else}
        <p>You have no notes.</p>
      {/if}
    </div>
  {:else}
    <p>Loading dashboard data...</p>
  {/if}

  <button on:click={logout}>Salir</button>
  
  