import {
	dynamicFallbackInlineCode,
	legacyEntryId,
	legacyPolyfillId,
	safari10NoModuleFix
} from '@dishuostec/vite-plugin-legacy/constants.js';

const systemJSInlineCode = `(function(s,i){i(s.getAttribute('data-src')).then(function(m){window._sveltekit_init(m.start,i,s.getAttribute('data-nodes'))})})(document.getElementById('${legacyEntryId}'),function(m){return System.import(m)});`;

/**
 * @param {{
 *   legacy_polyfill_asset?: string;
 *   entry_file: string;
 *   branch: any[];
 *   get_entry: (entry:string)=>string;
 * }} config
 * @return {string[]}
 */
export function render_script_tags({ legacy_polyfill_asset, get_entry, entry_file, branch }) {
	const legacyEntryFilename = get_entry(entry_file);

	const scripts = [];

	// inject dynamic import fallback entry
	if (legacy_polyfill_asset) {
		scripts.push(`<script type="module">${dynamicFallbackInlineCode}</script>`);
	}

	// inject Safari 10 nomodule fix
	if (legacyEntryFilename) {
		scripts.push(`<script nomodule>${safari10NoModuleFix}</script>`);
	}

	// inject legacy polyfills
	if (legacy_polyfill_asset) {
		scripts.push(
			`<script nomodule id="${legacyPolyfillId}" src="${legacy_polyfill_asset}"></script>`
		);
	}

	// inject legacy entry
	if (legacyEntryFilename) {
		scripts.push(
			`<script nomodule id="${legacyEntryId}" data-src="${legacyEntryFilename}" data-nodes="${(
				branch || []
			)
				.map(({ node }) => get_entry(node.entry))
				.join(',')}">${systemJSInlineCode}</script>`
		);
	}

	return scripts;
}
