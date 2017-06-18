<template lang="pug">

#app
    .container
        h1.email-sans
            span.reddit reddit
            span.newsletter newsletter
        h2.email-serif Turn any subreddit into a newsletter
        p.email-sans Create your newsletter by specyfying your subreddit, changing your options, etc.

        Options

        .border-container(v-if="previewable")
            .preview-container
                Newsletter

        .footer.email-sans
            .home.ib
                | Copyright &copy; 2017&nbsp;
                a(href="https://filipwolanski.com") Filip Wolanski
            .source.ib
                a(href="https://github.com/fwolanski/reddit-newsletter", target="_blank") view source

</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  import Post from "./newsletter/Post.vue";
  import Newsletter from "./newsletter/Newsletter.vue"
  import Options from "./form/Options.vue"

  export default {
    components: { Newsletter, Options},
    name: 'app',
    computed: {
      ...mapState(['previewable'])
    },
  }

</script>

<style lang="sass" >
    @import "style/index"
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

        .border-container
            border: 1px solid $border

        .preview-container
            margin: 2rem auto
            max-width: 600px

    .footer
        padding-top: 2em
        font-size: 0.875em
        color: $dark-3
        a
            text-decoration: none
            color: $dark-3
        .source
            float: right

</style>