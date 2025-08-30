<template>
	<div class="detail" v-if="pokemon">
		<img :src="pokemonImage" :alt="pokemon.name" class="artwork" />
		<h1 class="title">{{ pokemon.name }} #{{ pokemon.id }}</h1>

		<div class="info">
			<p><strong>Height:</strong> {{ pokemon.height }}</p>
			<p><strong>Weight:</strong> {{ pokemon.weight }}</p>
			<p><strong>Types:</strong> {{ pokemon.types.map(t => t.type.name).join(', ') }}</p>
		</div>

		<div class="section">
			<h2>Abilities</h2>
			<ul>
				<li v-for="a in pokemon.abilities" :key="a.ability.name">
					{{ a.ability.name }}
				</li>
			</ul>
		</div>

		<div class="section">
			<h2>Base Stats</h2>
			<ul>
				<li v-for="s in pokemon.stats" :key="s.stat.name">
					{{ s.stat.name }}: {{ s.base_stat }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {onMounted, ref} from 'vue'
	import {useRoute} from 'vue-router'
	import axios from 'axios'
	import type {TPokemon} from "@/js/types/pokemon-detail/TPokemon.ts";

	const route = useRoute()
	const pokemon = ref<TPokemon | null>(null)
	const pokemonImage = ref('')

	onMounted(async () => {
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
		pokemon.value = res.data
		pokemonImage.value = res.data.sprites.other['official-artwork'].front_default
	})
</script>

<style scoped>
.detail {
	max-width: 600px;
	margin: 0 auto;
	text-align: center;
}
.artwork {
	width: 200px;
	height: 200px;
}
.title {
	margin-top: 12px;
	font-size: 24px;
	font-weight: bold;
	text-transform: capitalize;
}
.info, .section {
	margin-top: 16px;
	text-align: left;
}
</style>
