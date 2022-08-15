<script lang="ts">
  import '~/tailwind.css';
  import 'carbon-components-svelte/css/all.css';
  import {
    Button,
    DataTable,
    Pagination,
    Toolbar,
    ToolbarContent,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarSearch,
  } from 'carbon-components-svelte';
  import { Play, TrashCan, OverflowMenuHorizontal } from 'carbon-icons-svelte';
  import type { SongPiece } from '$types/config';

  export let songList: Required<SongPiece>[];
  export let pagination: { page: number; pageSize: number };

  let selectedRowIds = [];

  function handleRemoveSelected() {
    songList = songList.filter((item) => !selectedRowIds.includes(item.id));
  }
  function handleSelectAll() {
    selectedRowIds = songList.map((item) => item.id);
  }
  function handleRevertSelection() {
    selectedRowIds = songList.filter((item) => !selectedRowIds.includes(item.id)).map((item) => item.id);
  }
  function handleClearSelection() {
    selectedRowIds = [];
  }

  // TODO: Add music player feature.
  function handleItemPlay(id: number) {}

  function handleItemRemove(id: number) {
    songList = songList.filter((item) => item.id != id);
  }
</script>

<DataTable
  bind:selectedRowIds
  headers={[
    { key: 'id', value: '#' },
    { key: 'name', value: 'Name' },
    { key: 'artist', value: 'Artist' },
    { key: 'album', value: 'Album' },
    { key: 'operations', value: 'Operations' },
  ]}
  page={pagination.page}
  pageSize={pagination.pageSize}
  rows={songList}
  selectable
  sortable
  title="Playlist"
  zebra
>
  <svelte:fragment let:cell let:row slot="cell">
    {#if cell.key === 'operations'}
      <div class="flex">
        <Button iconDescription="Play" icon={Play} />
        <Button kind="secondary" iconDescription="Remove" icon={TrashCan} on:click={() => handleItemRemove(row.id)} />
      </div>
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>
  <Toolbar>
    <ToolbarContent>
      <ToolbarSearch persistent shouldFilterRows value="" />
      <ToolbarMenu icon={OverflowMenuHorizontal}>
        <ToolbarMenuItem on:click={handleSelectAll}>Select All</ToolbarMenuItem>
        <ToolbarMenuItem on:click={handleRevertSelection}>Revert Selection</ToolbarMenuItem>
        <ToolbarMenuItem on:click={handleClearSelection}>Clear Selection</ToolbarMenuItem>
      </ToolbarMenu>
      <Button on:click={handleRemoveSelected} size="small">Remove Selected</Button>
      <!-- TODO: Add play feature and more. -->
    </ToolbarContent>
  </Toolbar>
</DataTable>
<Pagination bind:page={pagination.page} bind:pageSize={pagination.pageSize} totalItems={songList.length} />
