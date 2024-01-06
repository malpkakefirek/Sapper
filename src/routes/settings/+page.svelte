<script>
    import { page } from "$app/stores";
    
    let profile = { id: 1, name: 'Loading...', image: '/images/avatars/1.png' };
    
    let games_played = Math.floor(Math.random() * 1000) + 1;
    let tiles_clicked = Math.floor(Math.random() * 50000) + 1;
    let games_won = Math.floor(Math.random() * games_played) + 1;
    let games_lost = games_played-games_won;
    let flags_placed = Math.floor(Math.random() * 5000) + 1;



    // HANDLE CAROUSEL
    let currentIndex = 0; 

    async function handleClick(direction) {
        if (direction === 'left') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else if (direction === 'right') {
            currentIndex = (currentIndex + 1) % images.length;
        } else if (direction === 'middle') {
            console.log("Changing avatar to: ",(currentIndex+1));
            avatar_equiped = (currentIndex+1);
            profile.image = '/images/avatars/' + avatar_equiped + '.png';
            localStorage.setItem('avatar_equiped', avatar_equiped);
            location.reload();
        }
    }
    let all_images = [  // TODO: POPULATE THIS WITH ACTUAL SKIN TEXTURES
        '/images/avatars/1.png',
        '/images/avatars/2.png',
        '/images/avatars/3.png',
        '/images/avatars/4.png',
        '/images/avatars/5.png',
        '/images/avatars/6.png',
        '/images/avatars/7.png',
        '/images/avatars/8.png',
        '/images/avatars/9.png',
        '/images/avatars/10.png',
        '/images/avatars/11.png',
        '/images/avatars/12.png',
        '/images/avatars/13.png',
    ];
    let all_names = [
        'default man 1',
        'white wizard',
        'great warrior',
        'default women 1',
        'default man 2',
        'man of great mind',
        'eye patch guy',
        'foxgirl',
        'man of wars',
        'tier 40 bp',
        'fox avatar',
        'elf queen',
        'eye patch guy but sunny',
    ];
    let owned_skins = [1, 2, 3, 4, 10, 12,13];  // TODO get from backend
    // Filter images and names based on owned skins
    let images = owned_skins.map(index => all_images[index]);
    let names = owned_skins.map(index => all_names[index]);
    //
    let avatar_equiped = 3;
    profile.image = '/images/avatars/' + avatar_equiped + '.png';
    
    // on mount:
    import { onMount } from "svelte";
    onMount(async () => {
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            // TODO: Check if username in storage and remove it
            await goto("/login");
            location.reload();
            return;
        }

        profile.name = localStorage.getItem("username");
        avatar_equiped = parseInt(localStorage.getItem('avatar_equiped')) || 0;
        profile.image = '/images/avatars/' + avatar_equiped + '.png';
        
    });
</script>

<svelte:head>
    <title>Game</title>
    <meta name="description" content="About this app" />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column">
    {#if $page.url.hash == "#statistics"}
        <div class="settingsPage">
            <div class="profileCard">
                <div class="left">
                    <div class="avatar">
                        <img style="width:inherit" src={profile.image} alt="avatar of {profile.name}" />
                    </div>
                    <div class="profileName">{profile.name}</div>
                </div>
                <div class="right">
                    <div class="statistics-title">
                        Statistics
                    </div>
                    <div class="statistics">
                        <div>Games Played: <span>{games_played}</span></div>
                        <div>Tiles Clicked: <span>{tiles_clicked}</span></div>
                        <div>Games Won: <span>{games_won}</span></div>
                        <div>Games Lost: <span>{games_lost}</span></div>
                        <div>Flags Placed: <span>{flags_placed}</span></div>
                    </div>
                </div>
            </div>
            
            <div class="avatarSelection">
                Choose avatar:
                <div class="carousel-container">
                    <!-- LEFT -->
                    {#if currentIndex > 0}
                        {#if (currentIndex) == avatar_equiped}
                            <div class="backgroundUnlocked itemSmall itemSlot">
                                <img src={images[currentIndex - 1]} alt="Left" on:click={() => handleClick('left')} class="carousel-image backgroundSmall">
                                <div class="itemSmall-label">
                                    <div class="itemSmall-name">
                                        {names[currentIndex - 1]}
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div class="backgroundSmall itemSmall itemSlot">
                                <img src={images[currentIndex - 1]} alt="Left" on:click={() => handleClick('left')} class="carousel-image darkened backgroundSmall">
                                <div class="itemSmall-label">
                                    <div class="itemSmall-name">
                                        {names[currentIndex - 1]}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/if}

                    <!-- MIDDLE -->
                    {#if (currentIndex + 1) == avatar_equiped}
                        <div class="backgroundUnlockedMiddle itemNormal itemSlot">
                            <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image backgroundNormal">
                            <div class="itemNormal-label">
                                <div class="itemNormal-name">
                                    {names[currentIndex]}
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="backgroundNormal itemNormal itemSlot">
                            <img src={images[currentIndex]} alt="Middle" on:click={() => handleClick('middle')} class="carousel-image backgroundNormal">
                            <div class="itemNormal-label">
                                <div class="itemNormal-name">
                                    {names[currentIndex]}
                                </div>
                            </div>
                        </div>
                    {/if}

                    <!-- RIGHT -->
                    {#if currentIndex < images.length - 1}
                        {#if (currentIndex + 2 ) == avatar_equiped}
                            <div class="backgroundUnlocked itemSmall itemSlot">
                                <img src={images[currentIndex + 1]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened backgroundSmall">
                                <div class="itemSmall-label">
                                    <div class="itemSmall-name">
                                        {names[currentIndex + 1]}
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div class="backgroundSmall itemSmall itemSlot">
                                <img src={images[currentIndex + 1]} alt="Right" on:click={() => handleClick('right')} class="carousel-image darkened backgroundSmall">
                                <div class="itemSmall-label">
                                    <div class="itemSmall-name">
                                        {names[currentIndex + 1]}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
    {:else if $page.url.hash == "#changePassword"}
        <h1>You are in <bold>Settings{$page.url.hash}</bold> page!</h1>
        <h2>This is not implemented yet!</h2>
    {:else if $page.url.hash == "#deleteProfile"}
        <h1>You are in <bold>Settings{$page.url.hash}</bold> page!</h1>
        <h2>This is not implemented yet!</h2>
    {/if}
</div>


<style>
    div {
        width: 100%;
        height: 100%;
    }

    .settingsPage {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profileCard {
        display: flex;
    }
    .left, .right {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profileName {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
    }
    .avatar {
        width: 128px;
        border-radius: 50%;
    }
    .statistics-title {
        font-size: 32px;
        font-weight: bold;
    }
    .statistics {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
    .itemNormal-name {
        font-size: 16px;
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
</style>
