<script lang="ts">
  import { browser } from '$app/environment'
  import Header from '$lib/components/Header.svelte'
  import ProgressBar from '$lib/components/ProgressBar.svelte'
  import '../app.css'
  import { QueryClientProvider } from '@tanstack/svelte-query'

  export let data
</script>

<ProgressBar />
<QueryClientProvider client={data.queryClient}>
  <div class="flex min-h-screen flex-col">
    <Header />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</QueryClientProvider>
