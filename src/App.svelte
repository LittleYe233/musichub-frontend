<script lang="ts">
  import './tailwind.css';
  import 'carbon-components-svelte/css/all.css';
  import {
    Button,
    DataTable,
    Pagination,
    Toolbar,
    ToolbarContent,
    ToolbarMenu, ToolbarMenuItem,
    ToolbarSearch
  } from 'carbon-components-svelte';
  import { Play, TrashCan, OverflowMenuHorizontal } from 'carbon-icons-svelte';

  // TODO: Replace dummy list with real list.
  let songList = Array.from({ length: 50 })
    .map((_, i) => ({
      id: i + 1,
      name: 'Lorem Ipsum Super Hyper Mega Long Long Song Name!!!!!!!!!!!!!!!!!!!!!',
      artist: 'Rick Astley',
      album: 'littleye',
    }));
  let selectedRowIds = [];
  let pagination = {
    pageSize: 20,
    page: 1,
  };

  const handleRemoveSelected = () => {
    songList = songList.filter(
      (item) => !selectedRowIds.includes(item.id)
    );
  };
  const handleSelectAll = () => {
    selectedRowIds = songList.map((item) => item.id);
  };
  const handleRevertSelection = () => {
    selectedRowIds = songList.filter((item) => !selectedRowIds.includes(item.id))
      .map((item) => item.id);
  };
  const handleClearSelection = () => {
    selectedRowIds = [];
  };

  // TODO: Add music player feature.
  const handleItemPlay = (id) => {

  };

  const handleItemRemove = (id) => {
    songList = songList.filter(
      (item) => item.id != id
    );
  };
</script>

<svelte:head>
  <title>Home | MusicHub hosted by // TODO</title>
</svelte:head>

<main>
  <h1 class="
    py-8
    text-center
    text-4xl
    font-bold"
  >
    MusicHub Homepage
  </h1>
  <div class="
      flex
      justify-center
      content-center
      flex-col
      max-w-4xl
      px-8
      mx-auto"
  >
    <DataTable
      bind:selectedRowIds
      headers={[
        { key: 'id', value: '#'},
        { key: 'name', value: 'Name'},
        { key: 'artist', value: 'Artist'},
        { key: 'album', value: 'Album'},
        { key: 'operations', value: 'Operations'},
      ]}
      page={pagination.page}
      pageSize="{pagination.pageSize}"
      rows={songList}
      selectable
      sortable
      title="Playlist"
      zebra
    >
      <svelte:fragment let:cell let:row slot="cell">
        {#if cell.key === 'operations'}
          <div class="flex">
            <Button
              iconDescription="Play"
              icon={Play}
            />
            <Button
              kind="secondary"
              iconDescription="Remove"
              icon={TrashCan}
              on:click={() => handleItemRemove(row.id)}
            />
          </div>
        {:else}
          {cell.value}
        {/if}
      </svelte:fragment>
      <Toolbar>
        <ToolbarContent>
          <ToolbarSearch persistent shouldFilterRows value=""/>
          <ToolbarMenu icon={OverflowMenuHorizontal}>
            <ToolbarMenuItem on:click={handleSelectAll}>
              Select All
            </ToolbarMenuItem>
            <ToolbarMenuItem on:click={handleRevertSelection}>
              Revert Selection
            </ToolbarMenuItem>
            <ToolbarMenuItem on:click={handleClearSelection}>
              Clear Selection
            </ToolbarMenuItem>
          </ToolbarMenu>
          <Button on:click={handleRemoveSelected} size="small">
            Remove Selected
          </Button>
          <!-- TODO: Add play feature and more. -->
        </ToolbarContent>
      </Toolbar>
    </DataTable>
    <Pagination
      bind:page={pagination.page}
      bind:pageSize={pagination.pageSize}
      totalItems={songList.length}
    />
  </div>
  <div id="// TODO" style="height: 100px;"></div>
  <div id="aplayer"></div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
