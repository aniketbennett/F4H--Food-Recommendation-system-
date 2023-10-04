<script>
  import Newsletter from "./Newsletter.svelte";
  import Connect from "./Connect.svelte";
  import { createMeal } from "../store/create";
</script>

<div class="mt-52">
  <img src="assets/logo.svg" alt="Logo again" class="w-36 h-16 mx-auto" />
  <div>
    <ul class="flex font-poppins text-sm space-x-36 justify-center my-14">
      <li>
        <button
          on:click={() => {
            createMeal.set({ create: 3 });
            window.scrollTo({
              top: 0,
            });
          }}
        >
          Create Meal
        </button>
      </li>
      <li>
        <button
          on:click={() => {
            createMeal.set({ create: 1 });
            window.scrollTo({
              top: 900,
            });
          }}
        >
          Create Diet Plan
        </button>
      </li>
      <li>
        <button
          on:click={() => {
            createMeal.set({ create: 4 });
            // scroll to top
            window.scrollTo({
              top: 0,
            });
          }}
        >
          About Us
        </button>
      </li>
    </ul>
  </div>
  <Newsletter />
  <Connect />
</div>
