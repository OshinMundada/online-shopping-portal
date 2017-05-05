import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class MerchandiseDataAccess{
  public static String dataHandler(String sku){
String message ="";
    String query = "select product.vendorModel,vendor.name,category.name, product.image from product, vendor, category where product.venID=vendor.id and product.catID=category.id and sku=\"" + sku + "\"";
    Vector<String []> data = DBHelper.runQuery(query);
  
    String str[]=data.elementAt(0);
      for(int i=0;i <str.length;i++){
        message += str[i];
    		message += "|";
      }
    return message;
  }
  public static String addMerchandiseIn(String sku , String date , int quantity){
String message ="";
String message1 ="";
String qtyMin = "";
//String lookUpSKUMerchandisIn ="select sku from merchandise_in where sku=\"" + sku + "\"";
//String lookUpQuantityMerchandisIn ="select quantity from merchandise_in where sku=\"" + sku + "\"";
//Vector<String []> lookupSKU = DBHelper.runQuery(lookUpSKUMerchandisIn);
//if(lookupSKU.size()==0){
	String insertQueryMechandiseIn = "insert into merchandise_in(sku,date,quantity) values(\"" + sku + "\",\"" + date + "\",\"" + quantity + "\")";
	int rows = DBHelper.executeCommand(insertQueryMechandiseIn); 
/*}
else{
	
    String quantityQuery ="select quantity from merchandise_in where sku=\"" + sku + "\"";
    Vector<String []> quantityMIN = DBHelper.runQuery(quantityQuery);
    String qmin[]=quantityMIN.elementAt(0);
      for(int i=0;i <qmin.length;i++){
    	  qtyMin += qmin[i];
      }
    int quantityFromDB=Integer.parseInt(qtyMin);
    int result=quantityFromDB+quantity;
	String updateQueryMechandiseIn = "update merchandise_in set date=\"" + date + "\",quantity=\"" + result + "\" where sku=\"" + sku + "\"";
	int rows = DBHelper.executeCommand(updateQueryMechandiseIn);
}
*/    String lookUPSKUONHand ="select sku from on_hand where sku=\"" + sku + "\"";
    Vector<String []> data = DBHelper.runQuery(lookUPSKUONHand);
    if(data.size()==0){
    String q2 = "insert into on_hand(sku,last_date_modified,on_hand_quantity) values(\"" + sku + "\",\"" + date + "\",\"" + quantity + "\")";
    
    int rows1= DBHelper.executeCommand(q2);
    message="Data added in on_hand and merchandise_in";
    }
    else
    {
      String q3="select on_hand_quantity from on_hand where sku=\"" + sku + "\"";
      Vector<String []> data1 = DBHelper.runQuery(q3);
      String str[]=data1.elementAt(0);
        for(int i=0;i <str.length;i++){
          message1 += str[i];
        }
      int quantityFromDB=Integer.parseInt(message1);
      int result=quantityFromDB+quantity;
      String q4 = "update on_hand set last_date_modified=\"" + date + "\",on_hand_quantity=\"" + result + "\" where sku=\"" + sku + "\"";
      int execute= DBHelper.executeCommand(q4);
      message="Quantity is updated in on_hand and added in merchandise_in";
    }

    return message;
  }
  
  
  public static String addMerchandiseOut(String sku , String date , int quantity){
	  String message ="";
	  String message1 ="";
	  String qtyMin = "";
	  String lookUpSKUMerchandisIn ="select sku from merchandise_out where sku=\"" + sku + "\"";
	  String lookUpQuantityMerchandisIn ="select quantity from merchandise_out where sku=\"" + sku + "\"";
	  Vector<String []> lookupSKU = DBHelper.runQuery(lookUpSKUMerchandisIn);
	//  if(lookupSKU.size()==0){
	  	String insertQueryMechandiseIn = "insert into merchandise_out (sku,date,quantity) values(\"" + sku + "\",\"" + date + "\",\"" + quantity + "\")";
	  	int rows = DBHelper.executeCommand(insertQueryMechandiseIn); 
	/*  }
	  else{
	  	
	      String quantityQuery ="select quantity from merchandise_out where sku=\"" + sku + "\"";
	      Vector<String []> quantityMIN = DBHelper.runQuery(quantityQuery);
	      String qmin[]=quantityMIN.elementAt(0);
	        for(int i=0;i <qmin.length;i++){
	      	  qtyMin += qmin[i];
	        }
	      int quantityFromDB=Integer.parseInt(qtyMin);
	      int result=quantityFromDB-quantity;
	  	String updateQueryMechandiseIn = "update merchandise_out set date=\"" + date + "\",quantity=\"" + result + "\" where sku=\"" + sku + "\"";
	  	int rows = DBHelper.executeCommand(updateQueryMechandiseIn);
	  }*/
	      String lookUPSKUONHand ="select sku from on_hand where sku=\"" + sku + "\"";
	      Vector<String []> data = DBHelper.runQuery(lookUPSKUONHand);
	      if(data.size()==0){
	      String q2 = "insert into on_hand(sku,last_date_modified,on_hand_quantity) values(\"" + sku + "\",\"" + date + "\",\"" + quantity + "\")";
	      
	      int rows1= DBHelper.executeCommand(q2);
	      message="Data added in on_hand and merchandise_out";
	      }
	      else
	      {
	        String q3="select on_hand_quantity from on_hand where sku=\"" + sku + "\"";
	        Vector<String []> data1 = DBHelper.runQuery(q3);
	        String str[]=data1.elementAt(0);
	          for(int i=0;i <str.length;i++){
	            message1 += str[i];
	          }
	        int quantityFromDB=Integer.parseInt(message1);
	        int result=quantityFromDB-quantity;
	        String q4 = "update on_hand set last_date_modified=\"" + date + "\",on_hand_quantity=\"" + result + "\" where sku=\"" + sku + "\"";
	        int execute= DBHelper.executeCommand(q4);
	        message="Quantity is updated in on_hand and added in merchandise_out";
	      }

	      return message;
  }	
}
