<template>
	<div class="pokemon-list">
		<div class="pokemon-list__title">Pokémon Gallery</div>
		<template v-if="store.loading">
			<div
				class="loading"
				v-html="store.loadingText"
			/>
		</template>
		<template v-else>
			<div class="pokemon-list__items">
				<PokemonCard
					v-for="(pokemon, index) in store.pokemons"
					:key="index"
					:pokemon="pokemon"
				/>
			</div>

			<Pagination
				class="pokemon-list__pagination"
				:total-items="totalPages"
				v-model="currentPage"
				@click="store.getPokemons(currentPage)"
			/>
		</template>
	</div>
</template>
<script setup lang="ts">
	import {computed, onMounted, ref} from "vue";
	import PokemonCard from "@/components/pokemon/PokemonCard.vue";
	import {usePokemonStore} from "@/stores/pokemon.ts";

	const store = usePokemonStore();
	const totalPages = computed(() => Math.ceil(store.total / store.limit));
	const currentPage = ref<number>(1);

	onMounted(() => store.getPokemons(currentPage.value));
</script>


