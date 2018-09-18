$(document).ready(function(){

    $('form').on('submit', function(){
        
        var item = $('#1');
        var dateFinished = $('#2');
        var item_title = $('#3');
        var todo = {
          item: item.val(),
          dateFinished: dateFinished.val(),
          item_title: item_title.val()
        };
        
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('.doubletap-delete').on('dblclick', function(){
        var _id = $(this).attr('id');
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + _id,
          data: _id,
          success: function(data){
            //do something with the data via front-end framework
            console.log(_id);
            location.reload();
          }
        });
    });
  
  });