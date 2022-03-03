<template>
  <v-card elevation="2" outlined shaped tile>
    <v-card-text> <div ref="chartdiv" class="chart"></div></v-card-text
  ></v-card>
</template>

<script>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
// eslint-disable-next-line camelcase
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

export default {
  name: 'ChartComponent',
  data: () => ({
    chartData: [],
  }),
  async fetch() {
    this.chartData = await this.$axios.get('/api/records').then((response) => {
      return response.data.data
    })
  },

  mounted() {
    const root = am5.Root.new(this.$refs.chartdiv)

    // eslint-disable-next-line camelcase
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    )

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: 'zoom' }),
      })
    )

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        groupData: true,
        maxDeviation: 0.5,
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
          pan: 'zoom',
        }),
      })
    )

    const data = this.chartData

    // Create series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series',
        xAxis,
        yAxis,
        valueYField: 'amount',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}',
        }),
      })
    )

    series.strokes.template.set('strokeWidth', 2)
    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.4,
    })

    series.data.setAll(data)

    // Pre-zoom X axis to last hour
    series.events.once('datavalidated', function (ev, target) {
      const lastDate = new Date(data[data.length - 1].date)
      const firstDate = new Date(lastDate.getTime() - 3600000)
      xAxis.zoomToDates(firstDate, lastDate)
    })

    // Add cursor
    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
        xAxis,
      })
    )

    xAxis.set('tooltip', am5.Tooltip.new(root, {}))

    yAxis.set('tooltip', am5.Tooltip.new(root, {}))

    const scrollbarX = am5xy.XYChartScrollbar.new(root, {
      orientation: 'horizontal',
      height: 50,
    })

    chart.set('scrollbarX', scrollbarX)

    const sbxAxis = scrollbarX.chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          opposite: false,
          strokeOpacity: 0,
        }),
      })
    )

    const sbyAxis = scrollbarX.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    const sbseries = scrollbarX.chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: sbxAxis,
        yAxis: sbyAxis,
        valueYField: 'amount',
        valueXField: 'date',
      })
    )
    sbseries.data.setAll(data)

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}))

    this.root = root
  },
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>
