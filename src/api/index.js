// eslint-disable-next-line standard/object-curly-even-spacing
import { post, get, deleted, put, putJson} from '@/utils/axios.js'
// 添加请求拦截
// 登录请求
export const Login = params => {
  return post(`userLogin`, params).then(res => {
    return res
  })
}
// 查询数据接口
export const getdatainter = params => {
  return get(`datainter`, params).then(res => {
    return res
  })
}

// 添加数据源
export const getDataSre = params => {
  return post(`/etl/sys=saveSource`, params).then(res => {
    return res
  })
}

// 添加部门
export const postageOrgDept = params => {
  return post(`orgDept`, params)
    .then(res => {
      return res
    })
}
// 查询部门信息
export const postponeOrgDept = params => {
  return get(`orgDept`, params)
    .then(res => {
      return res
    })
}
// 查询详情信息
export const posteOrgDept = params => {
  return get(`orgDept/appId`, params)
    .then(res => {
      return res
    })
}
// 编辑数据
export const postdateOrgDept = params => {
  return put(`orgDept/appId`, params)
    .then(res => {
      return res
    })
}
// 自动生成部门编号
export const outnumberOrgDept = params => {
  return post(`orgDept/number`, params)
    .then(res => {
      return res
    })
}
// 删除部门数据
export const postDeleteOrgDept = params => {
  return deleted(`orgDept/appId`, params)
    .then(res => {
      return res
    })
}
// 添加分类岗位
export const postSaveOrgStationType = params => {
  return post(`stationType`, params)
    .then(res => {
      return res
    })
}
// 添加岗位
export const postulationManageStationType = params => {
  return post(`stationManage`, params)
    .then(res => {
      return res
    })
}
// 岗位分类编号
export const detestationRenumber = params => {
  return post(`stationType/number`, params)
    .then(res => {
      return res
    })
}
// 岗位编号
export const detstationumberr = params => {
  return post(`stationManage/number`, params)
    .then(res => {
      return res
    })
}
// 所有岗位数据
export const detestationManage = params => {
  return get(`stationManage`, params)
    .then(res => {
      return res
    })
}

// 查询单个岗位详情
export const postulationsManage = params => {
  return get(`stationManage/appId`, params)
    .then(res => {
      return res
    })
}
// 查询岗位
export const postOrgStationManage = params => {
  return get(`stationType/appId`, params)
    .then(res => {
      return res
    })
}
// 编辑确定
export const outstationManage = params => {
  return put(`stationManage/appId`, params)
    .then(res => {
      return res
    })
}
// 删除分类岗位
export const detestationTypeManage = params => {
  return deleted(`stationType/appId`, params)
    .then(res => {
      return res
    })
}
// 删除岗位
export const getRogationManage = params => {
  return deleted(`stationManage/appId`, params)
    .then(res => {
      return res
    })
}
// 岗位树状图
export const getOrgStationType = params => {
  return get(`stationType`, params)
    .then(res => {
      return res
    })
}
// 查询角色树状图
export const getOrgRoleType = params => {
  return get(`roleType`, params)
    .then(res => {
      return res
    })
}
// 添加角色分类
export const petrolsType = params => {
  return post(`roleType`, params)
    .then(res => {
      return res
    })
}
// 分类角色编号
export const petrolsTypename = params => {
  return post(`roleType/number`, params)
    .then(res => {
      return res
    })
}
// 角色编号
export const petroleousManganate = params => {
  return post(`roleManage/number`, params)
    .then(res => {
      return res
    })
}
// 添加角色
export const postponedManage = params => {
  return post(`roleManage`, params)
    .then(res => {
      return res
    })
}
// 查询全角色
export const petronelManage = params => {
  return get(`roleManage`, params)
    .then(res => {
      return res
    })
}
// 删除角色分类
export const roleTypeType = params => {
  return deleted(`roleType/appId`, params)
    .then(res => {
      return res
    })
}
// 删除一个角色
export const postholesType = params => {
  return deleted(`roleManage/appId`, params)
    .then(res => {
      return res
    })
}
// 修改一个角色
export const ethosesTypeAphid = params => {
  return put(`roleManage/appId`, params)
    .then(res => {
      return res
    })
}
// 查询一个角色
export const ethosesType = params => {
  return get(`roleManage/appId`, params)
    .then(res => {
      return res
    })
}
// 查询一个角色分类
export const getableType = params => {
  return get(`roleType/appId`, params)
    .then(res => {
      return res
    })
}
// 人员添加接口
export const focusers = params => {
  return post(`user`, params)
    .then(res => {
      return res
    })
}
// 人员根据部门查用户
export const useragent = params => {
  return get(`user/dept`, params)
    .then(res => {
      return res
    })
}
// 人员删除一个角色
export const posturersType = params => {
  return deleted(`user/appId`, params)
    .then(res => {
      return res
    })
}
// 修改用户
export const posturersIdType = params => {
  return put(`user/appId`, params)
    .then(res => {
      return res
    })
}
// 平台操作接口
export const postoperativeLog = params => {
  return get(`operatingLog`, params)
    .then(res => {
      return res
    })
}
// 应用接口
export const postallyLog = params => {
  return get(`apply`, params)
    .then(res => {
      return res
    })
}
// 应用添加
export const postIdeallyLog = params => {
  return post(`apply`, params)
    .then(res => {
      return res
    })
}
// 应用详情单个查询
export const postagesId = params => {
  return get(`apply/appId`, params)
    .then(res => {
      return res
    })
}
// API接口详情
export const postapimodeld = params => {
  return get(`apimodel`, params)
    .then(res => {
      return res
    })
}
