<script context="module">
	/** @type {import('@dishuostec/kit').Load} */
	export async function load() {
		return {
			stuff: {
				message: 'original'
			}
		};
	}
</script>

<slot></slot>
