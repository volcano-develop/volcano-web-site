import './app.element.scss';
import { processSiteData } from './site-data/box-handler';
import { data } from './site-data/data';

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

document.addEventListener('DOMContentLoaded', function () {
  processSiteData(data);
  const boxes = document.querySelectorAll('.site-data-item');
  boxes.forEach(box => {
    const item = box as unknown as HTMLElement;
    item.style.width = `calc(100vw / ${3})`;
    item.style.height = `calc(100vh / ${3})`;
  });
});
