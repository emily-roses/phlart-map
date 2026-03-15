export const getData = async () => {
	const request = await fetch(
		'http://www.philart.net/api/geo.json?ll=39.952400,-75.165700&bb=39.951400,-75.166700,39.953400,-75.164700'
	);
	return request.json();
};
