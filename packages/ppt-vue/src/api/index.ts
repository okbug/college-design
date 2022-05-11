import request from "@/utils/request"

export const getUserInfo = () =>
    request.post('/checkUserLogin')

/**
 * 
 * @param userName 用户名称
 * @param id 文档ID
 * @param state 收藏或者不收藏
 * true: 当前为false，改变为收藏
 * false: 当前为true， 改变为不收藏
 */
export const setUserFavoriteState = (userName: string, id: string, state: boolean) => {
    return request.post('/changeUserFavorite', {
        userName,
        id,
        options: state ? 'add' : 'false'
    })
}