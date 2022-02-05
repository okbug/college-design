import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'

export default () => {
  const { slides } = storeToRefs(useSlidesStore())

  return slides
}