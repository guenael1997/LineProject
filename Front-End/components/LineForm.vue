<template>
    <div class="p-4">
        <div class="">
        <img class="w-10 h-10 rounded-full mr-4" :src="AvatarSrc" v-if="User.Avatar">
        <div class="text-xl pb-4">
            <p class="text-l text-gray-900 leading-none">{{User.Name+" "+User.FullName}}</p>
        </div>
        <form>
            <input type="text" id="Texte" class="flex rounded-2xl border-4  w-full p-8" v-model="Input">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" v-on:click="PostLine(Input)">
                Envoyer le Line
            </button>
        </form>
    </div>
</div>
</template>
<script>
    export default{
        name:"LineFormUi",
        props:["User","AvatarSrc","IsComment",'IdMainLine'],
        data(){
            return {
                User:{},
                AvatarSrc:"",
                IsComment:false,
                IdMainLine:0
            }
        },
        methods : {
            PostLine(x){
                const axios = require('axios').default;
                let ApiUrl;
                let LineText=x;
                let IdUser = localStorage.getItem("UserId");
                if(this.IsComment){
                    console.log("its a comment")
                    ApiUrl=process.env.BaseApiStrapiUrl+"/lines/"+this.IdMainLine+"?populate=*";
                    axios.get(ApiUrl).then(
                        res=>{
                            let Commentaires=res.data.data.attributes.Commentaires;
                            Commentaires.push({Texte:LineText,IdUser:IdUser});
                            let data ={data:{Commentaires:Commentaires}};
                            axios.put(ApiUrl,data);
                        }
                    )
                }
                else
                {
                    console.log("its not a comment")
                    ApiUrl=process.env.BaseApiStrapiUrl+"/lines/"
                    let data = {data:{MainLine:{Texte:LineText,IdUser:IdUser}}};
                    axios.post(ApiUrl,data);
                }
            }
        }

    }
</script>