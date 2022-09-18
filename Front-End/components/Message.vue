<template>
    <div class="flex rounded-2xl border-4 mb-8 p-4">
        <div class="">
        <img class="w-10 h-10 rounded-full mr-4" :src="AvatarSrc" v-if="User.Avatar">
        <div class="text-xl pb-4">
            <p class="text-l text-gray-900 leading-none">{{User.Name+" "+User.FullName}}</p>
            <p class="text-l text-gray-600">{{Line.Date}}</p>
            <p class="text-xl text-gray-900">{{Line.Texte}}</p>
        </div>
        <p v-for="Comment in Comments">
            <Commentaire :Comment="Comment"/>
        </p>
        <LineForm :User="ThisUser" :IdMainLine="IdLine" :AvatarSrc='AvatarSrc' :IsComment=true />
    </div>
</div>
</template>

<script>
    export default {
      name: 'Messageui',
      props:['IdLine'],
      data(){
        return {
            IdLine:0,
            User:{},
            ThisUser:{},
            Line:{},
            Comments:[],
            AvatarSrc:""
        }
      },
      methods:{
        SetLine(){
            const axios = require('axios').default;
            let ApiUrl = process.env.BaseApiStrapiUrl+"/lines/"+this.IdLine+"?populate=*";
            axios.get(ApiUrl).then(
                res=>{
                    this.Line=res.data.data.attributes.MainLine;
                    this.Comments=res.data.data.attributes.Commentaires;
                    let ApiUrlUser=process.env.BaseApiStrapiUrl+"/users/"+this.Line.IdUser+"?populate=*";
                    axios.get(ApiUrlUser).then(
                        res2=>{
                            console.log(res2.data)
                            this.User=res2.data;
                            this.AvatarSrc=process.env.BaseStrapiUrl+this.User.Avatar.url
                        }
                    )
                }
            );

            let ApiUrlThisUser=process.env.BaseApiStrapiUrl+"/users/"+localStorage.getItem("UserId")+"?populate=*";
            axios.get(ApiUrlThisUser).then(
                res=>{
                    this.ThisUser=res.data;
                    this.AvatarSrc=process.env.BaseStrapiUrl+this.ThisUser.Avatar.url;
                }
            )
        }
      },
      mounted(){
        this.SetLine()
      }
    }
</script>