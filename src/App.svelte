<script lang="ts">
  import '~/tailwind.css';
  import BackendAPI from '$lib/api/backend';
  import parseConfig from '$lib/config';
  import musichubConfig from '../musichub.config';
  import type { SongPiece } from '$types/config';
  import APlayer from 'aplayer-remake';
  import 'aplayer-remake/dist/APlayer.min.css';
  import Playlist from '$cmps/Playlist.svelte';

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
        audio: songList,
      });
      return Promise.resolve(ret as Required<SongPiece>[]);
    } else {
      return Promise.reject(ret);
    }
  }

  let songListPromise = getSongsPromise();
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
  <div id="aplayer" />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
