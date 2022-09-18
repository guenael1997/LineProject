<template>
  <div>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg place-content-center m-8">
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg font-medium leading-6 text-gray-900">Information Profil</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
  </div>
  <div class="border-t border-gray-200">
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Full name</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{{nom}}</dd>
        <button href="#" class="font-medium text-indigo-600 hover:text-indigo-500" v-on:click="EnableForm('FullName')">Changer le nom</button>
      </div>
      <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Pseudo</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{{pseudo}}</dd>
        <button href="#" class="font-medium text-indigo-600 hover:text-indigo-500" v-on:click="EnableForm('Pseudo')">Changer le pseudo</button>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Email address</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{{email}}</dd>
        <button href="#" class="font-medium text-indigo-600 hover:text-indigo-500" v-on:click="EnableForm('EmailForm')">Changer l'adresse mail</button>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 sm:col-span-2">Mot de passe</dt>
        <button href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Changer votre mot de passe</button>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Avatar</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex items-center justify-between py-3 pl-3 pr-4 text-sm rounded-md border border-gray-200">
            <div class="flex w-0 flex-1 items-center">
                <!-- Heroicon name: mini/paper-clip -->
                <svg class="h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                </svg>
                <span class="ml-2 w-0 flex-1 truncate">{{img}}</span>
                <input type="file" id="Avatar">
              </div>
              <div class="ml-4 flex-shrink-0">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" v-on:click="PostPicture()">Changer l'image</a>
              </div></dd>
      </div>
    </dl>
  </div>
</div>
<div class="overflow-hidden bg-white shadow sm:rounded-lg place-content-center m-8">
  <ProfilForm :IdUser="IdUser" :FullNameForm="FullNameForm" :PseudoForm="PseudoForm" :EmailForm="EmailForm" />
</div>
</div>
</template>

<script>
    export default {
      name: 'ProfilMenuUI',
      props:['pseudo','email','nom','img','IdUser'],
      data(){
        return {
          IdUser:0,
          pseudo:"",
          email:"",
          nom:"",
          img:"",
          FullNameForm:false,
          PseudoForm:false,
          EmailForm:false

        }
      },
      methods : {
        EnableForm(Form){
                switch(Form)
                {
                    case "FullName":
                    this.FullNameForm=true;
                    break;

                    case "Pseudo":
                    this.PseudoForm=true;
                    break;

                    case "EmailForm":
                    this.EmailForm=true;
                    break;
                }
            },
        PostPicture(){
          const axios = require('axios').default;
          let ApiUrl = process.env.BaseApiStrapiUrl+"/upload"
          let Avatar = document.getElementById("Avatar").files[0];
          let formData = new FormData();
          formData.append("files",Avatar);
          axios({
            method:'post',
            url:ApiUrl,
            data:formData
          }
          ).then(
            res=>{
              let AvatarID = res.data[0].id ;
              let ApiUrlFile = process.env.BaseApiStrapiUrl+"/upload/files/"+AvatarID;
              console.log(AvatarID);
              axios.get(ApiUrlFile).then(
                res2=> {
                  console.log(res2.data)
                  let data = {Avatar:res2.data};
                  let ApiUrlUser = process.env.BaseApiStrapiUrl + "/users/"+this.IdUser+"?populate[0]=Avatar";
                  axios.put(ApiUrlUser,data);
                }
              )
            }
          );
          alert("Votre nouvel avatar a bien été enregistré")
        }
      }
    }
</script>