const ALLOWED = new Set(['p', 'br', 'span', 'strong', 'em', 'a']);

export function sanitize(html: string): string {
	return html.replace(/<\/?[\w-]+[^>]*\/?>/g, (match) => {
		const selfClose = match.endsWith('/>');
		const closing = match.startsWith('</');
		const tagMatch = match.match(/^<\/?(\w+)/);
		if (!tagMatch) return '';
		const tag = tagMatch[1].toLowerCase();
		if (!ALLOWED.has(tag)) return '';
		if (selfClose) return `<${tag} />`;
		if (closing) return `</${tag}>`;
		if (tag === 'a') {
			const m = match.match(/href="([^"]*)"/);
			if (m && m[1].startsWith('https://')) return `<a href="${m[1]}">`;
			return '<a>';
		}
		return `<${tag}>`;
	});
}
