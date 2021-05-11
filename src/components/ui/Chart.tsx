import { Chart, registerables } from "chart.js";
import _ from "lodash";
import React from "react";
import { useEffect, useRef } from "react";

type ChartProps = {
  id: string
  type: string
  labels: string[]
  data: number[]
  colors: string[]
}

function _Chart({ id, type, labels, data, colors }: ChartProps) {
  Chart.register(...registerables)
  Chart.defaults.plugins.tooltip.displayColors = false;
  Chart.defaults.plugins.legend.display = false;
  const ref = useRef(null)

  console.log(colors)


  useEffect(() => {
    let chart: Chart;


    if (ref && ref.current) {
      chart = new Chart(ref.current!.getContext("2d"), {
        type,
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors
            }
          ],
        }
      });
    }

    return () => chart.destroy();
  }, [ref])

  return <canvas id={id} ref={ref} />
}

export default _Chart
