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
    <div class="flex flex-col p-5 gap-5">

      <h1 class="text-gray-900 text-5xl font-extrabold">Todo App</h1>

      <div class="flex flex-col gap-1">
          <p class="font-medium">Bienvenido, {user.name}!</p>
          <p class="font-medium">Email: {user.email}</p>
      </div>

      <div class="flex flex-col gap-1">

        <h2 class="text-2xl font-bold">Crear nueva nota</h2>

        <input type="text" class="input input-bordered w-full max-w-xs" bind:value={newTaskName} on:keydown={handleKeydown} placeholder="Escribe una tarea" name="nombre_tarea" required/>


      </div>

      
      <div class="flex flex-col gap-15">
        <h2 class="text-3xl font-bold">Tus notas</h2>
            {#if notes.length > 0}
              <ul class="flex flex-col gap-3">
                {#each notes as note}
                  <li>
                    <div class="flex flex-col gap-2">
                        <strong>{note.nombre_tarea}</strong>
                        <div class="flex flex-row gap-3">
                          <button on:click={() => goto(`/notes/${note.id}`)} class="btn btn-primary btn-sm">Editar</button>
                          <button on:click={() => removeNote(note.id)} class="btn btn-primary btn-sm">Eliminar</button>
                        </div>
                    </div>
                  </li>
                {/each}
              </ul>
            {:else}
              <p>You have no notes.</p>
            {/if}
      </div>
      <button on:click={logout} class="btn btn-primary w-60">Salir</button>
    </div>
  {:else}
    <p>Loading dashboard data...</p>
  {/if}


  
  