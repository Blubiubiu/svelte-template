<script>
	import api from '../server/api'
	export let name;
	api.get('sss')
</script>

<main>
	<h1>Hello {name}! <h2>1234567</h2>	</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		transition : transform 1s;
		> h2 {
			color: yellow;
		}
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>