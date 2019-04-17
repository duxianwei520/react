import React from "react";
import Enzyme from "../../../../Enzyme.js";
import RoleManage from "../../../../../app/pages/set/roleManage/index";
import ButtonModal from "../../../../../app/pages/set/roleManage/modal/buttonModal";
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

const param = {
  title: "按钮权限列表",
  type: "add",
  pid: 10062,
  itemId: 1,
  cancelButton: roleManage.instance().cancelButton,
  saveChecked: roleManage.instance().saveChecked,
  checkedIdArr: []
};
let buttonModal = Enzyme.mount(<ButtonModal {...param} />);
test("全选按钮", () => {
  buttonModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
});
buttonModal.setState({
  selectedRowKeys: [134]
});
test("初始化", () => {
  buttonModal.instance().getList();
});
test("确定按钮", () => {
  buttonModal
    .find(".ant-modal-footer button")
    .at(1)
    .simulate("click");
});
test("页面按钮点击选中", () => {
  buttonModal
    .find(".ant-spin-container button")
    .at(0)
    .simulate("click");
});
