<template lang="pug">
    .root
        .exp
            .exp-head How often would you like to receive the newsletter?
            .exp-sub It will only have posts for the time-frame you listed.
        .freq-item
            input#monthly(type="radio", v-model="freq", value="monthly")
            label(for="monthly")
                | Monthly
        .freq-item
            input#weekly(type="radio", v-model="freq", value="weekly")
            label(for="weekly")
                | Weekly
        .freq-item
            input#daily(type="radio", v-model="freq", value="daily")
            label(for="daily")
                | Daily


</template>

<script>

  export default {
    name: 'frequency',
    computed: {
      freq: {
        get () {
          return this.$store.state.frequency;
        },
        set (newValue) {
          this.$store.commit('updateFrequency', newValue)
        }
      }
    }
  }

</script>

<style lang="sass" scoped>

    .freq-item
        display: inline-block
        width: 33%

</style>
