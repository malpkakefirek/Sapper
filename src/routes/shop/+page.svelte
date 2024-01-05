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

        owned_items = items
        .filter(item => owned.some(owned => owned.id === item.id))
        .map(item => ({
            ...item,
            isOwned: owned.some(owned => owned.id === item.id)
        }));

        shop_items = items.filter(item => !owned.some(owned => owned.id === item.id));

        await UpdateCurrency();

        //check if booster is in use
        booster_used = (localStorage.getItem('booster_used') === 'true');
        boosters_owned = localStorage.getItem('boosters_owned'); //TODO: add loading `boosters_owned` from backend: user
    });


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
                localStorage.setItem('coins', result.coins);
                localStorage.setItem('gems', result.gems);
                coins = result.coins;
                gems = result.gems;
                if ((oldCoins !== -1 && oldCoins !== coins) || (oldGems !== -1 && oldGems !== gems)) {
                    // Update currency if it's wrong
                    location.reload()
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    }

    let boosters_owned=11;
    let booster_used = false;
    let boosters = [
        { id: 1, name: 'Booster', image: '/images/booster.svg', priceCoins: 200, priceGems: 50 },
    ];
    function use_booster(){
        boosters_owned--;
        booster_used=true;
        localStorage.setItem('booster_used', booster_used.toString());
        localStorage.setItem('boosters_owned',boosters_owned);
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
                    {#if !booster_used}
                        <button on:click={() => use_booster()} class="custom_button1"> Use Booster</button>
                    {:else}
                        <button class="custom_button2"> Activated</button>
                    {/if}
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#currency"}
        <div class="currency-container">
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
        max-width: 200px;
    }

    .currency-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .battlepass-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    
    .custom_button1 {
      position: relative;
      display: inline-block;
      margin: 15px;
      padding: 15px 30px;
      text-align: center;
      font-size: 18px;
      letter-spacing: 1px;
      text-decoration: none;
      color: #725AC1;
      background: transparent;
      cursor: pointer;
      transition: ease-out 0.5s;
      border: 2px solid #725AC1;
      border-radius: 10px;
      box-shadow: inset 0 0 0 0 #725AC1;
    }

    .custom_button1:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.1);
    }

    .custom_button1:active {
        transform: scale(0.9);
    }

    
    .custom_button2 {
        position: relative;
        flex: 1;
        display: inline-block;
        margin: 5px;
        padding: 6px;
        text-align: center;
        font-size: 14px;
        letter-spacing: 1px;
        text-decoration: none;
        color: #4CAF50;
        background: transparent;
        cursor: pointer;
        transition: ease-out 0.5s;
        border: 2px solid #4CAF50;
        border-radius: 10px;
        box-shadow: inset 0 0 0 0 #4CAF50;
    }

    .custom_button2:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #4CAF50;
        transform: scale(1.1);
    }

    .custom_button2:active {
        transform: scale(0.9);
    }
</style>
