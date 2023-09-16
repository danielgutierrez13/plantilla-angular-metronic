import am5themes_Kelly from "@amcharts/amcharts5/themes/Kelly";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { Injectable } from '@angular/core';
import { AmchartsConfig, DataMultipleCircle } from "../../interfaces/interfaces-amcharts";

@Injectable({
  providedIn: 'root'
})
export class AmchartsService {

  constructor() { }

  private chartReg: AmchartsConfig[] = [];
  private maybeDisposeChart(id: string) {
    const chartConfig = this.chartReg.find(config => config.id === id);
    if (chartConfig) {
      // DISPOSE OLD CHARTS
      chartConfig.chart.dispose();
      const index = this.chartReg.indexOf(chartConfig);
      if (index !== -1) {
        // REMOVE OLD CHART
        this.chartReg.splice(index, 1);
      }
    }
  }

  private createCommonChartConfig (id: string): am5.Root {
    // CREATE ROOT ELEMENT
    let root = am5.Root.new(id);
    this.chartReg.push({
      id: id,
      chart: root
    });
    // SET THEME
    root.setThemes([
        am5themes_Kelly.new(root)
    ]);
    return root;
  }

  public gSingleColumn (
    id: string,
    data: any[],
    columnX: string,
    columnY: string,
    title: string = '',
    titleY: string = ''
  ): void {

    // DISPOSE OLD CHARTS
    this.maybeDisposeChart(id);

    // CREATE ROOT ELEMENT
    let root: am5.Root = this.createCommonChartConfig(id);

    // CREATE CHART
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));

    // ADD CURSOR
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // CREATE AXES
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: columnX,
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {}),
    }));

    yAxis.children.push(
      am5.Label.new(root, {
        text: titleY,
        y: 25,
        centerX:am5.p50,
        rotation: 270,
      })
    );

    // CREATE SERIES
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: columnY,
      sequencedInterpolation: true,
      categoryXField: columnX,
      tooltip: am5.Tooltip.new(root, {
        labelText:"{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });

    series.columns.template.adapters.add("fill", function(fill, target) {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function(stroke, target) {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    // CREATE SCROLLBAR
    let scrollbar = chart.set("scrollbarY", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));
    chart.set("scrollbarX", scrollbar);
    chart.bottomAxesContainer.children.push(scrollbar);

    // CREATE EXPORTING
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      dataSource: data,
      title: title,
      filePrefix: title,
      pdfOptions: {
        includeData: true,
      }
    });

    // ADD TITLE CHART
    chart.children.unshift(am5.Label.new(root, {
      text: title,
      fontSize: 20,
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50)
    }));

    // SET DATA
    xAxis.data.setAll(data);
    series.data.setAll(data);
  }


  public gGroupColumn (
    id: string,
    category: any,
    series: any,
    data: any,
    title: string = '',
    titleY: string = ''
  ): void {

    // DISPOSE OLD CHARTS
    this.maybeDisposeChart(id);

    // CREATE ROOT ELEMENT
    let root: am5.Root = this.createCommonChartConfig(id);

    root.setThemes([
      am5themes_Kelly.new(root)
    ]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));

    // CREATE SCROLLBAR
    let scrollbar = chart.set("scrollbarY", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));
    chart.set("scrollbarX", scrollbar);
    chart.bottomAxesContainer.children.push(scrollbar);

    // CREATE CURSOR
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: 270,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 0.1
    });

    // CREATE AXES
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: category,
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    yAxis.children.push(
      am5.Label.new(root, {
        text: titleY,
        y: 25,
        centerX:am5.p50,
        rotation: 270,
      })
    );

    function makeSeries(name: string, fieldName: string) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: category
      }));

      series.columns.template.setAll({
        tooltipText: "{name}: {valueY}",
        width: am5.percent(90),
        tooltipY: 0
      });

      series.data.setAll(data);

      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"), //alternativeText
            centerY: 0,
            centerX: am5.p50,
            populateText: true
          })
        });
      });

      legend.data.push(series);
    }

    for(let i in series) {
      makeSeries(series[i], series[i]);
    }

    // CREATE EXPORTING
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      dataSource: data,
      title: title,
      filePrefix: title,
      pdfOptions: {
        includeData: true,
      }
    });

    //ADD TITLE CHART
    chart.children.unshift(am5.Label.new(root, {
      text: title,
      fontSize: 20,
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50)
    }));

    void chart.appear(1000, 100);
  }

  public gMultipleLine (
    id: string,
    data: any[],
    campo: string,
    category: any[],
    title: string = ''
  ): void {

    // DISPOSE OLD CHARTS
    this.maybeDisposeChart(id);

    // CREATE ROOT ELEMENT
    let root: am5.Root = this.createCommonChartConfig(id);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        pinchZoomX:true
      })
    );

    // CREATE CURSOR
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));

    cursor.lineY.set("visible", false);

    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("location", 0.5);
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5
    });

    // CREATE AXES
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: campo,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          //inversed: true
        })
      })
    );

    function createSeries(name: string, field: string) {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: campo,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
          })
        })
      );

      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      series.set("setStateOnChildren", true);
      series.states.create("hover", {});

      series.mainContainer.set("setStateOnChildren", true);
      series.mainContainer.states.create("hover", {});

      series.strokes.template.states.create("hover", {
        strokeWidth: 4
      });

      series.data.setAll(data);
      series.appear(1000);
    }

    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal",
      marginBottom: 20
    }));

    category.forEach(
      element => createSeries(element, element)
    )

    // CREATE EXPORTING
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      dataSource: data,
      title: title,
      filePrefix: title,
      pdfOptions: {
        includeData: true,
      }
    });

    chart.children.unshift(am5.Label.new(root, {
      text: title,
      fontSize: 20,
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50)
    }));

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    // Make series change state when legend item is hovered
    legend.itemContainers.template.states.create("hover", {});

    legend.data.setAll(chart.series.values);

    void chart.appear(1000, 100);
  }

  public gMultipleCircle (id: string, values: DataMultipleCircle[], titleChart: string, unitMeasure: string) {

    this.maybeDisposeChart(id);
    if (values.length > 0){

      // CREATE ROOT ELEMENT
      let root: am5.Root = this.createCommonChartConfig(id);

      // SET THEME
      root.setThemes([
        am5themes_Kelly.new(root)
      ]);

      // CREATE CHART
      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50)
      }));

      // CREATE SERIES
      let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      }));

      series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0
      });

      series.labels.template.set("text", `[bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value} ${unitMeasure}[/])`);

      // SET DATA
      series.data.setAll(values);

      // CREATE LEGEND
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }));

      legend.data.setAll(series.dataItems);

      // EXPORT MENU
      const exporting : am5plugins_exporting.Exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        dataSource: values,
        title: titleChart,
        filePrefix: titleChart,
        pdfOptions: {
          includeData: true,
        }
      });

      // TITULO CHAR
      chart.children.unshift(am5.Label.new(root, {
        text: titleChart,
        fontSize: 20,
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50)
      }));

      series.appear(1000, 100);
    }
  }
}
