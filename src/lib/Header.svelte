<script lang="ts">
    import search from "$lib/search";
    import { clickOutside } from "$lib/clickOutside";
    import { page } from "$app/stores";
    import { afterUpdate, onMount } from "svelte";
    import { icons } from "$lib/icons";
    import { base } from '$app/paths';

    let query:string
    let inputElement:HTMLInputElement
    let resultsElement:HTMLUListElement
    let results: any[] = []

    function showInput() {
        inputElement.classList.remove('hidden')
        inputElement.focus()
        results.length > 0 
            ? resultsElement.classList.remove('hidden') 
            : resultsElement.classList.add('hidden')
    }
    function hideInput() {
        inputElement.classList.add('hidden')
        resultsElement.classList.add('hidden')
    }
    function showResults() {
        query === '' ? results = [] : results = search(query)
        results.length > 0 
            ? resultsElement.classList.remove('hidden') 
            : resultsElement.classList.add('hidden')
    }

    // Notification Icon
    let notificationPermission = ""
    onMount(() => notificationPermission = Notification.permission)
    function askNotificationPermission() {
        if (!("Notification" in window))
        return

        Notification.requestPermission().then((permission) => {
            notificationPermission = permission
        })
    }
    
    // Hide Search on Slug update
    let slugBeforeUpdate = $page.params.slug
    afterUpdate(() => {
        if ($page.params.slug !== slugBeforeUpdate) {
            query = ""
            results = []
            inputElement.classList.add('hidden')
        }
        slugBeforeUpdate = $page.params.slug
    })
  
</script>

<header class="">
    <div class="container mx-auto max-w-7xl flex justify-between text-sm md:font-bold">
        <!-- Logo -->
        <a href="{base}/" class="uppercase tracking-[4px] font-normal px-4 md:px-6 bg-lsc dark:text-dbg flex items-center">Bigtime</a>
        
        <div class="flex gap-4 items-center py-2">
            <!-- Search -->
            {#if $page.url.pathname.includes('/clock')}
            <div class="flex items-center">

                <!-- Container for Input and Resluts -->
                <div class="relative " use:clickOutside on:click_outside={hideInput}>

                    <!-- Input -->
                    <input type="text" bind:value={query} bind:this={inputElement} on:input={showResults} class="hidden outline-none bg-transparent" placeholder="Search timezones...">
        
                    <!-- Results -->
                    <ul bind:this={resultsElement} class="absolute hidden py-2 ">
                        {#each results as result}
                            <li class="py-1 my-1">
                                <a class="block w-full" href="{base}/clock/{result.slug}">{result.displayName}</a>
                            </li>
                        {/each}
                    </ul>
                </div>
        
                <!-- SEARCH BUTTON -->
                <button class="text-2xl" on:click={showInput}>{@html icons.search}</button>

            </div>
            {/if}

            {#if notificationPermission !== "granted"}
                <button class="text-2xl" on:click={askNotificationPermission} title="Allow Push Notifications">{@html icons.bell}</button>
            {/if}

            <a href='https://ko-fi.com/pk504b' target='_blank'>
                {@html icons.coffee}
            </a>
            
        </div>
    </div>
</header>