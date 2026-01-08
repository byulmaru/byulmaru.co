<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card';
  import * as Empty from '$lib/components/ui/empty';
  import * as Item from '$lib/components/ui/item';
  import * as Avatar from '$lib/components/ui/avatar';
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { replaceState } from '$app/navigation';

  const { data } = $props();

  const handleConnectDiscord = () => {
    // TODO: 디스코드 연결 로직 구현
    console.log('디스코드 계정 연결');
  };

  const handleDisconnectDiscord = () => {
    if (confirm('디스코드 계정 연결을 해제하시겠습니까?')) {
      // TODO: 디스코드 연결 해제 로직 구현
      console.log('디스코드 계정 연결 해제');
    }
  };

  onMount(() => {
    if($page.url.search) {
      tick().then(() => replaceState($page.url.pathname, {} as any));
    }
  });
</script>

<div class="flex flex-col gap-6">
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <iconify-icon icon="fa7-brands:discord"></iconify-icon>
        디스코드 계정 연결
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      {#if data.discordAccountData}
        <Item.Root>
          <Item.Media>
            <Avatar.Root class="size-12">
              {#if data.discordAccountData.avatarHash}
              <Avatar.Image src="https://cdn.discordapp.com/avatars/{data.discordAccountData.id}/{data.discordAccountData.avatarHash}.png" alt="@{data.discordAccountData.username}" />
              {/if}
              <Avatar.Fallback>
                <iconify-icon icon="fa7-brands:discord" width="2em" height="2em"></iconify-icon>
              </Avatar.Fallback>
            </Avatar.Root>
          </Item.Media>
          <Item.Content>
            <Item.Title>{data.discordAccountData.username}</Item.Title>
            <Item.Description>연결됨</Item.Description>
          </Item.Content>
          <Item.Actions>
            <form method="POST" action="?/setRole">
              <Button type="submit" variant="secondary">
                역할 재설정
              </Button>
            </form>
            <form method="POST" action="?/revoke">
              <Button type="submit" variant="destructive">
                연결 해제
              </Button>
            </form>
          </Item.Actions>
        </Item.Root>
      {:else}
        <Empty.Root>
          <Empty.Header class="max-w-md">
            <Empty.Media variant="icon">
              <iconify-icon icon="fa7-brands:discord"></iconify-icon>
            </Empty.Media>
            <Empty.Title>디스코드 계정이 연결되지 않았어요</Empty.Title>
            <Empty.Description>
              협동조합 디스코드에서 조합원 권한을 받으려면 디스코드 계정을 연결해주세요.
            </Empty.Description>
          </Empty.Header>
          <Empty.Content>
            <form action="?/authorize" method="POST">
              <Button type="submit">연결하기</Button>
            </form>
          </Empty.Content>
        </Empty.Root>
      {/if}
    </CardContent>
  </Card>
</div>