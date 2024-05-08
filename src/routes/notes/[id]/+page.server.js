
import { getNoteById } from '$lib/api';
  
    export async function load({ params }) {
      try {
        const note =await getNoteById(params.id);
        //console.log(note)
        return { props: { note } }; // Pasa la nota recuperada como propiedad
      } catch (error) {
        console.error("Error al obtener la nota:", error);
        return { props: { note: null, error: error.message } };
      }
    }