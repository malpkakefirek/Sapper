<script>
    import { page } from "$app/stores";
    
    let profile = [
        { id: 1, name: 'Loading...', image: '/images/avatars/1.png' }
    ];
    
    let games_played = Math.floor(Math.random() * 1000) + 1;
    let tiles_clicked = Math.floor(Math.random() * 50000) + 1;
    let games_won = Math.floor(Math.random() * games_played) + 1;
    let games_lost = games_played-games_won;
    let flags_placed = Math.floor(Math.random() * 5000) + 1;



    // on mount:
    import { onMount } from "svelte";
    onMount(async () => {
        profile.name = localStorage.getItem("username");

        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            // TODO: Check if username in storage and remove it
            await goto("/login");
            location.reload();
            return;
        }
    });
</script>

<svelte:head>
    <title>Game</title>
    <meta name="description" content="About this app" />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column">
    {#if $page.url.hash == "#statistics"}
        <div class="statistics-page">
            <div class="statistics-title">
                Statistics
            </div>
            <div class="statistics">
                <div>Games Played: <span>{games_played}</span></div>
                <div>Tiles Clicked: <span>{tiles_clicked}</span></div>
                <div>Games Won: <span>{games_won}</span></div>
                <div>Games Lost: <span>{games_lost}</span></div>
                <div>Flags Placed: <span>{flags_placed}</span></div>
            </div>
        </div>
    {:else if $page.url.hash == "#changePassword"}
        <h1>You are in <bold>Settings{$page.url.hash}</bold> page!</h1>
        <h2>This is not implemented yet!</h2>
    {:else if $page.url.hash == "#deleteProfile"}
        <h1>You are in <bold>Settings{$page.url.hash}</bold> page!</h1>
        <h2>This is not implemented yet!</h2>
    {/if}
</div>


<style>
    div {
        width: 100%;
        height: 100%;
    }

    .statistics-page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .statistics-title {
        font-size: 32px;
        font-weight: bold;
    }
    .statistics {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>
