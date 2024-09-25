class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";

  // Method phan loai nhan vien dua tren so gio lam
  phanLoaiNhanVien = function () {
    if (this.gioLam >= 192) {
      return "Xuất sắc";
    } else if (this.gioLam >= 176) {
      return "Giỏi";
    } else if (this.gioLam >= 160) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  };

  //   Tinh luong thang dua tren chuc vu
  tinhTongLuong = function () {
    switch (this.chucvu) {
      case "Sếp":
        return this.luongCB * 3;
      case "Trưởng phòng":
        return this.luongCB * 2;
      default:
        return this.luongCB * 1;
    }
  };
}
