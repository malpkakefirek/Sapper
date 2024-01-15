<script>
    import { showModal } from "./stores.js";
    import { showModal2 } from "./stores.js";
    import { page } from "$app/stores";
    import { deserialize } from "$app/forms";


    const formatter = new Intl.DateTimeFormat("en", {
        hour12: false,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
    });

    let mouse = { x: 0, y: 0 };


    import Modal from './Modal.svelte';
    import Modal2 from './Modal2.svelte';

    let showModal_value;

    showModal.subscribe((value) => {
        showModal_value = value;
        if (value === true) {
            ()=>getModal().open()
        }
    });

    let showModal_value2;

    showModal2.subscribe((value) => {
        showModal_value2 = value;
        if (value === true) {
            ()=>getModal().open()
        }
    });
    // export function toggleModal() {
    //     showModal_value = !showModal_value;
    // }


    function beforeUnloadListener() {
        showModal.update(() => false);
        showModal2.update(() => false);
    }

    // ALWAYS max_y ≤ max_x
    // let max_y = localStorage.getItem('max_y') || 50;
    // let max_x = localStorage.getItem('max_x') || 50;
    // let mines = localStorage.getItem('mines') || 20;
    // let gameStarted = localStorage.getItem('gameStarted') || 0;
    let max_y = 50;
    let max_x = 50;
    let mines = 20;
    let gameStarted = 0;
    let xp_added = 0;
    let bp_xp_added = 0;
    let battlepass_reward = false;
    
    let current_skin = 0; // 0 for default

    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    onMount(async () => {
        // Check if the hash is empty
        if ($page.url.hash === "") {
            console.log("You are on a URL without a hash.");
            await goto("/game#start");
            return;
        }
        //check if user is logged in
        let session_id = localStorage.getItem('session_id');
        if(!session_id){
            console.log("ERROR USER IS NOT LOGGED IN!");
            goto("/login");
        }
        
        max_y = parseInt(localStorage.getItem('max_y')) || 50;
        max_x = parseInt(localStorage.getItem('max_x')) || 50;
        mines = parseInt(localStorage.getItem('mines')) || 20;
        gameStarted = parseInt(localStorage.getItem('gameStarted')) || 0;
        is_won = parseInt(localStorage.getItem('is_won')) || 0;
        is_loss = parseInt(localStorage.getItem('is_loss')) || 0;
        
        current_skin = parseInt(localStorage.getItem('current_skin')) || 0;
        
        boosters_owned = localStorage.getItem('boosters_owned'); //TODO: add loading `boosters_owned` from backend: user
        getBoosterCount();
        
    });

    async function rightClicked(x,y) {
        let session_id = localStorage.getItem('session_id');
        if (!session_id) {
            console.log("ERROR USER IS NOT LOGGED IN!");
            goto("/login");
            return;
        }
        let tile_id = (max_x*y + x).toString()

        if (tileData[tile_id] > -1) {
            console.log("tile already clicked");
            return;
        }
        
        // Toggle flag
        if (flagData[tile_id] === false) {
            flagData[tile_id] = true;
            tileData[tile_id] = -2;
            return;
        }
        if (flagData[tile_id] === true) {
            flagData[tile_id] = false;
            tileData[tile_id] = -1;
            return;
        }
    }

    async function clicked(x,y) {
        let session_id = localStorage.getItem('session_id');
        if (!session_id) {
            console.log("ERROR USER IS NOT LOGGED IN!");
            goto("/login");
            return;
        }

        // const randomValue = Math.floor(Math.random() * (8 - (-2) + 1) + (-2));
        // tileData[tile_id]=randomValue;
        // console.log(`(${x},${y}) was set to ${randomValue}`);
        let tile_id = (max_x*y + x).toString()
        console.log(`tile ${tile_id} clicked`);
        if (tileData[tile_id] > -1) {
            console.log("tile already clicked");
            return;
        }
        if (tileData[tile_id] === -2) {
            console.log("tile flagged");
            return;
        }
        let tile_data = {"tile_id": tile_id, "session_id": session_id};
        const response = await fetch("https://sapper-api.onrender.com/click_tile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tile_data),
        });
        const result = await response.json();
        console.log(result);

        // Fix flagged tiles
        if (result.type !== "loss") {
            for (let i = 0; i < max_y*max_x; i++) {
                // Skip unflagged tiles
                if (flagData[i.toString()] !== true) {
                    continue;
                }
                // Keep flagged hidden tiles
                if (result.board[i.toString()] === -1) {
                    result.board[i.toString()] = -2;
                }
                // Unflag shown tiles
                if (result.board[i.toString()] > -1) {
                    flagData[i.toString()] = false;
                }
            }
        }
        
        if ("board" in result) {
            if (result.type === "loss") {
                for (let i = 0; i < max_y*max_x; i++) {
                    // Mark incorrect flags
                    if (flagData[i.toString()] === true && result.board[i.toString()] < 9 && result.board[i.toString()] >= 0) {
                        tileData[i.toString()] = -3;
                        continue;
                    }
                    // Show unflagged mines
                    if (result.board[i.toString()] >= 9 && flagData[i.toString()] !== true) {
                        tileData[i.toString()] = result.board[i.toString()];
                        continue;
                    }
                    // Show flagged mines
                    if (flagData[i.toString()] === true && result.board[i.toString()] === 9) {
                        tileData[i.toString()] = -2;
                        continue;
                    }
                }
            } else {
                tileData = result.board;
            }
            //stopTimer();
        }
        if (result.type === "win") {
            console.log("Congratulations! You won!");
            is_won=true;
            localStorage.setItem("is_won", 1);
            localStorage.setItem("xp", result.xp);
            localStorage.setItem("bp_xp", result.battlepass_xp);
            xp_added = result.added_xp;
            bp_xp_added = result.added_battlepass_xp;
            battlepass_reward = (result.battlepass_reward === 'true');
            //stopTimer();
            // goto("/game#win");
            return;
        }
        if (result.type === "loss") {
            console.log("I'm sorry, you lost!");
            is_loss=true;
            localStorage.setItem("is_loss", 1);
            //stopTimer();
            // goto("/game#loss");
            return;
        }
    }

    import {tileStructure, flagStructure} from "./stores.js";

    for (let i = 0; i < max_y*max_x; i++) {
        // const randomValue = Math.floor(Math.random() * (8 - (-2) + 1) + (-2));
        tileStructure.update((dict) => {
            dict[i.toString()] = -1;
            return dict;    
        });
        flagStructure.update((dict) => {
            dict[i.toString()] = false;
            return dict;    
        });
    }
    
    let tileData = $tileStructure;
    let flagData = $flagStructure;
    
    // tileData.forEach(item => {
    //     //console.log(`ID: ${item.id}, Value: ${item.value}`);
    // });
    import Timer from "./Timer.svelte";



    function handleFieldClick(x,y) {
        max_x = x;
        max_y = y;
        // GlobalMax_x.set(x);
        // GlobalMax_y.set(y);
        resetClickedState('.custom_button1.field');
        event.target.classList.add('clicked');
        localStorage.setItem("max_x", x);
        localStorage.setItem("max_y", y);
    }

    async function start_game() {
        let session_id = localStorage.getItem('session_id');
        if (!session_id) {
            console.log("ERROR USER IS NOT LOGGED IN!");
            goto("/login");
            return;
        }
        // mines, max_x, max_y
        window.location.hash = 'sapper';

        // Reset flags
        for (let i = 0; i < max_y*max_x; i++) {
            flagStructure.update((dict) => {
                dict[i.toString()] = false;
                return dict;    
            });
        }
        
        // await game creation
        let difficulty = mines === 10 ? 1 : mines === 20 ? 2 : mines === 30 ? 3 : mines === 50 ? 4 : 1;
        let send_data = {"session_id": session_id, "size_x": max_x, "size_y": max_y, "difficulty": difficulty, "booster_used": (booster_used ? 1 : 0) };
        const response = await fetch("https://sapper-api.onrender.com/create_game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(send_data),
        });
        const result = await response.json();
        console.log(result);
        if (result.type !== "success") {
            goto('/game');
            return;
        }

        is_won=0;
        is_loss=0;
        localStorage.setItem("is_won", 0);
        localStorage.setItem("is_loss", 0);
        //resetTimer();
        // when game loaded, start
        gameStarted = 1;
        localStorage.setItem("gameStarted", 1);
    }




    function handleMinesClick(value) {
        mines = value;
        resetClickedState('.custom_button1.mines');
        event.target.classList.add('clicked');
        localStorage.setItem("mines", value);
    }
    
    function resetClickedState(selector) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(btn => btn.classList.remove('clicked'));
    }
    
    //import first from "$lib/images/1.svg";
    let is_won=false;
    let is_loss=false;
    let timer_started=false;

    // let textures = [];
    // onMount(() => {
    //     // for (let i = 1; i <= 9; i++) {
    //     //     import(`$lib/images/${i}.svg`).then((result) => {
    //     //         textures = [...textures, result.default];
    //     //     });
    //     // }
    // });
    async function getBoosterCount(){
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            await goto("/login");
            location.reload();
            return;
        }
        let sessionID = storedSession;
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

    let boosters_owned=0;
    let booster_used = false;
    function toggle_booster(){
        if (boosters_owned > 0 && !booster_used) {
            boosters_owned--;
            booster_used = true;
            localStorage.setItem('boosters_owned',boosters_owned);
        } else if (booster_used) {
            boosters_owned++;
            booster_used = false;
        }
    }
