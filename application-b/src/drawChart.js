import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";

export const chartDivId = "chart1";

export async function drawChart() {
    SciChartSurface.loadWasmFromCDN();
//   SciChartSurface.configure({
//     dataUrl: `http://localhost:3002/scichart2d.data`,
//     wasmUrl: `http://localhost:3002/scichart2d.wasm`,
//   });
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    chartDivId
  );

  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);
  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  const ds = new XyDataSeries(wasmContext, {
    xValues: [1, 2, 3, 4, 5],
    yValues: [0, 3, 7, 10, 5],
  });
  const rs = new FastLineRenderableSeries(wasmContext, { dataSeries: ds });
  sciChartSurface.renderableSeries.add(rs);
}
