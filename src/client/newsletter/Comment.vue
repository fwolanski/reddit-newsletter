<template lang="pug">
.comment.email-sans
  .comment-body.email-sans(v-html='bodyHTML')
  .author
    | —&nbsp;
    a(:href="`https://www.reddit.com/user/${comment.author}/`", target="_blank") {{ comment.author }}
</template>

<script>
  import { toHtml } from "../util.js"

  export default {
    name: 'comment',
    props: ['comment'],
    computed: {
      bodyHTML () {
        return toHtml(this.comment.body_html);
      },
    },
  }
</script>

<style lang="sass" scoped>

.comment
    text-align: left
    font-size: 0.875em
    line-height: 1.45
    margin: 0 0 20px 0
    color: #555
    .comment-body
        margin: 0

    .author
        padding: 0 0 0 1em
        margin: 0
        font-size: 0.75em
        font-style: italic
        text-align: left
        color: #888
        a
            text-decoration: none
            color: #888

</style>
