/*  DB Qiery Example

    Alan Riggins    
    CS645
    Spring 2017
 */

import java.io.*;
import java.util.Vector;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class Getdata extends HttpServlet { 
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        processRequest(request, response);         
        }

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
        processRequest(request, response);
        } 
        
    private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {
                            String sku = request.getParameter("sku");
        String query = "select p.sku,c.name,v.name,p.vendorModel from vendor v, category c, product p where v.id=p.venID AND c.id=p.catID AND p.sku=\""+sku+"\"";
         
	PrintWriter out = response.getWriter();  
	
	Vector<String[]> v = DBHelper.runQuery(query);
	response.setContentType("text/html");
	//out.println("<html><body>");

    if(v.size()==0) {
        out.print("Unavailable");
    }
    else {

        out.print("ok");
 

        String op="";
	// for(int i=0; i < v.size(); i++) {
		String [] tmp = v.elementAt(0);
		for(int j=0; j < tmp.length; j++)			
			// out.println(tmp[j]);
            op = op + "" + tmp[j] + ";";
        out.print(op);
		//out.println("<br />");
		}
	//out.print("<hr />");
	//out.print(DBHelper.doQuery(query));		
	//out.print("</body></html>");
        }      
}



