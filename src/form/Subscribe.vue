<template lang="pug">
    .root
        .exp
            .exp-head Like the preview below? Subscribe.
            .exp-sub You'll receive an email confirming your subscription.
        .inp-display
            .input-container
                input(type="text", :disabled="busy", v-model="email", @keyup="onKeyup", :class="{ierror: !valid}")
                .error(v-bind:class="{hidden: valid && !serverError}")
                    span(v-if="!empty && !valid") Oops! This doesn't look like an email.
                    span(v-if="empty && !valid") You need to enter your email.
                    span(v-if="serverError") A server error occured. Please try again later.
            .button-container
                button(@click="subscribe", :disabled="busy")
                    span(:class="{hidden : downloading}") Subscribe
            .spinner-container(v-if="downloading")
                .spinner
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
        "empty": false,
        "serverError": false,
        "downloading": false,
      }
    },
    computed: mapState(['busy']),
    methods: {
      subscribe() {
        this.serverError = false;
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
        this.downloading = true;

        this.$store.dispatch('subscribe', this.email).then( () => {
          this.downloading = false;

        }).catch( err => {
          console.error(err);
          this.serverError = true;
          this.downloading = false;
          this.$store.commit('updateBusy', false);
        });

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
            padding-left: 2em
            vertical-align: top

        @media screen and (max-width: $break-narrow)
            flex-flow: row wrap

            .button-container
                padding-left: 0em
                padding-top: 1em


    input
        font-size: 1em
        padding-left: 1.125em

        &.ierror
            border: 1px solid $error

    button
        width: 10em
        .hidden
            visibility: hidden

    .error
        font-size: 0.75em
        color: $error
        padding-top: 0.25em
        transition: opacity 0.2s ease-out
        height: 1em

        &.hidden
            opacity: 0


    .spinner-container
        position: relative
        height: 0
        width: 0
        left: -3.5em
        top: 1.2em

    @keyframes spinner
        to
            transform: rotate(360deg)
    .spinner:before
        content: ''
        box-sizing: border-box
        position: absolute
        top: 50%
        left: 50%
        width: 20px
        height: 20px
        margin-top: -10px
        margin-left: -10px
        border-radius: 50%
        border-top: 2px solid #fff
        border-right: 2px solid transparent
        animation: spinner .6s linear infinite


</style>
