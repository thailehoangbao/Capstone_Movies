import { GROUPID } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService {
    constructor () {
        super();
    }

    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`)
    }

    layDanhSachPhim = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    themPhimUpHinhAnh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`,formData);
    }

    layThongTinPhimEdit = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }

    capNhatPhimUpdate = (formData) => {
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData);
    }

    xoaPhimAdmin = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
}


export const quanlyPhimService = new QuanLyPhimService();
