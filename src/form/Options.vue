<template lang="pug">

    .options.email-sans
        .option.title
            .text subreddit
        .option.input
            .input
                Subreddit
        .option.rule
        .option.title
            .text posts
        .option.input
            .input
                Posts
        .option.rule
        .option.title
            .text comments
        .option.input
            .input
                Comments
        .option.rule
        .option.title
            .text frequency
        .option.input
            .input
                Frequency
        .option.rule
        .option.title
            .text schedule
        .option.input
            .input
                Schedule
        template(v-if="previewable")
            .option.rule
            .option.title
                .text subscribe
            .option.input
                .input
                    Subscribe


</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import Subreddit from "./Subreddit.vue"
  import Frequency from "./Frequency.vue"
  import Schedule from "./Schedule.vue"
  import Posts from "./Posts.vue"
  import Comments from "./Comments.vue"
  import Subscribe from "./Subscribe.vue"

  export default {
    components: { Subreddit, Frequency, Schedule, Posts, Comments, Subscribe},
    name: 'options',
    computed: {
      ...mapState(['previewable'])
    },
  }

</script>

<style lang="sass" scoped>
    @import "../style/colors"

    .options
        width: 100%
        display: flex
        flex-flow: row wrap
        .title
            flex: 1 25%
            min-height: 4rem
            display: flex
            align-items: center
            .text
                text-transform: uppercase
                color: $dark-3
                font-size: 0.7em

            @media screen and (max-width: $break-wide)
                flex: 1 100%


        .input
            flex: 4 75%
            margin: 1.5rem 0
            @media screen and (max-width: $break-wide)
                flex: 1 100%
                margin: 0 0 1em 0



        .rule
            flex: 4 100%
            height: 1px
            background-color: $border




</style>
