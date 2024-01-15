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
            console.log("Changing avatar to: ",(owned_skins[currentIndex]));

            //handle backend avatar change
            let storedSession = localStorage.getItem("session_id");
            if (!storedSession) {
                // TODO: Check if username in storage and remove it
                await goto("/");
                location.reload();
                return;
            }
            let sessionID = storedSession;
            try {
                const response = await fetch("https://sapper-api.onrender.com/set_avatar", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionID,
                        avatar_id: owned_skins[currentIndex],
                    }),
                });
                const result = await response.json();
                console.log(result);
                if (result.type === "success") {
                    avatar_equiped = owned_skins[currentIndex];
                    profile.image = '/images/avatars/' + avatar_equiped + '.png';
                    localStorage.setItem('avatar_equiped', avatar_equiped);
                }
            } catch (error) {
                console.error('Error fetching data:', error);        
            }
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
        'man of great mind',
        'default man 2',
        'eye patch guy',
        'foxgirl',
        'man of wars',
        'tier 40 bp',
        'fox avatar',
        'elf queen',
        'eye patch guy but sunny',
    ];
    let owned_skins = [1, 4, 6];  // default free skins
    // Filter images and names based on owned skins
    let images = owned_skins.map(index => all_images[index-1]);
    let names = owned_skins.map(index => all_names[index-1]);
    //
    let avatar_equiped = 1;
    profile.image = '/images/avatars/' + avatar_equiped + '.png';



    import {
        useForm,
        validators,
        HintGroup,
        Hint,
        required,
        minLength,
        maxLength
    } from "svelte-use-form";
    import { applyAction, deserialize } from "$app/forms";
    import { invalidateAll, goto } from "$app/navigation";

    function passwordMatch(value, form) {
        if (value !== form.values.new_password) {
          return { passwordMatch: true };
        }
    }
    
    const form = useForm();

    let success=false;
    let message='';
    
    /** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
    async function handleChangePassword(event) {
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            // TODO: Check if username in storage and remove it
            await goto("/login");
            location.reload();
            return;
        }
        message='';
        console.log("You tried changing the password");
        const data = new FormData(event.currentTarget);
        let new_password;
        let new_password_confirm;
        for (const [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
            if(key === 'new_password') new_password = value;
            if(key === 'new_password_confirm') new_password_confirm = value;
        }
        if (new_password != new_password_confirm){
            message="Passwords do not match!";
            console.error("Passwords do not match!");
            return;
        }
        
        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data,
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());
        console.log(result);
        if (result.type === "success") {
            console.log("Succesfully changed password");
            success=true;

            await invalidateAll();
        }else{
            message='Password change failed, check password';
            console.error("Password change failed: ", result);
        }
        // TODO: add login fail logic

        applyAction(result);
    }
    
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

        //CHECK USER OWNED AVATARS
        let sessionID = storedSession;
        try {
            const response = await fetch("https://sapper-api.onrender.com/get_user_avatars", {
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
                owned_skins = result.owned_avatars;
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
        //CHECK USER SET AVATAR
        try {
            const response = await fetch("https://sapper-api.onrender.com/get_avatar", {
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
                avatar_equiped = result.avatar_id;
                profile.image = '/images/avatars/' + avatar_equiped + '.png';
                localStorage.setItem('avatar_equiped', avatar_equiped);
                currentIndex = owned_skins.indexOf(avatar_equiped);
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
        //CHECK IF SET AVATAR IS IN USER OWNED AVATARS

        profile.name = localStorage.getItem("username");
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
                        <!-- <div>(debug) avatar_equiped: <span>{avatar_equiped}</span></div>
                        <div>(debug) currentIndex: <span>{currentIndex}</span></div>
                        <div>(debug) owned_skins[currentIndex]: <span>{owned_skins[currentIndex]}</span></div> -->
                    </div>
                </div>
            </div>
            
            <div class="avatarSelection">
                Choose avatar:
                <div class="carousel-container">
                    <!-- LEFT -->
                    {#if currentIndex > 0}
                        {#if owned_skins[currentIndex - 1] == avatar_equiped}
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
                    {#if owned_skins[currentIndex] == avatar_equiped}
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
                        {#if owned_skins[currentIndex + 1] == avatar_equiped}
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
        <form
            method="post"
            on:submit|preventDefault={handleChangePassword}
            use:form
            action="https://sapper-api.onrender.com/change_password"
        >
            <h1>Login</h1>
            <div style="display: flex; justify-content: center;">
                <input type="hidden" name="session_id" bind:value={sessionID} />

                <input type="password" name="old_password" use:validators={[required, minLength(8), maxLength(64)]} />
                <HintGroup for="old_password">
                    <Hint on="required">This is a mandatory field</Hint>
                    <Hint on="minLength" hideWhenRequired>Password must be at least 8 characters long</Hint>
                    <Hint on="maxLength" hideWhenRequired>Password must be at most 64 characters long</Hint>
                </HintGroup>
                
                <input type="password" name="new_password" use:validators={[required, minLength(8), maxLength(64)]} />
                <HintGroup for="new_password">
                    <Hint on="required">This is a mandatory field</Hint>
                    <Hint on="minLength" hideWhenRequired>Password must be at least 8 characters long</Hint>
                    <Hint on="maxLength" hideWhenRequired>Password must be at most 64 characters long</Hint>
                </HintGroup>
                    
                <input type="password" name="new_password_confirm" use:validators={[required, passwordMatch]} />
                <HintGroup for="new_password_confirm">
                    <Hint on="required">This is a mandatory field</Hint>
                    <Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>
                </HintGroup>

                <button disabled={!$form.valid}>Change Password</button>
            </div>
        </form>
        {#if success}
            <div style="color: darkgreen;">Successfully changed password!</div>
        {/if}
        {#if message != ''}
            <div style="color: red;">{message}</div>
        {/if}
            
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
    .darkened {
        filter: brightness(0.5);
        max-width: 160px;
    }


    .carousel-container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
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



    
    form {
        flex: none;
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
</style>
