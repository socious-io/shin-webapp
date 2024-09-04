import { AdaptorRes } from '..';
import { SuccessRes } from '../general/index.types';

export const forgetPasswordAdaptor = async (email: string): Promise<AdaptorRes<SuccessRes>> => {
    try {
        //TODO: call forgetPassword API
        // TODO: map the result
        const data = {
            message: 'succeed',
        };
        return {
            data,
            error: null,
        };
    } catch {
        return {
            data: null,
            error: 'Error in forget password API call',
        };
    }
};

export const resetPasswordAdaptor = async (password: string): Promise<AdaptorRes<SuccessRes>> => {
    try {
        //TODO: call resetPassword API
        // TODO: map the result
        const data = {
            message: 'succeed',
        };
        return {
            data,
            error: null,
        };
    } catch {
        return {
            error: 'Error in reset password API call',
            data: null,
        };
    }
};
