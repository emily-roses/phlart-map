import type { Head, Art, ArtResponse } from './api.ts';
import { getData } from './api.ts';
const filterAttributes = ["landmark"];

const artDataResponse: ArtResponse = await getData();
const artDataBody = artDataResponse['body'];
export const filter = (filterAttributes: string[], artDataBody: Art[] ) => {
    return artDataBody['art'].filter((art: Art) => {
        return (filterAttribute in art);
    });
};

export const filterTesting = filter(filterAttributes, artDataBody);
console.log(filterTesting);
