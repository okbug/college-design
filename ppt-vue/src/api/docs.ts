import request from '@/utils/request'

export const getPPTContent = (id: string) => 
  request.post('/getDocDetail', {
    id
  })


export const updatePPTContent = (data: any) => 
  request.post('updateDocument', data)