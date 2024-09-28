import {SiteData, SiteDataItem, SiteSection} from './models'
export var verticalFactorVar = 1.5;
export var horizonthalFactorVar = 3.1;
export var assetsUrl="./assets/";

export function setVerticalFactor(v: number){
    verticalFactorVar = v;
}
export function setHorizonthalFactor(v: number){
    horizonthalFactorVar = v;
}

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
                    children: [
                        {
                            id:1000,
                            children: [],
                            hasGoto: true,
                            sort: 10
                        }],
                        hasGoto: false,
                        sort:10
                },
                {
                    id:200,
                    children: [
                        {
                            id:2000,
                            children: [],
                            hasGoto: true,
                            sort: 10
                        },
                        {
                            id:2001,
                            children: [],
                            hasGoto: false,
                            sort:10
                        }],
                        hasGoto: false,
                        sort:20
                },
                {
                    id:300,
                    children: [{
                        id:3001,
                        children: [],
                        hasGoto: true,
                        sort:10
                    }],
                    hasGoto: true,
                    sort: 30
                },
                {
                    id:400,
                    children: [],
                    hasGoto: false,
                    sort: 40
                },
                {
                    id:500,
                    children: [],
                    hasGoto: false,
                    sort: 50
                },
                {
                    id:600,
                    children: [],
                    hasGoto: false,
                    sort: 60
                }

            ]
        }
    ]
}
