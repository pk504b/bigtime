<script lang="ts">
    import { icons } from "$lib/icons";
    import PageStructure from "$lib/PageStructure.svelte";
    import { ts } from "$lib/stores/timer";

    let timer: any;
    $: timer = $ts;

    let su = { unit: "", startY: 0 }; // State for each Unit

    function handleTouch(e: TouchEvent, unit: string) {
        if (timer.started) return; // Do nothing if Timer started

        const currY = e.touches[0].clientY;
        const deltaY = Math.round(su.startY - currY);
        updateUnit(su.unit, deltaY);
    }

    function handleWheel(e: WheelEvent) {
        if (timer.started) return;
        
        updateUnit(su.unit, e.deltaY);
    }

    // SCROLL OVER ANY UNIT TO SET TIMER
    function updateUnit(unit: string, deltaY: number) {
        if (deltaY > 0 && timer.obj.get(unit) < 59) {
            // Scroll Up
            timer.obj = timer.obj.plus({ [unit]: 1 });
        } else if (deltaY < 0 && timer.obj.get(unit) > 0) {
            // Scroll Down untill 0
            timer.obj = timer.obj.minus({ [unit]: 1 });
        }
    }

    // ADD ONE MIN BUTTON, WORKS AT ALL TIMES
    const addMinute = () => (timer.obj = timer.obj.plus({ minutes: 1 }));

    // START OR PAUSE BUTTON
    function playPause() {
        if (timer.obj.as("seconds") <= 0) return;

        timer.running ? ts.pause() : ts.run();
    }
</script>

<svelte:head>
    <title>
        Timer
        { timer.running ? timer.obj.hours > 0 ? timer.obj.toFormat("hh:mm:ss"): timer.obj.toFormat("mm:ss") : '' }
    </title>
    <meta property="og:title" content="Timer - Set and Track Time">
    <meta property="og:description" content="Effortlessly set and manage countdowns with Bigtime's Timer. Scroll to adjust time and stay on top of your tasks.">

    <meta name="twitter:title" content="Timer - Set and Track Time">
    <meta name="twitter:description" content="Effortlessly set and manage countdowns with Bigtime's Timer. Scroll to adjust time and stay on top of your tasks.">
</svelte:head>

<PageStructure>
    <div slot="upper">{timer.message}</div>

    <!-- CLOCK -->
    <div slot="clock" class="flex justify-center">
        <div class="relative group">
            <button
                class="text-3xl absolute -top-5 md:top-0 lg:top-5 left-1/2 -translate-x-1/2 hidden group-hover:block"
                on:click={(e) => updateUnit("hours", 1)}
                >{@html icons.caretUp}</button
            >

            <div
                class={timer.started
                    ? "cursor-not-allowed"
                    : "cursor-ns-resize"}
                on:touchstart={(e) => {
                    su.startY = e.touches[0].clientY;
                    su.unit = "hours";
                }}
                on:touchmove={(e) => handleTouch(e, "hours")}
                on:wheel={(e) => {
                    su.unit = "hours";
                    handleWheel(e);
                }}
            >
                {timer.obj.toFormat("hh:mm:ss").split(":")[0]}
            </div>

            <button
                class="text-3xl absolute -bottom-5 md:bottom-0 lg:bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block"
                on:click={(e) => updateUnit("hours", -1)}
            >
                {@html icons.caretDown}
            </button>
        </div>
        :
        <div class="relative group">
            <button
                class="text-3xl absolute -top-5 md:top-0 lg:top-5 left-1/2 -translate-x-1/2 hidden group-hover:block"
                on:click={(e) => updateUnit("minutes", 1)}
            >
                {@html icons.caretUp}
            </button>

            <div
                class={timer.started
                    ? "cursor-not-allowed"
                    : "cursor-ns-resize"}
                on:touchstart={(e) => {
                    su.startY = e.touches[0].clientY;
                    su.unit = "minutes";
                }}
                on:touchmove={(e) => handleTouch(e, "minutes")}
                on:wheel={(e) => {
                    su.unit = "minutes";
                    handleWheel(e);
                }}
            >
                {timer.obj.toFormat("hh:mm:ss").split(":")[1]}
            </div>

            <button
                class="text-3xl absolute -bottom-5 md:bottom-0 lg:bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block"
                on:click={(e) => updateUnit("minutes", -1)}
            >
                {@html icons.caretDown}
            </button>
        </div>
        :
        <div class="relative group">
            <button
                class="text-3xl absolute -top-5 md:top-0 lg:top-5 left-1/2 -translate-x-1/2 hidden group-hover:block"
                on:click={(e) => updateUnit("seconds", 1)}
            >
                {@html icons.caretUp}
            </button>

            <div
                class={timer.started
                    ? "cursor-not-allowed"
                    : "cursor-ns-resize"}
                on:touchstart={(e) => {
                    su.startY = e.touches[0].clientY;
                    su.unit = "seconds";
                }}
                on:touchmove={(e) => handleTouch(e, "seconds")}
                on:wheel={(e) => {
                    su.unit = "seconds";
                    handleWheel(e);
                }}
            >
                {timer.obj.toFormat("hh:mm:ss").split(":")[2]}
            </div>

            <button
                class="text-3xl absolute -bottom-5 md:bottom-0 lg:bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block"
                on:click={(e) => updateUnit("seconds", -1)}
            >
                {@html icons.caretDown}
            </button>
        </div>
    </div>

    <div slot="lower" class="flex justify-center align-center gap-10 text-4xl">
        <!-- RESET BTN -->
        <button on:click={() => ts.reset()}>{@html icons.reset}</button>

        <!-- PLAY/PAUSE BTN -->
        <button
            class="text-8xl {timer.obj.as('seconds') > 0
                ? 'cursor-pointer'
                : 'cursor-not-allowed'}"
            on:click={playPause}
        >
            {@html timer.running ? icons.pause : icons.play}
        </button>

        <!-- +1 BTN -->
        <button class="" on:click={addMinute}>
            {@html icons.plus1}
        </button>
    </div>
</PageStructure>
