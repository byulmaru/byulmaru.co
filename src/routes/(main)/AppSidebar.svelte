<script lang="ts">
  import {
    ChevronDownIcon,
    MegaphoneIcon,
    UserIcon,
  } from '@lucide/svelte';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import * as Sidebar from '$lib/components/ui/sidebar';
  import NavAccount from './NavAccount.svelte';
  import * as Collapsible from '$lib/components/ui/collapsible';

  type Props = {
    account:
      | {
          name: string;
          primaryEmail: string;
        }
      | undefined;
  };

  const { account }: Props = $props();
  const isActive = (href: string) => page.url.pathname === href;
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href={resolve('/')} {...props}>
              <span class="font-bold">별마루동인협동조합(가칭)</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href={resolve('/')} {...props}>
              <MegaphoneIcon />
              <span>공고</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
    {#if account}
      <Sidebar.Menu>
        <Collapsible.Root open class="group/collapsible">
          <Sidebar.MenuItem>
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton {...props}>
                  <UserIcon />
                  <span class="flex-1">계정</span>
                  <ChevronDownIcon
                    class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </Sidebar.MenuButton>
              {/snippet}
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Sidebar.MenuSub>
                <Sidebar.MenuSubItem>
                  <Sidebar.MenuSubButton>
                    {#snippet child({ props })}
                      <a href={resolve('/(main)/account')} {...props}>
                        <span>일반</span>
                      </a>
                    {/snippet}
                  </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
                <Sidebar.MenuSubItem>
                  <Sidebar.MenuSubButton>
                    {#snippet child({ props })}
                      <a href={resolve('/(main)/account/email')} {...props}>
                        <span>이메일</span>
                      </a>
                    {/snippet}
                  </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
                <Sidebar.MenuSubItem>
                  <Sidebar.MenuSubButton>
                    {#snippet child({ props })}
                      <a href={resolve('/(main)/account/passkey')} {...props}>
                        <span>패스키</span>
                      </a>
                    {/snippet}
                  </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
                <Sidebar.MenuSubItem>
                  <Sidebar.MenuSubButton>
                    {#snippet child({ props })}
                      <a href={resolve('/(main)/account/discord')} {...props}>
                        <span>디스코드</span>
                      </a>
                    {/snippet}
                  </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
              </Sidebar.MenuSub>
            </Collapsible.Content>
          </Sidebar.MenuItem>
        </Collapsible.Root>
      </Sidebar.Menu>
    {/if}
  </Sidebar.Content>
  <Sidebar.Footer>
    {#if account}
      <NavAccount {account} />
    {:else}
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            {#snippet child({ props })}
              <a href={resolve('/auth')} {...props}>
                <span>로그인</span>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    {/if}
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
