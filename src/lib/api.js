// src/lib/api.js
export const getUserData = async () => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      throw new Error("No auth token found");
    }
  
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:k_bg5U-q/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
  
    return await response.json();
  };


// src/lib/api.js
export const getUserNotes = async (userId) => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      throw new Error("No auth token found");
    }
  
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:KcOdzVUU/get_notes_user?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user notes");
    }
  
    return await response.json();
  };
  
  