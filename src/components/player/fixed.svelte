<script lang="ts">
  import '~/tailwind.css';
  import * as Amplitude from 'amplitudejs';
  import type { SongPiece } from '~/types/config';
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faCirclePlay,
    faCirclePause,
    faArrowLeft,
    faArrowRight,
    faVolumeHigh,
    faShuffle,
    faRepeat,
  } from '@fortawesome/free-solid-svg-icons/index.es';

  export let songList: Required<SongPiece>[];
  export let defaultPlaylistKey: string = '_default';

  // We should set up playlists in this way because the key of its default value is dynamic.
  const playlists = {};
  playlists[defaultPlaylistKey] = {
    songs: Array.from(Array(songList.length).keys()), // generate 0..N
    title: 'Default Playlist',
  };

  let spnAmplitudePlayPause: HTMLSpanElement;
  let spnAmplitudeRepeat: HTMLSpanElement;
  let spnAmplitudeShuffle: HTMLSpanElement;

  let isPlaying: boolean;
  let isRepeatOn: boolean;
  let isShuffleOn: boolean;

  onMount(async () => {
    Amplitude.init({
      songs: songList,
      playlists: playlists,
    });
    console.log(songList);
    console.log(Amplitude.getConfig());

    // set value of the volume slider to 100 (max) manually
    (document.getElementById('mhfx-volume-slider') as any).value = '100';

    // bind elements
    spnAmplitudePlayPause = document.getElementById('spnAmplitudePlayPause');
    spnAmplitudeRepeat = document.getElementById('spnAmplitudeRepeat');
    spnAmplitudeShuffle = document.getElementById('spnAmplitudeShuffle');
  });
</script>

<!-- mhfx: MusicHub fixed player -->
<div class="mhfx-container fixed z-50 inset-x-0 bottom-0 m-0 overflow-visible bg-[#212121]">
  <div class="bar flex flex-col w-[100vw] bottom-0 left-0 h-[72px]">
    <!-- song navigation slider -->
    <input type="range" class="amplitude-song-slider w-full h-[2.5px]" data-amplitude-playlist={defaultPlaylistKey} step="any" />

    <!-- main controls -->
    <div class="controls grid grid-cols-[0fr_1fr_0fr] h-full">
      <!-- left controls -->
      <div class="left-controls w-[292px] flex items-center">
        <div class="left-controls-buttons flex flex-none items-center">
          <div class="prev-button mx-4">
            <span class="amplitude-prev" data-amplitude-playlist={defaultPlaylistKey}>
              <Fa icon={faArrowLeft} color="white" size="2x" scale={0.7} />
            </span>
          </div>
          <div class="play-pause-button mx-4">
            <span class="amplitude-play-pause" id="spnAmplitudePlayPause" data-amplitude-playlist={defaultPlaylistKey} on:click={(_) => (isPlaying = spnAmplitudePlayPause !== undefined && spnAmplitudePlayPause.classList.contains('amplitude-paused'))}>
              <Fa icon={isPlaying ? faCirclePause : faCirclePlay} color="white" size="2x" />
            </span>
          </div>
          <div class="next-button mx-4">
            <span class="amplitude-next" data-amplitude-playlist={defaultPlaylistKey}>
              <Fa icon={faArrowRight} color="white" size="2x" scale={0.7} />
            </span>
          </div>
        </div>

        <!-- Example of text content: "00:00 / 00:00". -->
        <span class="time-info mx-4 text-[12px] text-[#909090]">
          <span class="amplitude-current-time" data-amplitude-playlist={defaultPlaylistKey} />
          <span class="whitespace-nowrap"> / </span>
          <span class="amplitude-duration-time" data-amplitude-playlist={defaultPlaylistKey} />
        </span>
      </div>

      <!-- middle controls -->
      <div class="middle-controls flex items-center justify-center overflow-hidden">
        <div class="thumbnail-image-wrapper h-[40px] relative">
          <img
            class="cover h-[40px] overflow-hidden flex-none"
            alt="cover_image"
            data-amplitude-song-info="cover_art_url"
            data-amplitude-playlist={defaultPlaylistKey}
          />
        </div>
        <div class="content-info-wrapper flex flex-col overflow-hidden ml-16 mr-8 text-[1em] leading-[19.2px]">
          <span class="title font-medium text-white" data-amplitude-song-info="name" data-amplitude-playlist={defaultPlaylistKey} />
          <span class="subtitle font-normal text-[#909090] flex flex-row">
            <span
              class="artist mr-[-0.1em] pr-[0.1em] whitespace-pre"
              data-amplitude-song-info="artist"
              data-amplitude-playlist={defaultPlaylistKey}
            />
            <span class="whitespace-pre">&nbsp;•&nbsp;</span>
            <span
              class="album mr-[-0.1em] pr-[0.1em] whitespace-pre"
              data-amplitude-song-info="album"
              data-amplitude-playlist={defaultPlaylistKey}
            />
          </span>
        </div>
        <!-- <div class="middle-controls-buttons flex flex-none items-center"></div> -->
      </div>

      <!-- right controls -->
      <div class="right-controls w-[292px] flex items-center">
        <input
          type="range"
          class="amplitude-volume-slider w-[68px] h-[2px] mx-[16px]"
          id="mhfx-volume-slider"
          max="100"
          min="0"
          step="any"
        />
        <span class="pr-4">
          <Fa icon={faVolumeHigh} color="#909090" size="2x" scale={0.7} />
        </span>
        <span
          class="amplitude-repeat pr-4"
          id="spnAmplitudeRepeat"
          data-amplitude-playlist={defaultPlaylistKey}
          on:click={(_) => (isRepeatOn = spnAmplitudeRepeat !== undefined && spnAmplitudeRepeat.classList.contains('amplitude-repeat-off'))}
        >
          <Fa icon={faRepeat} color={isRepeatOn ? 'white' : '#909090'} size="2x" scale={0.7} />
        </span>
        <span class="amplitude-shuffle pr-4" id="spnAmplitudeShuffle" data-amplitude-playlist={defaultPlaylistKey} on:click={(_) => (isShuffleOn = spnAmplitudeShuffle !== undefined && spnAmplitudeShuffle.classList.contains('amplitude-shuffle-off'))}>
          <Fa icon={faShuffle} color={isShuffleOn ? 'white' : '#909090'} size="2x" scale={0.7} />
        </span>
      </div>
    </div>
  </div>
</div>
