<template lang="pug">

table.main-table
    tr
        td(width="100%")
            .header.email-sans
                a.ib(:href="`https://www.reddit.com/r/${this.subreddit.name}`").subreddit r/{{subreddit.name}}
                .ib.weekly {{ frequency }}
                a.ib(href="https://filipwolanski.com/reddit-newsletter").newsletter newsletter
            h3.email-sans {{ currentDate }}
    tr.rule-top
        td(width="100%")
            .email-padding
                hr
    template(v-for="item in posts")
        post( v-bind:post="item", v-bind:key="item.id")
        tr.rule-top(v-if="'comments' in item")
            td(width="100%")
                .email-padding
                    hr
    tr
        td(width="100%")
            .disclaimer.email-sans
                p
                    | You received this email because you subscribed via the Reddit Newsletter.
                    | You can unsubscribe from this newsletter instantly.
                p
                    | The reddit newsletter is a side project by Filip Wolanski.
                    | Published in Montreal, Canada.
                    | Reddit newsletter is not associated with Reddit in any way.

</template>

<script>
  import moment from 'moment'
  import Post from "./Post.vue";
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: { Post},
    name: 'newsletter',
    data () {
      return {
        "currentDate": moment().format('MMMM Do, YYYY')
      }
    },
    computed: mapState(['posts', 'subreddit', 'frequency'])
  }

</script>

<style lang="sass" scoped>
    @import "../style/colors"

    .main-table
        max-width: 600px
        width: 100%
        background-color: #fff
        border-collapse: collapse
        border-spacing: 0
        border: none
        th, td
            border-spacing: 0
            border: none


    .header
        font-weight: normal
        font-size: 2.25em
        text-align: left
        margin: 0
        padding-top: 0
        padding-bottom: 0
        .subreddit, .newsletter
            color: $primary
            text-decoration: none
            word-wrap: break-word
            word-break: break-all
        .weekly
            color: $dark-1

    h3
        color: $dark-3
        font-weight: normal
        font-size: 0.75em
        text-align: left
        margin: 0
        padding-top: 0.5em
        padding-bottom: 3em
        text-transform: uppercase

    .rule-top > td
        padding-bottom: 2em
        hr
            display: block
            height: 1px
            border: 0
            border-top: 1px solid $border
            margin: 0
            padding: 0

    .disclaimer
        font-size: 0.875em
        color: $dark-3
        text-align: left
        p
            margin: 0 0 1em 0




</style>
