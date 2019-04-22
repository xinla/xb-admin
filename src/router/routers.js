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
      icon: 'md-menu',
      title: '基础管理',
      hideInMenu: false,
      notCache: true
    },
    children:[
      {
        path: 'lessee',
        name: 'lessee',
        meta: {
          icon: 'md-funnel',
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
        component: () => import('@/view/basicManage/lessee/create')
      },
      {
        path: 'lesseeDetail',
        name: 'lesseeDetail',
        meta: {
          icon: 'md-funnel',
          title: '租户详情',
          hideInMenu: true,
        },
        component: () => import('@/view/basicManage/lessee/detail/index')
      }
    ]
  },
  // 合作管理
  {
    path: '/cooperationManage',
    name: 'cooperationManage',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '合作管理',
      notCache: true
    },
    children: [
      {
        path: 'supplierManage',
        name: 'supplierManage',
        meta: {
          icon: 'md-funnel',
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
          icon: 'md-funnel',
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
      {
        path: 'baseInfo',
        name: 'baseInfo',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '基本信息'
        },
        component: () => import('@/view/cooperationManage/productManage/baseInfo')
      },
      {
        path: 'productInsuranceRules',
        name: 'productInsuranceRules',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '投保规则'
        },
        component: () => import('@/view/cooperationManage/productManage/insuranceRules')
      },
      {
        path: 'productExplain',
        name: 'productExplain',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '产品说明'
        },
        component: () => import('@/view/cooperationManage/productManage/productExplain')
      },
      {
        path: 'productAccessory',
        name: 'productAccessory',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '产品附件'
        },
        component: () => import('@/view/cooperationManage/productManage/productAccessory')
      },
    ]
  },

  {
    path: '/applicationManage',
    name: 'applicationManage',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '应用管理',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'systemMessage',
        name: 'systemMessage',
        meta: {
          icon: 'md-funnel',
          title: '系统通知'
        },
        component: () => import('@/view/applicationManage/systemMessage.vue')
      },
      {
        path: 'messageTemplate',
        name: 'messageTemplate',
        meta: {
          icon: 'md-funnel',
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
          icon: 'md-funnel',
          title: '菜单配置',
          hideInMenu: true,
        },
        component: () => import('@/view/applicationManage/menuSet.vue'),
      },
    ]
  },
  // 规则配置
  {
    path: '/ruleConfig',
    name: 'ruleConfig',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '规则配置',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'typeRule',
        name: 'typeRule',
        meta: {
          icon: 'md-funnel',
          title: '类型规则'
        },
        component: () => import('@/view/ruleConfig/type.vue')
      },
      {
        path: 'characterRule',
        name: 'characterRule',
        meta: {
          icon: 'md-funnel',
          title: '角色规则'
        },
        component: () => import('@/view/ruleConfig/role.vue')
      },
      {
        path: 'insureRule',
        name: 'insureRule',
        meta: {
          icon: 'md-funnel',
          title: '投保规则'
        },
        component: () => import('@/view/ruleConfig/insure.vue')
      },
      // 通用数据库
      {
        path: 'commonDatabase',
        name: 'commonDatabase',
        meta: {
          icon: 'md-funnel',
          title: '通用数据库'
        },
        component: () => import('@/view/ruleConfig/type.vue'),
        children: [
          {
            path: 'nationalityTable',
            name: 'nationalityTable',
            meta: {
              icon: 'md-funnel',
              title: '国籍表'
            },
            component: () => import('@/view/multilevel/level-2-1.vue')
          },
          {
            path: 'administrativeDivisionTable',
            name: 'administrativeDivisionTable',
            meta: {
              icon: 'md-funnel',
              title: '行政区划表'
            },
            component: () => import('@/view/multilevel/level-2-1.vue'),
          },
          {
            path: 'classCodeTable',
            name: 'classCodeTable',
            meta: {
              icon: 'md-funnel',
              title: '职业代码表'
            },
            component: () => import('@/view/multilevel/level-2-1.vue'),
          }
        ]
      }
    ]
  },

  {
    path: '/industryDatabase',
    name: 'industryDatabase',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '行业数据库',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'insuranceCompany',
        name: 'insuranceCompany',
        meta: {
          icon: 'md-funnel',
          title: '保险公司'
        },
        component: () => import('@/view/industryDatabase/insuranceCompany/list.vue')
      },
      {
        path: 'agency',
        name: 'agency',
        meta: {
          icon: 'md-funnel',
          title: '经代公司'
        },
        component: () => import('@/view/industryDatabase/insuranceCompany/list.vue'),
      },
      {
        path: 'insuranceProduct',
        name: 'insuranceProduct',
        meta: {
          icon: 'md-funnel',
          title: '保险产品'
        },
        component: () => import('@/view/industryDatabase/insuranceCompany/list.vue'),
      }
    ]
  },

  {
    path: '/financialSettlement',
    name: 'financialSettlement',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '财务结算',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'shouldStatement',
        name: 'shouldStatement',
        meta: {
          icon: 'md-funnel',
          title: '应结账单'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'invoiceManage',
        name: 'invoiceManage',
        meta: {
          icon: 'md-funnel',
          title: '发票管理'
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'allOrders',
        name: 'allOrders',
        meta: {
          icon: 'md-funnel',
          title: '全部订单'
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        meta: {
          icon: 'md-funnel',
          title: '订单详情'
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      }
    ]
  },

  {
    path: '/dataStatistics',
    name: 'dataStatistics',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '数据统计',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'dataIndex',
        name: 'dataIndex',
        meta: {
          icon: 'md-funnel',
          title: '数据统计'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
    ]
  },

  {
    path: '/setting',
    name: 'setting',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '系统设置',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'helpAndFeedback',
        name: 'helpAndFeedback',
        meta: {
          icon: 'md-funnel',
          title: '帮助与反馈'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'systemSetting',
        name: 'systemSetting',
        meta: {
          icon: 'md-funnel',
          title: '系统设置'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'createHelp',
        name: 'createHelp',
        meta: {
          icon: 'md-funnel',
          title: '新建帮助'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
    ]
  },

  {
    path: '/service',
    name: 'service',
    component: Main,
    meta: {
      icon: 'md-menu',
      title: '现报云客服',
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: 'serviceIndex',
        name: 'serviceIndex',
        meta: {
          icon: 'md-funnel',
          title: '现报云客服'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
    ]
  },

  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
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
