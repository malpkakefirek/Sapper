<script>
    import { page } from "$app/stores";
    import Friend from './Friend.svelte';

    let friends_list = [
          { id: 1, name: 'Lukas', image: '/images/avatars/1.png' },
          { id: 2, name: 'Anna', image: '/images/avatars/2.png' },
          { id: 3, name: 'John', image: '/images/avatars/3.png' },
          { id: 4, name: 'Emily', image: '/images/avatars/4.png' },
          { id: 5, name: 'Michael', image: '/images/avatars/5.png' },
          { id: 6, name: 'Sophia', image: '/images/avatars/6.png' },
          { id: 7, name: 'Daniel', image: '/images/avatars/7.png' },
          { id: 8, name: 'Olivia', image: '/images/avatars/8.png' },
          { id: 9, name: 'David', image: '/images/avatars/9.png' },
          { id: 10, name: 'Emma', image: '/images/avatars/10.png' },
          { id: 11, name: 'Evelina', image: '/images/avatars/11.png' },
    ];

    let profile = [];
    import { onMount } from 'svelte';
    onMount(async () => {
        if (window.location.hash == "#profile") {
            let profile_id = parseInt(localStorage.getItem('profile_viewed_id')) || -1;
            let profile_name = localStorage.getItem('profile_viewed_name') || null;
            befriended = (localStorage.getItem('befriended') === 'true');
            if (profile_id !== -1 && profile_name !== null) {
                profile = friends_list.find(friend => friend.id === profile_id);
            } else {
                console.error("Missing or invalid profile data in localStorage.");
            }
        }
    });




    let searchTerm = ''; 
    let SearchList = [];
    
    function filterFriends() {
        if (searchTerm.trim() === '') {
            return [];
        }
        return friends_list.filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    function handleSubmit() {
        SearchList=filterFriends();
        console.log(SearchList);
    }

    let games_played = Math.floor(Math.random() * 1000) + 1;
    let tiles_clicked = Math.floor(Math.random() * 50000) + 1;
    let games_won = Math.floor(Math.random() * games_played) + 1;
    let games_lost = games_played-games_won;
    let flags_placed = Math.floor(Math.random() * 5000) + 1;
    let befriended = false;

    function toggle_friend(){
        befriended = !befriended;
        befriended = localStorage.setItem('befriended', befriended.toString());
        location.reload();
    }
</script>

<svelte:head>
    <title>Friends</title>
    <meta name="description" content="About this app" />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="text-column">
    {#if $page.url.hash == "#profile"}
        <div class="profileCard">
            <div class="left">
                <div class="avatar">
                    <img style="width:inherit" src={profile.image} alt="avatar of {profile.name}" />
                </div>
                <div class="profileName">{profile.name}</div>
                {#if befriended}
                    <button on:click={() => toggle_friend()} class="custom_button_remove_friend">Remove Friend</button>
                {:else}
                    <button on:click={() => toggle_friend()} class="custom_button_add_friend">Add Friend</button>
                {/if}
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
    {:else if $page.url.hash == "#list"}
        <div class="friends-container">
            {#each friends_list as friend (friend.id)}
                <div class="friend">
                    <Friend {friend} />
                </div>
            {/each}
        </div>
    {:else if $page.url.hash == "#add"}
        <label for="searchInput">Search by name:</label>
        <input type="text" id="searchInput" bind:value={searchTerm} />
        <button on:click={handleSubmit} class="custom_button_remove_friend">Search!</button>
        

        <div class="friends-container">
            {#each SearchList as friend (friend.id)}
                <div class="friend">
                    <Friend {friend} />
                </div>
            {/each}
        </div>
    {/if}
</div>


<style>
    div {
        width: 100%;
        height: 100%;
    }
    .friends-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .friend {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 10px;
        max-width: 200px;
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
        font-size: 18px;
        font-weight: bold;
    }
    .statistics {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    

    /* BUTTON FOR UNFRIEND */
    .custom_button_remove_friend {
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

    .custom_button_remove_friend:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #CCAC00;
        transform: scale(1.1);
    }

    .custom_button_remove_friend:active {
        transform: scale(0.9);
    }

    /* BUTTON FOR ADD FRIEND */
    .custom_button_add_friend {
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

    .custom_button_add_friend:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #4CAF50;
        transform: scale(1.1);
    }

    .custom_button_add_friend:active {
        transform: scale(0.9);
    }
</style>
