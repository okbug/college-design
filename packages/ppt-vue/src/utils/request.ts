import axios, { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'

type IRequest<T = any> = {
  code: number;
  data: T;
  message: string;
};

const request = axios.create({
  baseURL: 'http://localhost:9527',
  withCredentials: true,
})

request.interceptors.response.use((res: AxiosResponse<IRequest<any>>) => {
  if (res.status !== 200) {
    message.error('错误')
    return
  }
  return res.data
})

export default request
