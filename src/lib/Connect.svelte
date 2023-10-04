<script>
  import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTwitter,
  } from "@tabler/icons-svelte";
</script>

<div class="mb-5">
  <p class="font-poppins text-2xl font-normal mt-20 mb-6">Connect With Us</p>
  <ul class="flex justify-center space-x-10">
    <a target="_" href="https://twitter.com/_Food_4_Health">
      <IconBrandTwitter
        size={36}
        class="text-primary"
        fill="purple"
        color="purple"
      />
    </a>
    <a target="_" href="https://www.instagram.com/_food4health__/"
      ><IconBrandInstagram size={36} class="text-primary" /></a
    >
    <a target="_" href="https://www.facebook.com/profile.php?id=100092486404434"
      ><IconBrandFacebook size={36} class="text-primary" /></a
    >
  </ul>
</div>
