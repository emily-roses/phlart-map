import art from '$lib/art.json';

/*
topnav: returned by philart.net/api.json. It has no body, just a head and links. See the tester for format and current values
listnav: returned by all philart.net/api/x.json (except for geo) and lists all of the valid children of the current request in the body. See the tester for format and current values
art: returned by philart.net/api/art/x.json, the body contains a description of a single piece of art
artist: returned by philart.net/api/artists/x.json, the body contains information about the artist, and an array of related art descriptions
person: returned by philart.net/api/people/x.json, the body contains information about a person referenced in one or more pieces of art, and an array of descriptions of those pieces
landmark: returned by philart.net/api/landmarks/x.json, the body contains information about a landmark which has physically associated art, and an array of descriptions of that art
content: all pieces of art in the database are associated with content types which are arbitrary inventions of the webmaster, such as "People Standing" or "Fish, Dolphins, and Whales". This type is returned by philart.net/api/content/x.json. The body contains an array of descriptions of art associated with one content type, and in some cases, additional explanatory text.
tour: returned by philart.net/api/tours/x.json. Tours are collections of reasonably geographically contiguous pieces of art, presented in an order that makes sense to the webmaster. The body of the response includes a description of the tour, additional information, and a sequenced array of art descriptions.
exhibit: returned by philart.net/api/exhibits/x.json. Exhibits are collections of art curated by the webmaster. The body contains a description and a sequenced array of art descriptions. Some exhibits, such as "War" are further divided into named sections.
year: returned by philart.net/api/years/x.json. The body contains an array of descriptions of all the art associated with that year.
architecture: returned by philart.net/api/architecture/x,json. All pieces of art that are attached to buildings or have some practical architectural function have been classified into various arbitrary architectural categories by the webmaster, such as "Bike Racks" and "Stairs". The body of this response includes an array of descriptions of all pieces in one such category
size: returned by philart.net/api/sizes/x.json, where x is "big" or "small". The body of this response includes an array of descriptions of art that have been arbitrarily classified into one of those two categories by the webmaster.
geo: returned by philart.net/api/geo.json. The body contains an array of art descriptions as described in detail further below.
*/

import { jsonrepair } from 'jsonrepair';

export interface Head {
	title: string;
	type:
		| 'topnav'
		| 'listnav'
		| 'art'
		| 'artist'
		| 'person'
		| 'landmark'
		| 'content'
		| 'tour'
		| 'webmaster'
		| 'descriptions'
		| 'year'
		| 'architecture'
		| 'size'
		| 'geo';
}

/*
All HATEOAS links are in the form "links":[ {"rel":"x","href":"y"}] where the first element always has a rel of "self" and the href is a fully qualified URL. For all the head types listed below (art, artist, person, etc.) as well as listnav, the links element includes self and parent elements. The topnav includes a longer list which you can see in the tester. HATEOAS links in the body only contain self. HATEOAS links are required when mentioned below.
*/
type HATEOAS = {
	links: { rel: 'self' | 'parent' | string; href: string }[];
};

type ApiBase = {
	head: Head;
} & HATEOAS;

interface Location {
	latitude: string;
	longitude: string;
	description?: string;
}

type ExternalLinks = [];

export type Art = {
	title: {
		display: string;
		list: string;
	}; // a required object with two string members: display, and list.
	artists?: ({ name: string; externallinks?: ExternalLinks } & HATEOAS)[]; // an optional array of objects with three members: name (a required string), external links, and HATEOAS links.
	years?: ({ year: string } & HATEOAS)[]; // an optional array of one or two objects with two members: year (a required string), and HATEOAS links. If there is one element in the array, then the date is definitive. If there are two elements in the array, then the dates are a range.
	yearmodifier?: string; // an optional string that provides some textual context for the years.
	location: Location; // an object with three members: latitude (a required string), longitude (a required string), and description (an optional string). If the art has been physically removed, then the description will be blank, and the latitude and longitude will refer to the last known location. If the art description is part of an array in a response with head type "tour", the optional member tourmapoverride may be added to this object. See "tour" below.
	comments?: string; // an optional string. This string may contain the HTML tags "b", "i", and "br". Double quotes are escaped in the JSON, ASCII line breaks are converted to spaces.
	related?: ({ title: string; prefix: string } & HATEOAS)[]; // an optional array of objects with three members: title (a required string), prefix (a required string describing the relationship) and HATEOAS links. This field exists where two pieces of art have a relationship beyond subject matter or artist, such as one being a copy of the other, or one having replaced the other in a specific location.
	inscription?: string; // an optional string. This string may contain the HTML tags "b", "i", and "br". Double quotes are escaped in the JSON, ASCII line breaks are converted to spaces.
	architecture?: { description: string } & HATEOAS; // an optional object with two members: description (a required string) and HATEOAS links.
	landmark?: { name: string; prefix?: string; externallinks: ExternalLinks } & HATEOAS; // an optional object with four members: name (a required string), prefix (an optional string), external links, and HATEOAS links.
	peopleprefix?: string; // an optional string describing how the people in the people field are referenced by the art, such as "statue of" or "quotes from".
	people?: ({ name: string; comment?: string; externallinks: ExternalLinks } & HATEOAS)[]; // an optional array of objects with four members: name (a string), comment (an optional string up to 32 characters which further qualifies peopleprefix for an individual person), external links, and HATEOAS links.
	externallinks: ExternalLinks; // external links for the art itself, such as articles or pictures on other sites.
	sizes: ({ size: 'big' | 'small' } & HATEOAS)[]; // an array of objects with two members: size (a required string set to "big" or "small"), and HATEOAS links. An entry that has both big and small typically describes a piece that is very large but contains small detailed elements.
	content: ({ description: string; separator?: ',' } & HATEOAS)[]; // an array of objects with three members: description (a required string), separator (an optional string), and HATEOAS links. The array is sequenced both in terms of imporance of the content and to make it possible to construct a reasonably syntactic English list of content elements. If the elements are to be listed in the form of a sentence, the seperator should be displayed after the description. Currently the only supported value of the separator is a comma, but that is subject to change without warning.
	pictures: {
		small: { url: string; mimetype: string };
		large: { url: string; mimetype: string };
	}[]; // an array of objects with two members: small, and large, which are required objects with two members: url (a required string) and mimetype (a required string). The small is a thumbnail of the large. Currently for all entries the small members are gifs and the large members are jpegs, though this could conceivably change in the future.
	tours?: ({ name: string } & HATEOAS)[]; // an optional array of objects with two members: name, and HATEOAS links.
	exhibits?: ({ name: string } & HATEOAS)[]; // an optional array of objects with two members: name, and HATEOAS links.
} & HATEOAS;

export type ArtResponse = { body: Art[] } & ApiBase;

export const getData = async () => {
	const request = await fetch(
		'http://www.philart.net/api/geo.json?ll=39.952400,-75.165700&bb=39.951400,-75.166700,39.953400,-75.164700'
	);
	return request.json();
};

export const getAllArt = async () => {
	return art.body.art;
};
