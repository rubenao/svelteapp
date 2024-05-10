<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    let email = '';
    let password = '';
  
    async function login() {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:k_bg5U-q/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Guardar el token de acceso, usualmente en localStorage o una cookie
        sessionStorage.setItem('auth_token', data.authToken);
        goto('/dashboard'); // Redirigir a la página de dashboard
      } else {
        console.error('Error en el login');
      }
    }
  </script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="card w-96 bg-white shadow-xl">
    <div class="card-body">
      <h2 class="card-title font-bold text-2xl">Iniciar sesión</h2>
  
        <form on:submit|preventDefault={login} class="space-y-4 pt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label class="input input-bordered flex items-center gap-2" for="email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input class="grow" placeholder="Email" type="email" bind:value={email} id="email" required/>
            </label>
          </div>
          <div>
            <label class="input input-bordered flex items-center gap-2" for="password">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
              <input  class="grow" type="password" placeholder="contraseña" bind:value={password} id="password" required/>
            </label>
          </div>
          <button type="submit" class="btn btn-primary w-full">Iniciar sesión</button>
          <h5 class="font-medium">Todavía no tienes una cuenta, <a href="/signup" class="underline">Registrate</a></h5>
        </form>
      </div>
    </div>
  </div>