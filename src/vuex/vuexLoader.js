export default function vuexLoader( store, modelInstances ) {
  for ( let model of modelInstances ){
    model.model.get().then(( data ) => {
      store.commit( 'addToStore', { property:model.vuexProperty, value: data.body });
    });
  }
}
