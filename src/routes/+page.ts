import { getAllArt } from '$lib/api';
import { addrToCordinates } from '$lib/utils/geocode';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  //console.log(getAllArt());
};

export const prerender = 'auto';
