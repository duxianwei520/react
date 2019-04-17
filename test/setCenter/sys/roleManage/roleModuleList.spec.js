import React from "react";
import Enzyme from "../../../Enzyme.js";
import RoleManage from "../../../../app/pages/set/roleManage/index";
import fetchRoleList from "../../../../app/mocks/apis/sys/userManage/fetchRoleList";
import UserList from "../../../../app/mocks/apis/sys/userManage/fetchUserList";
import fetchTreeList from "../../../../app/mocks/apis/sys/roleManage/fetchTreeList";
import fetchModuleListInRole from "../../../../app/mocks/apis/sys/roleManage/fetchModuleListInRole";
import RoleModuleList from "../../../../app/pages/set/roleManage/roleModuleList";
import RoleCheckbox from "../../../../app/pages/set/roleManage/roleCheckbox";
jest.mock("../../../../app/configs/ajax");
jest.mock("../../../../app/apis/manage.js");
let form;
Enzyme.mount(<RoleManage wrappedComponentRef={node => (form = node)} />);
let roleManage = Enzyme.mount(
  <RoleManage.WrappedComponent form={form.props.form} />
);

describe("roleModuleList", () => {
  const listParam = {
    dataSource: [],
    checkedId: [],
    onCheckModify: roleManage.instance().handleCheckModify,
    buttonList:roleManage.instance().buttonList
  };
  const roleModule = Enzyme.mount(<RoleModuleList {...listParam} />);
  roleModule.setProps({
    dataSource: fetchModuleListInRole.data.list,
    checkedId: [10062, 10063, 10108, 10109, 10110, 10118, 11003]
  });
  test("rolecheckbox", () => {
    const checkboxParam = {
      checkItem: fetchModuleListInRole.data.list[1].children[1],
      onChecked: roleModule.instance().onChecked,
      defaultChecked: false,
      nowRoleName: undefined
    };
    const roleCheckbox = Enzyme.mount(<RoleCheckbox {...checkboxParam} />);
    roleCheckbox.setProps({ defaultChecked: true });
    const event = {
      target: {
        checked: false
      }
    };
    roleCheckbox.instance().onChange(event);
    //未开通的点击成已开通
    event.target.checked = true;
    roleCheckbox.setProps({
      checkItem: fetchModuleListInRole.data.list[1]
    });
    roleCheckbox.instance().onChange(event);

    event.target.checked = false;
    //onInArray函数
    roleCheckbox.setProps({
      checkItem: fetchModuleListInRole.data.list[1].children[2]
    });
    roleModule.setState({ checkedIds: null });
    roleCheckbox.instance().onChange(event);
        roleModule.setState({
      checkedIds: [10062, 10108]
    });
    roleCheckbox.setProps({
      checkItem: fetchModuleListInRole.data.list[1].children[0]
    });
    roleCheckbox.instance().onChange(event);

    //fatherArr.length === 1判断

    fetchModuleListInRole.data.list[1].children.pop();
    fetchModuleListInRole.data.list[1].children.pop();
    roleCheckbox.setProps({
      checkItem: fetchModuleListInRole.data.list[1].children[0]
    });
    event.target.checked = false;
    roleCheckbox.instance().onChange(event);
    event.target.checked = true;
    roleCheckbox.instance().onChange(event);
    //拥有两个父级
    event.target.checked = false;
    roleCheckbox.setProps({
      checkItem: fetchModuleListInRole.data.list[1].children[0].children[0]
    });
    roleCheckbox.instance().onChange(event);
  });
  //按钮权限
  test('buttonList',()=>{
   roleModule.find('tbody tr').at(0).find('a').simulate('click')
  })
  
});
