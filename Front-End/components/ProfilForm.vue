<template>
    <form class="m-6" v-if="FullNameForm|EmailForm|PseudoForm">
    <div v-if="FullNameForm">
        <div class="md:flex md:items-center m-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" for="inline-full-name">Nom</label>
            </div>
            <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="Name" type="text" value="Entrez nouveau nom">
            </div>
        </div>
        <div class="md:flex md:items-center m-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" for="inline-full-name">Prénom</label>
            </div>
            <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="FullName" type="text" value="Entrer votre prénom">
            </div>
        </div>
    </div>
    <div v-if="PseudoForm">
        <div class="md:flex md:items-center m-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" for="inline-full-name">Pseudo</label>
            </div>
            <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="Pseudo" type="text" value="Entrer votre Pseudo">
            </div>
        </div> 
    </div>
    <div v-if="EmailForm">
        <div class="md:flex md:items-center m-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" for="inline-full-name">E-mail</label>
            </div>
            <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="Email" type="text" value="Entrer votre adresse">
            </div>
        </div> 
    </div>
    <div class="md:flex items-center">
    <div>
      <button class="shadow bg-purple-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" v-on:click="UpdateData()" type="button">
        Valider
      </button>
    </div>
  </div>
  </form>
</template>

<script>
    export default {
        name:"ProfilForm",
        props:["IdUser","FullNameForm","PseudoForm","EmailForm"],
        data(){
            return{
                IdUser:0,
                FullNameForm:false,
                PseudoForm:false,
                EmailForm:false
            }
        },
        methods:{
            UpdateData()
            {
                const axios = require('axios').default;
                let urlApi = process.env.BaseApiStrapiUrl + "/users/"+this.IdUser+"?populate[0]=Avatar"
                let NewName,NewFullName,NewPseudo,NewEmail;

                if(document.getElementById("Name"))
                {
                    NewName=document.getElementById("Name").value;
                }

                if(document.getElementById("FullName"))
                {
                    NewFullName=document.getElementById("FullName").value;
                }

                if(document.getElementById("Pseudo"))
                {
                    NewPseudo=document.getElementById("Pseudo").value;
                }

                if(document.getElementById("Email"))
                {
                    NewEmail=document.getElementById("Email").value;
                }

                let username,Name,FullName,email;
                let data ={username,Name,FullName,email};
                
                if(NewName|NewName!=""){
                    data.Name = NewName ;
                }

                if(NewFullName|NewFullName!=""){
                    data.FullName = NewFullName ;
                }

                if(NewPseudo|NewPseudo!=""){
                    data.username = NewPseudo;
                }

                if(NewEmail|NewEmail!=""){
                    data.email = NewEmail;
                }

                if(data.Name==null)
                {
                    delete data.Name;
                }

                if(data.FullName==null)
                {
                    delete data.FullName;
                }

                if(data.username==null)
                {
                    delete data.username;
                }

                if(data.email==null)
                {
                    delete data.email;
                }

                console.log(data);
                axios.put(urlApi,data).then(
                    res=>console.log(res)
                );
                location.reload();
            }
        }
    }
</script>