<script lang="ts">
  import FixedPlayer from './fixed.svelte';
  import FullPlayer from './full.svelte';
  import type { SongPiece } from '~/types/config';

  export let songList: Required<SongPiece>[];
  export let defaultPlaylistKey: string = '_default';
  export let mode: 'fixed' | 'full' = 'fixed';
</script>

{#if mode === 'fixed'}
  <FixedPlayer {songList} {defaultPlaylistKey} />
{:else if mode === 'full'}
  <FullPlayer {songList} {defaultPlaylistKey} />
{/if}
