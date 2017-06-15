<template lang="pug">
    .root
        .exp
            .exp-head How many posts would you like to see?
            .exp-sub
                | Please indicate the maximum number of comments or posts.
                | On busy subreddit, we'll easily be able to fill this number, but on less popular ones,
                | this might not be so easy.

        select(v-model="posts")
            option 1
            option 3
            option 5
            option 10
            option 20

</template>

<script>

  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'posts',
    computed: {
      posts: {
        get () { return this.$store.state.postCount; },
        set (newValue) { this.$store.commit('updatePostCount', newValue); }
      },

    }
  }

</script>

<style lang="sass" scoped>

    select
        max-width: 4em


</style>
