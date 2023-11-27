sap.ui.define(["ranpak/wz/rebatelist/controller/BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/Token","sap/m/MessageToast","sap/m/MessageBox","sap/ui/core/Fragment","sap/m/BusyDialog","sap/ui/table/Column","sap/m/Text"],function(e,t,s,r,i,o,a,l,n,d){"use strict";return e.extend("ranpak.wz.rebatelist.controller.ListView",{onInit:function(){var e=this.getOwnerComponent();this._router=e.getRouter();this._router.getRoute("ListView").attachPatternMatched(this._handleRouteMatched,this)},_handleRouteMatched:function(e){this.oBusyDialog=new l;this.oI18n=this.getView().getModel("i18n").getResourceBundle();this.oUserEditMdl=this.getOwnerComponent().getModel("oUserEditMdl");this.oBlkUpldMdl=this.getOwnerComponent().getModel("oBlkUpldMdl");this.oFiltrKeys=["RebateID","ValidTo","CustomerID","EndUserID","MaterialID","Status"];this.oClmSbmsnDt=[];var t=this.getOwnerComponent().getModel("oAttachmentMdl");t.setProperty("/results",[]);t.refresh(true);const s=function(e){const t=e.text;return new r({key:t,text:t})};this.byId("inputRebateID").addValidator(s);var i=new Date;var o=new Date((new Date).setDate(i.getDate()-60));this.oUserEditMdl.setProperty("/maxDate",new Date);this.oUserEditMdl.setProperty("/minDate",o)},onFilterClear:function(e){var t=this.getView().byId("idMyRebatesFB");var s="";for(var r=0;r<this.oFiltrKeys.length;r++){s=t.getControlByKey(this.oFiltrKeys[r]);if(this.oFiltrKeys[r]==="RebateID"){s.setTokens([])}else if(this.oFiltrKeys[r]==="ValidTo"){s.setValue(null)}else if(this.oFiltrKeys[r]==="Status"){s.setSelectedKey(null)}else{s.setSelectedKeys([])}}var i=this.getView().byId("idMyRebatesPg");var o=this.getView().byId("idMyRebatesTbl");var a=o.getTable().getSelectedItems();this.onTblMutliDSlct(i,a);t.fireSearch()},onBeforeRebindTbl:function(e){var i=this.getView().byId("idMyRebatesFB");var o=e.getParameter("bindingParams");var a=o.parameters.select;a+=",MaterialDescription,EndUserDescription,CustomerDescription,Currency";o.parameters.select=a;var l=i.getAllFiltersWithValues();for(var n=0;n<l.length;n++){this.formFiltersForTable(o,i,l[n])}const d=new sap.ui.core.routing.HashChanger;let u=d.getHash();if(u){u=u.split("SearchString=")[1];if(!u){return}const e=new t("RebateID",s.Contains,u);const i=new t("CustomerDescription",s.Contains,u);const a=new t("CustomerID",s.Contains,u);const l=new t([e,i,a],false);o.filters.push(l);this.byId("inputRebateID").setTokens([new r({key:u,text:u})])}},formFiltersForTable:function(e,t,s){var r=s.getName();var i=t.getControlByKey(r);var o="",a="";switch(r){case"RebateID":o=i.getTokens();a=this.formMultiFiltrMdl(o,"RebateID",true);break;case"CustomerID":o=i.getSelectedKeys();a=this.formMultiFiltrMdl(o,"CustomerID",true);break;case"ValidTo":o=i.getDateValue();a=this.formMultiFiltrMdl(o,"ValidTo",false,i);break;case"EndUserID":o=i.getSelectedKeys();a=this.formMultiFiltrMdl(o,"EndUserID",true);break;case"MaterialID":o=i.getSelectedKeys();a=this.formMultiFiltrMdl(o,"MaterialID",true);break;case"Status":o=i.getSelectedKey();a=this.formMultiFiltrMdl(o,"Status",false);break;default:break}e.filters.push(a)},formMultiFiltrMdl:function(e,s,r,i){var o=[],a="",l="",n="",d="EQ";if(r){for(var u=0;u<e.length;u++){if(s==="RebateID"){d="EQ";l=e[u].getText()}else{l=e[u].toUpperCase()}}}else{if(s==="ValidTo"){d="BT";l=this.fetchDate(i.getDateValue());n=new Date(i.getSecondDateValue().getFullYear(),i.getSecondDateValue().getMonth()+1,0);n=this.fetchDate(n)}else if(s==="Status"){l=e}}a=new t({path:s,operator:d,value1:l,value2:n});o.push(a);return new t(o)},onBeforeVariantFetch:function(e){var t=this.getView().byId("idMyRebatesFB");var s=[];var r=t.getControlByKey("RebateID").getTokens();for(var i=0;i<r.length;i++){s.push(r[i].getText())}t.setFilterData({_CUSTOM:{RebateID:s,ValidTo:t.getControlByKey("ValidTo").getValue(),CustomerID:t.getControlByKey("CustomerID").getSelectedKeys(),EndUserID:t.getControlByKey("EndUserID").getSelectedKeys(),MaterialID:t.getControlByKey("MaterialID").getSelectedKeys(),Status:t.getControlByKey("Status").getSelectedKey()}})},onVariantLoad:function(e){var t=this.getView().byId("idMyRebatesFB");var s=t.getFilterData();var i=s["_CUSTOM"];var o=[];for(var a=0;a<i.RebateID.length;a++){o.push(new r({key:i.RebateID[a],text:i.RebateID[a]}));t.getControlByKey("RebateID").setTokens(o)}t.getControlByKey("CustomerID").setSelectedKeys(i.CustomerID);t.getControlByKey("EndUserID").setSelectedKeys(i.EndUserID);t.getControlByKey("MaterialID").setSelectedKeys(i.MaterialID);t.getControlByKey("ValidTo").setValue(i.ValidTo);t.getControlByKey("Status").setSelectedKey(i.Status)},onMyRebatesExport:function(e){var t="";t="My_Rebates_"+(new Date).toISOString();e.getParameter("exportSettings").fileName=t;this.formatExportList(e)},formatExportList:function(e){var t=e.getParameter("exportSettings").workbook;var s=t.columns;t.context={sheetName:"My Rebates"};for(var r=0;r<s.length;r++){switch(s[r].label){case this.oI18n.getText("columnCustomer"):s[r].property=["CustomerDescription","CustomerID"];s[r].template="{0} ({1})";break;case this.oI18n.getText("columnRebateID"):s[r].property="RebateID";break;case this.oI18n.getText("columnEndUser"):s[r].property=["EndUserDescription","EndUserID"];s[r].template="{0} ({1})";break;case this.oI18n.getText("columnMaterial"):s[r].property=["MaterialDescription","MaterialID"];s[r].template="{0} ({1})";break;case this.oI18n.getText("columnUnit"):s[r].property="Unit";break;case this.oI18n.getText("columnListPrice"):s[r].property="ListPrice";break;case this.oI18n.getText("columnRebateAmount"):s[r].property="RebateAmount";break;case this.oI18n.getText("columnNetPrice"):s[r].property="NetPrice";break;case this.oI18n.getText("columnValidFrom"):s[r].type=sap.ui.export.EdmType.Date;s[r].property="ValidFrom";s[r].format="YYYY/MM/dd";break;case this.oI18n.getText("columnValidTo"):s[r].type=sap.ui.export.EdmType.Date;s[r].property="ValidTo";s[r].format="YYYY/MM/dd";break;case this.oI18n.getText("columnStatus"):s[r].property="Status";break;case this.oI18n.getText("columnEndUserPrice"):s[r].property="EndUserPrice";break;default:break}}},GetStatusState:function(e){const t=this.getOwnerComponent().getModel("i18n").getResourceBundle();if(e===t.getText("filterStatusActive")){return"Success"}if(e===t.getText("filterStatusExpired")){return"Error"}},onTblMutliDSlct:function(e,t,s){var r,i;for(var o=0;o<t.length;o++){t[o].setSelected(false);r=t[o].getCells();for(var a=0;a<r.length;a++){i=r[a].getCustomData();if(i.length>0){if(i[0].getKey()==="INVOICE_NO"||i[0].getKey()==="SHIP_DATE"||i[0].getKey()==="QUANTITY_SOLD"){r[a].setVisible(false)}}}}e.setShowFooter(false);this.oClmSbmsnDt=[];this.oUserEditMdl.setProperty("/claimSubmissionData",this.oClmSbmsnDt);this.oUserEditMdl.refresh(true)},onTblItmSnglSlctn:function(e,t,s,r,o,a){var l;if(s==="Expired"){i.show(this.oI18n.getText("INVALID_ITEM_SELECT"));e.setSelected(false)}else{for(var n=0;n<t.length;n++){l=t[n].getCustomData();if(l.length>0){if(l[0].getKey()==="INVOICE_NO"||l[0].getKey()==="SHIP_DATE"||l[0].getKey()==="QUANTITY_SOLD"){if(r){t[n].setVisible(true)}else{t[n].setVisible(false)}}}}if(o.length===0){a.setShowFooter(false)}else{if(!a.getShowFooter()){a.setShowFooter(true)}}}},onTblItmSlct:function(e){var t=this.getView().byId("idMyRebatesPg");var s=e.getParameter("listItems");if(s.length>1){this.onTblMutliDSlct(t,s)}else{var r=this.getView().byId("idMyRebatesTbl");var i=r.getTable().getSelectedItems();var o=e.getParameter("listItem");var a=o.getBindingContext().getObject();var l=a.Status;var n=o.getCells();var d=e.getParameter("selected");this.onTblItmSnglSlctn(o,n,l,d,i,t);this.formClmSubmsnDt(a,d)}},formClmSubmsnDt:function(e,t){e.End_User_Invoice="";e.End_User_Ship_Date="";e.Quantity="";if(t){this.oClmSbmsnDt.push(e)}else{for(var s=0;s<this.oClmSbmsnDt.length;s++){if(e.ID===this.oClmSbmsnDt[s].ID){this.oClmSbmsnDt.splice(s)}}}this.oUserEditMdl.setProperty("/claimSubmissionData",this.oClmSbmsnDt);this.oUserEditMdl.refresh(true)},onClmFldEdit:function(e){var t=e.getSource().getCustomData()[0].getKey();var s=e.getSource().getBindingContext().getObject();for(var r=0;r<this.oClmSbmsnDt.length;r++){if(s.ID===this.oClmSbmsnDt[r].ID){if(t==="INVOICE_NO"){var o=this.validateAlphaNumFld(e);if(o){e.getSource().setValueState("None");this.oClmSbmsnDt[r].End_User_Invoice=e.getSource().getValue()}else{i.show(this.oI18n.getText("INVALID_ENTRY"));e.getSource().setValueState("Error");e.getSource().setValue(null)}}else if(t==="SHIP_DATE"){this.oClmSbmsnDt[r].End_User_Ship_Date=e.getSource().getValue()}else if(t==="QUANTITY_SOLD"){var a=this.validateNumberFld(e);if(a){e.getSource().setValueState("None");this.oClmSbmsnDt[r].Quantity=e.getSource().getValue()}else{i.show(this.oI18n.getText("INVALID_ENTRY"));e.getSource().setValueState("Error");e.getSource().setValue(null)}}}}this.oUserEditMdl.setProperty("/claimSubmissionData",this.oClmSbmsnDt);this.oUserEditMdl.refresh(true)},validatePayload:function(){var e=1;var t=this.getView().byId("idMyRebatesTbl");var s=t.getTable().getSelectedItems();var r,i,o;for(var l=0;l<s.length;l++){r=s[l].getCells();for(var n=0;n<r.length;n++){i=r[n].getCustomData();if(i.length>0){o=i[0].getKey();if(o==="INVOICE_NO"||o==="SHIP_DATE"||o==="QUANTITY_SOLD"){if(!r[n].getValue()){r[n].setValueState("Error");e=0}else{r[n].setValueState("None")}}}}}if(e===1){this.oBusyDialog.open();e=2;var d=this.getView();var u=this;if(!this.byId("idAttachmentDlg")){a.load({id:d.getId(),name:"ranpak.wz.rebatelist.fragment.attachmentDlg",controller:this}).then(function(e){d.addDependent(e);e.open();d.byId("idMyRebatesPg").setShowFooter(false);u.oBusyDialog.close()})}else{this.byId("idAttachmentDlg").open();this.byId("idMyRebatesPg").setShowFooter(false);this.oBusyDialog.close()}}return e},onAttachmentUpload:function(e){var t=e.getSource().oFileUpload.files;var s=this.getOwnerComponent().getModel("oAttachmentMdl");var r=s.getProperty("/results");this.formAttachments(t,s,r)},formAttachments:function(e,t,s){var r="",o="",a="",l="",n=0;for(var d=0;d<e.length;d++){r=e[d].name;a=e[d].size;o=e[d].size/(1024*1024);o=parseFloat(o.toFixed(2));l=r.substring(r.lastIndexOf(".")+1,r.length)||r;l=l.toUpperCase();if(l==="XLSX"||l==="XLS"||l==="CSV"||l==="PNG"||l==="JPEG"||l==="JPG"||l==="PDF"||l==="DOCX"||l==="DOC"||l==="TXT"||l==="PPTX"||l==="PPT"||l==="MSG"||l==="EML"){for(var u=0;u<s.length;u++){n+=s[u].FilesizeMB}n+=o;if(n>50){i.show(this.oI18n.getResourceBundle().getText("DOC_SIZE_ERROR"))}else{this.updateAttachmentsModel(e[d],t,s,r,a,o,l)}}else{i.show(this.oI18n.getResourceBundle().getText("SUPPORTED_DOC"))}}},updateAttachmentsModel:function(e,t,s,r,i,o,a){var l=this;var n=this.getView().byId("idSubmitWithDocBtn");var d=this.getView().byId("idBlkSubmitBtn");var u=new FileReader;u.readAsDataURL(e);u.onloadend=function(e){if(e.target.readyState===FileReader.DONE){var l=e.target.result;var u=l.split(",")[1];s.push({b64Content:u,fileName:r,fileSizeBytes:i,fileSize:o+" MB",fileType:a});t.refresh(true);if(n){n.setEnabled(true)}if(d){d.setEnabled(true)}}}},onSubmitClm:function(){var e=this.validatePayload();if(e===0){o.error(this.oI18n.getText("VALIDATE_PAYLOAD_ERR"))}},onAttachmentDel:function(e){var t=this.getOwnerComponent().getModel("oAttachmentMdl");var s=t.getProperty("/results");var r=e.getSource().getBindingContext("oAttachmentMdl");var i=r.getPath().split("/")[2];s.splice(i,1);t.refresh(true);if(s.length===0){if(this.byId("idSubmitWithDocBtn")){this.byId("idSubmitWithDocBtn").setEnabled(false)}if(this.byId("idBlkSubmitBtn")){this.byId("idBlkSubmitBtn").setEnabled(false)}}},onSubmitClmWithDoc:function(){this.triggerRebateClmSubmit()},triggerRebateClmSubmit:function(){this.oBusyDialog.open();var e=this;var t=[];var s="",r;for(var i=0;i<this.oClmSbmsnDt.length;i++){r=10-this.oClmSbmsnDt[i].RebateID.length;for(var a=0;a<r;a++){s+="0"}s+=this.oClmSbmsnDt[i].RebateID;t.push({Rebate_ID:s,Sales_Organization:"",Distributor_No:this.oClmSbmsnDt[i].CustomerID,Distributor_Name:this.oClmSbmsnDt[i].CustomerDescription,End_User_No:this.oClmSbmsnDt[i].EndUserID,End_user_Name:this.oClmSbmsnDt[i].EndUserDescription,End_User_City:"",End_user_State:"",Your_Sales_Office:"",Your_Sales_Office_Name:"",Your_Item:"",Your_Item_Description:"",Ranpak_Item:this.oClmSbmsnDt[i].MaterialID,End_User_Invoice:this.oClmSbmsnDt[i].End_User_Invoice,End_User_Ship_Date:this.oClmSbmsnDt[i].End_User_Ship_Date,col16:"",col17:"",Resale_Price:"",List_Price:this.oClmSbmsnDt[i].ListPrice,Rebate_Amount:this.oClmSbmsnDt[i].RebateAmount,Net_Price:this.oClmSbmsnDt[i].NetPrice,Quantity:this.oClmSbmsnDt[i].Quantity,UOM:"Unit",Customer_Reference:""})}var l={file_name:"REBATE CLAIM SUBMISSION",dummytoexcelset:t,dummytomessageset:[]};debugger;var n=this.getOwnerComponent().getModel("oPOSTMdl");n.create("/dummyheaderSet",l,{success:function(t){debugger;var s=t.dummytomessageset.results;var r="",i="",a="",l="",n=0;for(var d=0;d<s.length;d++){i=s[d].Message_Type;r=s[d].Messages;if(s.length===e.oClmSbmsnDt.length){l=e.oClmSbmsnDt[d].Rebate_ID;if(r){r=r.split(":")[1]}if(i==="E"){a+="\nRebate ID "+l+" : "+r}else if(i==="S"){n=1;a+="\nRebate ID "+l+" : "+r;e.upldDocToSharePoint(a)}}else{if(i==="E"){a+="\n"+r}else if(i==="S"){n=1;a+="\n"+r;e.upldDocToSharePoint(a)}}}if(n===0){o.error(a)}e.oBusyDialog.close()},error:function(t){debugger;e.oBusyDialog.close();var s=JSON.parse(t.responseText);o.error(s.error.message.value)}})},onClmWithDocCncl:function(){this.byId("idAttachmentDlg").close();this.byId("idMyRebatesPg").setShowFooter(true)},upldDocToSharePoint:function(e){this.oBusyDialog.open();var t=this;var s=this.getOwnerComponent().getModel("oAttachmentMdl");var r=s.getProperty("/results");var i=[];for(var a=0;a<r.length;a++){i.push({name:r[a].fileName,content:r[a].b64Content})}var l={customerId:this.oClmSbmsnDt[0].CustomerID,customerName:this.oClmSbmsnDt[0].CustomerDescription,rebateClaimNo:this.oClmSbmsnDt[0].RebateID,docs:i};debugger;var n=this.getOwnerComponent().getModel();n.create("/UploadDocuments",l,{success:function(s){debugger;t.byId("idAttachmentDlg").close();t.oBusyDialog.close();o.success(e+"\n"+"Supporting documents uploaded successfully")},error:function(s){t.byId("idAttachmentDlg").close();t.oBusyDialog.close();var r=JSON.parse(s.responseText);var i=r.error.message.value+". "+t.oI18n.getText("TRY_AGAIN");o.error(e+"\n"+i)}})},onBulkBtnPress:function(){this.oBusyDialog.open();var e=this.getView();var t=this;if(!this.byId("idBlkRbtClmDlg")){a.load({id:e.getId(),name:"ranpak.wz.rebatelist.fragment.bulkRebateClaimWizard",controller:this}).then(function(s){e.addDependent(s);s.open();t.oBlkRbtClmWiz=e.byId("idBlkRbtClmWiz");t.idDwnldTmpltWizStp=e.byId("idDwnldTmpltWizStp");t.oUpldTmpltWizStp=e.byId("idUpldTmpltWizStp");t.oReviewWizStp=e.byId("idReviewWizStp");t.oAttachUpldWizStp=e.byId("idAttachUpldWizStp");t.resetBlkClmWiz();t.oBusyDialog.close()})}else{this.byId("idBlkRbtClmDlg").open();this.resetBlkClmWiz();this.oBusyDialog.close()}},resetBlkClmWiz:function(){this.oBlkRbtClmWiz.setCurrentStep(this.idDwnldTmpltWizStp);var e=this.getView().byId("idBlkSubmitBtn");e.setEnabled(false)},onBlkCncl:function(){this.resetBlkClmWiz();this.byId("idBlkRbtClmDlg").close()},onDwnldTemplt:function(){var e=this.getAppModulePath()+"/artifacts/Rebate-Claim-Template.xlsx";sap.m.URLHelper.redirect(e,true);this.oBlkRbtClmWiz.setCurrentStep(this.oUpldTmpltWizStp)},onUpldTemplt:function(e){var t=e.getSource().oFileUpload.files[0];this.oParseExcel(t)},oParseExcel:function(e){var t=this;var s={},r="";if(e&&window.FileReader){var i=new FileReader;i.onload=function(e){var i=e.target.result;var a=XLSX.read(i,{type:"binary"});a.SheetNames.forEach(function(e){r=a.Sheets[e];s=XLSX.utils.sheet_to_row_object_array(r)});if(s.length>0){t.setExcelDtToTbl(r,s);t.generateTable();t.oBlkRbtClmWiz.setCurrentStep(t.oReviewWizStp);t.oBlkRbtClmWiz.setCurrentStep(t.oAttachUpldWizStp)}else{o.error(t.oI18n.getText("UPLOAD_FILE_EMPTY"));t.oBlkRbtClmWiz.setCurrentStep(t.oUpldTmpltWizStp)}};i.readAsBinaryString(e)}},setExcelDtToTbl:function(e,t){const s=[];const r=XLSX.utils.decode_range(e["!ref"]).e.c+1;for(let t=0;t<r;++t){if(e[XLSX.utils.encode_col(t)+1]){s[t]=e[XLSX.utils.encode_col(t)+1].v}}this.oBlkUpldMdl.setProperty("/columns",s);this.oBlkUpldMdl.setProperty("/rows",t)},generateTable:function(){var e=this.getView().byId("idBlkUpldTbl");e.bindColumns("oBlkUpldMdl>/columns",function(e,t){var s=t.getObject();return new n({label:s,template:new d({text:{path:"oBlkUpldMdl>"+s}}),width:"12rem",tooltip:s,sortProperty:s,filterProperty:s})});e.bindRows("oBlkUpldMdl>/rows")}})});
//# sourceMappingURL=ListView.controller.js.map