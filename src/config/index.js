const config = {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://192.168.1.55', // 虚拟机
    // dev: 'http://192.168.1.8', // 本地
    dev2: 'http://192.168.1.21:8115/v1',
    pro: 'https://produce.com'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    // 'error-store': {
    //   showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
    //   developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    // }
  },
  
}

config.services = {
  company: '/xbcompany',
  menuSet: '/xbBasePermissionMenu',
  systemHelp: '/xbSystemHelp',
  system: '/system',
  user: '/user',
  systemMessage: '/imNoticeMsg',
  businessInformation: '/xbCompanyBusinessInformation',
  product: '/product',
  supplier: '/xbsupplier',
  supplierUser: '/xbSupplierUser',
  supplierOrganization: '/xbSupplierOrganization',
  supplierNews: '/xbSupplierNews',
  typeRule: '/typeRule',
  profession: '/xbProfession',
  roleGroup: '/roleGroup',
  role: '/role',
  nationality: '/vitNationality',
  role: '/role',
  role: '/role',


  mSystemHelp: config.baseUrl.dev2 + '/systemHelp',
  mCompany: config.baseUrl.dev2 + '/company',
}

export default config
