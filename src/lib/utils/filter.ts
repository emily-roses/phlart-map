import type { Art } from './api.ts';
const filterAttributes = ['landmark'];

export const filterArt = (filterAttributes: string[], artDataBody: Art[]) => {
	console.log('filter');
	return artDataBody.filter((art: Art) => {
		return filterAttributes.every((attribute) => attribute in art);
	});
};
