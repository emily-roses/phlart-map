import { getData } from '$lib/api';
import { addrToCordinates } from '$lib/utils/geocode';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  console.log(await getData());
  console.log(await addrToCordinates("32 evans st, warminster, pa 18974"))

};
