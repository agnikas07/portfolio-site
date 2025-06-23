import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	console.log('[MINIMAL_TEST] The honeypot route was executed successfully!');

	return new Response('Honeypot is active.', {
		status: 200,
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};