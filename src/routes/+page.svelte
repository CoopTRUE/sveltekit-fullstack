<script lang="ts">
  import { signIn } from '@auth/sveltekit/client'
  import { Button } from '$lib/components/ui/button'
  import Smile from 'lucide-svelte/icons/smile'

  let clicked = 0
</script>

<svelte:head>
  <title>Home | Sveltekit</title>
  <meta name="description" content="" />
</svelte:head>

<main>
  <h1 class="flex items-center text-green-500">Welcome<Smile /></h1>
  <button on:click={() => signIn('google')}>Sign In</button>
  <Button on:click={() => clicked++}>Clicked {clicked} time{clicked === 1 ? '' : 's'}</Button>
</main>
