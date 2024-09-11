import { BaseResponse } from "./BaseResponse";

export interface BaseResponseGeneric<T> extends BaseResponse {
    data: T | null;
}