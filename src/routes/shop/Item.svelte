<script>
    export let item;
    function handleClickCoins(){
        buyItem("coins");
        console.log("Bought Skin id "+ item.id+" using Coins " + item.priceCoins);
    }
    function handleClickGems(){
        buyItem("gems");
        console.log("Bought Skin id "+ item.id+" using Gems " + item.priceGems);
    }

    async function buyItem(type){
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            await goto("/login");
            location.reload();
            return;
        }
        let sessionID = storedSession;
        try {
            const response = await fetch("https://sapper-api.onrender.com/buy_skin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionID,
                    skin_id: item.id,
                    currency: type,
                }),
            });
            const result = await response.json();
            console.log(result);
            if (result.type === "success") {
                console.log("Succesfully bought skin");
                localStorage.setItem(type, result.new_balance);
                location.reload();
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    }


    function handleEquipSkin(){
        console.log("Equipping Skin id "+ item.id);
        localStorage.setItem("current_skin", item.id);
        item.isEquipped=true;
        location.reload();
    }
    function handleUnequipSkin(){
        console.log("Unequipping Skin id "+ item.id);
        localStorage.setItem("current_skin", 0);
        item.isEquipped=false;
        location.reload();
    }
    import { onMount } from "svelte";
    onMount(async () => {
        let eq_id = localStorage.getItem("current_skin");
        console.log("current_skin equiped loaded id: "+eq_id);
        if (eq_id != null) {
            if (eq_id == item.id){
                item.isEquipped=true;
            }
        }
    });
</script>

<div class="item-container">
    <img src={item.image} alt="icon of {item.name}" />
    <h3>{item.name}</h3>
    {#if item.isOwned}
        {#if item.isEquipped}
            <button on:click={handleUnequipSkin} class="custom_button1">UNEQUIP</button>
        {:else}
            <button on:click={handleEquipSkin} class="custom_button2">EQUIP</button>
        {/if}
    {:else}
        <div class="button-container">
            <button on:click={handleClickCoins} class="custom_button1">{item.priceCoins} Coins</button>
            <button on:click={handleClickGems} class="custom_button2">{item.priceGems} Gems</button>
        </div>
    {/if}
</div>

<style>
    .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin: 10px;
    }
    .button-container {
        display: flex;
        justify-content: space-between;
    }

    /* BUTTON FOR COINS */
    .custom_button1 {
        position: relative;
        flex: 1;
        display: inline-block;
        margin: 5px;
        padding: 6px;
        text-align: center;
        font-size: 14px;
        letter-spacing: 1px;
        text-decoration: none;
        color: #CCAC00;
        background: transparent;
        cursor: pointer;
        transition: ease-out 0.5s;
        border: 2px solid #CCAC00;
        border-radius: 10px;
        box-shadow: inset 0 0 0 0 #CCAC00;
    }

    .custom_button1:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #CCAC00;
        transform: scale(1.1);
    }

    .custom_button1:active {
        transform: scale(0.9);
    }

    /* BUTTON FOR GEMS */
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