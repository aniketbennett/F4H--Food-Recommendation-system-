<script>
import items from '../assets/faq.json';
  import FaqItem from './FAQ-item.svelte';

</script>

<h3 class="text-6xl font-poppins font-bold mt-36 mb-16">FAQs</h3>

<div class="text-start mx-32 font-poppins">
  {#each Object.entries(items) as entry}
  <FaqItem {entry} />
  {/each}
</div>