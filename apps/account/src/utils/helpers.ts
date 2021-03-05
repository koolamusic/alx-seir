import { uniqueNamesGenerator, Config, starWars, names } from 'unique-names-generator'

const randomNameConfig: Config = {
    dictionaries: [starWars, names],
    separator: ' ',
    length: 2
}

export const generateRandomName = () => uniqueNamesGenerator(randomNameConfig)

export type TMangaCollectionProps = {
    canonicalTitle: string;
    description: string;
    chapterCount: number;
    createdAt: string;
    popularityRank: string;
    posterImage: {
        medium: string;
        small: string
    };
    serialization: string;

    [x: string]: string | Record<string, any> | string[] | number | Record<string, any>[]
}

export type TJokesCollectionProps = {
    type: string | number;
    id: number;
    setup: string;
    punchline: string
}


export type TJokesCollection = TJokesCollectionProps[]
export type TMangaCollection = {
    id: string;
    type: string;
    attributes: TMangaCollectionProps
    links: Record<string, any>;
    relationships: Record<string, any>
}[]


export const stringToHslColor = (str: string, s: number, l: number) => {
    const table = str.slice(0, 12)
    let hash = 0;
    for (let i = 0; i < table.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}
export const colorGenFactory = (genColor: typeof stringToHslColor | Function) => (str: string) => genColor(str, 32, 40)

export const outerColorGen = (payload: string) => stringToHslColor(payload, 50, 40)
export const layerColorGen = (payload: string) => stringToHslColor(payload, 50, 91)