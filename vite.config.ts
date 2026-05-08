import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, Plugin } from 'vite';
import { promises as fs } from 'fs';
import path from 'path';

async function generateWebp(imagesDir: string): Promise<void> {
	const { default: sharp } = await import('sharp');

	async function processDir(dir: string) {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		await Promise.all(
			entries.map(async (entry) => {
				const fullPath = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					await processDir(fullPath);
				} else if (/\.(png|jpe?g)$/i.test(entry.name)) {
					const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
					try {
						await fs.access(webpPath);
					} catch {
						await sharp(fullPath).webp({ quality: 85 }).toFile(webpPath);
						console.log(`[webp] generated ${path.relative(imagesDir, webpPath)}`);
					}
				}
			})
		);
	}

	await processDir(imagesDir);
}

function webpPlugin(): Plugin {
	const imagesDir = path.resolve('static/images');
	return {
		name: 'generate-webp',
		async buildStart() {
			await generateWebp(imagesDir);
		},
		configureServer(server) {
			generateWebp(imagesDir).catch(console.error);
			server.watcher.on('add', async (file) => {
				if (/\.(png|jpe?g)$/i.test(file) && file.startsWith(imagesDir)) {
					const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
					try {
						await fs.access(webpPath);
					} catch {
						const { default: sharp } = await import('sharp');
						await sharp(file).webp({ quality: 85 }).toFile(webpPath);
						console.log(`[webp] generated ${path.relative(imagesDir, webpPath)}`);
					}
				}
			});
		}
	};
}

const config: UserConfig = {
	plugins: [sveltekit(), webpPlugin()]
};

export default config;
