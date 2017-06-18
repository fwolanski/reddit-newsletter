<template lang="pug">
    .root
        .sub r/
        .spinner-container(v-if="subreddit.downloading")
            .spinner
        input(type="text", v-model="sub", :disabled="busy", @blur="blur", @keyup.enter="onEnter", :class="{ierror: !subreddit.valid}")
        .error(v-bind:class="{hidden: subreddit.valid}")
            | Oops! Couldn't find this subreddit
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'subreddit',
    data () {
      return{
        "sub": "",
      }
    },
    computed: mapState([ 'subreddit', 'busy']),
    created () {
      this.sub = this.subreddit.name
    },
    methods: {
      blur () {
        this.$store.commit('updateSubreddit', this.sub)
      },
      onEnter(event) {
        event.target.blur();
      }
    }
  }

</script>

<style lang="sass" scoped>
    @import "../style/colors"

    .sub
        position: relative
        height: 0
        width: 0
        font-size: 1em
        top: calc(0.5em + 1px)
        left: 0.5em
        color: $dark-3


    input
        font-size: 1em
        padding-left: 1.125em

        &.ierror
            border: 1px solid $error


    .error
        font-size: 0.75em
        color: $error
        padding-top: 0.25em
        transition: opacity 0.2s ease-out

    .hidden
        opacity: 0

    .spinner-container
        position: relative
        height: 0
        width: 0
        left: calc(100% - 1em)
        top: calc(1em + 1px)

    @keyframes spinner
        to
            transform: rotate(360deg)
    .spinner:before
        content: ''
        box-sizing: border-box
        position: absolute
        top: 50%
        left: 50%
        width: 20px
        height: 20px
        margin-top: -10px
        margin-left: -10px
        border-radius: 50%
        border-top: 2px solid $primary
        border-right: 2px solid transparent
        animation: spinner .6s linear infinite


</style>