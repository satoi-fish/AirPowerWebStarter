<template>
  <AFrame :menu-list="menuList">
    <template #logo>
      <img
          :src="airpower"
          height="30"
      >
    </template>
    <template #user>
      <AUser :user="currentUserInfo">
        <div>
          <AImage :src="currentUserInfo.avatar"/>
        </div>
        <AInput
            v-model.nickname="currentUserInfo.nickname"
            :tree="menuList"
            :entity="UserEntity"
        />
        <template #setting>
          可选插槽
        </template>
      </AUser>
    </template>
    <router-view/>
  </AFrame>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {AFrame, AImage, AInput, AUser,} from '@/airpower/component'
import {AirConfig} from '@/airpower/config/AirConfig'
import {AirRouter} from '@/airpower/helper/AirRouter'
import {MenuEntity} from '@/model/menu/MenuEntity'
import {UserService} from '@/model/user/UserService'
import {AirWebsocket} from '@/airpower/websocket/AirWebSocket'
import {AirNotification} from '@/airpower/feedback/AirNotification'
import {UserEntity} from '@/model/user/UserEntity'
import airpower from '@/airpower/assets/img/airpower.svg'

const currentUserInfo = ref(new UserEntity())
const menuList = ref([] as MenuEntity[])
const isLoading = ref(false)

async function getMenuList() {
  menuList.value = await UserService.create(isLoading).getMyMenuList()
  AirRouter.initVueRouter(menuList.value, 'console')
}

async function init() {
  currentUserInfo.value = await UserService.create().getMyInfo()
  let permissions = AirConfig.getPermissionList();
  if (permissions.length === 0) {
    permissions = await UserService.create(isLoading).getMyPermissionList();
  }
  AirConfig.savePermissionList(permissions)
  await getMenuList()

  AirWebsocket.create({
    onmessage(message) {
      // eslint-disable-next-line no-console
      console.log(message)
    },
    onopen() {
      AirNotification.success('Websocket连接成功')
    },
  })
}

init()
</script>
<style scoped lang="scss">
.logo {
  text-decoration: none;
  color: white;
}
</style>
