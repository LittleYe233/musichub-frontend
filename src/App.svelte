<script lang="ts">
  import './tailwind.css';
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
  import BackendAPI from './lib/api/backend';
  import parseConfig from './lib/config';
  import musichubConfig from '../musichub.config';
  import type { SongPiece } from './types/config';
  import APlayer from 'aplayer-remake';
  import 'aplayer-remake/dist/APlayer.min.css';

  const backendConfig = parseConfig(musichubConfig);
  const backendAPI = new BackendAPI(backendConfig);

  async function getSongsPromise(): Promise<Required<SongPiece>[]> {
    const ret = await backendAPI.getSongs();

    if (Array.isArray(ret)) {
      ret.forEach((_, i, a) => {
        a[i].id = i + 1;
      });
      songList = ret as Required<SongPiece>[];
      const ap = new APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        audio: songList
      });
      return Promise.resolve(ret as Required<SongPiece>[]);
    } else {
      return Promise.reject(ret);
    }
  }

  let songListPromise = getSongsPromise();
  let songList: Required<SongPiece>[] = [];

  let selectedRowIds = [];
  let pagination = {
    pageSize: 20,
    page: 1,
  };

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

<svelte:head>
  <title>Home | MusicHub hosted by // TODO</title>
</svelte:head>

<main>
  <h1
    class="
    py-8
    text-center
    text-4xl
    font-bold"
  >
    MusicHub Homepage
  </h1>
  <div
    class="
      flex
      justify-center
      content-center
      flex-col
      max-w-4xl
      px-8
      mx-auto"
  >
    {#await songListPromise}
      <h1 class="py-8 text-3xl font-bold">Loading...</h1>
    <!-- We should not use `songList` here because it will override the variable defined above. Just use an underscore as a placeholder. -->
    {:then _}
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
    {/await}
  </div>
  <div id="// TODO" style="height: 100px;" />
  <div id="aplayer" />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
