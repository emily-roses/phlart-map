import type { Head, Art, ArtResponse} from './api.ts';
import { getData } from './api.ts';
const filterAttribute = 'landmark';

const artDataResponse: ArtResponse = await getData();
const artDataBody = artDataResponse['body'];
export const filter = (filterAttribute: string, artDataBody: Art[] ) => {
    artDataBody['art'].filter((art: Art) => {
        console.log(art);
    })
};

export const filterTesting = filter(filterAttribute, artDataBody);