<script lang="ts">
  import { createUserQuery } from '$lib/queries'

  export let data
  const user = data.user()

  $: name = $user.data?.name || `User ${data.userId}`
</script>

<svelte:head>
  <title>{name} | Sveltekit</title>
  <meta name="description" content="{name}'s' page" />
</svelte:head>

{#if $user.isLoading}
  <p>Loading...</p>
{:else if $user.isSuccess}
  <code>{JSON.stringify($user.data)}</code>
{:else if $user.isError}
  <p>Error: {$user.error.message}</p>
{/if}
