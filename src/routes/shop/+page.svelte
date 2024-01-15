<script>
    import { page } from "$app/stores";

    import Item from './Item.svelte';
    import { onMount } from 'svelte';
    
    let items = [];
    let owned_items = [];
    let shop_items = [];
    let owned = [];
    let coins = -1;
    let gems = -1;
    let sessionID;
    
    onMount(async () => {
        const response = await fetch("https://sapper-api.onrender.com/get_all_skins");
        const data = await response.json();
        items = Object.keys(data).map(id => ({
            id: parseInt(id),
            name: data[id].name,
            image: `/images/skins/${id}/preview.png`,
            priceCoins: data[id].price_coins,
            priceGems: data[id].price_gems
        }));
        console.log(items);

        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            await goto("/login");
            location.reload();
            return;
        }
        sessionID = storedSession;
        try {
            const response = await fetch("https://sapper-api.onrender.com/get_user_skins", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionID,
                }),
            });
            const result = await response.json();
            console.log(result);
            if ("ids" in result) {
                owned = result.ids.map(id => ({
                    id: id,
                    isOwned: true
                }));
            } else {
                console.error('Invalid response structure:', result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }

        owned_items = items
        .filter(item => owned.some(owned => owned.id === item.id))
        .map(item => ({
            ...item,
            isOwned: owned.some(owned => owned.id === item.id)
        }));

        shop_items = items.filter(item => !owned.some(owned => owned.id === item.id));

        await UpdateCurrency();

        getBoosterCount();
    });

    
    async function getBoosterCount(){
        try {
            const response = await fetch("https://sapper-api.onrender.com/get_booster_count", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionID,
                }),
            });
            const result = await response.json();
            console.log(result);
            if (result.type === "success") {
                localStorage.setItem("boosters_owned", result.booster_count);
                boosters_owned=result.booster_count;
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
        
    }

    import BattlePass from './BattlePass.svelte';


    import Currency from './Currency.svelte';
    import { goto } from "$app/navigation";

    
    async function UpdateCurrency() {
        console.log("Shop clicked");
        coins = (localStorage.getItem('coins') !== null) ? parseInt(localStorage.getItem('coins')) : -1;
        gems = (localStorage.getItem('gems') !== null) ? parseInt(localStorage.getItem('gems')) : -1;
        let oldCoins = coins;
        let oldGems = gems;
        // Fetch numbers from backend
        try {
            const response = await fetch("https://sapper-api.onrender.com/get_balance", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionID,
                }),
            });
            const result = await response.json();
            console.log(result);
            if (result.type === "success") {
                localStorage.setItem('coins', result.coins);
                localStorage.setItem('gems', result.gems);
                coins = result.coins;
                gems = result.gems;
                if ((oldCoins !== coins) || (oldGems !== gems)) {
                    // Update currency if it's wrong
                    location.reload()
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    }

    let boosters_owned= -1;
    let boosters = [
        { id: 1, name: 'Booster', image: '/images/booster.svg', priceCoins: 200, priceGems: 50 },
    ];
</script>

<svelte:head>
    <title>Game</title>
    <meta name="description" content="About this app" />
</svelte:head>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column" style="align-items: center;">
    <!-- <h1>You are in <bold>Shop{$page.url.hash}</bold> page!</h1> -->
    
    {#if $page.url.hash == "#skins"}
        <div class="items-container">
            {#each shop_items as item (item.id)}
                <div class="item dropbox">
                    <Item {item} />
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#equip"}
        <div class="items-container">
            {#each owned_items as item (item.id)}
                <div class="item dropbox">
                    <Item {item} />
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#battlepass"}
        <div class="battlepass-container dropbox">
            <BattlePass />
        </div>
    {:else if $page.url.hash == "#boosters"}
        <div class="items-container">
            {#each boosters as item (item.id)}
                <div class="item dropbox">
                    <Item {item} />
                    {#if boosters_owned==-1}
                        LOADING...
                    {:else}
                        You have: {boosters_owned} boosters
                    {/if}
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#currency"}
        <div class="currency-container dropbox">
            <Currency />
        </div>
    {:else}
        <div>Loading...</div>
    {/if}
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
    .items-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 10px;
        /* max-width: 200px; */
        font-weight: bold;
        color: white;
        flex-direction: column;
        align-items: center;
        width: fit-content;
    }

    .currency-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: fit-content;
    }

    .battlepass-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: fit-content;
    }
</style>
