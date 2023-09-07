<script lang="ts">
  import { signIn } from '@auth/sveltekit/client'
  import { Smile } from 'lucide-svelte'
</script>

<svelte:head>
  <title>Home | Sveltekit</title>
  <meta name="description" content="" />
</svelte:head>

<main>
  <h1 class="flex items-center text-green-500">Welcome<Smile /></h1>
  <button on:click={() => signIn('github')}>hi</button>
</main>

<style lang="postcss">
</style>
