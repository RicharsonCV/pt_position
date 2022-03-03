export const state = () => ({
  chartData: []
})

export const mutations = {
  updateChartData (state, data) {
    state.chartData = data
  }
}

export const actions = {
  async fetchChartData ({ commit }) {
    const data = await this.$axios.get('/api/records').then((response) => {
      return response.data.data
    })

    commit('updateChartData', data)
  }
}
