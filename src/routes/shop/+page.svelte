<script>
    import { page } from "$app/stores";

    import Item from './Item.svelte';
    import { onMount } from 'svelte';
    
    let items = [];
    let owned_items = [];
    let shop_items = [];
    let owned = [];

    console.log($page);
    console.log($page.url);
    console.log($page.url.hash);
    onMount(async () => {
        // Check if the hash is empty
        console.log($page);
        console.log($page.url);
        console.log($page.url.hash);
        if ($page.url.hash === "") {
            console.log("You are on a URL without a hash.");
            await goto("/shop#skins");
            return;
        }
        
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
        let sessionID = storedSession;
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

        
        // let owned_items = items.filter(item => owned.some(owned => owned.id === item.id));
        owned_items = items
        .filter(item => owned.some(owned => owned.id === item.id))
        .map(item => ({
            ...item,
            isOwned: owned.some(owned => owned.id === item.id)
        }));

        shop_items = items.filter(item => !owned.some(owned => owned.id === item.id));

        UpdateCurrency();
    });


    import BattlePass from './BattlePass.svelte';

    let boosters_owned=11;
    let boosters = [
        { id: 1, name: 'Booster', image: '/images/1.svg', priceCoins: 200, priceGems: 50 },
    ];

    import Currency from './Currency.svelte';
    import { goto } from "$app/navigation";



    // import { onMount } from "svelte";
    // onMount(() => {
    //     UpdateCurrency();
    // });
    let coins=-1;
    let gems=-1;
    async function UpdateCurrency() {
        console.log("Shop clicked");
        // Set to -1 which equals to 'LOADING...'
        localStorage.setItem('coins',-1);
        localStorage.setItem('gems',-1);
        coins = -1;
        gems = -1;
        // Fetch numbers from backend
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            // TODO: Check if username in storage and remove it
            await goto("/login");
            location.reload();
            return;
        }
        let sessionID = storedSession;
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
                localStorage.setItem('coins',result.coins);
                localStorage.setItem('gems',result.gems);
                coins = result.coins;
                gems = result.gems;
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    }
</script>

<svelte:head>
    <title>Game</title>
    <meta name="description" content="About this app" />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column">
    <!-- <h1>You are in <bold>Shop{$page.url.hash}</bold> page!</h1> -->
    
    {#if $page.url.hash == "#skins"}
        <div class="items-container">
            {#each shop_items as item (item.id)}
                <div class="item">
                    <Item {item} />
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#equip"}
        <div class="items-container">
            {#each owned_items as item (item.id)}
                <div class="item">
                    <Item {item} />
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#battlepass"}
        <div class="battlepass-container">
            <BattlePass />
        </div>
    {:else if $page.url.hash == "#boosters"}
        <div class="items-container">
            {#each boosters as item (item.id)}
                <div class="item">
                    <Item {item} />
                    You have: {boosters_owned} boosters
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#currency"}
        <div class="currency-container">
            <Currency />
        </div>
    {:else}
        <div>You're not on any hash!</div>
        <script>
            console.log("changing pages");
            window.location.href = "/shop#skins";
        </script>
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
        max-width: 200px;
    }

    .currency-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .battlepass-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    
</style>
