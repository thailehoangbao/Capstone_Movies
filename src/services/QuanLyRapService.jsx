import {  GROUPID } from "../utils/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor () {
        super();
    }
    // ?maNhom=${GROUPID}
    layThongTinHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`)
    }
}


export const quanlyRapService = new QuanLyRapService();
