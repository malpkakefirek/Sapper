<script>
    export let friend;

    import { goto } from "$app/navigation";
    function handleProfileView(){
        console.log("Profile Viewed of "+friend.name+" | id: "+friend.id);
        localStorage.setItem('profile_viewed_id',friend.id);
        localStorage.setItem('profile_viewed_name',friend.name);
        await goto("/friend#profile");
        location.reload();
    }
</script>

<div class="friend-container">
    <img src={friend.image} alt="avatar of {friend.name}" />
    <h3>{friend.name}</h3>
    <div class="button-container">
        <button on:click={handleProfileView} class="custom_button2">View Profile</button>
    </div>
</div>

<style>
    .friend-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin: 10px;
    }
    .button-container {
        display: flex;
        justify-content: space-between;
    }
    
    /* BUTTON FOR VIEW PROFILE */
    .custom_button2 {
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

    .custom_button2:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #4CAF50;
        transform: scale(1.1);
    }

    .custom_button2:active {
        transform: scale(0.9);
    }

</style>