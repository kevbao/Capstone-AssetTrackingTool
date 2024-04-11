import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { mockDataAsset, mockDataAccessory } from "../../data/mockData";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../components/StatBox";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as echarts from 'echarts';

import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activities, setActivities] = useState([]);
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

  useEffect(() => {
    var chartDom2 = document.getElementById('lineChart');
    var lineChart = echarts.init(chartDom2);
    var lineOption;

    lineOption = {
      title: {
        text: 'Weekly Check Out Overview',
        textStyle: {
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Checked Out Assets']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '# of Checked Out Assets',
          type: 'line',
          stack: 'Total',
          data: [4, 10, 3, 6, 1, 0, 9]
        }
      ]
    };

    lineOption && lineChart.setOption(lineOption);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="5"
            subtitle="ASSETS"
            viewAll="View All"
            icon={
              <QrCode2OutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="5"
            subtitle="ACCESSORIES"
            viewAll="View All"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="9"
            subtitle="USERS"
            viewAll="View All"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="5"
            subtitle="LOCATIONS"
            viewAll="View All"
            icon={
              <MapOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/*Recent Activity */}
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Activity
              </Typography>
            </Box>
              {/* Recent Activities */}
              {activities.slice().reverse().map((activity, index) => (
                <Box
                  key={activity.Action_Number}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                  sx={{
                    fontWeight: index === 0 ? 'bold' : 'normal', // Bold font for most recent activity
                    color: index === 0 ? colors.greenAccent[500] : colors.grey[100], // Green accent font for most recent activity
                  }}
                >
                  <Box>
                    <Typography color={index === 0 ? colors.greenAccent[500] : colors.grey[100]} fontWeight={index === 0 ? 'bold' : 'normal'}>
                      {activity.Action_Description}
                    </Typography>
                  </Box>
                  <Box color={index === 0 ? colors.greenAccent[500] : colors.grey[100]} fontWeight={index === 0 ? 'bold' : 'normal'}>
                    {new Date(activity.DateTime).toLocaleString()}
                  </Box>
                </Box>
              ))}
          </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Assets
            </Typography>
          </Box>
          {mockDataAsset.map((asset, i) => (
            <Box
              key={`${asset.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {asset.assetName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {asset.status === "Available" ? "Added" : "Removed"}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{asset.purchaseDate}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {asset.assetTag}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Activity
            </Typography>
          </Box>
          {mockDataAccessory.map((accessory, i) => (
            <Box
              key={`${accessory.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {accessory.name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {accessory.numCheckedOut > 0 ? "Checked Out" : "Added"}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{accessory.description}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {accessory.model}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
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
          
          {/* Line Chart */}
          <Box
            style={{ flex: 1, marginLeft: '20px' }} // Add margin to separate the charts
          >
            <div id="lineChart" style={{ width: '100%', height: '300px' }}></div>
          </Box>
        </Box>

    </Box>
  );
};

export default Dashboard;