</script>

<svelte:head>
    <title>Game</title>
    <meta name="description" content="About this app" />
</svelte:head>

<svelte:window on:beforeunload={beforeUnloadListener} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="text-column"
    on:mousemove={(e) => (mouse = { x: e.clientX, y: e.clientY })}
>
    {#if $page.url.hash == "#start"}
        <h1>Choose game difficulty to start the game!</h1>

        <div>
            <p>Mines: {mines} % of the field</p>
            <div class="button-container">
                <button on:click={() => handleMinesClick(10)} class="custom_button1 mines"> Easy</button>
                <button on:click={() => handleMinesClick(20)} class="custom_button1 mines"> Medium</button>
                <button on:click={() => handleMinesClick(30)} class="custom_button1 mines"> Hard</button>
                <button on:click={() => handleMinesClick(50)} class="custom_button1 mines"> Impossible</button>
            </div>
        </div>
        <div>
            <p>Field: {max_x}x{max_y}</p>
            <div class="button-container">
                <button on:click={() => handleFieldClick(10, 10)} class="custom_button1 field"> 10x10 </button>
                <button on:click={() => handleFieldClick(20, 20)} class="custom_button1 field"> 20x20 </button>
                <button on:click={() => handleFieldClick(30, 30)} class="custom_button1 field"> 30x30 </button>
                <button on:click={() => handleFieldClick(50, 50)} class="custom_button1 field"> 50x50 </button>
            </div>
        </div>
        <div>
            <p>Boosters: {boosters_owned}</p>
            {#if !booster_used}
                <button on:click={() => toggle_booster()} class="custom_button_booster_activate"> Use Booster</button>
            {:else}
                <button on:click={() => toggle_booster()} class="custom_button_booster_activated"> Activated</button>
            {/if}
        </div>
        <p> </p>
        <button on:click={() => start_game()} class="custom_button1"> START THE GAME! </button>
        
        <!-- <img src={textures[1]} alt="SVG TEST" /> -->
        
    {:else if $page.url.hash == "#sapper"}

        {#if !gameStarted}
            <h1>Creating a new game...</h1>
        {:else}
            {#if timer_started}
                <h1><Timer /></h1>
            {/if}
            <!-- <h1>You are in <bold>Game{$page.url.hash}</bold> page!</h1> -->
        
            
            <div class="sapper_table">
                {#each Array(max_y) as _, y}
                    <div class="sapper_row">
                        {#each Array(max_x) as _, x}
                            {#if tileData[(max_x*y + x).toString()] !== null}
                                <div 
                                    on:click={() => clicked(x, y)} 
                                    on:keypress={(e) => {if(e.key === 'Enter') clicked(x, y)}} 
                                    on:contextmenu|preventDefault={() => rightClicked(x, y)}
                                    class="sapper_tile" 
                                    style="background-image: url('/images/skins/{current_skin}/{
                                        tileData[(max_x*y + x).toString()]
                                    }.svg')"
                                >
                                    <div class="sapper_tile_content">
                                        <!-- <img src="/images/tile.png"> -->
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}

        {#if is_won || is_loss}
             <button on:click={() => (showModal2.update((value) => !value))} class="custom_button1"> Continue </button>
        {/if}
    <!-- {:else if $page.url.hash == "#win"}
        <h1>Congratulations you WON!</h1>
    {:else if $page.url.hash == "#loss"}
        <h1>Better try next time!</h1> -->
    {:else}
        <div></div>
    {/if}
    <!-- <button on:click={() => (showModal.update((value) => !value))}> show modal     </button> -->
    <!-- The mouse position is {mouse.x} x {mouse.y} -->
    <!-- FOR TESTS, COMMENT LATER -->
    <!-- <button on:click={() => (showModal2.update((value) => !value))} class="custom_button1"> Continue </button> -->
</div>


<Modal bind:showModal_value>
    <h2 slot="header">
        Exit Menu
    </h2>

    <ol class="definition-list">
        <p>Are you sure you want to exit the game?</p>
        <p>(Your game will not be saved and will count as loss)</p>
    </ol>
</Modal>

<!-- THIS IS A MODAL SHOWN WHEN YOU LOST OR WON THE GAME -->
<Modal2 bind:showModal_value2>
    <h2 slot="header">
        {#if is_won}
            Congratulations you WON!
        {:else if is_loss}
            Congratulations you LOST xd!
        {:else}
            Why are you here!?
        {/if}
    </h2>

    <ol class="definition-list">
        <p>Map Size: {max_x}x{max_y}</p>
        <p>Difficulty: {mines} mines</p>
        <p>XP: +{xp_added}</p>
        <p>Battlepass XP: +{bp_xp_added}</p>
        {#if battlepass_reward}
            <p>NEW BATTLEPASS LEVEL IS AVAILABLE TO CLAIM IN SHOP</p>
        {/if}
    </ol>
</Modal2>

 <!-- PRE LOAD TEXTURES -->
<div style="display: none;">
    {#each {length: 14} as _, i}
        <img src="/images/skins/{current_skin}/{i-3}.svg"/>
    {/each}
</div>


<style>
    div {

    }

    .sapper_table {
        display: flex;
        flex-direction: column;
        width: 35rem;
    }
    .sapper_row {
        display: flex;
        justify-content: space-evenly;
    }
    .sapper_tile {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        aspect-ratio: 1 / 1;
        width: -moz-available;          /* WebKit-based browsers will ignore this. */
        width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
        width: fill-available;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        image-rendering: pixelated;
        /*background-image: url("/images/tile.png");*/
    }
    .sapper_tile_content {
        font-size: 8px;
        /* background-image: url("/images/tile.png"); */
    }



    /* TESTS XD */
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
    
    :global(.custom_button1.clicked) {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.12);
    }


    .custom_button_booster_activate {
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

    .custom_button_booster_activate:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.1);
    }

    .custom_button_booster_activate:active {
        transform: scale(0.9);
    }


    .custom_button_booster_activated {
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

    .custom_button_booster_activated:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #4CAF50;
        transform: scale(1.1);
    }

    .custom_button_booster_activated:active {
        transform: scale(0.9);
    }
</style>
