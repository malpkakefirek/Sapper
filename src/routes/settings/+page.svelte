<svelte:head>
    <title>Game</title>
    <meta name="description" content="About this app" />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column" on:mousemove={(e) => (mouse = { x: e.clientX, y: e.clientY })}>
    The mouse position is {mouse.x} x {mouse.y}

    <h1>You are in <bold>Settings{$page.url.hash}</bold> page!</h1>

    <p>
        mhm game gaming game game game game game game game game game here
    </p>

    <pre>time: {formatter.format($time)} nice :)</pre>

    <p>
        Need change. static to dynamic.
    </p>

    <pre>DONE</pre>
</div>

<script>
    import { time } from './stores.js';
    import { page } from "$app/stores";

    const formatter = new Intl.DateTimeFormat('en', {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });


    let mouse = { x: 0, y: 0 };
</script>

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
