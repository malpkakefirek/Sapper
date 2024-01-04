<script>
  import { onMount, onDestroy } from "svelte";

    let seconds = 0;
    let milliseconds = 0;
    let interval;
    let secondInterval;

    onMount(() => {
        interval = setInterval(() => {
            milliseconds += 10;
            if (milliseconds === 1000) {
                milliseconds = 0;
                seconds += 1;
            }
        }, 10);
        secondInterval = setInterval(() => {
            //request_time_update()
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
    
    export function stopTimer() {
        clearInterval(interval);
        clearInterval(secondInterval);
    }
    
    export function resetTimer() {
        seconds = 0;
        milliseconds = 0;
    }
    async function request_time_update() {
        let send_data = {"session_id": "000000"};
        const response = await fetch("https://sapper-api.onrender.com/request_time", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(send_data),
        });
        const result = await response.json();
        console.log(result);
    }
</script>

<style>
</style>

<div>
    {#if seconds>=60}
        <p>{seconds}</p>
    {:else if seconds >=10}
        <p>{seconds}.{Math.floor(milliseconds/100)}</p>
    {:else}
        <p>{seconds}.{Math.floor(milliseconds/10)}</p>
    {/if}
</div>
