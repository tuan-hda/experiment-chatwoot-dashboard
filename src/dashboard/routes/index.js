import { createRouter, createWebHistory } from "vue-router";

import { frontendURL } from "../helper/URLHelper";
import dashboard from "./dashboard/dashboard.routes";
import store from "dashboard/store";
import { validateLoggedInRoutes } from "../helper/routeHelpers";
import AnalyticsHelper from "../helper/AnalyticsHelper";

const routes = [...dashboard.routes];

export const router = createRouter({ history: createWebHistory(), routes });

export const validateAuthenticateRoutePermission = (to, next) => {
  const { isLoggedIn, getCurrentUser: user } = store.getters;

  // Allow public routes without authentication
  const publicRoutes = [
    "login",
    "sso_login",
    "auth_signup",
    "auth_confirmation",
    "auth_reset_password",
    "auth_password_edit",
  ];
  if (publicRoutes.includes(to.name)) {
    return next();
  }

  if (
    !isLoggedIn &&
    (to.path.includes("/app/login") || to.path.includes("/app/auth"))
  ) {
    window.location.assign("/app/login");
    return "";
  }

  const { accounts = [], account_id: accountId } = user;

  if (!accounts.length) {
    if (to.name === "no_accounts") {
      return next();
    }
    return next(frontendURL("no-accounts"));
  }

  if (to.name === "no_accounts" || !to.name) {
    return next(frontendURL(`accounts/${accountId}/dashboard`));
  }

  const nextRoute = validateLoggedInRoutes(to, store.getters.getCurrentUser);
  return nextRoute ? next(frontendURL(nextRoute)) : next();
};

export const initalizeRouter = () => {
  const userAuthentication = store.dispatch("setUser");

  router.beforeEach((to, _from, next) => {
    AnalyticsHelper.page(to.name || "", {
      path: to.path,
      name: to.name,
    });

    userAuthentication.then(() => {
      return validateAuthenticateRoutePermission(to, next, store);
    });
  });
};

export default router;
