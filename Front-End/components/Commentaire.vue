<template>
    <div>
        <div class="flex items-center pb-4">
        <img class="w-10 h-10 rounded-full mr-4" :src="AvatarSrc" v-if="User.Avatar">
        <div class="text-sm">
            <p class="text-gray-900 leading-none">{{User.Name+" "+User.FullName}}</p>
            <p class="text-gray-600">{{Comment.Date}}</p>
            <p class="text-xl text-gray-900">{{Comment.Texte}}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" /></svg>
        </div>
    </div>
</div>
</template>

<script>
    export default {
      name: 'CommentaireUI',
      props:['Comment'],
      data(){
        return {
            Comment:{},
            User:{},
            AvatarSrc:""
        }
      },
      methods:{
        SetComment(){
            const axios = require('axios').default;
            let ApiUrl = process.env.BaseApiStrapiUrl+"/Users/"+this.Comment.IdUser+"?populate=*";
            axios.get(ApiUrl).then(
                res=>{
                    console.log(res.data)
                    this.User=res.data;
                    this.AvatarSrc=process.env.BaseStrapiUrl+this.User.Avatar.url;
                }
            )
        }
      },
      mounted(){
        this.SetComment()
      }
    }
</script>