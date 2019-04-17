import React from "react";
import Enzyme from "../../../Enzyme.js";
import RoleManage from "../../../../app/pages/set/roleManage/index";
import fetchRoleList from "../../../../app/mocks/apis/sys/userManage/fetchRoleList";
import UserList from "../../../../app/mocks/apis/sys/userManage/fetchUserList";
import fetchTreeList from "../../../../app/mocks/apis/sys/roleManage/fetchTreeList";
import RoleModuleList from "../../../../app/pages/set/roleManage/roleModuleList";

let form;
Enzyme.mount(<RoleManage wrappedComponentRef={node => (form = node)} />);
let roleManage = Enzyme.mount(
  <RoleManage.WrappedComponent form={form.props.form} />
);


test("roleCheckbox", () => {
  const listParam = {
    dataSource: [],
    checkedId: []
  };
  const roleModule = Enzyme.mount(<RoleModuleList {...listParam} />);
  roleModule.setProps({
    dataSource: fetchTreeList.data.list,
    checkedId: [10062, 10063, 10108, 10109, 10110]
  });
  roleModule
    .find("tbody tr")
    .at(1)
    .find("span")
    .at(1)
    .simulate("click");
});
