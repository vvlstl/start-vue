<template>
	<div class="pokemon-list">
		<div class="pokemon-list__title">Pokémon Gallery</div>
		<template v-if="store.loading">
			<div
				class="loading"
				v-html="loadingText"
			/>
		</template>
		<template v-else>
			<div class="pokemon-list__items">
				<PokemonCard
					v-for="p in store.pokemons"
					:key="p.id"
					:pokemon="p"
				/>
			</div>

			<Pagination
				class="pokemon-list__pagination"
				:total-items="totalPages"
				v-model="currentPage"
				@click="store.fetchPokemons(currentPage)"
			/>
		</template>
	</div>
</template>
<script setup lang="ts">
	import PokemonCard from "./PokemonCard.vue";
	import {usePokemonStore} from "../../../stores/pokemonStore.ts";
	import {computed, onMounted, ref} from "vue";

	const loadingText = "Loading...";
	const store = usePokemonStore();
	const totalPages = computed(() => Math.ceil(store.total / store.limit));
	const currentPage = ref<number>(1);

	onMounted(() => store.fetchPokemons(currentPage.value))
</script>

