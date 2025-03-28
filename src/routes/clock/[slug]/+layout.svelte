<script lang="ts">
    import { page } from '$app/stores';
    import { DateTime } from 'luxon'
    import PageStructure from '$lib/PageStructure.svelte';
    import { getTimezone } from '$lib';
    
    let timezone:string
    let city:string
    let country:string
    let is12H:boolean = true
    let now:DateTime

    $: slug = $page.params.slug

    $: slug
        ? { timezone, city, country } = getTimezone(slug)
        : { timezone, city, country } = $page.data    
    
    $: if (timezone) {
        now = DateTime.now().setZone(timezone)
        setInterval(() => {
            now = DateTime.now().setZone(timezone);
        })
    }
</script>

<svelte:head>
    <title>
        { !timezone ? 'Bigtime' : is12H ? now.toFormat('h:mm a') : now.toFormat('HH:mm') }
        { timezone ? (city ? city : country) : '' }
    </title>
    <meta property="og:title" content="Clock - Local & World Time">
    <meta property="og:description" content="View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.">

    <meta name="twitter:title" content="Clock - Local & World Time">
    <meta name="twitter:description" content="View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.">
</svelte:head>

{#if timezone}

<PageStructure>    
    <div slot="upper">Time in <span class="font-bold">{city ? `${city}, ` : ''} {country}</span> now:</div>
    <button slot="clock" on:click={() => is12H = !is12H}>
        <div >
            {#if is12H}
                {now.toFormat('h:mm:ss')}<span class="font-clock text-[3vw]">{now.toFormat('a')}</span>
            {:else}
                {now.toFormat('HH:mm:ss')}
            {/if}
        </div>
    </button>
    <div slot="lower" class="text-2xl md:text-3xl tracking-widest">{now.toLocaleString(DateTime.DATE_HUGE)}</div>
</PageStructure>

{:else}

<PageStructure>
    <div slot="error">
        <h1 class="font-clock text-9xl">404</h1>
        <h2 class="text-6xl font-thin mb-10">Bad Timing</h2>
        <p class="mb-40">Something went wrong. Please try again later.</p>
    </div>
</PageStructure>

{/if}

<slot />