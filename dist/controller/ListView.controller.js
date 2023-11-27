sap.ui.define(["ranpak/wz/rebatelist/controller/BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/Token","sap/m/MessageToast","sap/m/MessageBox","sap/ui/core/Fragment","sap/m/BusyDialog","sap/ui/table/Column","sap/m/Text","sap/m/DatePicker","sap/m/Input","sap/ui/core/format/NumberFormat"],function(e,t,r,o,l,s,a,i,n,u,d,g,c){"use strict";return e.extend("ranpak.wz.rebatelist.controller.ListView",{onInit:function(){var e=this.getOwnerComponent();this._router=e.getRouter();this._router.getRoute("ListView").attachPatternMatched(this._handleRouteMatched,this)},_handleRouteMatched:function(e){this.oBusyDialog=new i;this.oI18n=this.getView().getModel("i18n").getResourceBundle();this.oUserEditMdl=this.getOwnerComponent().getModel("oUserEditMdl");this.oBlkUpldMdl=this.getOwnerComponent().getModel("oBlkUpldMdl");this.oFiltrKeys=["RebateID","ValidTo","CustomerID","EndUserID","MaterialID","Status"];this.oClmSbmsnDt=[];var t=this.getOwnerComponent().getModel("oAttachmentMdl");t.setProperty("/results",[]);t.refresh(true);const r=function(e){const t=e.text;return new o({key:t,text:t})};this.byId("inputRebateID").addValidator(r);var l=new Date;var s=new Date((new Date).setDate(l.getDate()-60));this.oUserEditMdl.setProperty("/maxDate",new Date);this.oUserEditMdl.setProperty("/minDate",s)},onFilterClear:function(e){var t=this.getOwnerComponent().getModel("oAttachmentMdl");var r=this.getView().byId("idMyRebatesFB");var o="";for(var l=0;l<this.oFiltrKeys.length;l++){o=r.getControlByKey(this.oFiltrKeys[l]);if(this.oFiltrKeys[l]==="RebateID"){o.setTokens([])}else if(this.oFiltrKeys[l]==="ValidTo"){o.setValue(null)}else if(this.oFiltrKeys[l]==="Status"){o.setSelectedKey(null)}else{o.setSelectedKeys([])}}var s=this.getView().byId("idMyRebatesPg");var a=this.getView().byId("idMyRebatesTbl");var i=a.getTable().getSelectedItems();this.onTblMutliDSlct(s,i);r.fireSearch();t.setProperty("/results",[]);t.refresh(true)},onBeforeRebindTbl:function(e){var l=this.getView().byId("idMyRebatesFB");var s=e.getParameter("bindingParams");var a=s.parameters.select;a+=",MaterialDescription,EndUserDescription,CustomerDescription,Currency";s.parameters.select=a;var i=l.getAllFiltersWithValues();for(var n=0;n<i.length;n++){this.formFiltersForTable(s,l,i[n])}const u=new sap.ui.core.routing.HashChanger;let d=u.getHash();if(d){d=d.split("SearchString=")[1];if(!d){return}const e=new t("RebateID",r.Contains,d);const l=new t("CustomerDescription",r.Contains,d);const a=new t("CustomerID",r.Contains,d);const i=new t([e,l,a],false);s.filters.push(i);this.byId("inputRebateID").setTokens([new o({key:d,text:d})])}},formFiltersForTable:function(e,t,r){var o=r.getName();var l=t.getControlByKey(o);var s="",a="";switch(o){case"RebateID":s=l.getTokens();a=this.formMultiFiltrMdl(s,"RebateID",true);break;case"CustomerID":s=l.getSelectedKeys();a=this.formMultiFiltrMdl(s,"CustomerID",true);break;case"ValidTo":s=l.getDateValue();a=this.formMultiFiltrMdl(s,"ValidTo",false,l);break;case"EndUserID":s=l.getSelectedKeys();a=this.formMultiFiltrMdl(s,"EndUserID",true);break;case"MaterialID":s=l.getSelectedKeys();a=this.formMultiFiltrMdl(s,"MaterialID",true);break;case"Status":s=l.getSelectedKey();a=this.formMultiFiltrMdl(s,"Status",false);break;default:break}e.filters.push(a)},formMultiFiltrMdl:function(e,r,o,l){var s=[],a="",i="",n="",u="EQ";if(o){for(var d=0;d<e.length;d++){if(r==="RebateID"){u="EQ";i=e[d].getText()}else{i=e[d].toUpperCase()}}}else{if(r==="ValidTo"){u="BT";i=this.fetchDate(l.getDateValue());n=new Date(l.getSecondDateValue().getFullYear(),l.getSecondDateValue().getMonth()+1,0);n=this.fetchDate(n)}else if(r==="Status"){i=e}}a=new t({path:r,operator:u,value1:i,value2:n});s.push(a);return new t(s)},onBeforeVariantFetch:function(e){var t=this.getView().byId("idMyRebatesFB");var r=[];var o=t.getControlByKey("RebateID").getTokens();for(var l=0;l<o.length;l++){r.push(o[l].getText())}t.setFilterData({_CUSTOM:{RebateID:r,ValidTo:t.getControlByKey("ValidTo").getValue(),CustomerID:t.getControlByKey("CustomerID").getSelectedKeys(),EndUserID:t.getControlByKey("EndUserID").getSelectedKeys(),MaterialID:t.getControlByKey("MaterialID").getSelectedKeys(),Status:t.getControlByKey("Status").getSelectedKey()}})},onVariantLoad:function(e){var t=this.getView().byId("idMyRebatesFB");var r=t.getFilterData();var l=r["_CUSTOM"];var s=[];for(var a=0;a<l.RebateID.length;a++){s.push(new o({key:l.RebateID[a],text:l.RebateID[a]}));t.getControlByKey("RebateID").setTokens(s)}t.getControlByKey("CustomerID").setSelectedKeys(l.CustomerID);t.getControlByKey("EndUserID").setSelectedKeys(l.EndUserID);t.getControlByKey("MaterialID").setSelectedKeys(l.MaterialID);t.getControlByKey("ValidTo").setValue(l.ValidTo);t.getControlByKey("Status").setSelectedKey(l.Status)},onMyRebatesExport:function(e){var t="";t="My_Rebates_"+(new Date).toISOString();e.getParameter("exportSettings").fileName=t;this.formatExportList(e)},formatExportList:function(e){var t=e.getParameter("exportSettings").workbook;var r=t.columns;t.context={sheetName:"My Rebates"};for(var o=0;o<r.length;o++){switch(r[o].label){case this.oI18n.getText("columnCustomer"):r[o].property=["CustomerDescription","CustomerID"];r[o].template="{0} ({1})";break;case this.oI18n.getText("columnRebateID"):r[o].property="RebateID";break;case this.oI18n.getText("columnEndUser"):r[o].property=["EndUserDescription","EndUserID"];r[o].template="{0} ({1})";break;case this.oI18n.getText("columnMaterial"):r[o].property=["MaterialDescription","MaterialID"];r[o].template="{0} ({1})";break;case this.oI18n.getText("columnUnit"):r[o].property="Unit";break;case this.oI18n.getText("columnListPrice"):r[o].property="ListPrice";break;case this.oI18n.getText("columnRebateAmount"):r[o].property="RebateAmount";break;case this.oI18n.getText("columnNetPrice"):r[o].property="NetPrice";break;case this.oI18n.getText("columnValidFrom"):r[o].type=sap.ui.export.EdmType.Date;r[o].property="ValidFrom";r[o].format="YYYY/MM/dd";break;case this.oI18n.getText("columnValidTo"):r[o].type=sap.ui.export.EdmType.Date;r[o].property="ValidTo";r[o].format="YYYY/MM/dd";break;case this.oI18n.getText("columnStatus"):r[o].property="Status";break;case this.oI18n.getText("columnEndUserPrice"):r[o].property="EndUserPrice";break;default:break}}},GetStatusState:function(e){const t=this.getOwnerComponent().getModel("i18n").getResourceBundle();if(e===t.getText("filterStatusActive")){return"Success"}if(e===t.getText("filterStatusExpired")){return"Error"}},onTblMutliDSlct:function(e,t,r){var o,l;for(var s=0;s<t.length;s++){t[s].setSelected(false);o=t[s].getCells();for(var a=0;a<o.length;a++){l=o[a].getCustomData();if(l.length>0){if(l[0].getKey()==="INVOICE_NO"||l[0].getKey()==="SHIP_DATE"||l[0].getKey()==="QUANTITY_SOLD"){o[a].setVisible(false);o[a].setValue(null)}}}}e.setShowFooter(false);this.oClmSbmsnDt=[];this.oUserEditMdl.setProperty("/claimSubmissionData",this.oClmSbmsnDt);this.oUserEditMdl.refresh(true)},onTblItmSnglSlctn:function(e,t,r,o,s,a){var i;if(r==="Expired"){l.show(this.oI18n.getText("INVALID_ITEM_SELECT"));e.setSelected(false)}else{for(var n=0;n<t.length;n++){i=t[n].getCustomData();if(i.length>0){if(i[0].getKey()==="INVOICE_NO"||i[0].getKey()==="SHIP_DATE"||i[0].getKey()==="QUANTITY_SOLD"){if(o){t[n].setVisible(true)}else{t[n].setVisible(false)}}}}if(s.length===0){a.setShowFooter(false)}else{if(!a.getShowFooter()){a.setShowFooter(true)}}}},onTblItmSlct:function(e){var t=this.getView().byId("idMyRebatesPg");var r=e.getParameter("listItems");if(r.length>1){this.onTblMutliDSlct(t,r)}else{var o=this.getView().byId("idMyRebatesTbl");var l=o.getTable().getSelectedItems();var s=e.getParameter("listItem");var a=s.getBindingContext().getObject();var i=a.Status;var n=s.getCells();var u=e.getParameter("selected");this.onTblItmSnglSlctn(s,n,i,u,l,t);this.formClmSubmsnDt(a,u)}},formClmSubmsnDt:function(e,t){e.End_User_Invoice="";e.End_User_Ship_Date="";e.Quantity="";if(t){this.oClmSbmsnDt.push(e)}else{for(var r=0;r<this.oClmSbmsnDt.length;r++){if(e.ID===this.oClmSbmsnDt[r].ID){this.oClmSbmsnDt.splice(r)}}}this.oUserEditMdl.setProperty("/claimSubmissionData",this.oClmSbmsnDt);this.oUserEditMdl.refresh(true)},onClmFldEdit:function(e){var t=e.getSource().getCustomData()[0].getKey();var r=e.getSource().getBindingContext().getObject();for(var o=0;o<this.oClmSbmsnDt.length;o++){if(r.ID===this.oClmSbmsnDt[o].ID){if(t==="INVOICE_NO"){var s=this.validateAlphaNumFld(e);if(s){e.getSource().setValueState("None");this.oClmSbmsnDt[o].End_User_Invoice=e.getSource().getValue()}else{l.show(this.oI18n.getText("INVALID_ENTRY"));e.getSource().setValueState("Error");e.getSource().setValue(null)}}else if(t==="SHIP_DATE"){this.oClmSbmsnDt[o].End_User_Ship_Date=e.getSource().getValue()}else if(t==="QUANTITY_SOLD"){var a=this.validateNumberFld(e);if(a){e.getSource().setValueState("None");this.oClmSbmsnDt[o].Quantity=e.getSource().getValue()}else{l.show(this.oI18n.getText("INVALID_ENTRY"));e.getSource().setValueState("Error");e.getSource().setValue(null)}}}}this.oUserEditMdl.setProperty("/claimSubmissionData",this.oClmSbmsnDt);this.oUserEditMdl.refresh(true)},validatePayload:function(){var e=1;var t=this.getView().byId("idMyRebatesTbl");var r=t.getTable().getSelectedItems();var o,l,s;for(var i=0;i<r.length;i++){o=r[i].getCells();for(var n=0;n<o.length;n++){l=o[n].getCustomData();if(l.length>0){s=l[0].getKey();if(s==="INVOICE_NO"||s==="SHIP_DATE"||s==="QUANTITY_SOLD"){if(!o[n].getValue()){o[n].setValueState("Error");e=0}else{o[n].setValueState("None")}}}}}if(e===1){this.oBusyDialog.open();e=2;var u=this.getView();var d=this;if(!this.byId("idAttachmentDlg")){a.load({id:u.getId(),name:"ranpak.wz.rebatelist.fragment.attachmentDlg",controller:this}).then(function(e){u.addDependent(e);e.open();u.byId("idMyRebatesPg").setShowFooter(false);d.oBusyDialog.close()})}else{this.byId("idAttachmentDlg").open();this.byId("idMyRebatesPg").setShowFooter(false);this.oBusyDialog.close()}}return e},onAttachmentUpload:function(e){var t=e.getSource().oFileUpload.files;var r=this.getOwnerComponent().getModel("oAttachmentMdl");var o=r.getProperty("/results");this.formAttachments(t,r,o)},formAttachments:function(e,t,r){var o="",s="",a="",i="",n=0;for(var u=0;u<e.length;u++){o=e[u].name;a=e[u].size;s=e[u].size/(1024*1024);s=parseFloat(s.toFixed(2));i=o.substring(o.lastIndexOf(".")+1,o.length)||o;i=i.toUpperCase();if(i==="XLSX"||i==="XLS"||i==="CSV"||i==="PNG"||i==="JPEG"||i==="JPG"||i==="PDF"||i==="DOCX"||i==="DOC"||i==="TXT"||i==="PPTX"||i==="PPT"||i==="MSG"||i==="EML"){for(var d=0;d<r.length;d++){n+=r[d].FilesizeMB}n+=s;if(n>50){l.show(this.oI18n.getResourceBundle().getText("DOC_SIZE_ERROR"))}else{this.updateAttachmentsModel(e[u],t,r,o,a,s,i)}}else{l.show(this.oI18n.getResourceBundle().getText("SUPPORTED_DOC"))}}},updateAttachmentsModel:function(e,t,r,o,l,s,a){var i=this.getView().byId("idSubmitWithDocBtn");var n=this.getView().byId("idBlkSubmitBtn");var u=new FileReader;u.readAsDataURL(e);u.onloadend=function(e){if(e.target.readyState===FileReader.DONE){var u=e.target.result;var d=u.split(",")[1];r.push({b64Content:d,fileName:o,fileSizeBytes:l,fileSize:s+" MB",fileType:a});t.refresh(true);if(i){i.setEnabled(true)}if(n){n.setEnabled(true)}}}},onSubmitClm:function(){var e=this.validatePayload();if(e===0){s.error(this.oI18n.getText("VALIDATE_PAYLOAD_ERR"))}},onAttachmentDel:function(e){var t=this.getOwnerComponent().getModel("oAttachmentMdl");var r=t.getProperty("/results");var o=e.getSource().getBindingContext("oAttachmentMdl");var l=o.getPath().split("/")[2];r.splice(l,1);t.refresh(true);if(r.length===0){if(this.byId("idSubmitWithDocBtn")){this.byId("idSubmitWithDocBtn").setEnabled(false)}if(this.byId("idBlkSubmitBtn")){this.byId("idBlkSubmitBtn").setEnabled(false)}}},onSubmitClmWithDoc:function(){this.triggerRebateClmSubmit()},formClmPayload:function(){var e=[];var t="",r;for(var o=0;o<this.oClmSbmsnDt.length;o++){r=10-this.oClmSbmsnDt[o].RebateID.length;for(var l=0;l<r;l++){t+="0"}t+=this.oClmSbmsnDt[o].RebateID;e.push({Rebate_ID:t,Sales_Organization:"",Distributor_No:this.oClmSbmsnDt[o].CustomerID,Distributor_Name:this.oClmSbmsnDt[o].CustomerDescription,End_User_No:this.oClmSbmsnDt[o].EndUserID,End_user_Name:this.oClmSbmsnDt[o].EndUserDescription,End_User_City:"",End_user_State:"",Your_Sales_Office:"",Your_Sales_Office_Name:"",Your_Item:"",Your_Item_Description:"",Ranpak_Item:this.oClmSbmsnDt[o].MaterialID,End_User_Invoice:this.oClmSbmsnDt[o].End_User_Invoice,End_User_Ship_Date:this.oClmSbmsnDt[o].End_User_Ship_Date,col16:"",col17:"",Resale_Price:"",List_Price:this.oClmSbmsnDt[o].ListPrice,Rebate_Amount:this.oClmSbmsnDt[o].RebateAmount,Net_Price:this.oClmSbmsnDt[o].NetPrice,Quantity:this.oClmSbmsnDt[o].Quantity,UOM:this.oClmSbmsnDt[o].Unit,Customer_Reference:""})}var s={file_name:"REBATE_CLAIM",dummytoexcelset:e,dummytomessageset:[]};return s},triggerRebateClmSubmit:function(e){this.oBusyDialog.open();var t=this;var r="";if(e){r=this.formBlkClmPayload()}else{r=this.formClmPayload()}var o=this.getOwnerComponent().getModel("oPOSTMdl");o.create("/dummyheaderSet",r,{success:function(e){var r=e.dummytomessageset.results;var o="",l="",a="",i="",n=0;for(var u=0;u<r.length;u++){l=r[u].Message_Type;o=r[u].Messages;if(r.length===t.oClmSbmsnDt.length){i=t.oClmSbmsnDt[u].Rebate_ID;if(l==="E"){if(o){o=o.split(":")[1]}a+="\nRebate ID "+i+" : "+o}else if(l==="S"){n=1;a+=o;t.upldDocToSharePoint(a)}}else{if(l==="E"){a+="\n"+o}else if(l==="S"){n=1;a+="\n"+o;t.upldDocToSharePoint(a)}}}if(n===0){s.error(a);t.oBusyDialog.close()}},error:function(e){t.oBusyDialog.close();var r=JSON.parse(e.responseText);s.error(r.error.message.value)}})},onClmWithDocCncl:function(){var e=this.getOwnerComponent().getModel("oAttachmentMdl");e.setProperty("/results",[]);e.refresh(true);this.byId("idAttachmentDlg").close();this.byId("idMyRebatesPg").setShowFooter(true)},upldDocToSharePoint:function(e){this.oBusyDialog.open();var t=this;var r=this.getOwnerComponent().getModel("oAttachmentMdl");var o=r.getProperty("/results");var l=[];for(var a=0;a<o.length;a++){l.push({name:o[a].fileName,content:o[a].b64Content})}var i={customerId:this.oClmSbmsnDt[0].CustomerID,customerName:this.oClmSbmsnDt[0].CustomerDescription,rebateClaimNo:this.oClmSbmsnDt[0].RebateID,docs:l};var n=this.getOwnerComponent().getModel();n.create("/UploadDocuments",i,{success:function(r){t.byId("idAttachmentDlg").close();t.oBusyDialog.close();s.success(e+"\n"+"Supporting documents uploaded successfully",{onClose:function(){t.onFilterClear()}})},error:function(r){t.byId("idAttachmentDlg").close();t.oBusyDialog.close();var o=JSON.parse(r.responseText);var l=o.error.message.value+". "+t.oI18n.getText("TRY_AGAIN");s.error(e+"\n"+l)}})},onBulkBtnPress:function(){this.oBusyDialog.open();var e=this.getView();var t=this;if(!this.byId("idBlkRbtClmDlg")){a.load({id:e.getId(),name:"ranpak.wz.rebatelist.fragment.bulkRebateClaimWizard",controller:this}).then(function(r){e.addDependent(r);r.open();t.oBlkRbtClmWiz=e.byId("idBlkRbtClmWiz");t.idDwnldTmpltWizStp=e.byId("idDwnldTmpltWizStp");t.oUpldTmpltWizStp=e.byId("idUpldTmpltWizStp");t.oReviewWizStp=e.byId("idReviewWizStp");t.oAttachUpldWizStp=e.byId("idAttachUpldWizStp");var o=e.byId("idMyRebatesPg");var l=e.byId("idMyRebatesTbl");var s=l.getTable().getSelectedItems();t.onTblMutliDSlct(o,s);t.resetBlkClmWiz();t.oBusyDialog.close()})}else{this.byId("idBlkRbtClmDlg").open();var r=e.byId("idMyRebatesPg");var o=e.byId("idMyRebatesTbl");var l=o.getTable().getSelectedItems();this.onTblMutliDSlct(r,l);this.resetBlkClmWiz();this.oBusyDialog.close()}},resetBlkClmWiz:function(){this.oBlkRbtClmWiz.setCurrentStep(this.idDwnldTmpltWizStp);var e=this.getView().byId("idBlkSubmitBtn");e.setEnabled(false)},onBlkCncl:function(){this.resetBlkClmWiz();this.byId("idBlkRbtClmDlg").close()},onDwnldTemplt:function(){var e=this.getAppModulePath()+"/artifacts/Rebate-Claim-Template.xlsx";sap.m.URLHelper.redirect(e,true);this.oBlkRbtClmWiz.setCurrentStep(this.oUpldTmpltWizStp)},onUpldTemplt:function(e){this.oBusyDialog.open();var t=e.getSource().oFileUpload.files[0];this.oParseExcel(t)},oParseExcel:function(e){var t=this;var r={},o="";if(e&&window.FileReader){var l=new FileReader;l.onload=function(l){var a=l.target.result;var i=XLSX.read(a,{type:"binary"});i.SheetNames.forEach(function(e){o=i.Sheets[e];r=XLSX.utils.sheet_to_row_object_array(o)});if(r.length>0){t.setExcelDtToTbl(o,r);t.generateTable();t.oBlkRbtClmWiz.setCurrentStep(t.oReviewWizStp);t.oBlkRbtClmWiz.setCurrentStep(t.oAttachUpldWizStp);t.upldTmpltToAttachMdl(e)}else{s.error(t.oI18n.getText("UPLOAD_FILE_EMPTY"));t.oBlkRbtClmWiz.setCurrentStep(t.oUpldTmpltWizStp)}};l.readAsBinaryString(e)}},upldTmpltToAttachMdl:function(e){var t=this;var r,o,l,s;r=e.name;o=e.size;l=e.size/(1024*1024);l=parseFloat(l.toFixed(2));s=r.substring(r.lastIndexOf(".")+1,r.length)||r;s=s.toUpperCase();var a=this.getOwnerComponent().getModel("oAttachmentMdl");var i=a.getProperty("/results");var n=new FileReader;n.readAsDataURL(e);n.onloadend=function(e){if(e.target.readyState===FileReader.DONE){var n=e.target.result;var u=n.split(",")[1];i.push({b64Content:u,fileName:r,fileSizeBytes:o,fileSize:l+" MB",fileType:s});a.refresh(true);t.oBusyDialog.close()}}},setExcelDtToTbl:function(e,t){const r=[];const o=XLSX.utils.decode_range(e["!ref"]).e.c+1;for(let t=0;t<o;++t){if(e[XLSX.utils.encode_col(t)+1]){r[t]=e[XLSX.utils.encode_col(t)+1].v}}this.oBlkUpldMdl.setProperty("/columns",r);this.oBlkUpldMdl.setProperty("/rows",t)},generateTblTmplt:function(e){var t=this;var r="";if(e){if(e.toUpperCase().indexOf("DATE")!==-1){r=new d({value:{path:"oBlkUpldMdl>"+e,formatter:this.validateDateFldBlk},displayFormat:"YYYY/MM/dd",valueFormat:"YYYY-MM-dd",change:function(e){this.setValueState("None");if(e.getSource().getBindingContext("oBlkUpldMdl")){e.getSource().getBindingContext("oBlkUpldMdl").getObject()[e.getSource().getBindingInfo("value").parts[0].path]=e.getSource().getValue()}}});return r}else if(e.toUpperCase().indexOf("#")!==-1||e.toUpperCase().indexOf("NUMBER")!==-1){r=new g({value:{path:"oBlkUpldMdl>"+e,formatter:this.validateNumFldBlk},change:function(e){var r=t.validateNumberFld(e);if(r){e.getSource().setValueState("None")}else{e.getSource().setValueState("Error");e.getSource().setValue(null)}if(e.getSource().getBindingContext("oBlkUpldMdl")){e.getSource().getBindingContext("oBlkUpldMdl").getObject()[e.getSource().getBindingInfo("value").parts[0].path]=e.getSource().getValue()}}});return r}else if(e.toUpperCase().indexOf("AMOUNT")!==-1||e.toUpperCase().indexOf("PRICE")!==-1){r=new g({value:{path:"oBlkUpldMdl>"+e,formatter:this.validateAmntFldBlk},change:function(e){var r=e.getSource().getValue();var o=c.getCurrencyInstance({currencyCode:false,decimals:2});var l=t.validateNumberFld(e);if(l){e.getSource().setValueState("None");e.getSource().setValue(o.format(r))}else{e.getSource().setValueState("Error");e.getSource().setValue(null)}if(e.getSource().getBindingContext("oBlkUpldMdl")){e.getSource().getBindingContext("oBlkUpldMdl").getObject()[e.getSource().getBindingInfo("value").parts[0].path]=e.getSource().getValue()}}});return r}else{r=new g({value:{path:"oBlkUpldMdl>"+e,formatter:this.validateAlphaNumFldBlk},change:function(e){var r=t.validateAlphaNumFld(e);if(r){e.getSource().setValueState("None")}else{e.getSource().setValueState("Error");e.getSource().setValue(null)}if(e.getSource().getBindingContext("oBlkUpldMdl")){e.getSource().getBindingContext("oBlkUpldMdl").getObject()[e.getSource().getBindingInfo("value").parts[0].path]=e.getSource().getValue()}}});return r}}else{r=new g({value:{path:"oBlkUpldMdl>"+e,formatter:this.validateAlphaNumFldBlk},change:function(e){var r=t.validateAlphaNumFld(e);if(r){e.getSource().setValueState("None")}else{e.getSource().setValueState("Error");e.getSource().setValue(null)}if(e.getSource().getBindingContext("oBlkUpldMdl")){e.getSource().getBindingContext("oBlkUpldMdl").getObject()[e.getSource().getBindingInfo("value").parts[0].path]=e.getSource().getValue()}}});return r}},generateTable:function(){var e=this;var t=this.getView().byId("idBlkUpldTbl");t.bindColumns("oBlkUpldMdl>/columns",function(t,r){var o=r.getObject();if(o&&o.indexOf("/")!==-1){o=o.split("/")[0]}var l=e.generateTblTmplt(o);return new n({label:o,template:l,width:"12rem",tooltip:o,sortProperty:o,filterProperty:o})});t.bindRows("oBlkUpldMdl>/rows")}})});
//# sourceMappingURL=ListView.controller.js.map