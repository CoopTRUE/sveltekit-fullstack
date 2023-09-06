<script>
  import Header from '$lib/components/Header.svelte'
  import '../app.css'
</script>

<div class="flex min-h-screen flex-col">
  <Header />
  <div class="flex-1">
    <slot />
  </div>
</div>
