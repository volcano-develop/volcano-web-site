import { verticalFactorVar, horizonthalFactorVar } from "./data";
import { fetchSiteData } from "./data-loader";
import { SiteData, SiteDataItem, SiteSection } from "./models";

function removeDivsByParentId(parentId: string) {
  // Select all div elements with the specified parent-id attribute
  const divs = document.querySelectorAll(`div[parent-id="${parentId}"]`);

  // Iterate over the NodeList of divs and remove each from the DOM
  divs.forEach(div => {
    div.remove();
  });
}

// Example usage
//removeDivsByParentId('123');  // This will remove all divs with parent-id="123"

// Function to create a div element with a specified class name and content
function createDivElement(className: string, parentId: string, content = '') {
  const div = document.createElement('div');
  div.className = className;
  div.innerHTML = content;
  parentId && div.setAttribute('parent-id', parentId);
  return div;
}


function createOpenChildrenElement(parentId: string) {
  const div = document.createElement('div');
  div.className = 'box-cmd';
  div.innerHTML = '<p id="explore-cmd">explore sub items <span class="icon-cmd">&#9662;</span> </p>';
  parentId && div.setAttribute('parent-id', parentId);
  return div;
}

function createGotoElement(parentId: string) {
  const div = document.createElement('div');
  div.className = 'box-cmd';
  div.innerHTML = '<p id="explore-cmd">Go to <span class="icon-cmd">&#9662;</span> </p>';
  parentId && div.setAttribute('parent-id', parentId);
  return div;
}


function createHeaderElement(parentId: string, numberC: number) {
  const div = document.createElement('div');
  div.className = 'box-header';
  div.innerHTML = '<p>' + numberC + '</p>';
  parentId && div.setAttribute('parent-id', parentId);
  return div;
}


// Function to recursively process SiteDataItem and its children
async function processSiteDataItem(item: SiteDataItem, parentElement: Element, clicked: Element | null, parentId: string ='') {
  console.log(`rendering: ${item.id}`)
  // Create a div for this item
  //debugger
  const boxData = await fetchSiteData(item.id.toString(), 'json') as SiteDataItem;
  const boxHtml = await fetchSiteData(item.id.toString(), 'html') as string;
  boxData.html = boxHtml;
  const itemDiv = createDivElement('site-data-item ' + (boxData.boxStyle || ''), parentId, boxData.html);
  item.children.length && itemDiv.prepend(createHeaderElement('', item.children.length))
  !clicked && parentElement.appendChild(itemDiv);
  clicked && clicked.insertAdjacentElement('afterend', itemDiv);
  clicked && clicked.classList.add('children-added');
  console.log('itemDiv', itemDiv);
  
  itemDiv.style.width = `calc(100vw / ${horizonthalFactorVar})`;
  itemDiv.style.minHeight = `calc(100vh / ${verticalFactorVar})`;
  // Add click event listener to the itemDiv

  if (item.children && item.children.length) {
    // aggiungere il controllo per aperturqa figli
    const cmdDiv = createOpenChildrenElement('');
    const p = itemDiv ? itemDiv.querySelector('.parent') : null;
    p && p.appendChild(cmdDiv);
    var cmdC = cmdDiv.querySelector('#explore-cmd');
    cmdC?.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent the click event from bubbling up

      // If item has children, add them to the DOM as siblings of the clicked item
      if (item.children && item.children.length > 0) {
        // Check if children are already added to avoid duplication
        if (!itemDiv.classList.contains('children-added')) {
          item.children.forEach(async child => {
            await processSiteDataItem(child,parentElement,itemDiv, item.id?.toString())
          });
          itemDiv.classList.add('children-added'); // Mark this item as having added children
        } else {
          removeDivsByParentId(item.id.toString());
          itemDiv.classList.remove('children-added'); // Mark this item as having added children
        }
      }
    });
    (cmdC as HTMLElement).style.cursor = 'pointer';
  }

  if (item.hasGoto && !item.children?.length) {
    const cmdDiv = createGotoElement('');
    const p = itemDiv ? itemDiv.querySelector('.parent') : null;
    p && p.appendChild(cmdDiv);
  }


  console.log(`rendered: ${item.id}`)
}


// Function to process SiteSection and its data
async function processSiteSection(section: SiteSection, parentElement: Element) {
  // Create a div for this section
  const sectionDiv = createDivElement('site-section', '');
  const sectionTitle = createDivElement('section-title', `<h2>${section.title}</h2>`);
  const sectionConntentDIv = createDivElement('site-section-content', '');
  sectionDiv.appendChild(sectionTitle);
  parentElement.appendChild(sectionDiv);
  sectionDiv.appendChild(sectionConntentDIv);

  // Process each SiteDataItem in the site data, ensuring all are awaited
  //const boxPromises = section.data.map(box => processSiteDataItem(box, sectionConntentDIv, null));

  for (let ind=0; ind < section.data.length; ind++){
    const box = section.data[ind];
    await processSiteDataItem(box, sectionConntentDIv, null);
  }

  //await Promise.all(boxPromises); // Wait for all sections to be processed

  console.log('All boxex processed'); // Will be logged once all sections are done
}

// Function to process SiteData and its sections
export async function processSiteData(siteData: SiteData) {
  console.log('Site template creation');
  // Create a div for the entire site data
  const siteDataDiv = createDivElement('site-data', '');
  const siteTitle = createDivElement('site-title', `<h1>${siteData.title}</h1>`);
  siteDataDiv.appendChild(siteTitle);
  document.body.appendChild(siteDataDiv);
  document.getElementById("container")?.appendChild(siteDataDiv);

  // Process each section in the site data, ensuring all are awaited
  const sectionPromises = siteData.data.map(section => processSiteSection(section, siteDataDiv));
  await Promise.all(sectionPromises); // Wait for all sections to be processed

  console.log('All sections processed'); // Will be logged once all sections are done
}

