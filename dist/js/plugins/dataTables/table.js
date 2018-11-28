var language = {
  sProcessing: '处理中...',
  sLengthMenu: '显示 _MENU_ 项结果',
  sZeroRecords: '没有匹配结果',
  sInfo: '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
  sInfoEmpty: '显示第 0 至 0 项结果，共 0 项',
  sInfoFiltered: '(由 _MAX_ 项结果过滤)',
  sInfoPostFix: '',
  sSearch: '搜索:',
  sUrl: '',
  sEmptyTable: '未搜索到数据',
  sLoadingRecords: '载入中...',
  sInfoThousands: ',',
  oPaginate: {
    sFirst: '首页',
    sPrevious: '上页',
    sNext: '下页',
    sLast: '末页',
  },
  oAria: {
    sSortAscending: ': 以升序排列此列',
    sSortDescending: ': 以降序排列此列',
  },
};

function dataTablesInit(elo) {
  elo.gridInit = elo.gridInit || {};
  eloancn = $('#' + elo.tableId).dataTable({
    ajax: elo.ajaxUrl ? {
      url: elo.ajaxUrl,
      //请求后台路径
      error: function (jqXHR, textStatus, errorMsg) {
        layer.msg('请求失败');
      }
    } : '',
    columns: elo.columns,
    searching: elo.gridInit.searching && true,
    //搜索框，默认是开启
    paging: elo.gridInit.paging && true,
    //是否开启本地分页，默认是开启
    scrollX: '100%',
    //设置宽度
    autoWidth: true,
    //是否自适应宽度
    scrollY: elo.gridInit.scrollY,
    //设置高
    scrollCollapse: elo.gridInit.scrollCollapse || false,
    //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
    processing: elo.gridInit.processing || false,
    //是否显示中文提示
    serverSide: elo.gridInit.serverSide || false,
    //开启服务器模式，默认是关闭
    bSort: elo.gridInit.bSort === false ? false : true,
    //排序功能
    order: elo.order || [],
    language: language,
    dom: "<'row'<'col-sm-2 table-numpage'l><'#" + elo.tableId + '-head' + ".table-head-container'><'col-sm-3 table-search'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
    initComplete: function () {
      $('#' + elo.tableId + '-head').append(elo.headDom);
      //checkbox 跳转页数取消全选
      var tableContainer = $('#' + elo.tableId).parents('.dataTables_wrapper');
      var tablePage = tableContainer.find('.dataTables_paginate');
      var tablePageBtn = tablePage.find('a,button');
      $(tablePage).delegate(tablePageBtn, 'mouseup ',
        function () {
          $('#' + elo.checkAllId).siblings('input').prop('checked', false);
          $('#' + elo.tableId + " input[name='checkList']").prop('checked', false);
        });

      $('#' + elo.tableId).on('order.dt',
        function () {
          $('#' + elo.checkAllId).siblings('input').prop('checked', false);
        });

      //checkbox全选
      $('#' + elo.checkAllId).click(function () {
        console.log($(this).siblings('input').prop('checked'));
        if (!$(this).siblings('input').prop('checked')) {
          $('#' + elo.tableId + " input[name='checkList']").prop('checked', true);
          $('tr').addClass('selected');
        } else {
          $('#' + elo.tableId + " input[name='checkList']").prop('checked', false);
          $('tr').removeClass('selected');
        }
      });
      //checkbox 取消某个复选框，就判断是否取消全选
      $('#' + elo.tableId + " input[name='checkList']").click(function () {
        $('#' + elo.tableId + " input[name='checkList']").each(function () {
          if ($(this).prop('checked')) {
            $('#' + elo.checkAllId).siblings('input').prop('checked', true);
            return false;
          } else if (!$(this).prop('checked')) {
            $('#' + elo.checkAllId).siblings('input').prop('checked', false);
            return false;
          }
        });
      });
    }
  });
}