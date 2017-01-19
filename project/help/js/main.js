$(document).ready(function(){
  var subtop = $('#subbut').offset().top;
  var subleft = $('#subbut').offset().left;
  var inleft = $('#search').offset().left;
  var url = location.search;
  if(url.indexOf('?') !== -1){
    $('#cursor').animate({left: inleft-'-15' ,top: subtop-'-20'},1500,function () {
      var str = url.substr(1).split('=')[1];//提取wd=
      var decodeurl = decodeURIComponent(str);//decode
      document.forms[0].search.value = decodeurl;
    });
    $('#cursor').animate({left: inleft-'-50',top: subtop -'-55'},1000);
    $('#cursor').animate({left: subleft-'-50',top: subtop-'-15'},1500,function () {
      document.getElementById("form").submit();
    });
  }else {
    $('#cursor').css('display','none');
    $('#genbox').css('display','block');
    $('#gen').click(function () {
      var search = location.href + '?wd=' + encodeURIComponent($('#search').val());
      $('#link').text(search);
      $('#link').attr('href',search);
    });
  }
});
