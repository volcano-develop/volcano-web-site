import {SiteData, SiteDataItem, SiteSection} from './models'
export var verticalFactorVar = 1.5;
export var horizonthalFactorVar = 3.1;

export function setVerticalFactor(v: number){
    verticalFactorVar = v;
}
export function setHorizonthalFactor(v: number){
    horizonthalFactorVar = v;
}

const htmlTemplateLogo = `
    <div class="pittogramma">
                    
        <div class="pittogramma1">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve">
                <path d="M899.5,552.4c-52.1-5-173.6-219.6-255.2-247.9c0.1,0,0.1,0,0.2,0.1c-49.7-18.9-99.8-24.8-144.2-24.1
                c-44.4-0.7-94.5,5.2-144.2,24.1c0.1,0,0.2,0,0.3-0.1c-81.6,28.3-203.1,242.9-255.2,248c-63.9,6.2-100.4-52-100.4-52
                c0,275.9,223.7,499.6,499.6,499.6c275.9,0,499.6-223.7,499.6-499.6C999.9,500.4,963.4,558.6,899.5,552.4z" class="svg-fill" />
            </svg>
        </div>

        <div class="pittogramma2">
            pittogramma2
        </div>
        
        <div class="pittogramma3">
            pittogramma3
        </div>

        <div class="pittogramma4">
            pittogramma4
        </div>

        <div class="fonogramma">
            fonogramma
        </div>

    </div>
`;
export const data: SiteData = {
    id: 1,
    title: "Volcano's web site",
    data: [
        {
            id: 10,
            title: 'Principale',
            data: [
                {
                    id:100,
                    html: htmlTemplateLogo,
                    title: "",
                    boxStyle: "bg0",
                    children: [
                        {
                            id:1000,
                            html: "<h1>Chi siamo?</h1><p>Siamo l'esercito del surf</p>",
                            title: "",
                            children: []
                        }]
                },
                {
                    id:200,
                    html: "<p>Ciao mondo 3</p>",
                    title: "",
                    boxStyle: "bg1",
                    children: [
                        {
                            id:2000,
                            html: "<p>Ciao mondo 11</p>",
                            title: "",
                            children: []
                        },
                        {
                            id:2001,
                            html: "<p>Ciao mondo 23</p>",
                            title: "",
                            children: []
                        }]
                },
                {
                    id:300,
                    html: "<p>Ciao 1</p>",
                    title: "",
                    boxStyle: "bg2",
                    children: []
                },
                {
                    id:400,
                    html: "<p>Ciao 2</p>",
                    title: "",
                    boxStyle: "bg3",
                    children: []
                },
                {
                    id:500,
                    html: "<p>Ciao 500</p>",
                    title: "",
                    boxStyle: "bg4",
                    children: []
                },
                {
                    id:600,
                    html: "<p>Ciao 600</p>",
                    title: "",
                    boxStyle: "bg5",
                    children: []
                }

            ]
        }
    ]
}
