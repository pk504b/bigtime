<script lang="ts">
    import "../app.css";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { geoipData } from "$lib/stores/clock";

    onMount(async() => {
        try {
            const response = await fetch('https://freeipapi.com/api/json')
            $geoipData = await response.json()
        }
        catch (error) {
            console.error(error)
        }
    })
</script>

<svelte:head>
    <meta property="og:image" content="/og-card.png">
    <meta property="og:type" content="website">
    <meta property="og:url" content={$page.url.href}>

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="/og-card.png">
    <meta name="twitter:url" content={$page.url.href}>
</svelte:head>

<slot />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
</style>