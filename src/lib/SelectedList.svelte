<script lang="ts">
  import type { FoodItem } from "../types";

    export let selectedFoods: FoodItem[] = [];
</script>

<div class="mt-16 w-full bg-white p-12 rounded-2xl">
    <ul class="flex justify-between ">
      <li>
        <ul>
          <li class="text-primary font-poppins font-semibold text-2xl mb-11">
            Ingredients
          </li>
          {#each selectedFoods as food}
            <li class="font-poppins font-medium text-2xl text-black mb-11 ">
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
      </li><li>
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
            <li class="mb-9"  >
              <button 
              class="font-poppins text-base font-medium bg-[#FF8787] px-5 py-2 rounded-full "
              on:click="{()=>{
                // remove food from selectedFoods
                selectedFoods = selectedFoods.filter((f) => f.food_items !== food.food_items);
              }}">
                Remove

              </button>
            </li>
          {/each}
        </ul>
      </li>

    </ul>
  </div>