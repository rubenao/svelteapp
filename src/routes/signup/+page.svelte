<script>
    import { registerUser } from '$lib/auth';
    import { goto } from '$app/navigation';
    
    let name = '';
    let email = '';
    let password = '';
    let error = '';
    
    async function signup() {
      try {
        await registerUser(name,email, password);
        goto('/login'); // Redirige a la página de login
      } catch (e) {
        error = e.message;
      }
    }
</script>
    
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="card w-96 bg-white shadow-xl">
        <div class="card-body">
          <h2 class="card-title font-bold">Registrarse</h2>
          {#if error}
            <p class="text-red-500">{error}</p>
          {/if}
          <form on:submit|preventDefault={signup} class="space-y-4">
            <div class="form-control">
                <label for="name" class="label">
                    <span class="label-text">nombre:</span>
                  </label>
                  <input type="text" bind:value={name} id="name" required class="input input-bordered w-full">
              <label for="email" class="label">
                <span class="label-text">Email:</span>
              </label>
              <input type="email" bind:value={email} id="email" required class="input input-bordered w-full">
            </div>
            <div class="form-control">
              <label for="password" class="label">
                <span class="label-text">Password:</span>
              </label>
              <input type="password" bind:value={password} id="password" required class="input input-bordered w-full">
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary w-full">Registrarse</button>
              <h5 class="font-medium pt-3">Ya tienes una cuenta, <a href="/login" class="underline">Inicia sesión</a></h5>
            </div>
          </form>
        </div>
      </div>
    </div>
    



