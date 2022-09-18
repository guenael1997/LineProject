<template>
  <div>
    <LineForm :User='User' :AvatarSrc='AvatarSrc' :IsComment=false />
    <div v-for="Message in Messages">
      <Message :IdLine='Message.id'/>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Messagerieui',
      data(){
        return{
          Messages:{},
          User:{},
          AvatarSrc:''
        }
      },
      methods : {
        SetLines(){
          this.IdUser=localStorage.getItem("UserId");

          const axios = require('axios').default;
          let ApiUrl = process.env.BaseApiStrapiUrl+"/lines";
          let ApiUrlUser = process.env.BaseApiStrapiUrl+"/users/"+localStorage.getItem("UserId")+"?populate=*";
          axios.get(ApiUrlUser).then(
            res=>{
              this.User=res.data;
              this.AvatarSrc=process.env.BaseStrapiUrl+this.User.Avatar.url;
            }
          )
          axios.get(ApiUrl).then(
            res=>{
              this.Messages=res.data.data;
              console.log(res.data.data);
            }
          )
        }
      },
      mounted(){
        this.SetLines();
      }
    }
</script>