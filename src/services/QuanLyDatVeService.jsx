import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { GROUPID } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
    constructor () {
        super();
    }


    layChiTietPhongVe = (maLichChieu) => {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }


    datVe = (thongTinDatVe) => {
        return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
    }
}


export const quanlyDatVeService = new QuanLyDatVeService();
