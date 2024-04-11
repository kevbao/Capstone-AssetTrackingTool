import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { mockDataAsset, mockDataAccessory } from "../../data/mockData";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  UniversalTransition
]);

const IndivPieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [checkedIn, setCheckedIn] = useState(0);
  const [checkedOut, setCheckedOut] = useState(0);

  useEffect(() => {
    // Fetch data for checked in/out counters
    fetch('http://localhost:8081/Asset')
      .then((res) => res.json())
      .then((data) => {
        const checkedInCount = data.filter(asset => asset.Status === "Available").length;
        const checkedOutCount = data.filter(asset => asset.Status === "In Use").length;
        setCheckedIn(checkedInCount);
        setCheckedOut(checkedOutCount);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Initialize pie chart
    const chartDom1 = document.getElementById('pieChart');
    const pieChart = echarts.init(chartDom1);
    const pieOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      series: [
        {
          name: 'Assets',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: checkedIn, name: 'Currently Checked In' },
            { value: checkedOut, name: 'Currently Checked Out' }
          ]
        }
      ]
    };
    pieChart.setOption(pieOption);

    // Cleanup function for pie chart
    return () => {
      pieChart.dispose();
    };
  }, [checkedIn, checkedOut]);

  return (
    <Box m="20px">
      {/* Box with ECharts */}
      <Box
        gridColumn="span 6" // Spans half the width of the grid
        gridRow="3" // Places the box in the third row
        backgroundColor={colors.primary[400]} // Same color properties as the others
        padding="20px" // Same padding
        marginTop="20px" // Same margin top
        display="flex" // Use flexbox to control the layout of the children
        justifyContent="space-between" // Align children with space between them
      >
        {/* Pie Chart */}
        <Box
          style={{ flex: 1 }} // Make the box flexible to occupy available space
        >
          <div id="pieChart" style={{ width: '100%', height: '300px' }}></div>
        </Box>
      </Box>
    </Box>
  );
};

export default IndivPieChart;
