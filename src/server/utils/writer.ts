import { ServerResponse } from 'http';
import { ApiError } from 'client/api';

export interface ApiResult<T> {
    code: number
    data?: T
    error?: ApiError
}

// Sends an APIResult to the specified ServerResponse
export const handleResponse = <T>(res: ServerResponse, result: ApiResult<T>) => {
    res.writeHead(result.code, { 'Content-Type': 'application/json' });
    if(result.error) {
        res.write(JSON.stringify(result.error));
    } else if(result.data) {
        res.write(JSON.stringify(result.data));
    }
    res.end();
}