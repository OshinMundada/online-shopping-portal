import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class OnHandCheck{

public static String checkOnHand(String sku){
String qtyMin = "";
   String lookUpSKUMerchandisIn ="select on_hand_quantity from on_hand where sku=\"" + sku + "\"";
    Vector<String []> minqty = DBHelper.runQuery(lookUpSKUMerchandisIn);
    
 if (minqty.size() == 0) {
			qtyMin = "-1";
		} else {
String qmin[]=minqty.elementAt(0);
      for(int i=0;i <qmin.length;i++){
    	  qtyMin += qmin[i];
      }
		}

return qtyMin;
}
}
