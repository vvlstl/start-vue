<template>
	<div class="pokemon-card">
		<img
			:src="pokemon.image"
			:alt="pokemon.name"
			class="pokemon-card__picture"
		/>
		<h2
			class="pokemon-card__title"
			v-html="pokemon.name"
		/>
		<p class="pokemon-card__id">#{{ pokemon.id }}</p>
	</div>
</template>

<script setup lang="ts">
	type TComponentProps = {
		pokemon: {
			id: number,
			name: string,
			image: string
		}
	}
	const props = defineProps<TComponentProps>()
	void props
</script>