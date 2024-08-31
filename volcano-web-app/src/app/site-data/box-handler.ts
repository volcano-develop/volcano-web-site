import { verticalFactorVar, horizonthalFactorVar } from "./data";
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
removeDivsByParentId('123');  // This will remove all divs with parent-id="123"

// Function to create a div element with a specified class name and content
function createDivElement(className: string, parentId: string, content = '') {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = content;
    parentId && div.setAttribute('parent-id', parentId);
    return div;
}

// Function to recursively process SiteDataItem and its children
function processSiteDataItem(item: SiteDataItem, parentElement: Element) {
    // Create a div for this item
    const itemDiv = createDivElement('site-data-item ' + (item.boxStyle || ''), '', item.html);
    parentElement.appendChild(itemDiv);
    
    // Add click event listener to the itemDiv
    itemDiv.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent the click event from bubbling up
  
      // If item has children, add them to the DOM as siblings of the clicked item
      if (item.children && item.children.length > 0) {
        // Check if children are already added to avoid duplication
        if (!itemDiv.classList.contains('children-added')) {
          item.children.forEach(child => {
            // Create and insert each child element after the parent
            const childDiv = createDivElement('site-data-item ' + (item.boxStyle || ''), item.id.toString() ,child.html);
            itemDiv.insertAdjacentElement('afterend', childDiv);
            
            childDiv.style.width = `calc(100vw / ${horizonthalFactorVar})`;
            childDiv.style.minHeight = `calc(100vh / ${verticalFactorVar})`;

            // Optionally, set up child click handler if they also have children
            if (child.children && child.children.length > 0) {
              processSiteDataItem(child, itemDiv.parentElement!); // Recursive call for each child
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
  }
  

// Function to process SiteSection and its data
function processSiteSection(section: SiteSection, parentElement: Element) {
    // Create a div for this section
    const sectionDiv = createDivElement('site-section', '');
    const sectionTitle = createDivElement('section-title', `<h2>${section.title}</h2>`);
    const sectionConntentDIv = createDivElement('site-section-content', '');
    sectionDiv.appendChild(sectionTitle);
    parentElement.appendChild(sectionDiv);
    sectionDiv.appendChild(sectionConntentDIv);

    // Process each SiteDataItem in the section
    section.data.forEach(item => processSiteDataItem(item, sectionConntentDIv));
}

// Function to process SiteData and its sections
export function processSiteData(siteData: SiteData) {
    // Create a div for the entire site data
    const siteDataDiv = createDivElement('site-data', '');
    const siteTitle = createDivElement('site-title', `<h1>${siteData.title}</h1>`);
    siteDataDiv.appendChild(siteTitle);
    document.body.appendChild(siteDataDiv);
    document.getElementById("container")?.appendChild(siteDataDiv);
    // Process each section in the site data
    siteData.data.forEach(section => processSiteSection(section, siteDataDiv));
}

