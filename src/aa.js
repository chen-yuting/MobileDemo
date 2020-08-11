doResult= function (res) {
    if (res.code === 0) {
      layer.msg(res.msg);
      console.log("aaa");
      return true;
    } else {
      layer.alert(res.msg);
      return false;
    }
  }