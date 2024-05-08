<script>
    import { onMount } from 'svelte';
    import { getUserData } from '$lib/api';
    import {getUserNotes} from '$lib/api'
  
    let user = null;
    let error = '';
  
    onMount(async () => {
      try {
        user = await getUserData();
        notes = await getUserNotes(user.id);
      } catch (e) {
        error = e.message;
      }
    });

    let notes = [];

  
</script> 
  
  {#if error}
    <p>{error}</p>
  {:else if user}
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
  
      <h2>Tus notas</h2>
      {#if notes.length > 0}
        <ul>
          {#each notes as note}
            <li>
              <strong>{note.nombre_tarea}</strong>
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
  
  