// Khoi tao mang chua toan bo nhan vien
let arrNhanVien = [];

// Lay value tu form nguoi dung
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");
  console.log(arrField.value);
  let nhanVien = new NhanVien();

  // Variable to check if user info is validated or not
  let isSatisfied = true;

  for (field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;

    // Check empty input and notify to user
    let theThongBao =
      field.parentElement.parentElement.querySelector("span.sp-thongbao");
    let validationType = field.getAttribute("data-validation");
    let minLength = field.getAttribute("data-min");
    let maxLength = field.getAttribute("data-max");

    if (isEmptyInput(theThongBao, value)) {
      isSatisfied = false;
    } else {
      switch (validationType) {
        case "validate-length":
          if (!isValidLength(theThongBao, value, minLength, maxLength)) {
            isSatisfied = false;
          }
          break;
        case "validate-name":
          if (!isLetterOnly(theThongBao, value)) {
            isSatisfied = false;
          }
          break;
        case "validate-email":
          if (!isValidEmail(theThongBao, value)) {
            isSatisfied = false;
          }
          break;
        case "validate-pass":
          if (
            !isValidPass(theThongBao, value) ||
            !isValidLength(theThongBao, value, minLength, maxLength)
          ) {
            isSatisfied = false;
          }
          break;
        case "validate-salary":
          if (!isValidSalary(theThongBao, value)) {
            isSatisfied = false;
          }
          break;
        case "validate-position":
          if (!isValidPosition(theThongBao, value)) {
            isSatisfied = false;
          }
          break;
        case "validate-working-hours":
          if (!isValidWorkingHours(theThongBao, value)) {
            isSatisfied = false;
          }
          break;
      }
    }
  }
  return isSatisfied ? nhanVien : null;
}

// Delete nhan vien
function deleteNhanVien(tknv) {
  let index = arrNhanVien.findIndex((item) => item.tknv == tknv);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    // Update data in local storage
    setLocalStorage("arrNhanVien", arrNhanVien);
    // Display data on UI
    renderDataNhanVien(arrNhanVien);
  }
}

// Get info nhan vien
function getInfoNhanVien(tknv) {
  let nhanVien = arrNhanVien.find((item) => item.tknv == tknv);
  if (nhanVien) {
    let arrField = document.querySelectorAll(
      "#formQLNV input,#formQLNV select"
    );
    for (let field of arrField) {
      field.value = nhanVien[field.id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
  }
}

// Store data in local storage
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Archive data from local storage
function archiveLocalData(key) {
  let local_data = localStorage.getItem(key);
  return local_data ? JSON.parse(local_data) : null;
}

// Render stored data when reload
window.onload = function () {
  let local_data = archiveLocalData("arrNhanVien");
  if (local_data) {
    arrNhanVien = local_data;
    renderDataNhanVien(arrNhanVien);
  }
};

// Cap nhat thong tin nhan vien
document.getElementById("btnCapNhat").onclick = function () {
  let nhanVien = getValueForm();
  if (!nhanVien) {
    return;
  }
  let index = arrNhanVien.findIndex((item) => item.tknv == nhanVien.tknv);
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    // Update data in local storage
    setLocalStorage("arrNhanVien", arrNhanVien);
    // Display data on UI
    renderDataNhanVien(arrNhanVien);
    document.getElementById("tknv").readOnly = false;
    document.getElementById("formQLNV").reset();
  }
};

// Hien thi thong tin nhan vien len bang
function renderDataNhanVien(arrNhanVien) {
  let content = "";
  for (let nhanVien of arrNhanVien) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = newNhanVien;

    let formattedNumberVND = newNhanVien
      .tinhTongLuong()
      .toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    content += `
        <tr>
            <td>${tknv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${datepicker}</td>
            <td>${chucvu}</td>
            <td>${formattedNumberVND}</td>
            <td>${newNhanVien.phanLoaiNhanVien()}</td>
            <td>
                <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xoa</button>
                <button
                    onclick="getInfoNhanVien('${tknv}')"
                    class="btn btn-warning"
                    data-toggle="modal"
                    data-target="#myModal"
                >
                    Sua
                </button>
            </td>
        </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

// Clear input from previous trial
document.getElementById("btnThem").onclick = function () {
  document.getElementById("formQLNV").reset();
};

// Check if tknv exist
function isDuplicateTKNV(tknv) {
  let index = arrNhanVien.findIndex((item) => item.tknv == tknv);
  if (index == -1) {
    return false;
  }
  return true;
}

// Them nhan vien
document.getElementById("btnThemNV").onclick = function () {
  let nhanVien = getValueForm();
  if (!nhanVien | isDuplicateTKNV(nhanVien.tknv)) {
    return;
  }
  arrNhanVien.push(nhanVien);
  // Update data in local storage
  setLocalStorage("arrNhanVien", arrNhanVien);
  // Display data on UI
  renderDataNhanVien(arrNhanVien);
  // Reset sau khi nguoi dung nhap xong du lieu
  document.getElementById("formQLNV").reset();
};

// Tim kiem nhan vien theo loai
document.getElementById("searchName").oninput = function (event) {
  let keyWord = event.target.value.trim().toLowerCase(); // Loai bo khoang trang thua
  let newKeyWord = removeVietnameseTones(keyWord);
  let arrSearch = arrNhanVien.filter((item, i) => {
    let nhanVien = new NhanVien();
    nhanVien.gioLam = item.gioLam;
    let newTenNV = removeVietnameseTones(
      nhanVien.phanLoaiNhanVien().trim().toLowerCase()
    );
    return newTenNV.includes(newKeyWord);
  });
  renderDataNhanVien(arrSearch);
};
