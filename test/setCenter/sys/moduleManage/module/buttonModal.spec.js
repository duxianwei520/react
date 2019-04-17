import React from "react";
import Enzyme from "../../../../Enzyme.js";
import RoleManage from "../../../../../app/pages/set/roleManage/index";
import ModuleManage from "../../../../../app/pages/set/moduleManage/index";
import ButtonModal from "../../../../../app/pages/set/moduleManage/modal/buttonModal";
import fetchButtonList from "../../../../../app/mocks/apis/sys/roleManage/fetchButtonList";

jest.mock("../../../../../app/configs/ajax");
jest.mock("../../../../../app/apis/manage.js");
jest.mock("../../../../../app/components/draw/draw");
jest.mock("../../../../../app/pages/set/moduleManage/modal/addButtonModal");

const moduleManage = Enzyme.mount(<ModuleManage />);
function modalParam(ModalParam) {
  return Enzyme.mount(<ButtonModal {...ModalParam} />);
}
fetchButtonList.data.list[0].status = 1;
//页面表格渲染
const editParam = {
  Visible: true,
  pid: "",
  itemId: 10063,
  dataSource: fetchButtonList.data.list,
  listLoading: true,
  title: "模块按钮权限列表",
  addButton: moduleManage.instance().addButton,
  updateList: moduleManage.instance().getButtonList,
  editButton: moduleManage.instance().editButton
};
const BtnModal = modalParam(editParam);

test("delete", () => {
  BtnModal.find("tbody tr")
    .at(0)
    .find("a")
    .at(2)
    .simulate("click");
  BtnModal.find("Popconfirm button")
    .at(1)
    .simulate("click");
});
test("edit", () => {
  BtnModal.find("tbody tr")
    .at(0)
    .find("a")
    .at(1)
    .simulate("click");
});
test("showOrHide", () => {
  BtnModal.find("tbody tr")
    .at(0)
    .find("a")
    .at(0)
    .simulate("click");
  BtnModal.find("Popconfirm button")
    .at(1)
    .simulate("click");
});
test("add", () => {
  BtnModal.find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
});
//表格数据
test("module list", () => {
  expect(BtnModal.find("tbody tr").length).toBe(
    fetchButtonList.data.list.length
  );
});
