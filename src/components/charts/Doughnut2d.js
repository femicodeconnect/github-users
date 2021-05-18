// STEP 1 - Include Dependencies
// Include react
import React from 'react';

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts';

// Include the theme as candy
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
   const chartConfigs = {
      type: 'doughnut2d', // The chart type
      width: '100%', // Width of the chart - value makes it responsive
      height: '400', // Height of the chart
      dataFormat: 'json', // Data type
      dataSource: {
         // Chart Configuration
         chart: {
            //Set the chart caption
            caption: 'Stars Per Language',
            //Remove decimals in % calc.
            decimals: 0,
            //Increase/Decrease the radius of the pie
            doughnutRadius: '45%',
            //show equivalent values of values in %
            showPercentValues: 0,
            //theme
            theme: 'candy',
         },
         // Chart Data from props
         data,
      },
   };
   return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
