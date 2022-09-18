<template>
    <div class="min-h-full">
    <NavComponents :state='State'/>
  
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Line</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <ProfilMenuComponents v-if='user.Avatar' :nom='user.Name+" "+user.FullName' :pseudo='user.username' :email='user.email' :img='user.Avatar.hash' :IdUser='user.id'/>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
  </template>

  <script>
    export default {
      data(){
        return{
          State:"profil",
          user:{}
        }
      },
      methods : {
        SetUser(){
          const axios = require('axios').default;
          let UserCookieData = localStorage.getItem("UserId");
          let UserIndex = UserCookieData- 1 ;
          let urlApi = process.env.BaseApiStrapiUrl + "/users?populate[0]=Avatar"
          let params = process.env.ApiStrapiTokenPublic;
          axios.get(urlApi,params).then(
            res => {
              this.user = res.data[UserIndex];
            }
          );
        },
      },
      mounted(){
        this.SetUser()
      }
    }
  </script>