import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },

  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 基础管理
  {
    path: '/basicManage',
    name: 'basicManage',
    component: Main,
    meta: {
      icon: '_Basicmanagement',
      title: '基础管理',
      hideInMenu: false,
      notCache: true
    },
    children:[
      {
        path: 'lessee',
        name: 'lessee',
        meta: {
          icon: '_Tenantmanagement',
          title: '租户管理'
        },
        component: () => import('@/view/basicManage/lessee')
      },
      {
        path: 'createLessee',
        name: 'createLessee',
        meta: {
          icon: 'md-funnel',
          title: '新建租户',
          hideInMenu: true,
        },
        component: () => import('@/view/basicManage/lessee/create/index')
      },
      {
        path: 'lesseeDetail',
        name: 'lesseeDetail',
        meta: {
          icon: 'md-funnel',
          title: '租户详情',
          hideInMenu: true,
        },
        component: () => import('@/view/basicManage/lessee/detail')
      }
    ]
  },
  // 合作管理
  {
    path: '/cooperationManage',
    name: 'cooperationManage',
    component: Main,
    meta: {
      icon: '_CooperativemanagementCooperativemanagement',
      title: '合作管理',
      notCache: true
    },
    children: [
      {
        path: 'supplierManage',
        name: 'supplierManage',
        meta: {
          icon: '_Suppliermanagement',
          title: '供应商管理'
        },
        component: () => import('@/view/cooperationManage/supplierManage/home')
      },

      {
        path: 'createSupplier',
        name: 'createSupplier',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '新建供应商'
        },
        component: () => import('@/view/cooperationManage/supplierManage/create')
      },

      {
        path: 'businessInfo',
        name: 'businessInfo',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '工商信息'
        },
        component: () => import('@/view/cooperationManage/supplierManage/businessInfo')
      },
      {
        path: 'brandInfo',
        name: 'brandInfo',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '品牌信息'
        },
        component: () => import('@/view/cooperationManage/supplierManage/brandInfo')
      },
      {
        path: 'organizationalStructure',
        name: 'organizationalStructure',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '组织架构'
        },
        component: () => import('@/view/cooperationManage/supplierManage/organizationalStructure')
      },
      {
        path: 'productList',
        name: 'productList',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '产品列表'
        },
        component: () => import('@/view/cooperationManage/supplierManage/productList')
      },
      {
        path: 'news',
        name: 'news',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '新闻资讯'
        },
        component: () => import('@/view/cooperationManage/supplierManage/news')
      },
      {
        path: 'ascoCode',
        name: 'ascoCode',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '职业代码表' 
        },
        component: () => import('@/view/cooperationManage/supplierManage/ascoCode')
      },
      {
        path: 'insuranceRules',
        name: 'insuranceRules',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '投保规则'
        },
        component: () => import('@/view/cooperationManage/supplierManage/insuranceRules')
      },
      // 产品管理
      {
        path: 'productManage',
        name: 'productManage',
        meta: {
          icon: '_Productmanagement',
          title: '产品管理'
        },
        component: () => import('@/view/cooperationManage/productManage')
      },
      // 新建产品 & 产品详情
      {
        path: 'createProduct',
        name: 'createProduct',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '新建产品'
        },
        component: () => import('@/view/cooperationManage/productManage/create'),
        // children: [
        //   {
        //     path: 'baseInfo',
        //     name: 'baseInfo',
        //     meta: {
        //       icon: 'md-funnel',
        //       title: '基本信息'
        //     },
        //     component: () => import('@/view/cooperationManage/productManage/create')
        //   },
        //   {
        //     path: 'InsuranceRules',
        //     name: 'InsuranceRules',
        //     meta: {
        //       icon: 'md-funnel',
        //       title: '投保规则'
        //     },
        //     component: () => import('@/view/cooperationManage/productManage/create')
        //   },
        //   {
        //     path: 'productExplain',
        //     name: 'productExplain',
        //     meta: {
        //       icon: 'md-funnel',
        //       title: '产品说明'
        //     },
        //     component: () => import('@/view/cooperationManage/productManage/create')
        //   },
        //   {
        //     path: 'productAccessory',
        //     name: 'productAccessory',
        //     meta: {
        //       icon: 'md-funnel',
        //       title: '产品附件'
        //     },
        //     component: () => import('@/view/cooperationManage/productManage/create')
        //   },
        // ]
      },
      // {
      //   path: 'baseInfo',
      //   name: 'baseInfo',
      //   meta: {
      //     icon: 'md-funnel',
      //     hideInMenu: true,
      //     title: '基本信息'
      //   },
      //   component: () => import('@/view/cooperationManage/productManage/baseInfo')
      // },
      // {
      //   path: 'productInsuranceRules',
      //   name: 'productInsuranceRules',
      //   meta: {
      //     icon: 'md-funnel',
      //     hideInMenu: true,
      //     title: '投保规则'
      //   },
      //   component: () => import('@/view/cooperationManage/productManage/insuranceRules')
      // },
      // {
      //   path: 'productExplain',
      //   name: 'productExplain',
      //   meta: {
      //     icon: 'md-funnel',
      //     hideInMenu: true,
      //     title: '产品说明'
      //   },
      //   component: () => import('@/view/cooperationManage/productManage/productExplain')
      // },
      // {
      //   path: 'productAccessory',
      //   name: 'productAccessory',
      //   meta: {
      //     icon: 'md-funnel',
      //     hideInMenu: true,
      //     title: '产品附件'
      //   },
      //   component: () => import('@/view/cooperationManage/productManage/productAccessory')
      // },
    ]
  },

  {
    path: '/applicationManage',
    name: 'applicationManage',
    component: Main,
    meta: {
      icon: '_Applicationmanagement',
      title: '应用管理',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'systemMessage',
        name: 'systemMessage',
        meta: {
          icon: '_systemnotification',
          title: '系统通知'
        },
        component: () => import('@/view/applicationManage/systemMessage.vue')
      },
      {
        path: 'messageTemplate',
        name: 'messageTemplate',
        meta: {
          icon: '_Messagetemplate',
          title: '消息模板'
        },
        redirect: 'commonExpressions',
      },
      {
        path: 'commonExpressions',
        name: 'commonExpressions',
        meta: {
          icon: 'md-funnel',
          title: '常用语',
          hideInMenu: true,
        },
        component: () => import('@/view/applicationManage/messageTemplate/commonExpressions.vue')
      },
      {
        path: 'applicationMessage',
        name: 'applicationMessage',
        meta: {
          icon: 'md-funnel',
          title: '应用消息',
          hideInMenu: true,
        },
        component: () => import('@/view/applicationManage/messageTemplate/applicationMessage.vue'),
      },
      {
        path: 'intelligentSecretary',
        name: 'intelligentSecretary',
        meta: {
          icon: 'md-funnel',
          title: '职能秘书',
          hideInMenu: true,
        },
        component: () => import('@/view/applicationManage/messageTemplate/intelligentSecretary.vue'),
      },
      {
        path: 'menuSet',
        name: 'menuSet',
        meta: {
          icon: '_menu',
          title: '菜单配置',
        },
        component: () => import('@/view/applicationManage/menuSet.vue'),
      },
    ]
  },
  // 规则配置
  {
    path: '/ruleSet',
    name: 'ruleSet',
    component: Main,
    meta: {
      icon: '_ruleSeturation',
      title: '规则配置',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'typeRule',
        name: 'typeRule',
        meta: {
          icon: '_Typerule',
          title: '类型规则'
        },
        component: () => import('@/view/ruleSet/type.vue')
      },
      {
        path: 'characterRule',
        name: 'characterRule',
        meta: {
          icon: '_Rolerule',
          title: '角色规则'
        },
        component: () => import('@/view/ruleSet/role.vue')
      },
      {
        path: 'insureRule',
        name: 'insureRule',
        meta: {
          icon: '_Insurancerules',
          title: '投保规则'
        },
        component: () => import('@/view/ruleSet/insure.vue')
      },
      // 通用数据库
      {
        path: 'commonDatabase',
        name: 'commonDatabase',
        meta: {
          icon: '_Generalpurposedatabase',
          title: '通用数据库'
        },
        component: () => import('@/view/ruleSet/table/index.vue'),
        redirect: '/ruleSet/commonDatabase/nationalityTable',
        children: [
          {
            path: 'nationalityTable',
            name: 'nationalityTable',
            meta: {
              hideInMenu: true,
              icon: 'md-funnel',
              title: '国籍表'
            },
            component: () => import('@/view/ruleSet/table/nationality.vue')
          },
          {
            path: 'districtTable',
            name: 'districtTable',
            meta: {
              hideInMenu: true,
              icon: 'md-funnel',
              title: '行政区划表'
            },
            component: () => import('@/view/ruleSet/table/district.vue'),
          },
          {
            path: 'professionTable',
            name: 'professionTable',
            meta: {
              hideInMenu: true,
              icon: 'md-funnel',
              title: '职业代码表'
            },
            component: () => import('@/view/ruleSet/table/profession.vue'),
          }
        ]
      },
    ]
  },
  // 行业数据库
  {
    path: '/industryDatabase',
    name: 'industryDatabase',
    component: Main,
    meta: {
      icon: '_Industrydatabase',
      title: '行业数据库',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'insuranceCompany',
        name: 'insuranceCompany',
        meta: {
          icon: '_Insurancecompany',
          title: '保险公司'
        },
        component: () => import('@/view/industryDatabase/insuranceCompany.vue')
      },
      {
        path: 'companyDetail',
        name: 'companyDetail',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '公司详情'
        },
        component: () => import('@/view/industryDatabase/detail.vue')
      },
      {
        path: 'agency',
        name: 'agency',
        meta: {
          icon: '_Generationcompany',
          title: '经代公司'
        },
        component: () => import('@/view/industryDatabase/agencyCompany.vue'),
      },
      {
        path: 'insuranceProduct',
        name: 'insuranceProduct',
        meta: {
          icon: '_InsuranceProducts',
          title: '保险产品'
        },
        component: () => import('@/view/industryDatabase/insuranceProduct.vue'),
      }
    ]
  },
  // 财务结算
  {
    path: '/financialSettlement',
    name: 'financialSettlement',
    component: Main,
    meta: {
      icon: '_Financialsettlement',
      title: '财务结算',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'shouldStatement',
        name: 'shouldStatement',
        meta: {
          icon: '_Billingstatement',
          title: '应结账单'
        },
        component: () => import('@/view/financialSettlement/shouldStatement.vue')
      },
      {
        path: 'invoiceManage',
        name: 'invoiceManage',
        meta: {
          icon: '_Invoicemanagement',
          title: '发票管理'
        },
        component: () => import('@/view/financialSettlement/invoiceManage.vue'),
      },
      {
        path: 'allOrders',
        name: 'allOrders',
        meta: {
          icon: '_Allorders',
          title: '全部订单'
        },
        component: () => import('@/view/financialSettlement/allOrders.vue'),
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '订单详情'
        },
        component: () => import('@/view/financialSettlement/orderDetail.vue'),
      }
    ]
  },
  // 数据统计
  {
    path: '/dataStatistics',
    name: 'dataStatistics',
    component: Main,
    meta: {
      icon: '_Datastatistics',
      title: '数据统计',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        meta: {
          icon: '_Datastatistics',
          title: '数据统计'
        },
        component: () => import('@/view/dataStatistics')
      },
    ]
  },
  // 系统设置
  {
    path: '/systemSet',
    name: 'systemSet',
    component: Main,
    meta: {
      icon: '_Systemsettings',
      title: '系统设置',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'systemSetting',
        name: 'systemSetting',
        meta: {
          icon: '_Systemsettings-',
          title: '系统设置'
        },
        component: () => import('@/view/systemSet/systemSet.vue')
      },
      {
        path: 'help',
        name: 'help',
        meta: {
          icon: '_Helpandfeedback',
          title: '帮助'
        },
        component: () => import('@/view/systemSet/help.vue')
      },
      {
        path: 'createHelp',
        name: 'createHelp',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '新建帮助'
        },
        component: () => import('@/view/systemSet/createHelp.vue')
      },
      {
        path: 'feedback',
        name: 'feedback',
        meta: {
          icon: '_Helpandfeedback',
          title: '反馈'
        },
        component: () => import('@/view/systemSet/feedback.vue')
      },
    ]
  },

  {
    path: '/customerService',
    name: 'customerService',
    component: Main,
    meta: {
      icon: '_Customerservice',
      title: '现报云客服',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'service',
        name: 'service',
        meta: {
          icon: '_Customerservice',
          title: '现保云客服'
        },
        component: () => import('@/view/customerService')
      },
    ]
  },

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
