<template>
  <video-player
    class="video-player-box"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ready="playerReadied"
  >
  </video-player>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  components: {videoPlayer},
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        width:800,
        height:500,
        sources: [
          {
            type: "video/mp4",
            src:require('../static/china.mp4')
          }
        ],
        poster: "/static/images/author.jpg"

      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    // listen event
    onPlayerPlay() {
     
    },
    onPlayerPause() {
      
    },
    // ...player event

    // or listen state event
    playerStateChanged() {
     
    },

    // player is ready
    playerReadied(player) {
      console.log("the player is readied");
      console.log(player);
      //console.log(window)
    //   const track = player.TextTrack({
    //       id: 'my-spanish-text-track',
    //       kind: 'translation',
    //       label: 'Spanish',
    //       language: 'es',
    //       src:'../static/la-eng.vtt'
    //     })
    //     console.log(track);
    //     player.textTracks().addTrack(track);
    //     // Get the current player's AudioTrackList object.
    //     const textTrackList = player.textTracks()
    //     // Listen to the "change" event.
    //     textTrackList.addEventListener('change', function() {
    //       // Log the currently enabled AudioTrack label.
    //       for (let i = 0; i < textTrackList.length; i++) {
    //         const track = textTrackList[i]
    //         if (track.enabled) {
    //           videojs.log(track.label)
    //           return
    //         }
    //       }
    //     })


    }
  }
};
</script>