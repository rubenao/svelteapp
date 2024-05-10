// src/lib/auth.js

// src/lib/api.js

export async function registerUser(name,email, password) {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:k_bg5U-q/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:name,
        email: email,
        password: password,
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error in registration');
    }
  
    return await response.json();
  }

  
export const isAuthenticated = async () => {
    const token = sessionStorage.getItem('auth_token');
    console.log(token)
    return !!token; // Devuelve true si el token existe, false en caso contrario
  };
  