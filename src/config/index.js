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
    // dev: 'http://192.168.1.64', // 虚拟机 liusiyuan
    dev: 'http://192.168.1.32', // 本地
    dev1: 'http://192.168.1.150:8888', // caikefu
    // pro: 'http://112.31.212.46:8118', // line
    pro: 'http://47.98.153.101:8118', // ali line
    // pro1: 'http://112.31.212.46:8888' // caikefu
    pro1: 'https://gateway.visualinsur.cn:8888' // ali caikefu
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
config.domain = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

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
  policyDictCategory: '/policyDictCategory',
  insurance: '/insurance',
  proposal: '/vitProposal',
  version: '/version',
  role: '/role',

  upload: config.domain + '/upload',
  // mSystemHelp: config.baseUrl.dev2 + '/systemHelp',
  saas: '/api/permission/company/saas',
}


export default config
