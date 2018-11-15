function textAreaCount(textArea) {
  var max = textArea.find(".textarea-max").text(),
    textAreaContent = textArea.find("textarea");
  textAreaContent.on('input propertychange', function () {
    var textAreaText = $(this).parent("div").find(".wordwrap span");
    textAreaText.text($(this).val().length);
    if ($(this).val().length > max) {
      layer.msg('字数已超出限制');
      $(this).val($(this).val().substr(0, max))
      textAreaText.text($(this).val().length);
      return false;
    }
  });
}
/* 
textAreaCount($(".wordCount"));
在textarea结束标签下插入以下：
<div class="wordwrap">
  <span>0</span>/<var class="textarea-max">300</var>
</div>
*/