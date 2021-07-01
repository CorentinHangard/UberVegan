<template>
  <v-footer
    color="primary lighten-1"
    absolute
    style="bottom:-100px"
    
  >
    <v-row  
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="todo in todos"
        v-bind:href="todo.target"
        v-bind:key="todo.link"
        
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ todo.link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
         <strong>© {{ new Date().getFullYear() }} UberVegan Inc.</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default{
    props:"",
    data:()=>{
        return{
            todos: [
            {link:"Conditions générales",
            target:"/CGU"},
            {link:"Politiques de confidentialité",
            target:"/politique"},
            {link:"Contact",
            target:"/contact"}
        ]
        }
    }
}
</script>
