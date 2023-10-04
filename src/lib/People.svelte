<script lang="ts">
    export let name:string;
    export let link:string;
    export let src:string;
</script>

<div class="mx-auto">

    <img class="mx-auto mb-7" {src} alt="">
    <a href={link} class="font-poppins font-semibold text-3xl text-primary underline">{name}</a>
</div>