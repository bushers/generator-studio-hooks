export interface Dictionary<T> {
    [idx: string]: T;
}

export interface iValue {
    key: string;
    label?: string;
    value: React.ReactNode;
}

export interface Translation {
    campaignName: string;
    campaignTitle: string;
    clientTitle: string;
    campaignLabel: string;
    splashIntro: string[];
    sharebutton: string;
    embedbutton: string;
    emdedCopyTitle: string;
    embedCopy: string;
    copyToClipboard: string;
    scrollDown: string;
    clientUrl: string;
    campaignUrl: string;
    begin: string;
    informationCopy: string;
    exploreButton: string;
    embedCopyTitle: string;
    infoTitle: string;
    altText: string;
}

export const INIT_TRANSLATIONS: Translation = {
    campaignName: '',
    campaignTitle: '',
    clientTitle: '',
    campaignLabel: '',
    splashIntro: [],
    sharebutton: '',
    embedbutton: '',
    emdedCopyTitle: '',
    embedCopy: '',
    copyToClipboard: '',
    scrollDown: '',
    clientUrl: '',
    campaignUrl: '',
    begin: '',
    informationCopy: '',
    exploreButton: '',
    embedCopyTitle: '',
    infoTitle: '',
    altText: '',
};

export interface iAppData {
    navData: iNavData[];
    data: Dictionary<iData>;
    locale: Translation;
}

export interface iNavData {
    key: string;
    title: string;
    url: string;
    parent?: string;
    children?: iNavData[];
    order?: number;
    copy?: string;
}

export interface iData {
    key: string;
    title: string;
    graphType: string;
    copy: string;
    data: any[] | any;
    order: number;
    footnote: string;
}
