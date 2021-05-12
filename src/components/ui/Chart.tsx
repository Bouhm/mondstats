import { Chart, registerables } from "chart.js";
import _ from "lodash";
import React, { useState } from "react";
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
  Chart.defaults.plugins.tooltip.animation.duration = 0;
  
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef(null)

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
