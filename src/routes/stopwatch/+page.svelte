<script lang="ts">
    import { icons } from "$lib/icons";
    import PageStructure from "$lib/PageStructure.svelte";
    import { sws } from "$lib/stores/stopwatch";

    let sw:any
    $: sw = $sws

    let ol:HTMLOListElement
    let message:HTMLDivElement

    function createTimestamp() {
        if (sw.running) {
            sw.timestamps = [...sw.timestamps, sw.timeLapsed.toFormat('mm:ss.SSS')]
            ol.scroll({ top: ol.scrollHeight, behavior: 'smooth' })
        }
    }
</script>

<svelte:head>
    <title>
        Stopwatch
        { sw.running
            ?  sw.timeLapsed.hours > 0 ? sw.timeLapsed.toFormat('hh:mm:ss') 
            : sw.timeLapsed.toFormat('mm:ss') 
            : '' }
    </title> 
    <meta property="og:title" content="Stopwatch - Track Every Moment">
    <meta property="og:description" content="View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.">

    <meta name="twitter:title" content="Stopwatch - Track Every Moment">
    <meta name="twitter:description" content="View your local time or explore global time zones with Bigtime's Clock. Easily switch between 12H and 24H formats.">
</svelte:head>

<PageStructure>
    <div slot="upper" bind:this={message}>
        { !sw.started ? 'Hit Play Button to Start Stopwatch'
            : !sw.running ? 'Stopwatch Paused...'
            : 'Stopwatch Running...' }
    </div>

    <div slot="clock">
        {sw.timeLapsed.hours > 0 ? sw.timeLapsed.get('hour') : ''}<!--
        --><span>{sw.timeLapsed.toFormat('mm:ss')}</span><!--
        --><span class="text-[5vw] ml-3">{sw.timeLapsed.toFormat('ss SSS').split(' ')[1]}</span>
    </div>
    
    <div slot="lower" class="flex justify-center align-center gap-10">
        <button on:click={() => sws.reset()} class="">
            {@html icons.reset}
        </button>
        <button on:click={() => sw.running ? sws.pause() : sws.run()} class="text-8xl">
            {@html sw.running ? icons.pause : icons.play}
        </button>
        <button on:click={createTimestamp}>
            <span class={sw.running ? 'opcity-100' : 'opacity-50 cursor-not-allowed'}>{@html icons.timestamp}</span>
        </button>
    </div>
</PageStructure>

{#if sw.timestamps.length > 0}
    <div class="absolute top-10 right-4 text-sm dark:text-dpm">
        <p class="mb-2 text-center">Timestamps</p>
        <ol class="max-h-40 overflow-y-scroll no-scrollbar italic" bind:this={ol}>
            {#each sw.timestamps as stamp, i}
                <li class="list-none font-mono">#{(i+1).toLocaleString('en-US', {minimumIntegerDigits: 2})}&nbsp;&nbsp;&nbsp;&nbsp;{stamp}</li>
            {/each}
        </ol>
    </div>
{/if}