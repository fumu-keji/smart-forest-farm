import { createRouter, createWebHashHistory } from "vue-router";
// 引入模块路由

const routes = [
  {
    path: "/",
    component: () => import("@/components/singleComponent/Skeleton.vue"),
    redirect: { name: "PanoramicMonitoringDashboard" },
    children: [
      {
        path: "PanoramicMonitoringDashboard",
        name: "PanoramicMonitoringDashboard",
        meta: { activeMenuIndex: ""},
        component: () => import("@/views/business/PanoramicMonitoringDashboard/PanoramicMonitoringDashboard.vue"),
      },
      {
        path: "FireCommandDashboard",
        name: "FireCommandDashboard",
        meta: { activeMenuIndex: ""},
        component: () => import("@/views/business/FireCommandDashboard/FireCommandDashboard.vue"),
      },
      {
        path: "ResourceManagementDashboard",
        name: "ResourceManagementDashboard",
        meta: { activeMenuIndex: ""},
        component: () => import("@/views/business/ResourceManagementDashboard/ResourceManagementDashboard.vue"),
      },
      {
        path: "DecisionAnalysisDashboard",
        name: "DecisionAnalysisDashboard",
        meta: { activeMenuIndex: ""},
        component: () => import("@/views/business/DecisionAnalysisDashboard/DecisionAnalysisDashboard.vue"),
      },

    ],
  },

];
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});
