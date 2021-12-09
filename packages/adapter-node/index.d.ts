import { Adapter } from '@dishuostec/kit';
import { BuildOptions } from 'esbuild';

interface AdapterOptions {
	entryPoint?: string;
	out?: string;
	precompress?: boolean;
	env?: {
		path?: string;
		host?: string;
		port?: string;
	};
	esbuild?: (options: BuildOptions) => Promise<BuildOptions> | BuildOptions;
}

declare function plugin(options?: AdapterOptions): Adapter;
export = plugin;
