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
    // 测试服
    // dev: 'http://192.168.1.64', // 虚拟机 liusiyuan
    dev: 'http://192.168.1.32:8118', // 本地
    dev2: 'http://192.168.1.150:8888', // v2.0本地 liusiyuan
    dev1: 'http://192.168.1.150:8888', // caikefu

    domainV2: process.env.NODE_ENV === 'development' ? 'http://192.168.1.32:8888' : 'http://192.168.1.26:8888', // wangdong

    // pro: 'http://112.31.212.46:8118', // line
    pro: 'http://192.168.1.26:8118', // ali line
    // pro1: 'http://112.31.212.46:8888' // caikefu
    pro1: 'http://192.168.1.26:8888' // ali caikefu
  },
  // 正式服
  // baseUrl: {
  //   // dev: 'http://192.168.1.64', // 虚拟机 liusiyuan
  //   dev: 'http://47.98.153.101:8118', // 本地
  //   dev1: 'https://gateway.visualinsur.cn:8888', // caikefu

  //   domainV2: process.env.NODE_ENV === 'development' ? 'http://192.168.1.35:8118' : 'https://gateway.visualinsur.cn:8888', // wangdong

  //   // pro: 'http://112.31.212.46:8118', // line
  //   pro: 'http://47.98.153.101:8118', // ali line
  //   // pro1: 'http://112.31.212.46:8888' // caikefu
  //   pro1: 'https://gateway.visualinsur.cn:8888' // ali caikefu
  // },
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
  get domain() {
    return process.env.NODE_ENV === 'development' ? this.baseUrl.dev : this.baseUrl.pro
  },
  get domainCKF() {
    return process.env.NODE_ENV === 'development' ? this.baseUrl.dev1 : this.baseUrl.pro1
  }
}

config.services = {
  company: '/xbcompany',
  menuSet: '-/xbBasePermissionMenu',
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
  sensitive: '/v1/sensitive',
  dataDitionary: '/api/base/v1/dataDict',


  upload: config.domain + '/upload',
  // mSystemHelp: config.baseUrl.dev2 + '/systemHelp',
  saas: '/api/permission/company/saas',
}
config.servicesV2 = {
  saas: '/api/permission/saas',
  product: '/v2/product',
  calculator: '/v2/calculator',
  rate: '/v2/rate',
  profession: '/api/policy-service/v1/sign'
}

export default config