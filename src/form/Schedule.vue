<template lang="pug">
    .root
        .exp
            .exp-head When would you like to receive the newsletter?
            .exp-sub It will only have posts for the time-frame you listed
        .ib.pad-right(v-if="frequency === 'monthly'")
            | On the
        .ib.pad-right(v-if="frequency === 'monthly'")
            select(v-model="monthly", :disabled="busy")
                option(value="1") 1st
                option(value="2") 2nd
                option(value="3") 3rd
                option(value="4") 4th
                option(value="5") 5th
                option(value="6") 6th
                option(value="7") 7th
                option(value="8") 8th
                option(value="9") 9th
                option(value="10") 10th
                option(value="11") 11th
                option(value="12") 12th
                option(value="13") 13th
                option(value="14") 14th
                option(value="15") 15th
                option(value="16") 16th
                option(value="17") 17th
                option(value="18") 18th
                option(value="19") 19th
                option(value="20") 20th
                option(value="21") 21st
                option(value="22") 22nd
                option(value="23") 23rd
                option(value="24") 24th
                option(value="25") 25th
                option(value="26") 26th
                option(value="27") 27th
                option(value="28") 28th
        .ib.pad-right(v-if="frequency === 'monthly'")
            | day of the month at
        .ib.pad-right(v-if="frequency === 'weekly'")
            | Every
        .ib.pad-right(v-if="frequency === 'weekly'")
            select(v-model="weekly", :disabled="busy")
                option(v-for='week in weekdays', :value="week") {{ week }}
        .ib.pad-right(v-if="frequency === 'weekly'")
            | at
        .ib.pad-right(v-if="frequency === 'daily'")
            | Every day at
        .ib.pad-right
            select(v-model="hour", :disabled="busy")
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
            select(v-model="meridiem", :disabled="busy")
                option AM
                option PM


</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment';

  export default {
    name: 'schedule',
    data () {
      return {
        weekdays: moment.weekdays(true)
      }
    },
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
      ...mapState(['frequency', 'busy' ])
    }
  }

</script>

<style lang="sass" scoped>
    select
        font-size: 1em



</style>
