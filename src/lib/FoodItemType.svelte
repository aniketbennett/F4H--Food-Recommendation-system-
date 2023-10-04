<script lang="ts">
  import type { Writable } from "svelte/store";
  import {
    selectedBreakfast,
    selectedLunch,
    selectedSnacks,
    selectedDinner,
  } from "../store/selectedFood";
  import type { FoodItem, selectedItem } from "../types";
  import { IconCheck, IconPlus } from "@tabler/icons-svelte";
  export let foodType: string;
  export let filteredFood: FoodItem[];
  export let currentlySelected: string;

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
  let selectedStore: Writable<selectedItem> = findCurrent(currentlySelected);
  $: selectedStore = findCurrent(currentlySelected);
  let selectedItems: FoodItem[] = [];
  $: selectedItems = $selectedStore.item;

  function filterFoodItemsByCategory(
    category: string,
    foodItems: FoodItem[]
  ): FoodItem[] {
    return foodItems.filter((foodItem) => {
      return foodItem.Category === category;
    });
  }

  function toggleItem(item: FoodItem, category: string,selectedStore:Writable<selectedItem>) {
    if (selectedItems.includes(item)) {
      selectedItems = selectedItems.filter((i) => i !== item);
    } else {
      selectedItems = [...selectedItems, item];
    }
    selectedStore.set({ category, item: selectedItems });
    // find the correct store and update it
  }

  let foodItems: FoodItem[] = [];
  let foodItemsC: FoodItem[] = [];
  $: foodItems = filterFoodItemsByCategory(foodType, filteredFood);
  $: foodItemsC = foodItems.slice(0, 3);
  let showAll = false;
  function toggleShowAll() {
    showAll = !showAll;
    if (showAll) {
      foodItemsC = foodItems;
    } else {
      foodItemsC = foodItems.slice(0, 3);
    }
  }

  // console.log(foodType);
  // console.log(filteredFood);
  // let foodItems =

  // set type of final_diseases to Disease[]
</script>

<li>
  <div class="flex space-x-4">
    <h3 class="text-primary text-3xl font-semibold">
      <!-- {foodType} -->
      {foodType}
    </h3>

    {#if foodItemsC.length>2 && !showAll}
    <button
      class="underline text-xs"
      on:click={() => {
        toggleShowAll();
      }}
    >
      View all
    </button>
    {/if} 
    {#if foodItemsC.length>3 && showAll}
    <button
      class="underline text-xs"
      on:click={() => {
        toggleShowAll();
      }}
    >
Hide
    </button>
    {/if}
  </div>

  <div class="my-4">
    <ul class="flex flex-wrap">
      {#each foodItemsC as food}
        <li>
          <button
            on:click={() => toggleItem(food, currentlySelected,selectedStore)}
            class="text-2xl font-normal rounded-xl my-2 mx-2 flex space-x-3 {selectedItems.includes(
              food
            )
              ? 'bg-primary text-white'
              : ' bg-white  text-black'} px-5 py-3"
          >
            <p>
              {food.food_items}
            </p>
            {#if selectedItems.includes(food)}
              <IconCheck
                class=" text-primary bg-white rounded-full p-1.5"
                size={32}
              />
            {/if}
            {#if !selectedItems.includes(food)}
              <IconPlus
                class=" bg-primary text-white rounded-full p-1.5"
                size={32}
              />
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</li>
