<script>
  import { trpc } from '$lib/trpc/client'
  import { createQuery } from '@tanstack/svelte-query'

  const query = createQuery({
    queryKey: ['posts'],
    queryFn: () => trpc().mockData.query(),
  })
</script>

{#if $query.isLoading}
  <p>Loading...</p>
{:else if $query.isError}
  <p>Error: {$query.error}</p>
{:else}
  <ul>
    {#each $query.data as data}
      <li>{data}</li>
    {/each}
  </ul>
{/if}
