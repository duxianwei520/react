import React from "react";
import Enzyme from "../../../../Enzyme.js";
import RoleManage from "../../../../../app/pages/set/roleManage/index";
import ModuleManage from "../../../../../app/pages/set/moduleManage/index";
import AddModal from "../../../../../app/pages/set/moduleManage/modal/moduleAdd";
import fetchModuleDetail from "../../../../../app/mocks/apis/sys/moduleManage/fetchModuleDetail";

const moduleManage = Enzyme.mount(<ModuleManage />);
jest.mock("../../../../../app/configs/ajax");
jest.mock("../../../../../app/apis/manage.js");
jest.mock("../../../../../app/components/draw/draw");
jest.mock("../../../../../app/pages/set/moduleManage/modal/addButtonModal");

let form;
const ModalParam = {
  handleOk: moduleManage.instance().handleOk,
  visible: true,
  title: moduleManage.state("title"),
  pid: "",
  itemId: "",
  values: [],
  type: "add",
  onCancel: moduleManage.instance().handleCancel
};

function modalParam(ModalParam) {
  Enzyme.mount(
    <AddModal wrappedComponentRef={node => (form = node)} {...ModalParam} />
  );
  const addModal = Enzyme.mount(
    <AddModal.WrappedComponent {...ModalParam} form={form.props.form} />
  );
  return addModal;
}
test("add", () => {
  const add = {
    handleOk: moduleManage.instance().handleOk,
    title: "新增菜单",
    Visible: true,
    pid: "",
    itemId: 10063,
    type: "add",
    values: {}
  };
  const addModal = modalParam(add);
  addModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
  addModal
    .prop("form")
    .setFieldsValue({ parentId: fetchModuleDetail.data.deptCode });
  addModal
    .prop("form")
    .setFieldsValue({ resName: fetchModuleDetail.data.resName });
  addModal
    .prop("form")
    .setFieldsValue({ sort: fetchModuleDetail.data.sort });
  addModal
    .prop("form")
    .setFieldsValue({ resModule: fetchModuleDetail.data.resModule });
  addModal
    .prop("form")
    .setFieldsValue({ resKey: fetchModuleDetail.data.resKey });
  addModal
    .prop("form")
    .setFieldsValue({ resIcon: fetchModuleDetail.data.resIcon });
  addModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
});
test("edit", () => {
  //编辑参数
  const editParam = {
    handleOk: moduleManage.instance().handleOk,
    title: "修改菜单",
    Visible: true,
    pid: "",
    itemId: 10063,
    type: "modify",
    values: fetchModuleDetail.data
  };
  const editModal = modalParam(editParam);
  //表单验证
  editModal.prop("form").validateFields((err, values) => {
    expect(values.parentId).toBe(editModal.prop("pid"));
    expect(values.resName).toBe(fetchModuleDetail.data.resName);
    expect(values.sort).toBe(String(fetchModuleDetail.data.sort));
    expect(values.resModule).toBe(fetchModuleDetail.data.resModule);
    expect(values.resKey).toBe(fetchModuleDetail.data.resKey);
    expect(values.resIcon).toBe(fetchModuleDetail.data.resIcon);
  });
  //提交
  editModal
    .find(".ant-modal-footer button")
    .at(0)
    .simulate("click");
  
});
