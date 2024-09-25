// Kiem tra xem input co rỗng ko
function isEmptyInput(theThongBao, value) {
  if (value == "") {
    theThongBao.innerHTML = "Vui long ko bo trong";
    return true;
  } else {
    theThongBao.innerHTML = "";
    return false;
  }
}

// Kiem tra chieu dai input
function isValidLength(theThongBao, value, min, max) {
  let doDai = value.length;
  if (doDai < min || doDai > max) {
    theThongBao.innerHTML = `Vui long nhap trong khoang tu ${min} den ${max}`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

// Kiem tra xem chuoi co phai toan chu ko
function isLetterOnly(theThongBao, value) {
  let pattern = /^[A-Za-z\s]+$/; // Only letter and white space
  if (pattern.test(value)) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui long chi nhap chu";
    return false;
  }
}

// Kiem tra dinh dang email
function isValidEmail(theThongBao, value) {
  let pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (pattern.test(value)) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui long nhap dung dinh  dang email";
    return false;
  }
}

// Kiem tra xem password co thoa man dieu kien hay ko
function isValidPass(theThongBao, value) {
  let pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/;
  if (pattern.test(value)) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui long nhap mat khau co it nhat 1 ky tu viet hoa, 1 ky tu so va mot ky tu dac biet";
    return false;
  }
}

// Kiem tra range luong xem co valid ko
function isValidSalary(theThongBao, value) {
  if ((value >= 1000000) & (value <= 20000000)) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui long nhap luong trong khoang 1.000.000 den 20.000.000";
    return false;
  }
}

// Kiem tra chuc vu co hop le ko
function isValidPosition(theThongBao, value) {
  if (value == "Chọn chức vụ") {
    theThongBao.innerHTML = "Vui long chon chuc vu hop le";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

// Kiem tra so gio lam trong thang
function isValidWorkingHours(theThongBao, value) {
  if ((value >= 80) & (value <= 200)) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui long nhap gio lam trong thang khoang tu 80h den 200h";
    return false;
  }
}
