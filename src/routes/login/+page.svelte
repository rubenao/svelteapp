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
  
  <form on:submit|preventDefault={login}>
    <div>
      <label for="email">Email:</label>
      <input type="email" bind:value={email} id="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" bind:value={password} id="password" required>
    </div>
    <button type="submit">Login</button>
  </form>
  