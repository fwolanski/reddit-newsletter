<template lang="pug">
    tr.post-item
        td(width="100%")
            .image-post(v-if='!post.is_self', width="100%")
                h2(:class="{noComments : !hasComments}").email-sans
                    a(:href="post.url", target='_blank' v-html="titleHTML")
                h3.email-sans
                    | submitted by&nbsp;
                    a(:href="`https://www.reddit.com/user/${post.author}/`", target="_blank") {{ post.author }}
                    | &nbsp;on {{formattedDate}} via {{ link }}
                .imageContainer(v-if="hasImage")
                    a(:href='post.url', target="_blank")
                        img(:src='post.thumbnail', :width='post.thumbnail_width', :height='post.thumbnail_height', border='0')

            .self-post(v-if='post.is_self')
                h2(:class="{noComments : !hasComments}").email-sans
                    a(:href="'https://www.reddit.com' + post.permalink", target='_blank' v-html="titleHTML")
                h3.email-sans
                    | submitted by&nbsp;
                    a(:href="`https://www.reddit.com/user/${post.author}/`", target="_blank") {{ post.author }}
                    | &nbsp;on {{formattedDate}}

                .text.email-sans(v-html='selfHTML')

            .comment-container.email-padding(v-if='showComments')
                .top-comments.email-sans TOP COMMENTS
                comment(v-for='item in post.comments', v-bind:comment='item', v-bind:key='item.id')
            table.post-footer.email-sans(width="100%")
                tr
                    td(valign="middle", v-if="hasComments").score
                        | {{ post.num_comments }} comments
                    td(valign="middle", :class="{noComments : !hasComments}").full-post
                        a(:href="'https://www.reddit.com' + post.permalink" target="_blank") FULL THREAD
</template>

<script>
  import moment from 'moment'
  import Comment from './Comment.vue'
  import { toHtml } from "../util.js"

  export default {
    name: 'post',
    props: ['post'],
    components: {Comment},
    data () {
      return { comments: []}
    },
    computed: {
      titleHTML() {
        return toHtml(this.post.title);
      },
      selfHTML () {
        return toHtml(this.post.selftext_html);
      },
      formattedDate () {
        if (!this.post.created) return "";
        return moment(new Date(this.post.created * 1000))
                .format("MMMM Do, YYYY");
      },
      link() {
        if (!this.post.url) return "";
        if (this.post.is_self) return `self.${this.post.subreddit}`
        let urlParts = this.post.url.replace('http://','').replace('https://','').split(/[/?#]/);
        return urlParts[0];
      },
      hasComments() {
        return this.$store.state.commentCount > 0
      },
      showComments() {
        return 'comments' in this.post && this.post.comments.length > 0
      },
      hasImage() {
        return this.post.thumbnail !== "default"
          && this.post.thumbnail !== "nsfw"
          && 'thumbnail_width' in this.post
          && 'thumbnail_height' in this.post
      }
    },
  }
</script>

<style lang="sass" scoped>

    @import "../style/colors"

    tr.post-item > td
      padding-bottom: 2em

    h2
        margin: 0
        padding-top: 0
        padding-bottom: 3px
        text-align: left
        font-size: 2em
        font-weight: bold
        font-style: normal
        a
            color: $dark-1
            text-decoration: none

    h3
        text-align: left
        font-size: 0.875em
        color: $dark-3
        margin: 0
        padding-top: 0
        padding-bottom: 10px
        a
            color: $dark-3
            text-decoration: none

    .image-post
        .imageContainer
            padding-left: 0
            padding-bottom: 1em
            img
                float: none

    .self-post
        .text
            padding-bottom: 0.5em
            text-align: left
            font-size: 1em
            line-height: 1.15
            margin: 0
            color: $dark-1

    .vertical-padding
        padding-top: 10px
        padding-bottom: 10px

    .comment-container
        background-color: $bk
        border-top: 1px solid $border
        padding-bottom: 0.5em
        .top-comments
            font-size: 0.6em
            color: $dark-3
            text-align: left
            padding-top: 0.5em
            padding-bottom: 1.5em

    .post-footer
        font-size: 0.6em
        color: $dark-3
        text-align: left
        a
            text-decoration: none
            color: $primary
        .score
            text-align: left
        .full-post
            text-align: right
            &.noComments
                text-align: left

</style>
