import {  GROUPID } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor () {
        super();
    }

    layThongTinHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`)
    }


    layThongTinTatCaHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    }

    layThongTinCumRapTheoHeThongRap = (maHTR) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTR}`);
    }
}


export const quanlyRapService = new QuanLyRapService();
