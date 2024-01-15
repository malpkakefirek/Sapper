<script>
    export let friend;

    import { goto } from "$app/navigation";
    async function handleProfileView(){
        console.log("Profile Viewed of "+friend.name+" | id: "+friend.id);
        localStorage.setItem('profile_viewed_id',friend.id);
        localStorage.setItem('profile_viewed_name',friend.name);
        await goto("/friends#profile");
        location.reload();
    }
</script>

<div class="friend-container">
    <img src={friend.image} alt="avatar of {friend.name}" />
    <h3>{friend.name}</h3>
    <div class="button-container">
        <button on:click={handleProfileView} class="custom_button1">View Profile</button>
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
</style>