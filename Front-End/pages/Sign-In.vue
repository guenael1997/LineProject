<template>
    <center class="m-8">
    <h1 class="block text-gray-700 text-xl font-bold ">Line</h1>
    <div class="w-full max-w-lg content-center">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="Sign In">
    <div class="flex">
        <div class="m-4 w-1/2">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="last name">
            Nom
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500':NameError}"  id="Last Name" name="FullName" type="text" placeholder="Nom">
        <p v-if=NameError class="text-red-500 text-xs italic">Veuillez remplir ce champs</p>
        </div>
        <div class="m-4 w-1/2">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="first name">
            Prénom
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500':FullNameError}" id="first Name" name="Name" type="text" placeholder="Prénom">
        <p v-if=FullNameError class="text-red-500 text-xs italic">Veuillez remplir ce champs</p>
        </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Pseudo
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500':UsernameError}" id="username" name="username" type="text" placeholder="pseudo">
      <p v-if=UsernameError class="text-red-500 text-xs italic">Veuillez remplir ce champs</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        E-mail
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500':EmailError}" id="email" name="email" type="text" placeholder="email">
      <p v-if=EmailError class="text-red-500 text-xs italic">Veuillez rentrer un mail valide</p>
    </div>
    <div class="flex">
    <div class="m-4 w-1/2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Mot de passe
      </label>
      <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500':PasswordError}" id="password" type="password" name="password" placeholder="******************">
      <p v-if=PasswordError class="text-red-500 text-xs italic">Veuillez remplir ce champs</p>
    </div>
    <div class="m-4 w-1/2">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Confirmez le mot de passe
      </label>
      <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500':RePasswordError}" id="RePassword" type="password" placeholder="******************">
      <p v-if=RePasswordError class="text-red-500 text-xs italic">Les mots de passe ne coressepondent pas</p>
    </div>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" v-on:click="SignIn()">
        Enregistrer
      </button>
    </div>
  </form>
</div>
</center>
</template>

<script>
    export default {
        data(){
            return{
                NameError:false,
                FullNameError:false,
                UsernameError:false,
                EmailError:false,
                PasswordError:false,
                RePasswordError:false
            }
        },
        methods : {
            SignIn(){
                let formData=new FormData(document.getElementById("Sign In"));
                formData.append("confirmed",true);
                console.log(formData.getAll("password"));
                let urlApi = process.env.BaseApiStrapiUrl + "/users";
                const axios = require('axios').default;
                if(this.CheckField(formData)){
                axios({
                    method:'post',
                    url: urlApi,
                    data: formData
                }).then(
                    res=>{
                        alert("Votre profil a été enregistrer avec succès");
                        let data = {Avatar:process.env.DefaultAvatar};
                        axios.put(urlApi+"/"+res.data.id+"?populate=*",data).then(
                            res =>{ console.log(res)}
                        );

                    }
                ).catch(
                    res =>{
                        alert("Ce pseudo ou cette email est déjà utilsé");
                        console.log(res)

                    }
                )
                }
                else
                {
                    alert("Veuillez verifier les champs surligné en rouge")
                }

            },

            CheckField(formData){
                let IsCorrect = true;
                if(!formData.get("Name"))
                {
                    IsCorrect = false;
                    this.NameError=true;
                }

                if(!formData.get("FullName"))
                {
                    IsCorrect = false;
                    this.FullNameError=true;
                }

                if(!formData.get("username"))
                {
                    IsCorrect = false;
                    this.UsernameError=true;
                }

                if(!formData.get("email"))
                {
                    IsCorrect = false;
                    this.EmailError=true;
                }

                if(!formData.get("password"))
                {
                    IsCorrect = false;
                    this.PasswordError=true;
                }
                else
                {
                   let RePassword = document.getElementById("RePassword").value;
                   if(RePassword != formData.get("password")){
                        IsCorrect = false;
                        this.RePasswordError=true;
                   }

                }

                return IsCorrect ;
            }
            
        }
    }
</script>