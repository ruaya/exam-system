export function success(vm, message) {
  vm.$messager.alert({
    title: "success",
    icon: 'ok',
    msg: message
  });
}
export function error(vm, message) {
  vm.$messager.alert({
    title: "Error",
    icon: "error",
    msg: message
  });
}