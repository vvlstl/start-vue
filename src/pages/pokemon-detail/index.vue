<template>
	<template v-if="store.loading">
		<div class="loading" v-html="store.loadingText"/>
	</template>

	<div class="pokemon-detail" v-else-if="store.pokemon">
		<img
			:src="store.pokemon.sprites.other?.['official-artwork']?.front_default"
			:alt="store.pokemon.name"
			class="pokemon-detail__artwork"
		/>
		<h1
			class="pokemon-detail__title"
			v-html="`${store.pokemon.name} #${store.pokemon.id}`"
		/>

		<div class="pokemon-detail__info">
			<p><strong>Height:</strong> {{ store.pokemon.height }}</p>
			<p><strong>Weight:</strong> {{ store.pokemon.weight }}</p>
			<p>
				<strong>Types:</strong>
				{{ store.pokemon.types.map((t) => t.type.name).join(", ") }}
			</p>
		</div>

		<div class="pokemon-detail__section">
			<h2>Abilities</h2>
			<ul>
				<li
					v-for="(abilityItem, index) in store.pokemon.abilities"
					:key="index"
					v-html="`${abilityItem.ability.name}`"
				>
				</li>
			</ul>
		</div>

		<div class="pokemon-detail__section">
			<h2>Base Stats</h2>
			<ul>
				<li
					v-for="(statItem, index) in store.pokemon.stats"
					:key="index"
					v-html="`${statItem.stat.name}: ${statItem.base_stat}`"
				/>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {onMounted} from "vue"
	import {useRoute} from "vue-router"
	import {usePokemonStore} from "@/stores/pokemonStore.ts";

	const route = useRoute()
	const store = usePokemonStore()

	onMounted(() => {
		store.getPokemon(Number(route.params.id))
	})
</script>
