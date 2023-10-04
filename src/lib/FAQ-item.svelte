<script lang="ts">
	import { IconChevronDown, IconChevronLeft } from '@tabler/icons-svelte';
	import { slide } from "svelte/transition";
	export let entry: [string, string[]]
	let isOpen = false
	const toggle = () => isOpen = !isOpen
</script>
<style>
	/* button {border: none; background: none;display:block; color: inherit; font-size: 36px; cursor: pointer; margin: 0; padding-bottom: 0.5em; padding-top: 0.5em} */

	/* svg { transition: transform 0.2s ease-in;
	} */
	
	[aria-expanded=true] icon { transform: rotate(0.25turn); }
</style>
<button   on:click={toggle} aria-expanded={isOpen}  class=" w-full text-2xl text-start">
<div class="flex justify-between ">

	<p > {entry[0]} </p>
	{#if isOpen}
	<IconChevronDown class="icon" color="purple" size={32} />
	{:else}
	<IconChevronLeft class="icon" color="purple" size={32}/>
	{/if}
</div>
</button>
{#if isOpen}
<ul transition:slide={{ duration: 300 }}>
	{#each entry[1] as item}
	<li class="text-lg mt-7">{item}</li>
	{/each}
</ul>
{/if}
<p class="bg-black min-w-full h-0.5 my-7"/>


