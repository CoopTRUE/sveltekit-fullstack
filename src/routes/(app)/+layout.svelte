<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
  import Header from '$lib/components/Header.svelte'

  export let data
</script>

<QueryClientProvider client={data.queryClient}>
  <div class="flex min-h-screen flex-col">
    <Header />
    <div class="flex-1">
      <slot />
    </div>
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>
