<script lang="ts">
  import { page } from '$app/stores'
  import { trpc } from '$lib/trpc/client'

  export let data
  const user = trpc($page).user.default.createQuery({ userId: data.userId })

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
