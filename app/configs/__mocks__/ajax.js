import axios from 'axios';
import fetchUserList from '../../mocks/apis/sys/userManage/fetchUserList';
import fetchUserDepttList from '../../mocks/apis/sys/userManage/fetchUserDepttList';
import fetchButtonList from '../../mocks/apis/sys/roleManage/fetchButtonList';
import fetchRoleList from '../../mocks/apis/sys/userManage/fetchRoleList';
import fetchTreeList from '../../mocks/apis/sys/roleManage/fetchTreeList';
import fetchModuleListInRole from '../../mocks/apis/sys/roleManage/fetchModuleListInRole';

// 创建发起api的启动器
export const createApi = function (api, type) {
  fetchUserList.data.totalCount = null;
  if (type == 'fetchUserList') {
    return backState(fetchUserList);
  }
  if (type == 'fetchUserDepttList') {
    return backState(fetchUserDepttList);
  }
  if (type == 'fetchButtonList') {
    return backState(fetchButtonList);
  }
  if (type == 'fetchRoleList') {
    return backState(fetchRoleList);
  }
  if (type == 'fetchTreeList') {
    return backState(fetchTreeList);
  }
  fetchModuleListInRole.data.list[0].status = true;
  if (type == 'fetchModuleListInRole') {
    return backState(fetchModuleListInRole);
  }
  const param = {
    data: {
      list: [],
    },
    msg: '操作成功',
    status: 1,
  };
  return backState(param);
};
function backState(param) {
  return (data, callback, callback2) => {
    callback(param);
    if (callback2) {
      callback2(param);
    }
  };
}
