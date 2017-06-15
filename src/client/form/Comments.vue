<template lang="pug">
    .root
        .exp
            .exp-head Do you want to include comments? How many?
            .exp-sub
                | The top comments will be included under each post.

        .option
            .ib.line-height
                input#includeComments(type="checkbox", v-model="include")
                label(for="includeComments")
                    | Include comments
        .option(v-if="include")
            .ib.pad-right
                | Up to
            .ib
                select(v-model="count")
                    option 1
                    option 3
                    option 5
                    option 10
                    option 20
</template>

<script>

  export default {
    name: 'comments',
    data () {
      return {
        "prev": 0
      }
    },
    created () {
      this.prev = this.$store.state.commentCount;
    },
    computed : {
      include : {
        get() {
          return this.$store.state.commentCount > 0
        },
        set(newValue) {
          let count = 0;
          if (newValue) count = this.prev;
          this.$store.commit("updateCommentCount", count);
        }
      },
      count : {
        get() {
          return this.$store.state.commentCount;
        },
        set(newValue) {
          this.prev = parseInt(newValue);
          this.$store.commit("updateCommentCount", parseInt(newValue));
        }
      }

    }
  }

</script>

<style lang="sass" scoped>

    select
        max-width: 4em

    .option
        display: inline-block
        width: 50%
        vertical-align: middle
        height: 2.5em
        .line-height
            line-height: 2.5em


</style>
