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
        '/images/skins/1/preview.svg', //ZMIENIC W PRZYSZLOSCI
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/boosterx2.svg',
        '/images/avatars/2.png',
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx2.svg',
        '/images/battlepass/gemsx50.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/skins/3/preview.svg', //ZMIENIC W PRZYSZLOSCI
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx2.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/avatars/5.png',
        '/images/battlepass/gemsx100.svg',
        '/images/battlepass/boosterx3.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/battlepass/gemsx50.svg',
        '/images/battlepass/boosterx1.svg',
        '/images/skins/10/preview.svg', //ZMIENIC W PRZYSZLOSCI
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


    let bp_xp = 0;
    let level = 0;
    
    $: level = calculateLevel(bp_xp);

    function calculateLevel(xp) {
        let expRequired = 100;
        let expIncrementAmount = 50;
        let currentLevel = 0;

        while ( xp >= expRequired) {
            xp -= expRequired;
                currentLevel++;
            expRequired+=expIncrementAmount;
        }
        currentIndex=currentLevel;
        //console.log("Current Battlepass level: "+ currentIndex);

        return currentLevel;
    }

        
    import { onMount } from 'svelte';
    onMount(async () => {
        bp_xp = parseInt(localStorage.getItem('bp_xp')) || 0;
        calculateLevel(bp_xp);
    });
</script>


<div class="carousel-container">
    <!-- LEWY -->
    {#if currentIndex > 0}
        {#if (currentIndex - 1) < level}
            <div class="backgroundUnlocked">
                <img src={images[currentIndex - 1]} alt="Left" on:click={() => handleClick('left')} class="carousel-image backgroundSmall">
            </div>
        {:else}
            <div class="backgroundSmall">
                <img src={images[currentIndex - 1]} alt="Left" on:click={() => handleClick('left')} class="carousel-image darkened backgroundSmall">
            </div>
        {/if}
    {/if}


    <!-- SRODKOWY -->
    {#if currentIndex < level}
        <div class="backgroundUnlockedMiddle">
            <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image backgroundNormal">
        </div>
    {:else}
        <div class="backgroundNormal">
            <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image backgroundNormal">
        </div>
    {/if}
    
    <!-- PRAWY -->
    {#if currentIndex < images.length - 1}
        {#if (currentIndex + 1 ) < level}
            <div class="backgroundUnlocked">
                <img src={images[currentIndex + 1]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened backgroundSmall">
            </div>
        {:else}
            <div class="backgroundSmall">
                <img src={images[currentIndex + 1]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened backgroundSmall">
            </div>
        {/if}
    {/if}
</div>

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
</div>




<style>
    .carousel-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        width: 96px;
    }
    img.backgroundSmall {
        width: 77px;
    }
    div.backgroundUnlocked {
        background-color: rgba(0, 255, 0, 0.5);
    }
    div.backgroundUnlockedMiddle {
        background-color: rgba(0, 255, 0, 0.5);
    }
</style>
