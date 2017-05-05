import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class CheckOnHand extends HttpServlet {

public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	processRequest(request, response);
	}

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {
	processRequest(request, response);
  
} 

private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {        
	PrintWriter out = response.getWriter();
 	String sku=request.getParameter("sku"); 
  	String data=OnHandCheck.checkOnHand(sku);
	response.setContentType("text/html");
  	out.print(data);
        }       
}
