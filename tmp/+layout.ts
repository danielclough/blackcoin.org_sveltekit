export const prerender = true;
export const load = ({ params }) => {
	return { lang: params.lang };
};
