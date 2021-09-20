import { Chart, registerables, ChartOptions } from 'chart.js';
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
  labels?: string[]
  data?: number[]
  datasets?: IDataset[]
  colors?: string[]
  max: number
  showScale?: boolean
  semi?: boolean
}

function Donut({ id = "", className = "", max, labels=[], colors = [], data = [], datasets = [], showScale = true, semi=false}: ChartProps) {
  Chart.register(...registerables)
  Chart.defaults.plugins.tooltip.displayColors = false;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.animation.duration = 0;
  Chart.defaults.color = 'white';

  if (semi) className += " asSemi"
  
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
      const chartOptions: ChartOptions<any> = {
        borderColor: "rgba(255,255,255,0.7)",
        animation: {
          duration: hasMounted ? 0 : 600,
        },
        scales: {
          y: {
              max,
              display: showScale
          }
        }
      }

      if (semi) {
        chartOptions.rotation = -90;
        chartOptions.circumference = 180;
        chartOptions.cutout = 100;
      }
      
      chart = new Chart(ref.current.getContext("2d"), {
        type: "doughnut",
        data: {
          labels,
          datasets: _datasets
        },
        options: chartOptions
      });
    }

    return () => {
      chart.destroy();
      setHasMounted(true)
    }
  }, [hasMounted, setHasMounted, max, semi, showScale, Chart, labels, data, datasets, colors, ref])

  return <canvas className={`chart ${className}`} id={id} ref={ref} />
}

export default { Donut }
