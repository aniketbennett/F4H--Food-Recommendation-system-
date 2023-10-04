<script lang="ts">
  export let mealTime: string;
  import {
    selectedBreakfast,
    selectedLunch,
    selectedSnacks,
    selectedDinner,
  } from "../store/selectedFood";
  import type { FoodItem } from "src/types";
export let foodType: string;
  function findCurrent(category: string) {
    if (category == "Breakfast") {
      return selectedBreakfast;
    } else if (category == "Lunch") {
      return selectedLunch;
    } else if (category == "Snacks") {
      return selectedSnacks;
    } else if (category == "Dinner") {
      return selectedDinner;
    }
  }
    let selectedStore = findCurrent(mealTime);

  // let length = 0;
  // $: length = $selectedStore.item.length;
  // let selectedStore = findCurrent(mealTime);
let selectedItems:FoodItem[] = [];

  $: selectedStore = findCurrent(mealTime);
  $: selectedItems = $selectedStore.item.filter((item) => {
    return item.Category === foodType;
  });

  let length =0;
  $: length = selectedItems.length;
</script>
{#if length >0}
<div >
  <p class="font-semibold text-3xl text-white">
    {foodType}
  </p>
  <ul>
    <ul>
      {#each selectedItems as item}
      <li class="font-poppins my-3 text-xl text-white">
        {item.food_items}
      </li>
      {/each}
  </ul>
  </ul>
</div>
{/if}