import { Home, Detail } from "./pages";

const prefetchConfig = [
  {
    path: "/",
    exact: true,
    component: Home,
    preload: () => {
      return Promise.all(Home.prefetch());
    }
  },
  {
    path: "/",
    exact: true,
    component: Detail,
    preload: () => {}
  }
];

export default prefetchConfig;
