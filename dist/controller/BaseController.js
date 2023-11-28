sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/format/NumberFormat","sap/m/MessageToast","sap/m/MessageBox"],function(e,t,a,r){"use strict";return e.extend("ranpak.wz.rebatelist.controller.BaseController",{getAppModulePath:function(){var e=jQuery.sap.getModulePath("ranpak.wz.rebatelist");return e},fetchDate:function(e){const t=e.getTimezoneOffset()*6e4;const a=new Date(e.getTime()-t);return a},validateNumberFld:function(e){var t=false;var a=e.getSource().getValue();var r=/^\d+$/;if(r.test(a)){t=true}return t},validateAlphaNumFld:function(e){var t=false;var a=e.getSource().getValue();var r=/^[\w\-\s]+$/;if(r.test(a)){t=true}return t},validateNumFldBlk:function(e){var t="";var a=/^\d+$/;if(e){if(a.test(e)){t=e;this.setValueState("None")}else{this.setValueState("Error")}}else{this.setValueState("None")}return t},validateAlphaNumFldBlk:function(e){var t="";var a=/^[\w\-\s]+$/;if(e){if(a.test(e)){t=e;this.setValueState("None")}else{this.setValueState("Error")}}else{this.setValueState("None")}if(this.getBindingContext("oBlkUpldMdl")){this.getBindingContext("oBlkUpldMdl").getObject()[this.getBindingInfo("value").parts[0].path]=t}return t},validateAmntFldBlk:function(e){var a="";var r=t.getCurrencyInstance({currencyCode:false,decimals:2});var i=/^\d+$/;if(e){var s=r.parse(e);if(s){e=r.parse(e)[0]}if(i.test(e)){a=e;a=r.format(e);this.setValueState("None")}else{this.setValueState("Error")}}else{this.setValueState("None")}if(this.getBindingContext("oBlkUpldMdl")){this.getBindingContext("oBlkUpldMdl").getObject()[this.getBindingInfo("value").parts[0].path]=a}return a},validateDateFldBlk:function(e){var t=sap.ui.core.format.DateFormat.getDateInstance({pattern:"YYYY/MM/dd"});var a="";var r=isNaN(Date.parse(e));if(!r){a=e;a=t.format(new Date(a));this.setValueState("None")}else{this.setValueState("Error")}if(this.getBindingContext("oBlkUpldMdl")){this.getBindingContext("oBlkUpldMdl").getObject()[this.getBindingInfo("value").parts[0].path]=a}return a},validateBlkPayload:function(){this.oErrFlds=[];var e=true;var t=this.getView().byId("idBlkUpldTbl");var a=t.getRows();var r="",i="";for(var s=0;s<a.length;s++){r=a[s].getCells();i=a[s].getBindingContext("oBlkUpldMdl");if(i){for(var n=0;n<r.length;n++){if(r[n].getValueState()==="Error"){e=false;this.oErrFlds.push(r[n].getBindingInfo("value").parts[0].path+" in Line "+(s+1))}}}}return e},formBlkClmPayload:function(){var e=sap.ui.core.format.DateFormat.getDateInstance({pattern:"YYYY-MM-dd"});var t=[];var a="";var r=this.getOwnerComponent().getModel("oBlkUpldMdl");var i=r.getData();var s=i.columns;var n=i.rows;for(var l=0;l<n.length;l++){a=Object.keys(n[l]);var o={},u="",f;for(var d=0;d<a.length;d++){if(a[d]==="Ranpak Rebate ID #"){f=10-n[l][a[d]].length;for(var c=0;c<f;c++){u+="0"}u+=n[l][a[d]];o["Rebate_ID"]=u}else if(a[d]==="Sales Organization"){o["Sales_Organization"]=n[l][a[d]]}else if(a[d]==="Ranpak Distributor Number"){o["Distributor_No"]=n[l][a[d]]}else if(a[d]==="Distributor Name"){o["Distributor_Name"]=n[l][a[d]]}else if(a[d]==="Ranpak End User Number"){o["End_User_No"]=n[l][a[d]]}else if(a[d]==="End user Name"){o["End_user_Name"]=n[l][a[d]]}else if(a[d]==="End User City"){o["End_User_City"]=n[l][a[d]]}else if(a[d]==="End user State"){o["End_user_State"]=n[l][a[d]]}else if(a[d]==="Your Sales Office #"){o["Your_Sales_Office"]=n[l][a[d]]}else if(a[d]==="Your Sales Office Name"){o["Your_Sales_Office_Name"]=n[l][a[d]]}else if(a[d]==="Your Item #"){o["Your_Item"]=n[l][a[d]]}else if(a[d]==="Your Item Description"){o["Your_Item_Description"]=n[l][a[d]]}else if(a[d]==="Ranpak Item #"){o["Ranpak_Item"]=n[l][a[d]]}else if(a[d]==="End User Invoice #"){o["End_User_Invoice"]=n[l][a[d]]}else if(a[d]==="End User Invoice Date (YYYY-MM-DD)"){o["End_User_Ship_Date"]=e.format(new Date(n[l][a[d]]))}else if(a[d]==="Resale Price"){o["Resale_Price"]=n[l][a[d]]}else if(a[d]==='"List Price "'){o["List_Price"]=n[l][a[d]]}else if(a[d]==="Rebate Amount €"){o["Rebate_Amount"]=n[l][a[d]]}else if(a[d]==="Net Price"){o["Net_Price"]=n[l][a[d]]}else if(a[d]==="Qty Sold to End User"){o["Quantity"]=n[l][a[d]]}else if(a[d]==="UOM Sold"){o["UOM"]=n[l][a[d]]}else if(a[d]==="customer reference"){o["Customer_Reference"]=n[l][a[d]]}o["col16"]="";o["col17"]=""}t.push(o)}var g={file_name:"REBATE_CLAIM",dummytoexcelset:t,dummytomessageset:[]};return g},onBlkSubmit:function(){var e=this.validateBlkPayload();if(e){this.triggerRebateClmSubmit(true)}else{var t="";for(var a=0;a<this.oErrFlds.length;a++){t+="\n"+(a+1)+". "+this.oErrFlds[a]}r.error(this.oI18n.getText("VALIDATE_PAYLOAD_ERR")+",\n"+t)}},resetAttachMdl:function(){var e=this.getOwnerComponent().getModel("oAttachmentMdl");e.setProperty("/results",[]);e.refresh(true)}})});
//# sourceMappingURL=BaseController.js.map