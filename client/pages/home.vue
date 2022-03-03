<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-col cols="12" sm="8" md="10">
              <record-form></record-form>
            </v-col>
          </v-flex>
          <v-flex xs12 sm8 md8>
            <chart></chart>
          </v-flex>
        </v-layout>
      </v-container> </v-main
  ></v-app>
</template>

<script>
import RecordForm from '../components/RecordForm.vue'
import Chart from '../components/Chart.vue'

export default {
  name: 'DashboardPage',
  components: { RecordForm, Chart },
}
</script>
