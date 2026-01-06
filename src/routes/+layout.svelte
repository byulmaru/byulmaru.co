<script lang="ts">
  const { children } = $props();
  import '../app.css';
  import 'temporal-polyfill/global';
</script>

{@render children()}
