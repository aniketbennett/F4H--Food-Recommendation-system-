<script lang="ts">
  import SearchBar from "../lib/SearchBar.svelte";
  import Header from "../lib/Header.svelte";
  import type { FoodItem } from "../types";
  import food_items from "../assets/food_data.json";
  import Footer from "../lib/Footer.svelte";
  import { createPdf } from "../Download";
  import { IconDownload } from "@tabler/icons-svelte";

  let foodItems = food_items as unknown as FoodItem[];
  let value: string[] = [];

  // function to find element in array value matching foodItems.food_items
  let selectedFoods: FoodItem[] = [];
  $: selectedFoods = value.map((v) =>
    foodItems.find((f) => f.food_items === v)
  );
  let displayItems = {
    Calories: "kacl",
    Protein: "g",
    Carbs: "g",
    Total_Fat: "g",
  };
  let keys = {
    Calories: "kacl",
    Protein: "g",
    Carbs: "g",
    Total_Fat: "g",
    Saturated_Fat: "g",
    Fiber: "g",
    Cholesterol: "mg",
    Sodium: "mg",
    Sugar: "g",
    Potassium: "mg",
    Magnesium: "mg",
    Phosphorus: "mg",
    Vitamin_C: "mg",
    Vitamin_A: "IU",
    Calcium: "mg",
    Iron: "mg",
    Zinc: "mg",
    Vitamin_E: "mcg",
  };

  let showItems = false;
  let selectedLine = "Detailed Nutrition";
  // function that changes the displayItems array to show all the keys in the foodItems array and vice versa
  function toggleDisplayItems() {
    if (showItems) {
      displayItems = {
        Calories: "kacl",
        Protein: "g",
        Carbs: "g",
        Total_Fat: "g",
      };
      showItems = false;
      selectedLine = "Detailed Nutrition";
    } else {
      displayItems = keys;
      showItems = true;
      selectedLine = "See Only Macro Nutrients";
    }
  }
</script>

<div class="mx-16">
  <Header style={false} />
  <h2 class="text-4xl font-semibold font-poppins text-black mt-36 mb-9">
    Add Ingredients
  </h2>
  <SearchBar id="lang" bind:value>
    {#each foodItems as foodItem}
      <option value={foodItem.food_items}>{foodItem.food_items}</option>
    {/each}
  </SearchBar>
  <div class="bg-primary mt-9 py-16 rounded-3xl first-letter px-36">
    <h3 class="text-white text-4xl font-poppins font-semibold">Nutrition</h3>
    <ul class="flex-wrap flex font-poppins mt-16 justify-between">
      {#each Object.entries(displayItems) as [displayItem, unit]}
        <li class="bg-secondary w-52 h-52 py-9 text-center mt-8 rounded-2xl">
          <h4 class="font-semibold text-2xl text-primary">
            {displayItem.replaceAll("_", " ")}
          </h4>
          <div class="inline-flex text-center mt-9">
            <p class="font-semibold text-5xl">
              {selectedFoods
                .reduce((acc, food) => acc + food[displayItem], 0)
                .toFixed(2)}
            </p>
            <p class="mt-6">
              {unit}
            </p>
          </div>
        </li>
      {/each}
    </ul>
    <button
      on:click={toggleDisplayItems}
      class="mt-12 underline text-white font-poppins text-2xl"
    >
      {selectedLine}
    </button>
  </div>

  <div class="mt-16 w-full bg-white p-12 rounded-2xl">
    <ul class="flex justify-between">
      <li>
        <ul>
          <li class="text-primary font-poppins font-semibold text-2xl mb-11">
            Ingredients
          </li>
          {#each selectedFoods as food}
            <li class="font-poppins font-medium text-2xl text-black mb-11">
              {food.food_items}
            </li>
          {/each}
        </ul>
      </li>
      <li>
        <ul>
          <li class="text-black font-poppins font-semibold text-2xl mb-11">
            Weight
          </li>
          {#each selectedFoods as food}
            <li class="font-poppins font-medium text-2xl text-black mb-11">
              {food.Avg_Serving_Size}
            </li>
          {/each}
        </ul>
      </li>
      <li>
        <ul>
          <li class="text-black font-poppins font-normal text-2xl mb-11">
            Calories
          </li>
          {#each selectedFoods as food}
            <li class="font-poppins font-medium text-2xl text-black mb-11">
              {food.Calories}
            </li>
          {/each}
        </ul>
      </li>
      <li>
        <ul>
          <li class="text-black font-poppins font-normal text-2xl mb-11">
            Protein
          </li>
          {#each selectedFoods as food}
            <li class="font-poppins font-medium text-2xl text-black mb-11">
              {food.Protein}
            </li>
          {/each}
        </ul>
      </li>
      <li>
        <ul>
          <li class="text-black font-poppins font-normal text-2xl mb-11">
            Carbs
          </li>
          {#each selectedFoods as food}
            <li class="font-poppins font-medium text-2xl text-black mb-11">
              {food.Carbs}
            </li>
          {/each}
        </ul>
      </li>
      <li>
        <ul>
          <li class="text-black font-poppins font-normal text-2xl mb-11">
            Fat
          </li>
          {#each selectedFoods as food}
            <li class="font-poppins font-medium text-2xl text-black mb-11">
              {food.Total_Fat}
            </li>
          {/each}
        </ul>
      </li>
      <li>
        <ul>
          <li class="text-white font-poppins font-normal text-2xl mb-11">
            hello
          </li>
          {#each selectedFoods as food}
            <li class="mb-9">
              <button
                class="font-poppins text-base font-medium bg-[#FF8787] px-5 py-2 rounded-full"
                on:click={() => {
                  // remove food from selectedFoods
                  selectedFoods = selectedFoods.filter(
                    (f) => f.food_items !== food.food_items
                  );
                }}
              >
                Remove
              </button>
            </li>
          {/each}
        </ul>
      </li>
    </ul>
  </div>
  <div class="mt-24">
    <button
    on:click={() => {
      createPdf(selectedFoods);
    }}
    class="flex space-x-3 py-4 px-6 font-poppins  bg-white mx-auto rounded-xl">
      <div class="bg-primary p-1.5 rounded-full">
        <IconDownload color="white" stroke={3}/>
      </div>
      <p class="text-primary font-semibold text-2xl">Download as PDF</p>
    </button>
  </div>
  <Footer />
</div>
