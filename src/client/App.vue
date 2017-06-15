<template lang="pug">

#app
    .container
        h1.email-sans
            span.reddit reddit
            span.newsletter newsletter
        h2.email-serif Turn any subreddit into a newsletter
        p.email-sans Create your newsletter by specyfying your subreddit, changing your options, etc.

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

        // .button-container
        //    .button.preview.email-sans(v-if="previewable", @click="showPreview") Preview Newsletter
        .border-container(v-if="previewable")
            .preview-container
                Newsletter


</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import Post from "./newsletter/Post.vue";
  import Newsletter from "./newsletter/Newsletter.vue"
  import Subreddit from "./form/Subreddit.vue"
  import Frequency from "./form/Frequency.vue"
  import Schedule from "./form/Schedule.vue"
  import Posts from "./form/Posts.vue"
  import Comments from "./form/Comments.vue"

  export default {
    components: { Newsletter, Subreddit, Frequency, Schedule, Posts, Comments},
    name: 'app',
    computed: {
      ...mapState(['previewable'])
    },
  }

</script>

<style lang="sass" scoped>
    @import "style/colors"

    h1
        margin: 0
        font-size: 2em
        line-height: 1.2em
        font-weight: bold
        text-align: left
        color: $dark-1
        .reddit
            color: $primary
    h2
        text-align: left
        font-weight: normal
        font-style: italic
        font-size: 1.1em
        line-height: 1.3em
        margin: 0
        padding: 0 0 1rem 0
        color: $dark-1


    #app
        margin: 0 auto
        max-width: 756px

    .container
        margin: 20px 2em
        text-align: left
        color: $dark-1

        & > p
            margin: 0

        .button-container
            padding-top: 1em
            text-align: center
            width: 100%

        .border-container
            border: 1px solid $border

        .preview-container
            margin: 2rem auto
            max-width: 600px

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

        .input
            flex: 4 75%
            margin: 1.5rem 0



        .rule
            flex: 4 100%
            height: 1px
            background-color: $border

</style>