<script>
    let images = [  // TODO: POPULATE THIS WITH ACTUAL SKIN TEXTURES
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/avatars/3.png',
        '/images/battlepass/boosterx2.svg',
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/boosterx3.svg',
        '/images/battlepass/gemsx50.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/skins/1/preview.png', //ZMIENIC W PRZYSZLOSCI
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/boosterx2.svg',
        '/images/avatars/2.png',
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx2.svg',
        '/images/battlepass/gemsx50.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/skins/3/preview.png', //ZMIENIC W PRZYSZLOSCI
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx2.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/avatars/5.png',
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx3.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/gemsx50.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/skins/10/preview.png', //ZMIENIC W PRZYSZLOSCI
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx3.svg',
        '/images/battlepass/boosterx2.svg',
        '/images/avatars/8.png',
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx3.svg',
        '/images/battlepass/gemsx50.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/gemsx100.svg',
        '/images/avatars/9.png',
    ];
    let names = [  
        'booster x1',
        'booster x1',
        'avatar 3',
        'booster x2',
        'gems x100',
        'booster x1',
        'booster x3',
        'gems x50',
        'booster x1',
        'skinpack Icy Skin', //ZMIENIC W PRZYSZLOSCI
        'gems x100',
        'booster x1',
        'booster x2',
        'avatar 2',
        'gems x100',
        'booster x2',
        'gems x50',
        'booster x1',
        'booster x1',
        'skinpack Mechanical Knight', //ZMIENIC W PRZYSZLOSCI
        'gems x100',
        'booster x2',
        'booster x1',
        'avatar 5',
        'gems x100',
        'booster x3',
        'booster x1',
        'gems x50',
        'booster x1',
        'skinpack Elite Warlord', //ZMIENIC W PRZYSZLOSCI
        'gems x100',
        'booster x3',
        'booster x2',
        'avatar 8',
        'gems x100',
        'booster x3',
        'gems x50',
        'booster x1',
        'gems x100',
        'avatar 9',
    ];
    let currentIndex = 0; 

    function handleClick(direction) {
        if (direction === 'left') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else if (direction === 'right') {
            currentIndex = (currentIndex + 1) % images.length;
        } else if (direction === 'middle') {
            console.log("Showing Reward for ",(currentIndex+1));
        }
    }


    let bp_xp = -1;
    let level = -1;
    let bp_xp_max = -1;


    function calculateLevel(xp) {
        let expRequired = 100;
        let expIncrementAmount = 25;
        let currentLevel = 0;

        while ( xp >= expRequired) {
            xp -= expRequired;
            currentLevel++;
            expRequired += expIncrementAmount;
        }
        bp_xp = xp;
        bp_xp_max = expRequired;
        currentIndex = currentLevel;
        level = currentLevel;
    }



    let battlepass_owned = false;

    async function handle_skin_buy(){  
        
        let session_id = localStorage.getItem('session_id');
        if (!session_id) {
            console.log("PLEASE LOG IN TO BUY BATTLEPASS");
            await goto("/login");
            return;
        }
        
        try {
            const response = await fetch("https://sapper-api.onrender.com/buy_battlepass", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: session_id,
                }),
            });
            const result = await response.json();
            console.log(result);                                                                  // debug delete later
            if (result.type === "success") {
                let new_balance = parseInt(result.new_balance);
                console.log("Successfully bought a battlepass, new balance: ", new_balance);  // debug delete later
                battlepass_owned = true;
                localStorage.setItem('battlepass_owned', battlepass_owned);
                localStorage.setItem('gems', new_balance);
                location.reload();
            } else {
                console.error('Failed to buy battlepass:', result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
        
    }


    // GET BATTLEPASS STATUS - IF USER OWNS THE BATTLEPASS OR NO
    async function getBattlepassStatus(){
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            console.log("User is not logged in - Battlepass owned is unknown")
            battlepass_owned=false;
            localStorage.setItem('battlepass_owned', battlepass_owned);
            return;
        }
        let sessionID = storedSession;
        try {
            const response = await fetch("https://sapper-api.onrender.com/battlepass_status", {
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
                localStorage.setItem("battlepass_owned", result.owned);
                battlepass_owned=(result.owned === "true");
                localStorage.setItem('battlepass_owned', battlepass_owned);
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }

    }
        
    import { onMount } from 'svelte';
    onMount(async () => {
        bp_xp = parseInt(localStorage.getItem('bp_xp')) || 0;
        calculateLevel(bp_xp);
        getBattlepassStatus(); //battlepass_owned = (localStorage.getItem('battlepass_owned') === 'true');
    });
</script>

<div class="container level">
    {#if !battlepass_owned}
        Buy the battlepass and unlock {level} tiers!
    {:else}
        Level: {level} XP: {bp_xp}/{bp_xp_max}
    {/if}
</div>
<div class="carousel-container">
    <!-- LEWY -->
    {#if currentIndex > 0}
        {#if (currentIndex - 1) < level}
            <div class="backgroundUnlocked itemSmall itemSlot">
                <img src={images[currentIndex - 1]} alt="Left" on:click={() => handleClick('left')} class="carousel-image backgroundSmall">
                <div class="itemSmall-label">
                    <div class="itemSmall-tier">
                        Tier {currentIndex}
                    </div>
                    <div class="itemSmall-name">
                        {names[currentIndex - 1]}
                    </div>
                </div>
            </div>
        {:else}
            <div class="backgroundSmall itemSmall itemSlot">
                <img src={images[currentIndex - 1]} alt="Left" on:click={() => handleClick('left')} class="carousel-image darkened backgroundSmall">
                <div class="itemSmall-label">
                    <div class="itemSmall-tier">
                        Tier {currentIndex}
                    </div>
                    <div class="itemSmall-name">
                        {names[currentIndex - 1]}
                    </div>
                </div>
            </div>
        {/if}
    {/if}


    <!-- SRODKOWY -->
    {#if currentIndex < level}
        <div class="backgroundUnlockedMiddle itemNormal itemSlot">
            <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image backgroundNormal">
            <div class="itemNormal-label">
                <div class="itemNormal-tier">
                    Tier {currentIndex + 1}
                </div>
                <div class="itemNormal-name">
                    {names[currentIndex]}
                </div>
            </div>
        </div>
    {:else}
        <div class="backgroundNormal itemNormal itemSlot">
            <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image backgroundNormal">
            <div class="itemNormal-label">
                <div class="itemNormal-tier">
                    Tier {currentIndex + 1}
                </div>
                <div class="itemNormal-name">
                    {names[currentIndex]}
                </div>
            </div>
        </div>
    {/if}
    
    <!-- PRAWY -->
    {#if currentIndex < images.length - 1}
        {#if (currentIndex + 1 ) < level}
            <div class="backgroundUnlocked itemSmall itemSlot">
                <img src={images[currentIndex + 1]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened backgroundSmall">
                <div class="itemSmall-label">
                    <div class="itemSmall-tier">
                        Tier {currentIndex + 2}
                    </div>
                    <div class="itemSmall-name">
                        {names[currentIndex + 1]}
                    </div>
                </div>
            </div>
        {:else}
            <div class="backgroundSmall itemSmall itemSlot">
                <img src={images[currentIndex + 1]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened backgroundSmall">
                <div class="itemSmall-label">
                    <div class="itemSmall-tier">
                        Tier {currentIndex + 2}
                    </div>
                    <div class="itemSmall-name">
                        {names[currentIndex + 1]}
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>

<div class="container buy">
    {#if !battlepass_owned}
        Buy the battlepass and unlock all tiers up to {level} and all next tiers with 25% exp boost!
        <button on:click={() => handle_skin_buy()} class="custom_button_buy_battlepass">Buy (950 gems)</button>
    {/if}
</div>
<!-- 
<div class="container">
    <label for="xpSlider">XP:</label>
    <input
        type="range"
        id="xpSlider"
        bind:value={bp_xp}
        min="0"
        max="2500"
        class="slider"
    />

    <p>Current XP: {bp_xp}</p>
    <p>Current Level: {level}</p>
    <p>{names[currentIndex]}</p>
</div> -->




<style>
    .level {
        text-align: center;
        font-size: xx-large;
        font-weight: bold;
        margin-bottom: 32px;
    }

    .itemSlot {
        display: flex;
        flex-direction: column;
    }
    
    .itemSmall {
        width: 128px;
        margin-top: 32px;
    }

    .itemSmall-label {
        text-align: center;
        text-wrap: pretty;
        margin-top: 4px;
    }
        
    .itemSmall-tier {
        font-weight: bold;
        font-size: 18px;
    }

    .itemSmall-name {
        font-size: 12px;
    }

    .itemNormal {
        width: 192px;
    }
    
    .itemNormal-label {
        text-align: center;
        text-wrap: pretty;
        margin-top: 8px;
    }
    
    .itemNormal-tier {
        font-weight: bold;
        font-size: 24px;
    }

    .itemNormal-name {
        font-size: 16px;
    }
    
    .carousel-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        max-width: 600px; 
        margin: auto;
    }

    .carousel-image {
        max-width: 200px;
        height: auto;
    }

    .darkened {
        filter: brightness(0.5);
        max-width: 160px;
    }

    .slider {
        width: 100%;
    }

    img.backgroundNormal {
        width: 192px;
    }
    img.backgroundSmall {
        width: 128px;
    }
    div.backgroundUnlocked {
        background-color: rgba(0, 255, 0, 0.5);
    }
    div.backgroundUnlockedMiddle {
        background-color: rgba(0, 255, 0, 0.5);
    }


    .custom_button_buy_battlepass {
        position: relative;
        flex: 1;
        display: inline-block;
        margin: 5px;
        padding: 6px;
        text-align: center;
        font-size: 14px;
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

    .custom_button_buy_battlepass:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
        transform: scale(1.1);
    }

    .custom_button_buy_battlepass:active {
        transform: scale(0.9);
    }
</style>
