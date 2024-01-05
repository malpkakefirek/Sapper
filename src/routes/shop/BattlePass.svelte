<script>
    let images = [  // TODO: POPULATE THIS WITH ACTUAL SKIN TEXTURES
        '/images/1.svg',
        '/images/2.svg',
        '/images/3.svg',
        '/images/4.svg',
        '/images/5.svg',
        '/images/6.svg',
        '/images/7.svg',
        '/images/8.svg',
        '/images/9.svg',
        '/images/10.svg',
        '/images/-1.svg',
        '/images/-2.svg',
        '/images/-3.svg',
        '/images/1.svg',
        '/images/2.svg',
        '/images/3.svg',
        '/images/4.svg',
        '/images/5.svg',
        '/images/6.svg',
        '/images/7.svg',
        '/images/8.svg',
        '/images/9.svg',
        '/images/10.svg',
        '/images/-1.svg',
        '/images/-2.svg',
        '/images/-3.svg',
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
    {#each images as image, i (image)}
        {#if currentIndex === 0 && (i === 0 || i === 1)}
            <img src={image} alt="Image" class="carousel-image" on:click={() => handleClick(i)} />
        {:else if currentIndex === images.length - 1 && (i === images.length - 2 || i === images.length - 1)}
            <img src={image} alt="Image" class="carousel-image" on:click={() => handleClick(i)} />
        {:else if i === currentIndex - 1 || i === currentIndex + 1}
            <img src={image} alt="Darkened" class="carousel-image darkened" on:click={() => handleClick(i)} />
        {:else if i === currentIndex}
            <img src={image} alt="Middle" class="carousel-image" on:click={() => handleClick('middle')} />
        {/if}
    {/each}
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
</div>




<style>
    .carousel-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 600px; 
        margin: auto;
        transform: scale(1.75);
    }

    .carousel-image {
        max-width: 200px;
        height: auto;
    }

    .darkened {
        filter: brightness(0.5);
        max-width: 160px;
        transform: scale(1.5);
    }

    .unlocked {
        background-color: rgba(0, 255, 0, 0.5);
    }
    
    .slider {
        width: 100%;
    }
</style>
