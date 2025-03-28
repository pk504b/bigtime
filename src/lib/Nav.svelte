<script lang="ts">
    import { page } from "$app/stores";
    import { icons } from "$lib/icons";
</script>

<div
    class=" w-full bg-lpm text-lbg dark:bg-dpm dark:text-dbg text-3xl md:text-4xl 2xl:text-5xl"
>
    <div class="container mx-auto flex md:gap-10">

        <a
            href="/clock"
            class="flex-grow flex flex-col-reverse items-center py-2 {$page.url.pathname.includes(
                '/clock',
            )
                ? 'bg-lsc dark:bg-dsc text-lpm rounded-md shadow-md'
                : ''}"
        >
            <span class="text-sm">Clock</span>
            {@html icons.clock}
        </a>

        <a
            href="/timer"
            class="flex-grow flex flex-col-reverse items-center py-2 {$page.url
                .pathname === '/timer'
                ? 'bg-lsc dark:bg-dsc text-lpm rounded-md shadow-md'
                : ''}"
        >
            <span class="text-sm">Timer</span>
            {@html icons.timer}
        </a>

        <a
            href="/stopwatch"
            class="flex-grow flex flex-col-reverse items-center py-2 {$page.url
                .pathname === '/stopwatch'
                ? 'bg-lsc dark:bg-dsc text-lpm rounded-md shadow-md'
                : ''}"
        >
            <span class="text-sm">Stopwatch</span>
            {@html icons.stopwatch}
        </a>

        <a
            href="/pomodoro"
            class="flex-grow flex flex-col-reverse items-center py-2 {$page.url
                .pathname === '/pomodoro'
                ? 'bg-lsc dark:bg-dsc text-lpm rounded-md shadow-md'
                : ''}"
        >
            <span class="text-sm">Pomodoro</span>
            {@html icons.pomodoro}
        </a>
        
    </div>
</div>
