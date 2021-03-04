import { uniqueNamesGenerator, Config, starWars, names } from 'unique-names-generator'

const randomNameConfig: Config = {
    dictionaries: [starWars, names],
    separator: ' ',
    length: 2
}

export const generateRandomName = () => uniqueNamesGenerator(randomNameConfig)

/* A bunch of design constants */
export const styleConstants = {
    defaultBox: '1rem',
    defaultWrapper: '.5rem 1.1rem',
    formBorderRadius: '6px',
    defaultRadius: '4px',
    defaultShadow: '10px 7px 50px #3d7760',
    defaultBorder: '1px solid #38a169',
    headerHeight: '60px',
    buttonHeight: '48px',
    fixedMarginTop: '3rem',
    paddingWrapper: '.5rem 2rem',
    altBorder: '1px solid #dddddd',
    thickBorder: '1px solid #38a169',
    altBackground: '#fafffd',
    background: '#F7FAFC',
    inputMinHeight: '48px',
    inputFontSize: '16px',
    inputPlaceHolder: '14px',
    fixedpadding: '2rem',
    topZindex: '99910',
    tableBackgroundDark: '#f5f5f5',
    tableBackground: 'hsl(0,0%,98%)',
    tableTextColor: 'hsl(0,0%,30%)',
    tableBorder: '1px solid rgba(77, 77, 77, 0.3)',
    lightShadow: '6px 5px 10px rgba(0,50,30,0.03)',
    blue: '#0476D0',
    green: '#00B268',
    main: 'green.600',
    green800: '#22543d',
};

export type TMangaCollection = {
    canonicalTitle: string;
    description: string;
    chapterCount: number;
    createdAt: Date;
    popularityRank: string;
    posterImage: {
        medium: string;
        small: string
    };
    serialization: string;

    [x: string]: string | Record<string, any> | string[] | number | Record<string, any>[]
}