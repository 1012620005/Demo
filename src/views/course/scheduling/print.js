export default {
  print(domes,kcbname,kcbclass,week){
    let newWindow = window.open('');   //打开新窗口
    // let codestr = document.getElementById(domes).innerHTML; 
      newWindow.document.write('<html><head><title></title>');
      newWindow.document.write('<style type="text/css">body{ margin:0px;');
      newWindow.document.write('font-family:Verdana, Geneva, sans-serif; font-size:12px;}');
      newWindow.document.write('.el-table td, .el-table th {    padding: 12px 0;min-width: 0; -webkit-box-sizing: border-box;box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;}.el-table td, .el-table th.is-leaf {border-bottom: 1px solid #dfe6ec;}.resize-triggers{display:none}');
      newWindow.document.write('*{ margin:0px;padding:0px;}.el-table__header th{width:16.7%;}.el-table--border {border-right: none;border-bottom: none;}.el-table--border, .el-table--group {border: 1px solid #ebeef5;}.el-table {background-color: #fff; border: 1px solid #dfe6ec; color: #1f2d3d;position: relative;overflow: hidden;box-sizing: border-box;-webkit-box-flex: 1;-ms-flex: 1;flex: 1;width: 100%;max-width: 100%;font-size: 14px;color: #606266;}el-table__header.el-table--fit {border-right: 0; border-bottom: 0;}.el-table__body col,.el-table__header col{width:auto;}.el-table__body, .el-table__footer, .el-table__header {width: 100% !important;table-layout: fixed;}.el-table--border td, .el-table--border th {border-right: 1px solid #dfe6ec;}.el-table td.is-center, .el-table th.is-center {text-align: center;}</style>');
      newWindow.document.write('</head><body >');
      newWindow.document.write('<div style="line-height:50px;line-height: 50px;font-weight: bold;font-size: 18px;">'+kcbname+kcbclass+'第'+week+'周</div>');
      newWindow.document.write(domes);
      newWindow.document.write('</body></html>');
      newWindow.document.close();     //关闭document的输出流, 显示选定的数据
      newWindow.print();   //打印当前窗口
      return true;
  }
}
