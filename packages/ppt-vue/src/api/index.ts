import request from "@/utils/request"

export const getUserInfo = () =>
    request.post('/checkUserLogin')