export type SiteDataItem = {
    id: number,
    title: string,
    html: string
    children: SiteDataItem[]
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
