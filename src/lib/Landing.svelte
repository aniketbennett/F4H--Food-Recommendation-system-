<script lang="ts">
 function scroll(){

window.scrollTo({
  top: 900,
  behavior: "smooth"
})
  } 
</script>

<div class="flex mt-28 justify-between">
  <div class="w-1/3 text-left font-poppin mt-28">
    <h3 class="text-6xl font-bold pr-10">Take Control of Your Health</h3>
    <h5 class="text-3xl text-black font-light mt-4">
      With Our Tailored Diet Plans
    </h5>
    <button
    on:click={scroll}
      class="mt-7 px-10 py-5 bg-primary rounded-lg text-xl font-bold text-white"
    >
      Create Now!
    </button>
  </div>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img
    class="max-w-2xl max-h-fit"
    src="assets/imgg.svg"
    alt="image of people in store"
  />
</div>
