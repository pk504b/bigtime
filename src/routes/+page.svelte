<script>
    import { icons } from "$lib/icons";
    function handleForm() {}
</script>

<svelte:head>
    <title>Bigtime</title>
</svelte:head>

<div class="bg-lbg text-lpm dark:bg-dbg dark:text-dpm font-primary flex flex-col">
    <header class="">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="uppercase text-sm tracking-[4px] font-light px-5 py-3 bg-lsc dark:text-dbg">Bigtime</a>
            <button class="lg:hidden text-4xl px-3">{@html icons.menu}</button>
            <nav class="hidden lg:block">
                <ul class="flex gap-5">
                    <li><a class="flex items-center gap-1 transition hover:bg-dpm hover:text-dbg px-3 py-1" href="/clock">{@html icons.clock} Clock</a></li>
                    <li><a class="flex items-center gap-1 transition hover:bg-dpm hover:text-dbg px-3 py-1" href="/timer">{@html icons.timer} Timer</a></li>
                    <li><a class="flex items-center gap-1 transition hover:bg-dpm hover:text-dbg px-3 py-1" href="/stopwatch">{@html icons.stopwatch} Stopwatch</a></li>
                    <li><a class="flex items-center gap-1 transition hover:bg-dpm hover:text-dbg px-3 py-1" href="/pomodoro">{@html icons.pomodoro} Pomodoro</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main class="container mx-auto max-w-7xl">
        <section class="h-dvh flex flex-col justify-center items-center text-center relative">
            <div class="flex justify-center gap-5 text-2xl">
                {@html icons.clock}
                {@html icons.worldClock}
                {@html icons.timer}
                {@html icons.stopwatch}
                {@html icons.pomodoro}
            </div>
            <h1 class="font-light text-3xl md:text-6xl my-14">Your Avg Time Machine</h1>
            <button class="dark:bg-dpm dark:text-dbg px-8 py-2 hover:scale-105 hover:shadow transition">Check Out</button>

            <a href="#apps" class="absolute bottom-20 text-2xl animate-bounce">{@html icons.caretDown}</a>
        </section>
        <!-- <hr> -->
        <section id="apps" class="px-4 py-8">
            <h2 class="text-center font-medium text-2xl my-8">Apps</h2>

            <div class="flex flex-wrap gap-8 p-4 text-center">

                <a href="/clock" class="flex-1 border dark:border-dpm min-w-40 flex flex-col items-center justify-center p-4 py-8 hover:scale-105 transition rounded-xl">
                    <span class="text-8xl">{@html icons.clock}</span>
                    <h3 class="text-xl font-bold mt-4 mb-2">Clock</h3>
                    <p class="text-sm">Clock big enough to never miss a beat</p>
                </a>

                <a href="/clock" class="flex-1 border dark:border-dpm min-w-40 flex flex-col items-center justify-center p-4 py-8 hover:scale-105 transition rounded-xl">
                    <span class="text-8xl">{@html icons.worldClock}</span>
                    <h3 class="text-xl font-bold mt-4 mb-2">World Clock</h3>
                    <p class="text-sm">Make your way through timezones</p>
                </a>

                <a href="/timer" class="flex-1 border dark:border-dpm min-w-40 flex flex-col items-center justify-center p-4 py-8 hover:scale-105 transition rounded-xl">
                    <span class="text-8xl">{@html icons.timer}</span>
                    <h3 class="text-xl font-bold mt-4 mb-2">Timer</h3>
                    <p class="text-sm">The Good old Countdown Timer</p>
                </a>

                <a href="/stopwatch" class="flex-1 border dark:border-dpm min-w-40 flex flex-col items-center justify-center p-4 py-8 hover:scale-105 transition rounded-xl">
                    <span class="text-8xl">{@html icons.stopwatch}</span>
                    <h3 class="text-xl font-bold mt-4 mb-2">Stopwatch</h3>
                    <p class="text-sm">Stopwatch so that you don't have to stop</p>
                </a>

                <a href="/pomodoro" class="flex-1 border dark:border-dpm min-w-40 flex flex-col items-center justify-center p-4 py-8 hover:scale-105 transition rounded-xl">
                    <span class="text-8xl">{@html icons.pomodoro}</span>
                    <h3 class="text-xl font-bold mt-4 mb-2">Pomodoro</h3>
                    <p class="text-sm">Stay productive with Pomodoro Cycles</p>
                </a>

            </div>
        </section>

        <section id="features" class="px-8 py-8">
            <h2 class="text-center font-medium text-2xl my-8">Features</h2>
            <div class="px-4 text-sm md:text-base font-light md:flex justify-center gap-20 mt-4">
                <ul class="list-disc flex-1 max-w-80">
                    <li>Five-in-One Clock App</li>
                    <li>Clock, World Clock, Timer, Stopwatch and Pomodoro</li>
                    <li>Easily switch between 12H and 24H format</li>
                    <li>Get the current time across timezones</li>
                    <li>Search timezones by ISO codes, cities and countries</li>
                    <!-- <li>Easily set Timer by scrolling</li> -->
                </ul>
                <ul class="list-disc flex-1 max-w-80">
                    <li>Easily set Timer by scrolling</li>
                    <li>Record timestamps/laps in Stopwatch</li>
                    <li>Pomodoro with 25 + 5 minutes cycles</li>
                    <li>Easily get durations from the title bar</li>
                    <li>Distraction free alerts and push notifications</li>
                    <li>Light and Dark Themes</li>
                </ul>
            </div>
        </section>

        <section id="contact" class="px-4 py-8">
            <h2 class="text-center font-medium text-2xl mt-8 my-2">Contact Us</h2>
            <p class="text-center">For suggestion, query, feedback, feature request</p>

            <form on:submit|preventDefault={handleForm} class="flex flex-col gap-8 max-w-lg mx-auto mt-4">
                <label class="">
                    Name <span class="text-sm text-red-600">*</span>
                    <input class="block w-full bg-transparent border dark:border-dpm px-2 py-2 my-2" type="text" placeholder="John Doe">
                </label>
                <label class="">
                    Email <span class="text-sm text-red-600">*</span>
                    <input class="block w-full bg-transparent border dark:border-dpm px-2 py-2 my-2" type="email" placeholder="you@example.com">
                </label>
                <label class="">
                    Message <span class="text-sm text-red-600">*</span>
                    <textarea class="block w-full bg-transparent border dark:border-dpm px-2 py-2 my-2 h-40" placeholder="Your message..."></textarea>
                </label>
                <button type="submit" class="dark:bg-dpm dark:text-dbg px-2 py-2 font-medium">Send</button>
            </form>
        </section>
    </main>
    
    <footer class="dark:bg-dpm dark:text-dbg text-center py-2 text-xs mt-8">
        All rights reserved. Bigtime &copy; {new Date().getFullYear()}
    </footer>
</div>