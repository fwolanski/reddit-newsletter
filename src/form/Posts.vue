<template lang="pug">
    .root
        .exp
            .exp-head How many posts would you like to see?
            .exp-sub
                | Please indicate the maximum number of top posts to include in the newsletter.
        select(v-model="posts", :disabled="busy")
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
      ...mapState(['busy'])

    }
  }

</script>

<style lang="sass" scoped>

    select
        max-width: 4em
        font-size: 1em


</style>
