import {useAxios} from '../../hooks/userAxios';
import {ResultEdit} from '@/config/ResultModel';
import {SettingInfo} from '@/views/settting';

const request = useAxios();

export const GetSettingInfo = async () => {
    const res = await request.get({url: '/api/buttoms'});
    return res as unknown as SettingInfo;
};

export const PostSettingInfo = async (data: any) => {
    const res = await request.post({url: '/api/setting', data});
    return res as unknown as ResultEdit<any>;
};