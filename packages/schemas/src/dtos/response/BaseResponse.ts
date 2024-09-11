export interface BaseResponse  {
    status: 'success' | 'error';
    message?: string;
}