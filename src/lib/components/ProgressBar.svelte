<script lang="ts">
  import { navigating } from '$app/stores'
  import NProgress from 'nprogress'
  import 'nprogress/nprogress.css'

  NProgress.configure({
    showSpinner: false,
  })

  $: $navigating ? NProgress.start() : NProgress.done()
</script>
