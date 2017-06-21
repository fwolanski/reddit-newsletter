<template lang="pug">
    .root
        .exp
            .exp-head When would you like to receive the newsletter?
            .exp-sub It should arrive within a few mintues of the time you select.
        template(v-if="frequency === 'monthly'")
            .ib.pad-right
                | On the
            .ib.pad-right
                select(v-model="monthly", :disabled="busy")
                    option(v-for='(day, idx) in monthDays', :value="idx + 1") {{ day }}
            .ib.pad-right
                | of the month
            .mobile-break
            .ib.pad-right
                | at
        template(v-if="frequency === 'weekly'")
            .ib.pad-right
                | Every
            .ib.pad-right
                select(v-model="weekly", :disabled="busy")
                    option(v-for='week in weekdays', :value="week") {{ week }}
            .mobile-break
            .ib.pad-right
                | At
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
  import { ordinalSuffix } from '../util'

  export default {
    name: 'schedule',
    data () {
      return {
        weekdays: moment.weekdays(true),
      }
    },
    computed: {
      monthDays() {
        let ret = [];
        let i;
        for(i = 1; i < 29; i++) {
          ret.push(ordinalSuffix(i))
        }
        return ret;
      },
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
    @import "../style/colors"

    select
        font-size: 1em


    .mobile-break
        display: none
        height: 1em
        @media screen and (max-width: $break-narrow)
            display: block



</style>
