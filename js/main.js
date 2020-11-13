(function() {
  'use strict';

  // two way data binding (to UI)

  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },

    // データを更新しても保存されるようにする
    watch: { 
      // todos: function() { //todoに更新が会った際に次の処理をする
      //   localStorage.setItem('todos', JSON.stringify(this.todos));
      //   alert('Data saves!');
        // これだとtodoの配列の変化しか追えない。中身のclassの変化を追うにはdeep wacther
      // }

      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
          // alert('Data saves!');
        },
        deep: true
      }
    },
    // このデータをどのタイミングで呼び出すかですが、 Vue.js のインスタンスにはライフサイクルが定義されていて、今回はアプリがページにマウントされるタイミングでデータを読み込む処理
    // JSONの保存データを呼び出す処理
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },

    // eを与えないと、submitを押したら更新されて消える
    methods: {
      addItem: function(e){
        var item = {
          title: this.newItem,
          isDone: false
        };
        // e.preventDfault();
        this.todos.push(item);
        this.newItem = '';
      },
      //itemを削除する処理＝splice
      deleteItem: function(index) {
        if(confirm('are you sure?')){
          this.todos.splice(index, 1);
        }
      },

      //item一括削除
      purge: function() {
        if(!confirm('delete finished?')){
          return;
        }
        // this.todos = this.todos.filter(function(todo) {
        //   return !todo.isDone;
        // });
        this.todos = this.remaining;
    }
  },

    // todoの残数を表示
    computed: {
      remaining: function() {
        // var items = this.todos.filter(function(todo) {
        //   return !todo.isDone; //終わっていないタスク
        // });
        // return items.length;
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  })
})();

