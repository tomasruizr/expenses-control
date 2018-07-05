<template>
  <div id="goal-main">
    <goal-edit :data="editGoal" @saved="editSaved"/>
    <goal-list :data="goals" @edit="listEdit" @delete="listDelete"/>
  </div>
</template>

<script>
import GoalList from './GoalList.vue';
import GoalEdit from './GoalEdit.vue';
export default {
  name:'goal-main',
  components: { GoalList, GoalEdit },
  props : {
    model: { type: Object }
  },
  data(){
    return {
      goal: {},
      isNew:true,
      goals:[],
      editGoal:{}
    };
  },
  mounted(){
    this.init( this.model );
  },
  methods: {
    init( modelInstance ){
      this.goal = modelInstance;// || this.isSocket ? socket : model );
      if ( this.goal.on ){
        this.goal.on( 'goal', this.manageSocketEvent );
      }
      return this.goal.get().then(( data ) => {
        this.goals = data.body;
      });
    },

    manageSocketEvent( message ){
      if ( message.verb === 'created' ){
        return this.goals.push( message.data );
      } 
      let index = this.goals.findIndex(( item ) => item.id === message.id );
      if ( message.verb === 'destroyed' )
        this.goals.splice( index,1 );
      else if ( message.verb === 'updated' )
        this.goals.splice( index,1, message.data );
        // this.goals[index] = message.data;
    },

    editSaved( data ){
      this.editGoal = {};
      let method = this.isNew ? 'post' : 'put';
      this.goal[method]( data ).then(( response ) => {
        if ( method === 'post' )
          this.goals.push( response.body );
      });
      this.isNew = true;
    },
    listEdit( goal ){
      this.isNew = false;
      this.editGoal = goal;
    },
    listDelete( data, index ){
      this.goal.delete( data.id ).then(() => {
        this.goals.splice( index,1 );
      });
    },
  }
};
</script>
