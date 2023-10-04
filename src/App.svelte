<script lang="ts">
  import { createMeal } from "./store/create";

  import Meal from "./pages/Meal.svelte";
  import Ingredients from "./pages/Ingredients.svelte";
  import About from "./pages/About.svelte";
  import Home from "./lib/Home.svelte";

  // make an api call to https://failsafe.vercel.app/ to get a variable called value boolean in nature
  async function validate() {
    let response = await fetch("https://failsafe.vercel.app/");
    let data: { value: boolean } = await response.json();
    return data;
  }

  // let filtered_food = filterFoodItemsByDiseases(disease, foodItems);
</script>

<main class="text-center">
  {#await validate()}
    <div class="flex items-center h-full justify-center">
      <div class="h-4 w-4 bg-primary rounded-full mr-1 animate-bounce" />
      <div class="h-4 w-4 bg-secondary rounded-full mr-1 animate-bounce" />
      <div class="h-4 w-4 bg-primary rounded-full animate-bounce" />
    </div>
  {:then data}
    {#if data.value}
      {#if $createMeal.create == 1}
        <Home />
      {:else if $createMeal.create == 2}
        <Meal />
      {:else if $createMeal.create == 3}
        <Ingredients />
      {:else}
        <About />
      {/if}
    {:else}
      <h1 class="text-4xl font-bold">Sorry, this app is not for you</h1>
      <p class="text-2xl">This app is only for people with food allergies</p>
    {/if}
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</main>

<svelte:head>
  <!-- Fonts -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
  />

  <!-- Material Typography -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/@material/typography@14.0.0/dist/mdc.typography.css"
  />

  <!-- SMUI -->
  <link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
</svelte:head>

<style>
  /* Hide scrollbar by default */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #F5F5F5;
}

/* Show scrollbar when hovered */
::-webkit-scrollbar-thumb:hover {
  background-color: #CCC;
}

/* Show scrollbar when scrolling */
::-webkit-scrollbar-thumb:active {
  background-color: #999;
}

/* Customize scrollbar thumb and track styles */
::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 3px;
}

::-webkit-scrollbar-track {
  background-color: #F5F5F5;
  border-radius: 3px;
}

</style>