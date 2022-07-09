<script lang="ts">
  // import 'normalize.css'
  import './tailwind.css'
  import "carbon-components-svelte/css/all.css";
  import {
      DataTable,
      Toolbar,
      ToolbarSearch,
      Button,
      Pagination
  } from "carbon-components-svelte";
  import {
      TrashCan,
      Play
  } from "carbon-icons-svelte";

  let dummyList = Array.from({ length: 50 }).map((_, i) => ({
      id: i+1,
      name: 'Lorem Ipsum Super Hyper Mega Long Long Song Name!!!!!!!!!!!!!!!!!!!!!',
      artist: 'Rick Astley',
      album: 'littleye',
  }));
  let pagination = {
      pageSize: 20,
      page: 1,
  }
</script>

<svelte:head>
  <title>Home | MusicHub hosted by // TODO</title>
</svelte:head>

<main>
  <h1 class="
    py-8
    text-center
    text-4xl
    font-bold">
    MusicHub Homepage
  </h1>
  <div class="
      flex
      justify-center
      content-center
      flex-col
      max-w-4xl
      px-8
      mx-auto">
    <DataTable
      sortable
      zebra
      title="Playlist"
      headers={[
        { key: 'id', value: '#'},
        { key: 'name', value: 'Name'},
        { key: 'artist', value: 'Artist'},
        { key: 'album', value: 'Album'},
        { key: 'operations', value: 'Operations'},
      ]}
      rows={dummyList}
      pageSize="{pagination.pageSize}"
      page={pagination.page}>
      <svelte:fragment slot="cell" let:row let:cell>
        {#if cell.key === 'operations'}
          <div class="flex">
            <Button
              iconDescription="Play"
              icon={Play}/>
            <Button
              kind="secondary"
              iconDescription="Remove"
              icon={TrashCan}/>
          </div>
        {:else}
          {cell.value}
        {/if}
      </svelte:fragment>
      <Toolbar>
        <ToolbarSearch persistent value="" shouldFilterRows />
        <Button>// TODO</Button>
      </Toolbar>
    </DataTable>
    <Pagination
      bind:pageSize={pagination.pageSize}
      bind:page={pagination.page}
      totalItems={dummyList.length}
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
