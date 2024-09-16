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

// Function to recursively process SiteDataItem and its children
 async function  processSiteDataItem(item: SiteDataItem, parentElement: Element) {
    console.log(`rendering: ${item.id}`)
    // Create a div for this item
    //debugger
    const boxData = await fetchSiteData(item.id.toString(), 'json') as SiteDataItem;
    const boxHtml = await fetchSiteData(item.id.toString(), 'html') as string;
    boxData.html = boxHtml;
    
    const itemDiv = createDivElement('site-data-item ' + (boxData.boxStyle || ''), '', boxData.html);
    parentElement.appendChild(itemDiv);
    
    // Add click event listener to the itemDiv
    itemDiv.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent the click event from bubbling up
  
      // If item has children, add them to the DOM as siblings of the clicked item
      if (item.children && item.children.length > 0) {
        // Check if children are already added to avoid duplication
        if (!itemDiv.classList.contains('children-added')) {
          item.children.forEach(async child => {
            const boxDataC = await fetchSiteData(child.id.toString(), 'json') as SiteDataItem;
            const boxHtmlC = await fetchSiteData(child.id.toString(), 'html') as string;
            boxDataC.html = boxHtmlC;
            // Create and insert each child element after the parent
            const childDiv = createDivElement('site-data-item ' + (boxData.boxStyle || ''), item.id.toString() ,boxDataC.html);
            itemDiv.insertAdjacentElement('afterend', childDiv);
            
            childDiv.style.width = `calc(100vw / ${horizonthalFactorVar})`;
            childDiv.style.minHeight = `calc(100vh / ${verticalFactorVar})`;

            // Optionally, set up child click handler if they also have children
            if (child.children && child.children.length > 0) {
              await processSiteDataItem(child, itemDiv.parentElement!); // Recursive call for each child
            }
          });
          itemDiv.classList.add('children-added'); // Mark this item as having added children
          
        } else {
            removeDivsByParentId(item.id.toString());
            itemDiv.classList.remove('children-added'); // Mark this item as having added children
        }


      }
    });
  
    // Optional: Add CSS to indicate items with children are clickable
    if (item.children && item.children.length > 0) {
      itemDiv.style.cursor = 'pointer';
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

    // // Process each SiteDataItem in the section
    // section.data.forEach(async item => await processSiteDataItem(item, sectionConntentDIv));

    // Process each SiteDataItem in the site data, ensuring all are awaited
    const boxPromises = section.data.map(box => processSiteDataItem(box, sectionConntentDIv));
    await Promise.all(boxPromises); // Wait for all sections to be processed

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

