<script lang="ts">
  import { createUserQuery } from '$lib/queries'

  export let data
  $: ({ userId } = data)

  const query = createUserQuery({ userId })
</script>

<svelte:head>
  <title>User {userId} | Sveltekit</title>
  <meta name="description" content="User {userId} page" />
</svelte:head>

{#if $query.isLoading}
  <p>Loading...</p>
{:else if $query.isSuccess}
  <code>{$query.data}</code>
{:else if $query.isError}
  <p>Error: {$query.error.message}</p>
{/if}
