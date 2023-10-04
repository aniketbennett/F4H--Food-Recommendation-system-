<script lang="ts">

import {
    selectedBreakfast,
    selectedLunch,
    selectedSnacks,
    selectedDinner,
  } from "../store/selectedFood";
  import Header from "../lib/Header.svelte";
  import FoodItemType from "../lib/FoodItemType.svelte";
  import type { Disease, FoodItem } from "../types";
  import { userInfo } from "../store/disease";
  import FoodData from "../assets/food_data.json";
  import CalorieCount from "../lib/CalorieCount.svelte";
  import Footer from "../lib/Footer.svelte";
  import { IconDownload } from "@tabler/icons-svelte";
  import MealTime from "../lib/MealTime.svelte";
  import { downloadDataAsPDF } from "../Download";
  let currentlySelected: string = "Breakfast";
  let foodItems = FoodData as unknown as FoodItem[];
  function changeSelected(index: string) {
    currentlySelected = index;
  }

  const mealTime = ["Breakfast", "Lunch", "Snacks", "Dinner"];
  function findValidCategories(isNonVeg: boolean) {
    const categoriesVeg = {
      Breakfast: [
        "Breakfast grains",
        "Fruits",
        "Vegetables",
        "Protien",
        "Healthy Fats",
        "Breads",
        "Juice",
        "Indian bread",
        "Tea & Coffee",
      ],
      Lunch: [
        "Grains",
        "Indian bread",
        "Vegetables",
        "Salads",
        "Healthy Fats",
        "Soup",
        "Dairy",
      ],
      Snacks: [
        "Tea & Coffee",
        "Sandwich",
        "Nuts & Seeds",
        "Fruits",
        "Beverages",
        "Juice",
      ],
      Dinner: [
        "Grains",
        "Indian bread",
        "Vegetables",
        "Salads",
        "Healthy Fats",
        "Soup",
        "Dairy",
      ],
    };
    const categoriesNonVeg = {
      Breakfast: [
        "Breakfast grains",
        "Fruits",
        "Vegetables",
        "Non-veg Protien",
        "Protien",
        "Healthy Fats",
        "Breads",
        "Juice",
        "Indian bread",
        "Tea & Coffee",
      ],
      Lunch: [
        "Grains",
        "Indian bread",
        "Vegetables",
        "Salads",
        "Healthy Fats",
        "Soup",
        "Dairy",
        "Meat",
        "Non-veg Salads",
        "Non-veg Soup",
      ],
      Snacks: [
        "Tea & Coffee",
        "Sandwich",
        "Nuts & Seeds",
        "Fruits",
        "Beverages",
        "Juice",
        "Non-veg Sandwich",
      ],
      Dinner: [
        "Grains",
        "Indian bread",
        "Vegetables",
        "Salads",
        "Healthy Fats",
        "Soup",
        "Dairy",
        "Meat",
        "Non-veg Salads",
        "Non-veg Soup",
      ],
    };
    return isNonVeg ? categoriesNonVeg : categoriesVeg;
  }

  const validCategories = findValidCategories($userInfo.isNonVeg);

  function filterFoodItemsByDiseases(
    diseases: Disease[],
    foodItems: FoodItem[]
  ): FoodItem[] {
    return foodItems.filter((foodItem) => {
      for (let i = 0; i < diseases.length; i++) {
        const disease = diseases[i];

        if (
          foodItem.Carbs * $userInfo.mulitplier > disease.Carbs ||
          foodItem.Total_Fat * $userInfo.mulitplier > disease.Total_Fat ||
          foodItem.Saturated_Fat * $userInfo.mulitplier > disease.Saturated_Fat ||
          foodItem.Protein * $userInfo.mulitplier > disease.Protein ||
          foodItem.Fiber * $userInfo.mulitplier > disease.Fiber ||
          foodItem.Cholesterol * $userInfo.mulitplier > disease.Cholesterol ||
          foodItem.Sodium * $userInfo.mulitplier > disease.Sodium ||
          foodItem.Sugar * $userInfo.mulitplier > disease.Sugar ||
          foodItem.Potassium * $userInfo.mulitplier > disease.Potassium ||
          foodItem.Magnesium * $userInfo.mulitplier > disease.Magnesium ||
          foodItem.Phosphorus * $userInfo.mulitplier > disease.Phosphorus ||
          foodItem.Vitamin_C * $userInfo.mulitplier > disease.Vitamin_C ||
          foodItem.Vitamin_A * $userInfo.mulitplier > disease.Vitamin_A ||
          foodItem.Calcium * $userInfo.mulitplier > disease.Calcium ||
          foodItem.Iron * $userInfo.mulitplier > disease.Iron ||
          foodItem.Zinc * $userInfo.mulitplier > disease.Zinc ||
          foodItem.Vitamin_E * $userInfo.mulitplier > disease.Vitamin_E ||
          foodItem.Vitamin_K * $userInfo.mulitplier > disease.Vitamin_K
        ) {
          return false;
        }
      }
      return true;
    });
  }

  let filteredFood = filterFoodItemsByDiseases($userInfo.disease, foodItems);



