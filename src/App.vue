<template lang="pug">
    #app
        .container
            h1.email-sans
                span.reddit reddit
                span.newsletter newsletter
            h2.email-serif Turn any subreddit into a newsletter

            p.email-sans(v-if="!subscribe")
                | You can create a newslettter from any subreddit. Just type it below,
                | set your preferences, checkout your preview, and subscribe!

            .messages(v-if="subscribe")
                template(v-if="confirm")
                    p.email-sans
                        | Awesome! You've activated your subscription. You'll get your
                        | next newsletter at the appointed time.
                    button(@click="another") Create another subscription
                template(v-else-if="remove")
                    p.email-sans
                        | Ok, we've cancelled your subscription. If you signed up to any
                        | other newsletters, you'll still continue receiving them.
                template(v-else="")
                    p.email-sans
                        | You should receive an email at {{ email }} in the next few minutes.
                        | You must click the link in your email to activate your
                        | subscription to the&nbsp;
                        span.reddit r/{{subreddit.name}}
                        span {{frequency}}
                        span.reddit newsletter.
                    button(@click="another") Create another subscription

            Options(v-if="!subscribe")

            .border-container(v-if="previewable && !subscribe")
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
      ...mapState(['previewable', 'subscribe', 'email',
        'frequency', 'subreddit', 'renderEmailOnly',
        'confirm', 'remove'])
    },
    methods: {
      another () {
        this.$store.commit('resetToAnother');
      }
    }
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
    h2
        text-align: left
        font-weight: normal
        font-style: italic
        font-size: 1.1em
        line-height: 1.3em
        margin: 0
        padding: 0 0 1rem 0
        color: $dark-1

    .reddit
        color: $primary


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
            @media screen and (max-width: $break-wide)
                margin: 2rem 1rem

        .another
            margin-top: 2em
            margin-bottom: 2em
            button
                margin-top: 1em


    .footer
        padding-top: 2em
        font-size: 0.875em
        color: $dark-3
        a
            text-decoration: none
            color: $dark-3
        .source
            float: right
            @media screen and (max-width: $break-narrow)
               float: none

</style>