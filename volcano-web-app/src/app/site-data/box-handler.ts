import { data } from "./data";
import { SiteData, SiteDataItem, SiteSection } from "./models";

// Function to create a div element with a specified class name and content
function createDivElement(className: string, content = '') {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = content;
    return div;
}

// Function to recursively process SiteDataItem and its children
function processSiteDataItem(item: SiteDataItem, parentElement: Element) {
    // Create a div for this item
    const itemDiv = createDivElement('site-data-item', item.html);
    parentElement.appendChild(itemDiv);

    // Process children if any
    if (item.children && item.children.length > 0) {
        item.children.forEach(child => processSiteDataItem(child, itemDiv));
    }
}

// Function to process SiteSection and its data
function processSiteSection(section: SiteSection, parentElement: Element) {
    // Create a div for this section
    const sectionDiv = createDivElement('site-section');
    const sectionTitle = createDivElement('section-title', `<h2>${section.title}</h2>`);
    sectionDiv.appendChild(sectionTitle);
    parentElement.appendChild(sectionDiv);

    // Process each SiteDataItem in the section
    section.data.forEach(item => processSiteDataItem(item, sectionDiv));
}

// Function to process SiteData and its sections
export function processSiteData(siteData: SiteData) {
    // Create a div for the entire site data
    const siteDataDiv = createDivElement('site-data');
    const siteTitle = createDivElement('site-title', `<h1>${siteData.title}</h1>`);
    siteDataDiv.appendChild(siteTitle);
    document.body.appendChild(siteDataDiv);
    document.getElementById("container")?.appendChild(siteDataDiv);
    // Process each section in the site data
    siteData.data.forEach(section => processSiteSection(section, siteDataDiv));
}

