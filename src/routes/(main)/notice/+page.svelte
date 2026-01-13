<script lang="ts">
  import * as Item from '$lib/components/ui/item';
  import { Badge } from '$lib/components/ui/badge';
  import { ChevronRightIcon } from '@lucide/svelte';

  const { data } = $props();
</script>

<div class="container mx-auto py-8">
  <h1 class="text-2xl font-bold mb-8">공고</h1>
  
  {#each data.articles as article}
      <Item.Root variant="outline">
        {#snippet child({ props })}
          <a href="/notice/{article.slug}" {...props}>
            <Item.Content>
              <Item.Title>{article.metadata.title}</Item.Title>
              <Item.Description>{article.metadata.date.toString()}</Item.Description>
            </Item.Content>
            <Item.Actions>
              <ChevronRightIcon class="size-4" />
            </Item.Actions>
          </a>
        {/snippet}
      </Item.Root>
    {/each}
</div>