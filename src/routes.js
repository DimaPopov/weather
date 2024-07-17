import {
  createBrowserRouter,
  createPanel,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const VIEW = 'view';

export const PANELS = {
  HOME: 'home',
  FORECAST: 'forecast',
};

export const routes = RoutesConfig.create([
  createView(VIEW, [
    createPanel(PANELS.HOME, '/'),
  ]),
]);

export const router = createBrowserRouter(routes.getRoutes());
