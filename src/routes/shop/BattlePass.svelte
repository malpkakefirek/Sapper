<script>
    let images = [  // TODO: POPULATE THIS WITH ACTUAL SKIN TEXTURES
        '/images/1.svg',
        '/images/2.svg',
        '/images/3.svg',
        '/images/4.svg',
        '/images/5.svg',
        '/images/6.svg',
        '/images/7.svg',
    ];

    let currentIndex = 0;  // TODO: LOAD AND SET THIS TO USERS BATTPLE PASS LEVEL

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
    
    $: level = calculateLevel(xp);

    function calculateLevel(xp) {
        let expRequired = 100;
        let expIncrementAmount = 50;

        while ( xp >= expRequired) {
            xp -= expRequired;
            level++;
            expRequired+=expIncrementAmount;
        }
        currentIndex=level;
        console.log("Current Battlepass level: "+ currentIndex);

        return level;
    }

        
    import { onMount } from 'svelte';
    onMount(async () => {
        bp_xp = parseInt(localStorage.getItem('bp_xp')) || 0;
        calculateLevel(bp_xp);
    });
</script>

<style>
    .carousel-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 600px; 
        margin: auto;
        transform: scale(1.25);
    }

    .carousel-image {
        max-width: 200px;
        height: auto;
    }

    .darkened {
        filter: brightness(0.5);
        max-width: 160px;
        transform: scale(0.66);
    }
    .slider {
        width: 100%;
    }
</style>

<div class="carousel-container">
    {#if currentIndex > 0}
        <img src={images[(currentIndex - 1 + images.length) % images.length]} alt="Left" on:click={() => handleClick('left')} class="carousel-image darkened">
    {/if}

    <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image">

    {#if currentIndex < images.length - 1}
        <img src={images[(currentIndex + 1) % images.length]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened">
    {/if}

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
</div>