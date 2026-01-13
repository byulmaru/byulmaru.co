<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import {Separator} from '$lib/components/ui/separator';
  import { ArrowLeftIcon, CalendarIcon } from '@lucide/svelte';

  const { data } = $props();
  const { article } = data;

  const ArticleContent = article.component;
</script>

<div class="container mx-auto py-8">
  <!-- 뒤로가기 버튼 -->
  <div class="mb-6">
    <Button variant="ghost" href="/notice" class="gap-2">
      <ArrowLeftIcon class="w-4 h-4" />
      목록으로
    </Button>
  </div>

  <!-- 헤더 -->
  <div class="mb-8">
    <div class="flex items-start justify-between gap-4 mb-4">
      <h1 class="text-3xl font-bold">{article.metadata.title}</h1>
    </div>
    
    {#if article.metadata.subtitle}
      <p class="text-lg text-muted-foreground mb-4">{article.metadata.subtitle}</p>
    {/if}
    
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <CalendarIcon class="w-4 h-4" />
      <time>{article.metadata.date.toString()}</time>
    </div>
  </div>

  <Separator />

  <!-- 본문 -->
  <div class="prose prose-slate max-w-none">
    <ArticleContent />
  </div>
</div>