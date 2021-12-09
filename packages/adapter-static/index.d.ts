import { Adapter } from '@dishuostec/kit';

interface AdapterOptions {
	pages?: string;
	assets?: string;
	fallback?: string;
}

declare function plugin(options?: AdapterOptions): Adapter;
export = plugin;
