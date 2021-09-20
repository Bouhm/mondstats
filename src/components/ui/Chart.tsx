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
      chart = new Chart(ref.current.getContext("2d") as ChartItem, {
        type: "doughnut",
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
          }
        },
      });

      if (semi) {
        chart.options.rotation = -90;
        chart.options.circumference = 180;
      }
    }

    return () => {
      chart.destroy();
      setHasMounted(true)
    }
  }, [hasMounted, setHasMounted, max, showScale, Chart, labels, data, datasets, colors, ref])

  return <canvas className={className} id={id} ref={ref} />
}

export default { Donut }
