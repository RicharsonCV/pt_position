<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi-account"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    :rules="passwordRules"
                    name="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="login"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    loading: false,
    valid: true,
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [(v) => !!v || 'Password is required'],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },

    async login() {
      this.loading = true
      if (this.$refs.form.validate()) {
        await this.$auth
          .loginWith('api', {
            data: { email: this.email, password: this.password },
          })
          .then(() => {
            this.$router.push({ path: 'home' })
          })
          .finally(() => {
            this.loading = false
          })
      }
      this.loading = false
    },
  },
}
</script>
