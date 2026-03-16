import type { Art } from './api.ts';
const filterAttributes = ['landmark'];

export const filter = (filterAttributes: string[], artDataBody: Art[]) => {
	return artDataBody.filter((art: Art) => {
		return filterAttributes.every((attribute) => attribute in art);
	});
};
