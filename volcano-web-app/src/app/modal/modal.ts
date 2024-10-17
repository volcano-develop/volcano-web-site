import { fetchSiteData } from "../site-data/data-loader";

// Funzione per aprire la modale con parametri opzionali per larghezza e altezza
export async function openModal(id: string, width: string = '400px', height: string = '300px') {

    var html = await fetchSiteData(id, 'html', 'modals');
    const modal = document.getElementById('modal') as HTMLDivElement;
    const overlay = document.getElementById('overlay') as HTMLDivElement;

    // Imposta la larghezza e altezza personalizzate
    modal.style.width = width;
    modal.style.height = height;

    // Imposta il contenuto
    var c = document.getElementById("modal-content");
    c && (c.innerHTML=html as string);

    // Mostra la modale e l'overlay
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Funzione per chiudere la modale
export function closeModal() {
    const modal = document.getElementById('modal') as HTMLDivElement;
    const overlay = document.getElementById('overlay') as HTMLDivElement;

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

export function setModal() {
    // Event listener per aprire la modale
    // const openButton = document.getElementById('openModal') as HTMLButtonElement;
    // openButton.addEventListener('click', () => openModal('500px', '350px')); // Puoi personalizzare qui la larghezza e l'altezza

    // Event listener per chiudere la modale
    const closeButton = document.getElementById('closeModal') as HTMLSpanElement;
    closeButton.addEventListener('click', closeModal);

    // Chiude la modale se si clicca fuori dalla modale (overlay)
    const overlay = document.getElementById('overlay') as HTMLDivElement;
    overlay.addEventListener('click', closeModal);
}