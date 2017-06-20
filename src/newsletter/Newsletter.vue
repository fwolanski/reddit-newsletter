<template lang="pug">

table.main-table
    tr
        td(width="100%")
            .header.email-sans
                a.ib(:href="`https://www.reddit.com/r/${this.subreddit.name}`").subreddit r/{{subreddit.name}}
                .ib.weekly {{ frequency }}
                a.ib(href="https://filipwolanski.com/reddit-newsletter").newsletter newsletter
            h3.email-sans(v-if="!subscribe") {{ currentDate }}

    template(v-if="!subscribe")
        tr.rule-top
            td(width="100%")
                .email-padding
                    hr
        template(v-for="(item, index) in posts")
            post( v-bind:post="item", v-bind:key="item.id")
            tr.rule-top(v-if="('comments' in item) || (index + 1 === posts.length)")
                td(width="100%")
                    .email-padding
                        hr

    template(v-if="subscribe")
        tr.rule-top.subscribe
            td(width="100%")
                .email-padding
                    hr
        Subscribe
        tr.rule-top
            td(width="100%")
                .email-padding
                    hr

    tr
        td(width="100%")
            .disclaimer.email-sans
                p(v-if="!subscribe")
                    | You received this email because you subscribed via redditnewsletter.
                    | You can&nbsp;
                    a(:href="removeURL") unsubscribe
                    | &nbsp;from this newsletter instantly.
                p(v-if="subscribe")
                    | If you received this email by mistake, simply delete it. You won't be subscribed if you don't click the confirmation link above.
                p
                    | The reddit newsletter is a side project by Filip Wolanski.
                    | Published in Montreal, Canada.
                    | redditnewsletter is not associated with Reddit in any way.

</template>

<script>
  import moment from 'moment'
  import Post from "./Post.vue";
  import Subscribe from "./Subscribe.vue";
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {Post, Subscribe},
    name: 'newsletter',
    data () {
      return {
        "currentDate": moment().format('MMMM Do, YYYY')
      }
    },
    computed: mapState(['posts', 'subreddit', 'frequency', 'subscribe', 'removeURL'])
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
        font-size: 3em
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
        padding-bottom: 5em
        text-transform: uppercase

    .rule-top.subscribe > td
         padding-top: 2em

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
        a
            color: $primary


</style>
