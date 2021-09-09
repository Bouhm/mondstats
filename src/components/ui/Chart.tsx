import { Chart, ChartItem, ChartTypeRegistry, registerables } from 'chart.js';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

export interface IChartConfig {
  labels: string[],
  data: number[],
  colors: string[]
}

export interface IDataset {
  label?: string
  data: number[]
  backgroundColor: string
}

type ChartProps = {
  id?: string
  className?: string
  type: string
  labels: string[]
  data?: number[]
  datasets?: IDataset[]
  colors?: string[]
  max: number
  showScale?: boolean
}

function _Chart({ id = "", className = "", type, max, labels, colors = [], data = [], datasets = [], showScale = true}: ChartProps) {
  Chart.register(...registerables)
  Chart.defaults.plugins.tooltip.displayColors = false;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.animation.duration = 0;
  Chart.defaults.color = 'white';
  
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
          scales: {
            y: {
                max,
                display: showScale
            }
          }, 
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI
        },
      });
    }

    return () => {
      chart.destroy();
      setHasMounted(true)
    }
  }, [hasMounted, setHasMounted, max, showScale, Chart, labels, data, datasets, colors, type, ref])

  return <canvas className={className} id={id} ref={ref} />
}

export default _Chart
