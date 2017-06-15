var x = 1;

function search(){

  document.getElementById('result').innerHTML = "";
  var search_word = document.getElementById("search_box").value;

  if(!search_word){
    alert('empty');
  }
  var searchURL = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageinfo|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+search_word+'&callback=?';
  var title = "";
  var content = "";

  $.getJSON(searchURL ,function(data) {
    console.log(data);
    $.each(data.query.pages, function(i, item) {
      title = JSON.stringify((data.query.pages)[i].title)
      content = JSON.stringify((data.query.pages)[i].extract)

      var p_title = document.createElement("p");
      p_title.setAttribute("id","p_title");

     var title_node = document.createTextNode(title);
     p_title.appendChild(title_node);

     var p_content = document.createElement("p");
      p_content.setAttribute("id","p_content");

     var content_node = document.createTextNode(content);
     p_content.appendChild(content_node);

     var division = document.createElement("div");
      division.setAttribute("id","each_result");

      var link = document.createElement("a");
      link.setAttribute("href","http://en.wikipedia.org/?curid="+JSON.stringify((data.query.pages)[i].pageid));
      link.setAttribute("id","link");
      link.setAttribute("target","blank");

      $("#result").append(link);

      $("#result").children("#link").last().append(division);

      $("#result").children("#link").last().children("#each_result").last().append(p_title);
      $("#result").children("#link").last().children("#each_result").last().append(p_content);

    });
    x++;
  });

}


// dynamic script
var temp = new Array();


    $(function () {
        document.getElementById('search_box').innerHTML = "";
        var getData = function (request, response) {
             console.log("here");
            $.getJSON(
                "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=?&search=" + request.term,
                function (data) {
                      var limitArray = new Array();
                      var d = data.toString();
                      temp = d.split(",");
                      console.log(temp);
                      for(var i=0;i<5;i++){
                        limitArray.push(temp[i]);
                      }
                      response(limitArray);
                });
        };

        var selectItem = function (event, ui) {
            $("#search_box").val(ui.item.value);
        }

        $("#search_box").autocomplete({
            source: getData,
            select: selectItem,
            minLength: 3
        });
    });

    function checkValue(){
      console.log(document.getElementById('search_box').value);
    }
    function clearAll() {
      console.log("on load");
          document.getElementById("search_box").innerHTML = "*******  ";
            }
            window.onload = clearAll;
