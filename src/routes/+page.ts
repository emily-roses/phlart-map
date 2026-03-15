import { getData } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	console.log(await getData());
};
