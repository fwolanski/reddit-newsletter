<template lang="pug">
    .root
        .exp
            .exp-head Like the preview below? Subscribe.
            .exp-sub You'll receive an email confirming your subscription.
        .inp-display
            .input-container.ib
                input(type="text", :disabled="busy", v-model="email", @keyup="onKeyup", :class="{ierror: !valid}")
                .error(v-bind:class="{hidden: valid}")
                    span(v-if="!empty") Oops! This doesn't look like an email.
                    span(v-if="empty") You need to enter your email.
            .button-container.ib
                button(@click="subscribe", :disabled="busy") Subscribe
</template>

<script>
  import { mapState } from 'vuex'

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  export default {
    name: 'subscribe',
    data () {
      return{
        "email": "",
        "valid": true,
        "empty": false
      }
    },
    computed: mapState(['busy']),
    methods: {
      subscribe() {
        if (this.email === "") {
          this.valid = false;
          this.empty = true;
          return;
        } else if (!validateEmail(this.email)) {
          this.valid = false;
          this.empty = false;
          return;
        }

        this.valid = true;
        this.empty = false;
        this.$store.dispatch('subscribe', this.email);

      },
      onKeyup(event) {
        if (event.which === 13) {
          event.target.blur();
          this.subscribe();
        } else {
          this.valid = true;
        }
      },
    }
  }

</script>

<style lang="sass" scoped>
    @import "../style/colors"

    .inp-display
        display: flex
        flex-flow: row nowrap

        .input-container
            flex: 1 100%

        .button-container
            /*flex: 1 */
            padding-left: 2em
            vertical-align: top

    input
        font-size: 1em
        padding-left: 1.125em

        &.ierror
            border: 1px solid $error

    button
        font-size: 0.68em

    .error
        font-size: 0.75em
        color: $error
        padding-top: 0.25em
        transition: opacity 0.2s ease-out

        &.hidden
            opacity: 0


</style>
