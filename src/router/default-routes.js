import Dashboard from "@/screens/dashboard/root-dashboard";
import LinkedList from "@/screens/linked-list/root-linked-list";
import DoublyLinkedList from "@/screens/doubly-linked-list/root-doubly-linked-list";

import {ROUTE_DASHBOARD, ROUTE_LINKED_LIST, ROUTE_DOUBLY_LINKED_LIST} from './route-constants';

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
        path: '/dashboard/doubly-linked-list',
        name: ROUTE_DOUBLY_LINKED_LIST,
        component: DoublyLinkedList
      }
    ]
  }
]
