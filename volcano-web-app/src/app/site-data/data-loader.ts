import { assetsUrl } from "./data";
import { SiteDataItem } from "./models";

export async function fetchSiteData(id: string, kind: 'html' | 'json'): Promise<SiteDataItem | string | undefined> {
    try {
        const url = `${assetsUrl}boxes/${id}.${kind}`;
        // Esegui la richiesta HTTP per ottenere i dati JSON
        const response = await fetch(url);

        // Verifica se la risposta è ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (kind == 'json') {
            // Converti la risposta in JSON
            const data = await response.json();

            // Funzione ricorsiva per mappare i dati al tipo SiteDataItem
            function mapToSiteDataItem(item: any): SiteDataItem {
                return {
                    id: item.id,
                    title: item.title || "",
                    html: item.html || "",
                    boxStyle: item.boxStyle,
                    children: item.children ? item.children.map(mapToSiteDataItem) : [],
                    hasGoto: item.hasGoto,
                    sort: item.sort
                };
            }

            // Mappa i dati JSON al tipo SiteDataItem
            return data;
        }
        if(kind='html'){
            return await response.text();
        }
    } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
        throw error; // Rilancia l'errore per gestirlo esternamente
    }
}