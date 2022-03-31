import { findAppByRoute } from '../util';
import { getMainLifecycle } from '../const/mainLifeCycle';
import { loadHtml } from '../loader';

export const lifecycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__$ANYJS_ORIGIN_MICRO_APP__);

  // 获取到要跳转到的子应用
  const nextApp = findAppByRoute(window.__$ANYJS_CURRENT_MICRO_APP__);

  if (!nextApp) {
    return
  }

  if (prevApp && prevApp.unmount) {
    if (prevApp.proxy) {
      prevApp.proxy.inactive();
    }
    await destoryed(prevApp);
  }

  const app = await beforeLoad(nextApp);

  await mounted(app);
}

export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad');

  app && app.beforeLoad && app.beforeLoad();

  const subApp = await loadHtml(app);
  subApp && subApp.beforeLoad && subApp.beforeLoad();

  return subApp;
}

export const mounted = async (app) => {
  app && app.mount && app.mount({
    appInfo: app.appInfo,
    entry: app.entry
  });

  await runMainLifeCycle('mounted');
};

export const destoryed = async (app) => {
  app && app.unmount && app.unmount();

  await runMainLifeCycle('destoryed');
};

export const runMainLifeCycle = async (type) => {
  const mainlife = getMainLifecycle();

  await Promise.all(mainlife[type].map(async item => await item()));
};
