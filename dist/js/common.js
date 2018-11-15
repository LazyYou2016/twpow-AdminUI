function statInputNum(textArea, numItem) {
  var max = numItem.text(),
    curLength;
  //      textArea[0].attr("maxlength", max);
  curLength = textArea.val().length;
  //      numItem.text(max - curLength);
  textArea.on('input propertychange', function () {
    /*            numItem.text(max - $(this).val().length);
        if (max - $(this).val().length<0) {
          layer.msg('字数已超出限制');
      textArea.val(textArea.val().substr(0, max))
          numItem.text("0");
        } */
    numItem.siblings("span").text($(this).val().length);
    if ($(this).val().length > max) {
      layer.msg('字数已超出限制');
      textArea.val(textArea.val().substr(0, max))
      numItem.siblings("span").text($(this).val().length);
      return false;
    }
  });
}