import React from "react";
import Enzyme from "../../../../Enzyme.js";
import RoleManage from "../../../../../app/pages/set/roleManage/index";
import RoleAdd from "../../../../../app/pages/set/roleManage/modal/roleAdd";
import fetchRoleDetail from "../../../../../app/mocks/apis/sys/roleManage/fetchRoleDetail";
jest.mock("../../../../../app/configs/ajax");
jest.mock("../../../../../app/apis/manage.js");
jest.mock("../../../../../app/components/draw/draw");
let form1;
Enzyme.mount(<RoleManage wrappedComponentRef={node => (form1 = node)} />);
let roleManage = Enzyme.mount(
  <RoleManage.WrappedComponent form={form1.props.form} />
);
const callback = {};
let form = {};
fetchRoleDetail.data.tjFlag='123'
const param = {
  visible: true,
  title: "修改角色",
  onCancel: roleManage.instance().handleCancel,
  handleOk: roleManage.instance().handleOk,
  value: fetchRoleDetail.data,
  type: "modify",
  modifyId: 1
};
let Form = Enzyme.mount(
  <RoleAdd {...param} wrappedComponentRef={node => (form = node)} />
);

let roleAdd = Enzyme.mount(
  <RoleAdd.WrappedComponent {...param} form={form.props.form} />
);
test("编辑提交", () => {
  const event = {
    preventDefault: function() {}
  };
  roleAdd.instance().handleSubmit(event);
  expect(roleAdd.find(".ant-modal-title").text()).toBe("修改角色");
});
test("新增提交", () => {
  const event = {
    preventDefault: function() {}
  };
  roleAdd.setProps({
    visible: true,
    title: "新增角色",
    onCancel: roleManage.instance().handleCancel,
    handleOk: roleManage.instance().handleOk,
    value: { roleName: "", sort: "", tjFlag: "123" },
    type: "add"
  });
  roleAdd
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
  expect(roleAdd.find(".ant-modal-title").text()).toBe("新增角色");
  roleAdd.prop("form").setFieldsValue({ roleName: "" });
  roleAdd
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
      roleAdd
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
});

