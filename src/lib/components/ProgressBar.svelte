<script lang="ts">
  import 'nprogress/nprogress.css'
  import { navigating } from '$app/stores'
  import NProgress from 'nprogress'

  NProgress.configure({
    showSpinner: false,
  })

  $: $navigating ? NProgress.start() : NProgress.done()
</script>
