import Dashboard from "@/screens/dashboard/root-dashboard";
import LinkedList from "@/screens/linked-list/root-linked-list";
import Settings from "@/screens/settings/root-settings";

import {ROUTE_DASHBOARD, ROUTE_LINKED_LIST, ROUTE_SETTINGS} from './route-constants';

export default [
  {
    path: '/',
    name: ROUTE_DASHBOARD,
    component: Dashboard,
    redirect: {name: ROUTE_LINKED_LIST},
    children: [
      {
        path: '/dashboard/linked-list',
        name: ROUTE_LINKED_LIST,
        component: LinkedList
      },
      {
        path: '/dashboard/settings',
        name: ROUTE_SETTINGS,
        component: Settings
      }
    ]
  }
]
