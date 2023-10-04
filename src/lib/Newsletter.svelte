<script>

  import { IconChevronRight } from "@tabler/icons-svelte";

</script>
<form >
    <h5 class="font-poppins text-primary font-semibold text-2xl mb-4">
      Subscribe to our Weekly newsletter
    </h5>
    <div class="relative mx-auto max-w-xl">
      <input
        type="search"
        id="search"
        class="block w-full p-5 pl-10 font-poppins font-thin text-black text-xl rounded-full placeholder-black border bg-transparent border-black"
        placeholder="Enter Your Mail"
        required
      />
      <button
        type="submit"
        class="text-white absolute right-2.5 bottom-1.5 rounded-full bg-black focus:ring-4 focus:outline-none font-medium text-sm p-3"
        ><IconChevronRight size={36} /></button
      >
    </div>
  </form>