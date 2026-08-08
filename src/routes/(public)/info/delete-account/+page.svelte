<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import home from '$lib/assets/images/delete-account/home.jpg';
  import account from '$lib/assets/images/delete-account/account.jpg';
  import deleteAccount from '$lib/assets/images/delete-account/delete.jpg';

</script>

<svelte:head>
  <title>Delete Account</title>  	
</svelte:head>

<Header>
  <h1>Delete Account</h1>
</Header>

<article>
  <div>
  <h2>Home Screen</h2>
  <p>
    To delete your account navigate to the Account screen by clicking the buton at the top-right of the home screen. 
  </p>
  </div>
  <img src={home} alt="Home" width="200">
</article>

<article>
  <div>
    <h2>Account Screen</h2>
    <p>
      Then press the Delete Account button to go the Delete Account screen.
    </p>
  </div>
  <img src={account} alt="Account" width="200">
</article>
<article>
  <div>
    <h2>Delete Account Screen</h2>
    <p>
      Finally press the Delete Account button and your account will be deleted. 
    </p>
  </div>
  <img src={deleteAccount} alt="Delete Account" width="200">
</article>

<p>
  If you are unable to delete your account, please contact us at <a href="mailto:hello@matthewblott.com">hello@matthewblott.com</a>
</p>

<style>
  a {
    color: blue;
  }
  p, h2  {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  article {
    display: flex;
    align-items: center;
    border: none;
  }
  

</style>

