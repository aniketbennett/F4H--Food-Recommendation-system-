<script lang="ts">
  import {
    maxBreakfast,
    maxDinner,
    maxLunch,
    maxSnacks,
    type Macors,
  } from "./../store/maxFood";

  import type { selectedItem } from "src/types";
  import {
    selectedBreakfast,
    selectedDinner,
    selectedLunch,
    selectedSnacks,
  } from "../store/selectedFood";

  import Cal from "./Cal.svelte";
  import type { Writable } from "svelte/store";

  export let foodType: string;

  function findCurrent(
    category: string
  ): [Writable<selectedItem>, Writable<Macors>] {
    if (category == "Breakfast") {
      return [selectedBreakfast, maxBreakfast];
    } else if (category == "Lunch") {
      return [selectedLunch, maxLunch];
    } else if (category == "Snacks") {
      return [selectedSnacks, maxSnacks];
    } else {
      return [selectedDinner, maxDinner];
    }
  }
  let selectedStore: Writable<selectedItem>, maxCalorie: Writable<Macors>;
  $: [selectedStore, maxCalorie] = findCurrent(foodType);
  // $: selectedItem = $findCurrent(foodType);
  // let totalCalories:number=0;
  let calories: string,
    protein: string,
    fat: string,
    carbs: string = "0";

  $: calories = $selectedStore.item
    .reduce((acc, curr) => {
      return acc + curr.Calories;
    }, 0)
    .toFixed(2);

  $: protein = $selectedStore.item
    .reduce((acc, curr) => {
      return acc + curr.Protein;
    }, 0)
    .toFixed(2);

  $: fat = $selectedStore.item
    .reduce((acc, curr) => {
      return acc + curr.Total_Fat;
    }, 0)
    .toFixed(2);

  $: carbs = $selectedStore.item
    .reduce((acc, curr) => {
      return acc + curr.Carbs;
    }, 0)
    .toFixed(2);

  // create a function that takes current macro and max macro and returns a color base on condition if less than < 90% than yellow, 90% to 110% green, else red
  function macorColor(current: number, max: number): string {
    console.log(current, max);
    let percent = current / max;
    if (percent < 0.9) {
      return "yellow";
    } else if (percent > 1.1) {
      return "red";
    } else {
      return "green";
    }
  }

  let CalorieColor: string,
    ProteinColor: string,
    FatColor: string,
    CarbsColor: string;

  $: CalorieColor = macorColor(parseFloat(calories), $maxCalorie.Calories);
  $: ProteinColor = macorColor(parseFloat(protein), $maxCalorie.Protein);
  $: FatColor = macorColor(parseFloat(fat), $maxCalorie.Fats);
  $: CarbsColor = macorColor(parseFloat(carbs), $maxCalorie.Carbs);
</script>

<div class="col-span-1 rounded-2xl shadow-xl py-16 px-4">
  <h3 class="text-3xl font-bold text-primary mx-auto mb-12">Calculator</h3>
  <ul class="space-y-12 w-full">
    <Cal
      title="Calories"
      value={calories}
      color={CalorieColor}
      unit={"Kcal"}
      max={$maxCalorie.Calories}
    />
    <Cal
      title="Protien"
      value={protein}
      color={ProteinColor}
      unit={"g"}
      max={$maxCalorie.Protein}
    />
    <Cal
      title="Fat"
      value={fat}
      color={FatColor}
      unit={"g"}
      max={$maxCalorie.Fats}
    />
    <Cal
      title="Carbs"
      value={carbs}
      color={CarbsColor}
      unit={"g"}
      max={$maxCalorie.Carbs}
    />
  </ul>
  <button
    on:click={() => {
      window.scrollTo({
        top: 1500,
        behavior: "smooth",
      });
    }}
    class="bg-primary text-3xl mt-12 font-semibold py-4 px-4 rounded-xl text-white transition duration-300 ease-in-out"
  >
    Diet Chart
  </button>
</div>
