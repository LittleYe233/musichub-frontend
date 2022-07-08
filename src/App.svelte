<script lang="ts">
  import 'normalize.css'
  import './tailwind.css'
  import "carbon-components-svelte/css/all.css";
  import {
      DataTable,
      Toolbar,
      ToolbarContent,
      ToolbarSearch,
      ToolbarMenu,
      ToolbarMenuItem,
      Button,
  } from "carbon-components-svelte";

  let dummyList = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      name: 'Lorem Ipsum',
      artist: 'Rick Astley',
      album: 'littleye',
  }));
</script>

<svelte:head>
  <title>Home | MusicHub hosted by // TODO</title>
</svelte:head>

<main>
  <h1 class="py-3 text-center text-4xl font-bold">MusicHub Homepage</h1>
  <div class="relative flex justify-center">
    <DataTable
      sortable
      zebra
      title="Playlist"
      headers={[
        { key: 'id', value: '#'},
        { key: 'name', value: 'Name'},
        { key: 'artist', value: 'Artist'},
        { key: 'album', value: 'Album'},
      ]}
      rows={dummyList}>
      <Toolbar>
        <ToolbarSearch persistent value="" shouldFilterRows />
        <Button>// TODO</Button>
      </Toolbar>
    </DataTable>
  </div>
  <div id="aplayer"></div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
