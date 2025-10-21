// 注册自定义的坐标系
import proj4 from "proj4";
import {
  addProjection,
  addCoordinateTransforms,
  Projection
} from "ol/proj.js";
const srsItem = [
  {
    srsName: "EPSG:4549",
    srsValue: "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    code: "EPSG:4549",
    extent: [347872.25, 599933.05, 2703739.74, 5912395.2],
    units: "m",
    axisOrientation: "neu",
    global: false
  },
  {
    srsName: "EPSG:4526",
    srsValue: "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=38500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    code: "EPSG:4526",
    extent: [38344577.88, 2381397.91, 38617340.63, 5036050.38],
    units: "m",
    axisOrientation: "neu",
    global: false
  },
  {
    srsName: "EPSG:4490",
    srsValue: "+proj=longlat +ellps=GRS80 +no_defs",
    code: "EPSG:4490",
    extent: [-180, -90, 180, 90],
    units: "degrees",
    axisOrientation: "neu",
    global: false
  },
  {
    srsName: "EPSG:4547",
    srsValue: "+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    code: "EPSG:4547",
    extent: [344577.88, 617340.63, 2381397.91, 5036050.38],
    units: "m",
    axisOrientation: "neu",
    global: false
  },
  {
    srsName: "EPSG:2326",
    srsValue: "+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs",
    code: "EPSG:2326",
    extent: [793259.7, 870525.78, 799130.01, 848940.16],
    units: "m",
    axisOrientation: "neu",
    global: false
  }
];
const defaultSrs = "EPSG:4326";
// 注册自定义坐标系
export default {
  registerProjection(projections = defaultSrs) {
    srsItem.forEach(item => {
      proj4.defs(item.srsName, item.srsValue);
      let projection = new Projection({
        code: item.code,
        extent: item.extent,
        units: item.units,
        axisOrientation: item.axisOrientation,
        global: item.global
      });
      //结合proj4在ol3中自定义坐标系
      addProjection(projection);
      addCoordinateTransforms(
        projections,
        item.srsName,
        function (coordinate) {
          return proj4(defaultSrs, item.srsName, coordinate);
        },
        function (coordinate) {
          return proj4(item.srsName, defaultSrs, coordinate);
        }
      );
    });
  }
};



