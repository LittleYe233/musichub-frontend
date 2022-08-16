<script lang="ts">
  import BackendAPI from '$lib/api/backend';
  import { projectConfig } from '$lib/config';
  import type { SongPiece } from '$types/config';
  import Playlist from '$cmps/Playlist.svelte';
  import Player from '$cmps/player/Player.svelte';

  const backendConfig = projectConfig;
  const backendAPI = new BackendAPI(backendConfig);

  let getSongListPromise = async (): Promise<Required<SongPiece>[]> => {
    const ret = await backendAPI.getSongs();

    if (Array.isArray(ret)) {
      ret.forEach((_, i, a) => {
        a[i].id = i + 1;
      });
      songList = backendAPI.parseSongs(ret) as Required<SongPiece>[];
      return Promise.resolve(songList);
    } else {
      return Promise.reject(ret); // It may have no effect.
    }
  };

  let songListPromise = getSongListPromise();
  let songList: Required<SongPiece>[] = [];

  let pagination = {
    pageSize: 20,
    page: 1,
  };
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
      <Playlist {pagination} {songList} />
    {/await}
  </div>
  <div id="// TODO" style="height: 100px;" />
  {#await songListPromise then _}
    <Player {songList} mode="fixed" />
  {/await}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
