<template>
  <v-card
    elevation="2"
    :loading="loading"
    :disabled="disabled"
    outlined
    shaped
    tile
  >
    <v-card-text>
      <v-alert v-if="error" dense outlined type="error">
        {{ error }}
      </v-alert>
      <v-row>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="form.date"
          persistent
          width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="form.date"
              label="Fecha"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="form.date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">
              Cancelar
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(form.date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-text-field
          v-model="form.amount"
          prepend-icon="mdi-numeric"
          label="Monto"
        ></v-text-field>
        <v-btn color="primary" @click="save"> Agregar </v-btn>
      </v-row></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  name: 'RecordForm',
  data: () => ({
    modal: false,
    loading: false,
    disabled: false,
    error: '',
    form: {
      date: '',
      amount: '',
    },
  }),
  methods: {
    async save() {
      this.loading = true
      this.disabled = true
      const data = {
        ...this.form,
      }

      try {
        await this.$axios
          .post('/api/records', data)
          .then({})
          .finally(() => {
            this.form = {}
            this.loading = false
            this.disabled = false
          })
      } catch (error) {
        this.error = error.response.data.message
      }
    },
  },
}
</script>
