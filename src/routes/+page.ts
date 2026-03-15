import { getAllArt } from '$lib/api';
import { addrToCordinates } from '$lib/utils/geocode';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	console.log(await getAllArt());
	console.log(await addrToCordinates('32 evans st, warminster, pa 18974'));
};

export const prerender = 'auto';
