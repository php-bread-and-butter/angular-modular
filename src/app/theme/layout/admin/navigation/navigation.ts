import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/user/dashboard',
    icon: 'feather icon-home'
  },
  {
    id: 'order',
    title: 'ORDER',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'basic',
        title: 'Purchase Order',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'create-purchase-order',
            title: 'Create Purchase Order',
            type: 'item',
            url: '/order/create-purchase-order'
          },
          {
            id: 'list-purchase-order',
            title: 'List Purchase Order',
            type: 'item',
            url: '/order/list-purchase-order'
          }
        ]
      }
    ]
  },
  {
    id: 'invoice',
    title: 'Invoice',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'indent-invoice',
        title: 'Indent Invoice',
        type: 'collapse',
        icon: 'feather icon-layout',
        children: [
          {
            id: 'list-indent-invoice',
            title: 'List Indent Invoice',
            type: 'item',
            url: '/invoice/list-indent-invoice'
          },
          {
            id: 'create-indent-invoice',
            title: 'Create Indent Invoice',
            type: 'item',
            url: '/invoice/create-indent-invoice'
          }
        ]
      },
      {
        id: 'invoice',
        title: 'Proforma Invoice',
        type: 'collapse',
        icon: 'feather icon-sidebar',
        children: [
          {
            id: 'list-proforma-invoice',
            title: 'List Proforma Invoice',
            type: 'item',
            url: '/invoice/list-proforma-invoice'
          },
          {
            id: 'create-proforma-invoice',
            title: 'Create Proforma Invoice',
            type: 'item',
            url: '/invoice/create-proforma-invoice'
          }
        ]
      }
    ]
  },
  {
    id: 'lc',
    title: 'L/C',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: ' lc-clause',
        title: 'L/C Clause',
        type: 'item',
        url: '/lc/clause',
        classes: 'nav-item',
        icon: 'feather icon-command'
      },
      {
        id: 'lc-application-form',
        title: ' L/C Application Form',
        type: 'item',
        url: '/lc/application-form',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'insurance-payment-application',
        title: 'Insurance Payment Application',
        type: 'item',
        url: '/insurance/payment-application',
        classes: 'nav-item',
        icon: 'feather icon-activity'
      },
      {
        id: 'insurance-premium-calculation',
        title: 'Insurance Premium Calculation',
        type: 'item',
        url: '/insurance/premium-calculation',
        classes: 'nav-item',
        icon: 'feather icon-percent'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
