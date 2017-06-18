<template lang="pug">
    .root
        .exp
            .exp-head How often would you like to receive the newsletter?
            .exp-sub It will only have posts for the time-frame you listed.
        .freq-item
            input#monthly(type="radio", v-model="freq", value="monthly", :disabled="busy")
            label(for="monthly")
                | Monthly
        .freq-item
            input#weekly(type="radio", v-model="freq", value="weekly", :disabled="busy")
            label(for="weekly")
                | Weekly
        .freq-item
            input#daily(type="radio", v-model="freq", value="daily", :disabled="busy")
            label(for="daily")
                | Daily


</template>

<script>
  import { mapState } from 'vuex'

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
      },
      ...mapState(['busy'])
    }
  }

</script>

<style lang="sass" scoped>

    .freq-item
        display: inline-block
        width: 33%

</style>
