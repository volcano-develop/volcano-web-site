import './app.element.scss';
import { processSiteData } from './site-data/box-handler';
import { data, horizonthalFactorVar, setHorizonthalFactor, setVerticalFactor, verticalFactorVar } from './site-data/data';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
    <div class="wrapper">
      <div class="container" id="container">
        
      </div>
    </div>
      `;
  }
}
customElements.define('org-root', AppElement);

document.addEventListener('DOMContentLoaded', async function () {

  function getDeviceType() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent;

    if (userAgent.match(/Smart-TV/i) && (width > 1920 && height > 1080)) {
      return 'television';
    } else if (userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
      return 'smartphone';
    } else if (userAgent.match(/iPad|tablet|Kindle|Silk/i) && (width >= 768 && width <= 1024)) {
      return 'tablet';
    } else {
      return 'computer';
    }
  }

  function setInitialSliderValues() {

    console.log('Setting boxes size');
    const deviceType = getDeviceType();
    let widthFactor = 1;
    let heightFactor = 1;

    switch (deviceType) {
      case 'television':
        if (window.innerHeight > window.innerWidth) {
          // Portrait
          widthFactor = 3;
          heightFactor = 5;
        } else {
          // Landscape
          widthFactor = 5;
          heightFactor = 3;
        }
        break;
      case 'smartphone':
        if (window.innerHeight > window.innerWidth) {
          // Portrait
          widthFactor = 1;
          heightFactor = 2;
        } else {
          // Landscape
          widthFactor = 2;
          heightFactor = 1;
        }
        break;
      case 'tablet':
        if (window.innerHeight > window.innerWidth) {
          // Portrait
          widthFactor = 2;
          heightFactor = 4;
        } else {
          // Landscape
          widthFactor = 4;
          heightFactor = 2;
        }
        break;
      case 'computer':
        if (window.innerHeight > window.innerWidth) {
          // Portrait
          widthFactor = 2;
          heightFactor = 4;
        } else {
          // Landscape
          widthFactor = 4;
          heightFactor = 2;
        }
        break;
    }

    setHorizonthalFactor(widthFactor);
    setVerticalFactor(heightFactor);


    const boxes = document.querySelectorAll('.site-data-item');
    boxes.forEach(box => {
      const item = box as unknown as HTMLElement;
      item.style.width = `calc(100vw / ${horizonthalFactorVar})`;
      item.style.minHeight = `calc(100vh / ${verticalFactorVar})`;
    });
  }



  await processSiteData(data);
  setInitialSliderValues();
  //const boxes = document.querySelectorAll('.site-data-item');
  
  // boxes.forEach(box => {
  //   const item = box as unknown as HTMLElement;
  //   item.style.width = `calc(100vw / ${horizonthalFactorVar})`;
  //   item.style.minHeight = `calc(100vh / ${verticalFactorVar})`;
  // });


  window.addEventListener('resize', setInitialSliderValues); // Aggiorna al ridimensionamento della finestra

  // (async () => {
  //   const id = '100'; // Sostituisci con l'URL corretto del tuo JSON
  //   try {
  //     const siteData = await fetchSiteData(id);
  //     console.log("Dati caricati:", siteData);
  //   } catch (error) {
  //     console.error("Errore durante il caricamento dei dati:", error);
  //   }
  // })();
});
