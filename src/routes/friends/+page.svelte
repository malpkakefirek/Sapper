<script>
    import { page } from "$app/stores";
    import Friend from './Friend.svelte';

    let friends_list = [];

    let profile = {
        id: 1, 
        name: 'Loading...', 
        image: '/images/avatars/1.png', 
        statistics: {
            games_played: 0, 
            games_won: 0, 
            games_lost: 0, 
            tiles_clicked: 0
        },
        xp: 0
    };
    let profile_searched_id;
    let formatted_time="Loading...";
    
    let sessionID;
    import { onMount } from 'svelte';
    
    onMount(async () => {
        let storedSession = localStorage.getItem("session_id");
        if (!storedSession) {
            await goto("/login");
            location.reload();
            return;
        }
        sessionID = storedSession;
        
        await getFriendsList();
        
        if (window.location.hash == "#profile") {
            let profile_id = localStorage.getItem('profile_viewed_id');
            let profile_name = localStorage.getItem('profile_viewed_name') || null;
            befriended = (localStorage.getItem('befriended') === 'true');
            if (profile_id !== -1 && profile_name !== null) {
                profile_searched_id = profile_id;
                // profile = friends_list.find(friend => friend.id === profile_id);
                await get_user_info(profile_id);
                befriended = friends_list.some(friend => friend.id === profile_searched_id);
                localStorage.setItem('befriended', befriended.toString());
            } else {
                console.error("Missing or invalid profile data in localStorage.");
            }
            formatted_time = display_time(profile.statistics.miliseconds_played);
        }
    });

    function display_time(time){
        let seconds = parseFloat(time)/100;

        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = (seconds % 60);

        let display = '';

        if (hours > 0) {
            display += hours + 'h ';
        }
        if (minutes > 0) {
            display += minutes + 'm ';
        }

        display += remainingSeconds + 's ';

        console.log(display);
        return display;
    }
    
    async function get_user_info(user_id){
        try {
            const response = await fetch("https://sapper-api.onrender.com/user_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionID,
                    user_id: user_id,
                }),
            });
            const result = await response.json();
            console.log(result);
            console.log('User data:', result.user);
            if (result.type === "success") {
                profile.id = user_id;
                profile.name = result.username;
                profile.image = '/images/avatars/'+result.avatar+'.png';
                profile.xp = result.xp;
                profile.statistics = result.statistics;
                localStorage.setItem('profile_viewed_name', result.username);
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    }

    async function getFriendsList(){
        try {
            const response = await fetch("https://sapper-api.onrender.com/get_friends", {
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
            console.log('Friends list:', result.friends);
            if (result.type === "success") {
                friends_list = result.friends.map(friend => ({
                    id: friend.id,
                    name: friend.username,
                    image: '/images/avatars/'+friend.avatar+'.png',
                }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);        
        }
    }



    let searchTerm = ''; 
    let SearchList = [];
    let not_found=false;
    
    function filterFriends() {
        if (searchTerm.trim() === '') {
            return [];
        }
        not_found=false;
        SearchList = getSearchResults();
        
        return friends_list.filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    async function getSearchResults(){
        try {
            const response = await fetch("https://sapper-api.onrender.com/search_users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionID,
                    query: searchTerm,
                }),
            });
            const result = await response.json();
            console.log(result);
            console.log('Users Found:', result.users);
            if (result.type === "success") {
                if (result.users.length === 0){
                    not_found=true;
                }else{
                    SearchList = result.users.map(friend => ({
                        id: friend.id,
                        name: friend.username,
                        image: '/images/avatars/'+friend.avatar+'.png',
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    function handleSubmit() {
        filterFriends();
        console.log(SearchList);
    }

    // let games_played = Math.floor(Math.random() * 1000) + 1;
    // let tiles_clicked = Math.floor(Math.random() * 50000) + 1;
    // let games_won = Math.floor(Math.random() * games_played) + 1;
    // let games_lost = games_played-games_won;
    // let flags_placed = Math.floor(Math.random() * 5000) + 1;
    let befriended = false;

    async function toggle_friend(){
        // befriended = !befriended;
        // befriended = localStorage.setItem('befriended', befriended.toString());
        // location.reload();

        if (friends_list.some(friend => friend.id === profile_searched_id)) {
            try {
                const response = await fetch("https://sapper-api.onrender.com/remove_friend", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionID,
                        user_id: profile_searched_id,
                    }),
                });
                const result = await response.json();
                console.log(result);
                if (result.type === "success") {
                    befriended = false;
                    befriended = localStorage.setItem('befriended', befriended.toString());
                    location.reload();
                    console.log('Successfully removed a friend');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }else{
            try {
                const response = await fetch("https://sapper-api.onrender.com/add_friend", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionID,
                        user_id: profile_searched_id,
                    }),
                });
                const result = await response.json();
                console.log(result);
                if (result.type === "success") {
                    befriended = true;
                    befriended = localStorage.setItem('befriended', befriended.toString());
                    location.reload();
                    console.log('Successfully added a friend');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
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
                    <button on:click={() => toggle_friend()} class="custom_button1">Remove Friend</button>
                {:else}
                    <button on:click={() => toggle_friend()} class="custom_button1">Add Friend</button>
                {/if}
            </div>
            <div class="right">
                <div class="statistics-title">
                    Statistics
                </div>
                <div class="statistics">
                    <div>Time Played: <span>{formatted_time}</span></div>
                    <div>Games Played: <span>{profile.statistics.games_played}</span></div>
                    <div>Tiles Clicked: <span>{profile.statistics.tiles_clicked}</span></div>
                    <div>Games Won: <span>{profile.statistics.games_won}</span></div>
                    <div>Games Lost: <span>{profile.statistics.games_played - profile.statistics.games_won}</span></div>
                    <div>xp: <span>{profile.xp}</span></div>
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
        {#if not_found}
            <p class="not-found-text">No users found!</p>
        {/if}
        <button on:click={handleSubmit} class="custom_button1">Search!</button>
        

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
    .not-found-text {
        color: red;
        margin-top: 10px;
    }
</style>