</script>

<div
  class="	bg-no-repeat bg-cover bg-center
bg-[url('../assets/ellipse.svg')] pb-28 px-32"
>
  <Header style={true} />

  <h1 class="text-5xl font-semibold text-white mt-36">
    Recommended Diet Plans
  </h1>
</div>
<div class="my-24 font-poppins">
  <ul class="flex space-x-36 justify-center">
    {#each mealTime as meal, _}
      <li>
        <button
          on:click={() => changeSelected(meal)}
          class="{currentlySelected == meal
            ? 'bg-primary text-white font-semibold'
            : 'bg-gray-300 text-black font-normal'}  text-2xl px-4 py-3 rounded-xl"
        >
          {meal}
        </button>
      </li>
    {/each}
  </ul>
</div>
<div class="font-poppins grid grid-cols-3 space-x-6 mx-32">
  <div
    class="col-span-2 h-[747px] overflow-y-scroll rounded-2xl shadow-xl py-16 px-24"
  >
    <ul>
      {#each validCategories[currentlySelected] as foodType}
        <FoodItemType {foodType} {filteredFood} {currentlySelected} />
      {/each}
    </ul>
  </div>
  <CalorieCount foodType={currentlySelected} />
  <!-- <ul>
    {#each filteredFood as fil}
        <li>{fil.food_items}</li>
    {/each}
  </ul> -->
</div>
<div
  class=" bg-hero-pattern mt-10 rounded-2xl bg-primary bg-cover bg-center bg-no-repeat mx-32"
>
  <h2 class="text-5xl font-bold text-white py-20">Your Diet Plan</h2>
  <ul class="flex mx-36  justify-between">

      {#each Object.keys(validCategories) as mealTime}
        <li  >
          <div
            class="bg-white text-primary mb-11 font-semibold py-3 px-4 text-2xl rounded-xl"
          >
                {mealTime}
                </div>
          <div class="h-[451px]  overflow-y-scroll">
            {#each validCategories[mealTime] as foodType}
              <!-- <FoodItemType {foodType} {filteredFood} {currentlySelected} /> -->
              <MealTime {mealTime} {foodType}  />
            {/each}
          </div>
        </li>

      {/each}

  </ul>

  <div class="mt-24">
    <button
    on:click={() => {
      downloadDataAsPDF([
        $selectedBreakfast,
        $selectedLunch,
        $selectedSnacks,
        $selectedDinner,
      ]);
    }}
    class="flex space-x-3 py-4 px-6 font-poppins  bg-white mx-auto rounded-xl">
      <div class="bg-primary p-1.5 rounded-full">
        <IconDownload color="white" stroke={3}/>
      </div>
      <p class="text-primary font-semibold text-2xl">Download as PDF</p>
    </button>
  </div>
  <div class="h-14"></div>
</div>
<Footer />
