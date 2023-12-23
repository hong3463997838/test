import {v4 as uuidv4} from 'uuid';
export const getUUID=()=>{
    // 先判断本地存储中是否有uuid
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){
        // 没有，则生成uuid
        uuid_token=uuidv4();
        // 进行本地存储
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token;
}