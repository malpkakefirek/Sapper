<script>
    import { page } from "$app/stores";
    import logo from "$lib/images/svelte-logo.svg";
    import github from "$lib/images/github.svg";
    import { showModal } from "./game/stores.js";
    
    // import { openModal } from './game/+page.svelte';

    // import { isOpen, id } from "./game/store.js";

    // function openModal() {
    //     console.log("Opening modal");
    //     $id.set(true);
    // }


    //check if user is logged in
    import { onMount } from "svelte";
    let session_id;
    let username;
    let level = -1;
    let xp = -1;
    let max_xp = -1;
    let coins = -1;
    let gems = -1;


    function calculateLevel(_xp) {
        let expRequired = 100;
        let expIncrementAmount = 50;
        let currentLevel = 0;

        while ( _xp >= expRequired) {
            _xp -= expRequired;
            currentLevel++;
            expRequired+=expIncrementAmount;
        }
        max_xp=expRequired;
        xp = _xp;
        level = currentLevel + 1;
    }
    
    onMount(() => {
        session_id = localStorage.getItem('session_id');
        console.log(session_id);
        username = localStorage.getItem('username');
        xp = parseInt(localStorage.getItem('xp')) || 0;
        //retrieveLevelsInfo();
        coins = (localStorage.getItem('coins') !== null) ? parseInt(localStorage.getItem('coins')) : -1;
        gems = (localStorage.getItem('gems') !== null) ? parseInt(localStorage.getItem('gems')) : -1;

        calculateLevel(xp);
    });

    function retrieveLevelsInfo(){
        // TO DO 
        //xp = localStorage.setItem('xp',);
        //bp_xp = localStorage.setItem('bp_xp',);
    }
</script>

<header>

    <nav>
        <div class="corner left-corner">
            {#if $page.url.pathname == "/shop"}
                {#if session_id}
                    <div class="currency-coins">
                        {#if coins == -1}
                            <p class="gold-text">Coins: Loading...</p>
                        {:else}
                            <p class="gold-text">Coins: {coins}</p>
                        {/if}
                    </div>
                    <div class="currency-gems">
                        {#if gems == -1}
                            <p class="green-text">Coins: Loading...</p>
                        {:else}
                            <p class="green-text">Gems: {gems}</p>
                        {/if}
                    </div>
                {/if}
            {:else}
                Level {level}: {xp}/{max_xp}
            {/if}
        </div>
        
        <ul>
            
            
            {#if $page.url.pathname == "/"}
                <li aria-current="page">
                    <a href="/">Main Menu</a>
                </li>
                <li>
                    <a href="/game#start">Play</a>
                </li>
                <li>
                    <a href="/shop#skins">Shop</a>
                </li>
                <li>
                    <a href="/friends#list">Friends</a>
                </li>
                <li>
                    <a href="/settings#statistics">Settings</a>
                </li>
            {/if}

            {#if $page.url.pathname == "/game"}
                <li>
                    <!-- <button onclick="openModal()">Main Menu</button> -->
                    <!-- <a on:click={openModal} style="cursor: pointer;">Main Menu</a> -->
                    {#if $page.url.hash === "#start"}
                        <a href="/">Main Menu</a>
                    {:else}
                        <a href="/" on:click|preventDefault={() => showModal.update(() => true)}>Main Menu</a>
                    {/if}
                </li>
            {/if}
            {#if $page.url.pathname == "/shop"}
                <!-- {console.log("Current Store SubPath:", $page.url.hash)} -->
                <li aria-current={$page.url.hash === "#skins" ? "page" : undefined}>
                    <a href="/shop#skins">Skins</a>
                </li>
                <li aria-current={$page.url.hash === "#equip" ? "page" : undefined}>
                    <a href="/shop#equip">Equip</a>
                </li>
                <li
                    aria-current={$page.url.hash === "#battlepass"
                        ? "page"
                        : undefined}
                >
                    <a href="/shop#battlepass">Battle-Pass</a>
                </li>
                <li
                    aria-current={$page.url.hash === "#boosters" ? "page" : undefined}
                >
                    <a href="/shop#boosters">Boosters</a>
                </li>
                <li
                    aria-current={$page.url.hash === "#currency" ? "page" : undefined}
                >
                    <a href="/shop#currency">Currency</a>
                </li>
                <li>
                    <a href="/">Main Menu</a>
                </li>
            {/if}
            {#if $page.url.pathname == "/friends"}
                <li aria-current={$page.url.hash === "#list" ? "page" : undefined}>
                    <a href="/friends#list">Friends List</a>
                </li>
                <li aria-current={$page.url.hash === "#add" ? "page" : undefined}>
                    <a href="/friends#add">Add New</a>
                </li>
                <li>
                    <a href="/">Main Menu</a>
                </li>
            {/if}
            {#if $page.url.pathname == "/settings"}
                <li
                    aria-current={$page.url.hash === "#statistics"
                        ? "page"
                        : undefined}
                >
                    <a href="/settings#statistics">Statistics</a>
                </li>
                <li
                    aria-current={$page.url.hash === "#changePassword"
                        ? "page"
                        : undefined}
                >
                    <a href="/settings#changePassword">Change Password</a>
                </li>
                <li>
                    <a href="/">Main Menu</a>
                </li>
            {/if}
            {#if $page.url.pathname == "/login"}
                <li>
                    <a href="/">Main Menu</a>
                </li>
            {/if}
            {#if $page.url.pathname == "/register"}
                <li>
                    <a href="/">Main Menu</a>
                </li>
            {/if}
            {#if $page.url.pathname == "/about"}
                <li>
                    <a href="/">Main Menu</a>
                </li>
            {/if}


            
        </ul>

        <div class="corner right-corner">
            {#if !session_id}
                <div class="element_left">
                    <a href="/login">LOGIN</a>
                </div>
                <div class="element_right">
                    <a href="/register">REGISTER</a>
                </div>
            {:else}
                <div class="element_left">
                    {username ? "Logged in as "+username : "Username not found"}
                </div>
                <div class="element_right">
                    <a href="/logout">log out</a>
                </div>
            {/if}
            <!-- <a href="https://github.com/sveltejs/kit"> -->
            <!-- FIX THIS -->
        </div>
        
    </nav>

</header>

<style>
    header {
        display: flex;
        justify-content: center;
    }

    .corner {
        width: 33%;
        height: 3em;
        background: var(--background);
        text-align: center;
        /* text-shadow: 1px 1px 2px goldenrod; */
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline: 1rem;
    }

    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 99%;
    }
    
    .corner img {
        width: 2em;
        height: 2em;
        object-fit: contain;
    }

    .left-corner {
        justify-content: start;
    }

    .currency-coins {
        padding-right: 1rem;
    }
    
    .right-corner {
        justify-content: end;
    }
    
    .element_left {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .element_right {
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 1rem;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgba(255, 255, 255, 0.7);
        width: 100%;
    }

    svg {
        width: 2em;
        height: 3em;
        display: block;
    }

    path {
        fill: var(--background);
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
        list-style-type: none;
        width: 100%;
    }

    li {
        position: relative;
        height: 100%;
        list-style-type: none;
    }

    li[aria-current="page"]::before {
        --size: 6px;
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: calc(50% - var(--size));
        border: var(--size) solid transparent;
        border-top: var(--size) solid var(--color-theme-1);
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 0.5rem;
        color: var(--color-text);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
    }

    a:hover {
        color: var(--color-theme-1);
    }


    .gold-text {
        color: #FFD700;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
    }
    
    .green-text {
        color: #57C153;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
    }

</style>
