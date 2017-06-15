<template lang="pug">
    .root
        .exp
            .exp-head When would you like to receive the newsletter?
            .exp-sub It will only have posts for the time-frame you listed
            .ib.pad-right(v-if="frequency === 'monthly'")
                | On the
            .ib.pad-right(v-if="frequency === 'monthly'")
                select(v-model="monthly")
                    option 1st
                    option 2nd
                    option 3rd
                    option 4th
                    option 5th
                    option 6th
                    option 7th
                    option 8th
                    option 9th
                    option 11th
                    option 12th
                    option 13th
                    option 14th
                    option 15th
                    option 16th
                    option 17th
                    option 18th
                    option 19th
                    option 20th
                    option 21st
                    option 22nd
                    option 23rd
                    option 24th
                    option 25th
                    option 26th
                    option 27th
                    option 28th
                    option last
            .ib.pad-right(v-if="frequency === 'monthly'")
                | day of the month at
            .ib.pad-right(v-if="frequency === 'weekly'")
                | Every
            .ib.pad-right(v-if="frequency === 'weekly'")
                select(v-model="weekly")
                    option Monday
                    option Tuesday
                    option Wednesday
                    option Thursday
                    option Friday
                    option Saturday
                    option Sunday
            .ib.pad-right(v-if="frequency === 'weekly'")
                | at
            .ib.pad-right(v-if="frequency === 'daily'")
                | Every day at
            .ib.pad-right
                select(v-model="hour")
                    option 1
                    option 2
                    option 3
                    option 4
                    option 5
                    option 6
                    option 7
                    option 8
                    option 9
                    option 10
                    option 11
                    option 12
            .ib
                select(v-model="meridiem")
                    option AM
                    option PM


</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'schedule',
    computed: {
      hour: {
        get () { return this.$store.state.time.hour; },
        set (newValue) {
          let time = this.$store.state.time;
          time.hour = parseInt(newValue);
          this.$store.commit('updateTime', time);
        }
      },
      meridiem: {
        get () { return this.$store.state.time.meridiem; },
        set (newValue) {
          let time = this.$store.state.time;
          time.meridiem = newValue;
          this.$store.commit('updateTime', time);
        }
      },
      monthly: {
        get () { return this.$store.state.monthly; },
        set (newValue) { this.$store.commit('updateMonthly', newValue); }
      },
      weekly: {
        get () { return this.$store.state.weekly; },
        set (newValue) { this.$store.commit('updateWeekly', newValue); }
      },
      ...mapState({
        frequency: 'frequency'
      })
    }
  }

</script>

<style lang="sass" scoped>
    select
        font-size: 1em



</style>
