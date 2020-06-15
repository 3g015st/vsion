import {ROUTE_LINKED_LIST, ROUTE_DOUBLY_LINKED_LIST} from "@/router/route-constants";

export const NAV_MENU_ONE_KEY = 'DataStructures';
export const NAV_MENU_ONE = {
  key: NAV_MENU_ONE_KEY,
  icon: 'bar-chart',
  title: 'Data Structures',
  menuItems: [
    {
      key: ROUTE_LINKED_LIST,
      title: ROUTE_LINKED_LIST,
      icon: 'unordered-list'
    },
    {
      key: ROUTE_DOUBLY_LINKED_LIST,
      title: ROUTE_DOUBLY_LINKED_LIST,
      icon: 'ordered-list'
    }
  ]
};

export const NAV_MENU_LIST = [
  NAV_MENU_ONE
]
