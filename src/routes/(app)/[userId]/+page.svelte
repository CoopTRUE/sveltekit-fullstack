<script lang="ts">
  import { createUserQuery } from '$lib/queries'

  export let data
  $: ({ userId } = data)

  $: query = createUserQuery({ userId })
  $: name = $query.data?.name || `User ${userId}`
</script>

<svelte:head>
  <title>{name} | Sveltekit</title>
  <meta name="description" content="{name}'s' page" />
</svelte:head>

{#if $query.isLoading}
  <p>Loading...</p>
{:else if $query.isSuccess}
  <code>{JSON.stringify($query.data)}</code>
{:else if $query.isError}
  <p>Error: {$query.error.message}</p>
{/if}
