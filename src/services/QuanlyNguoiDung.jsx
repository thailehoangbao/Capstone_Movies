import { GROUPID } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor () {
        super();
    }


    layThongTinDangNhap = (thongTinDangNhap) => {
        return this.post(`api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }

    layThongTinDangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
    }
}


export const quanlyNguoiDungService = new QuanLyNguoiDungService();
