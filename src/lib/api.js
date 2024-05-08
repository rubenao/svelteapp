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


// Obtener las notas del usuario
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

  // Eliminar nota
export const deleteNote = async (noteId) => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      throw new Error("No auth token found");
    }
  
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:KcOdzVUU/todo/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete the note");
    }
  };

  // Crear nota
export const createNote = async (name, userId) => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      throw new Error("No auth token found");
    }
  
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:KcOdzVUU/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre_tarea: name,
        user_id: userId
      })
    });
  
    if (!response.ok) {
      throw new Error("Failed to create the note");
    }
  
    return await response.json();
  };


  // src/lib/api.js
    export const updateNote = async (noteId, nombreTarea, userId) => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      throw new Error("No auth token found");
    }
  
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:KcOdzVUU/todo/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        todo_id:noteId, 
        nombre_tarea:nombreTarea,
        user_id:userId
     })
    });
  
    if (!response.ok) {
      throw new Error("Failed to update the note");
    }
  
    return await response.json();
  };

  // src/lib/api.js
export const getNoteById = async (noteId) => {
    /*const token = sessionStorage.getItem('auth_token');
    if (!token) {
      throw new Error("No auth token found");
    }*/
  
    const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:KcOdzVUU/todo/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch the note");
    }
    //console.log(response.json)
    return await response.json();
    
  };
  
  
  
  
  
  