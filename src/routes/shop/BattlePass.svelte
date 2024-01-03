<script>
    let images = [  // TODO: POPULATE THIS WITH ACTUAL SKIN TEXTURES
        '/src/lib/images/1.svg',
        '/src/lib/images/2.svg',
        '/src/lib/images/3.svg',
        '/src/lib/images/4.svg',
        '/src/lib/images/5.svg',
        '/src/lib/images/6.svg',
        '/src/lib/images/7.svg',
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
</style>

<div class="carousel-container">
    {#if currentIndex > 0}
        <img src={images[(currentIndex - 1 + images.length) % images.length]} alt="Left" on:click={() => handleClick('left')} class="carousel-image darkened">
    {/if}

    <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image">

    {#if currentIndex < images.length - 1}
        <img src={images[(currentIndex + 1) % images.length]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened">
    {/if}
</div>