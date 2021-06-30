import store from '@/store'

export default function() {
  console.log('start')
 console.log(store.getters.getInfos.user.role)
  console.log('end')
 return store.getters.getInfos.user.role

}
