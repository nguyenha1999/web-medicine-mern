import {
  ExperimentOutlined,
  ExportOutlined,
  HomeOutlined,
  ImportOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Chemistry from "../pages/chemistry";
import Export from "../pages/export";
import Home from "../pages/home";
import Import from "../pages/import";
import Partner from "../pages/partner";
import User from "../pages/user";

export const RoleAdmin = [
  {
    title: "",
    items: [
      {
        title: "Trang chủ",
        to: "/",
        component: <Home />,
        icon: <HomeOutlined />,
      },
      {
        title: "Hoá chất",
        to: "/chemistries",
        component: <Chemistry />,
        icon: <ExperimentOutlined />,
      },
      {
        title: "Hoá đơn Nhập",
        to: "/imports",
        component: <Import />,
        icon: <ImportOutlined />,
      },
      {
        title: "Hoá đơn Xuất",
        to: "/exports",
        component: <Export />,
        icon: <ExportOutlined />,
      },
      {
        title: "Đối tác",
        to: "/partners",
        component: <Partner />,
        icon: <SolutionOutlined />,
      },
      {
        title: "Nhân viên",
        to: "/users",
        component: <User />,
        icon: <TeamOutlined />,
      },
    ],
  },
];
