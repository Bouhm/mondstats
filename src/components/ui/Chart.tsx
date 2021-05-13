import { Chart, ChartItem, ChartTypeRegistry, registerables } from 'chart.js';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

export interface IDataset {
  label?: string
  data: number[]
  backgroundColor: string
}

type ChartProps = {
  id: string
  type: string
  labels: string[]
  data?: number[]
  datasets?: IDataset[]
  colors?: string[]
}

function _Chart({ id, type, labels, colors = [], data = [], datasets = []}: ChartProps) {
  Chart.register(...registerables)
  Chart.defaults.plugins.tooltip.displayColors = false;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.animation.duration = 0;
  
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let chart: Chart;
    let _datasets = datasets.length ? datasets :
      [
        {
          data,
          backgroundColor: colors
        }
      ]

    if (ref && ref.current) {
      chart = new Chart(ref.current.getContext("2d") as ChartItem, {
        type: type as keyof ChartTypeRegistry,
        data: {
          labels,
          datasets: _datasets
        },
        options: {
          borderColor: "rgba(255,255,255,0.7)",
          animation: {
            duration: hasMounted ? 0 : 600,
          },
        }
      });
    }

    return () => {
      chart.destroy();
      setHasMounted(true)
    }
  }, [hasMounted, setHasMounted, labels, data, colors, ref])

  return <canvas id={id} ref={ref} />
}

export default _Chart
