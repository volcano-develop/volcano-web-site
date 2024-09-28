export type SiteDataItem = {
    id: number,
    title?: string,
    html?: string,
    boxStyle?: string,
    children: SiteDataItem[]
    hasGoto: boolean;
    sort: number;
}

export type SiteSection = {
    id: number,
    title: string,
    data: SiteDataItem[]
}

export type SiteData = {
    id: number,
    title: string,
    data: SiteSection[]
}
