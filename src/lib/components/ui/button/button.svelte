<script lang="ts">
  import { buttonVariants, type Events, type Props } from '.'
  import { cn } from '$lib/utils'
  import { Button as ButtonPrimitive } from 'bits-ui'

  type $$Props = Props
  type $$Events = Events

  let className: $$Props['class'] = undefined
  export let variant: $$Props['variant'] = 'default'
  export let size: $$Props['size'] = 'default'
  export let builders: $$Props['builders'] = []
  export { className as class }
</script>

<ButtonPrimitive.Root
  class={cn(buttonVariants({ variant, size, className }))}
  {builders}
  type="button"
  {...$$restProps}
  on:click
  on:keydown
>
  <slot />
</ButtonPrimitive.Root>
