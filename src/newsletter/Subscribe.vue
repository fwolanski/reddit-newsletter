<template lang="pug">

    tr.root
        td(width="100%", valign="")
            p Yup, I'd like to receive the {{ posts }} every {{ freq }}.
            a(:href="confirmURL") SIGN ME UP!

</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { ordinalSuffix } from '../util'

  export default {
    name: 'subscribe',
    computed: {
      posts () {
        let count = parseInt(this.$store.state.postCount);
        switch (count) {
          case 1:
            return "top post";
          default:
            return `top ${count} posts`
        }
      },
      freq () {
        let state = this.$store.state;
        let freq = state.frequency;
        let time = `${state.time.hour}${state.time.meridiem}`;
        let monthday = ordinalSuffix(state.monthly);
        switch (freq) {
          case "daily":
            return `day at ${time}`;
          case "weekly":
            return `${state.weekly} at ${time}`;
          case "monthly":
            return `${monthday} of the month at ${time}`;
        }
      },
      ...mapState(['frequency', 'commentCount', 'postCount', 'confirmURL'])
    },
  }

</script>

<style lang="sass" scoped>
    @import "../style/colors"

    .root > td
        padding-bottom: 2em

    p
        color: $dark-2
        font-weight: normal
        font-size: 1em

    a
        display: block
        padding: 1em
        cursor: pointer
        user-select: none
        font-weight: normal
        text-decoration: none
        background-color: $primary
        color: #fff
        border-radius: 4px
        letter-spacing: 0.1em
        text-transform: uppercase
        font-size: 0.875em
        transition: background-color 0.2s ease-out
        touch-action: manipulation
        border: 1px solid $primary
        width: 8em
        text-align: center
        margin-top: 2em




</style>
