import java.io.*;
import java.util.*;
import sdsu.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class MyServlet extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		HttpSession session = request.getSession();
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		String skustring= request.getParameter("skustring");
		//System.out.println("---osh"+skustring);
		String [] skus=skustring.split("\\|");
		//System.out.println("-----osh"+Arrays.toString(skus));

		String qitystring= request.getParameter("qity");
		String [] qity=qitystring.split("\\|");
		//System.out.println("-----osh"+Arrays.toString(qity));		
		
		for(int i=0; i<skus.length; i++){
            updateMerchandise(skus[i],Integer.parseInt(qity[i]));
        }

		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String mob1 = request.getParameter("mob1");
		String mob2 = request.getParameter("mob2");
		String mob3 = request.getParameter("mob3");

		String mobile = mob1+mob2+mob3;
		//String bill_add=request.getParameter("address")+request.getParameter("address2")+request.getParameter("city")+request.getParameter("state")+request.getParameter("zipcode");
		String ship_add1=request.getParameter("address1");
		String ship_add2=request.getParameter("address21");
		String city = request.getParameter("city1");
		String state=request.getParameter("state1");
		String zip=request.getParameter("zipcode1");

		String shipadd=ship_add1+" " +ship_add2+" "+city+" "+ state+ "- "+zip;
		//System.out.println("-----oshin "+shipadd);
		
		String paytype= request.getParameter("cardtype");
		String paynum= request.getParameter("credit");
		String payname= request.getParameter("cardname");
		String paycvv= request.getParameter("cvv");
		String payexpmon= request.getParameter("CCExpiresMonth");
		String payyear= request.getParameter("CCExpiresYear");

		FormInfo [] b2 = new FormInfo[1];
		b2[0] = new FormInfo(name,email,mobile,shipadd,paytype,paynum,payname,paycvv,payexpmon,payyear);
		
		request.setAttribute("form_beans",b2);
		
		CartServlet.getCurrentShoppingCart().remove(session.getId());
		

	String toDo = "/WEB-INF/jsp/Confirmation.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response); 

	}

	 public void updateMerchandise(String sku, int quantity) {
        boolean dbResult = UpdateQue.runUpdateQuery("INSERT INTO merchandise_out"
                + " values('" + sku + "',CURDATE()," + quantity + ");");

        if (dbResult) {
        	//System.out.println("ssssss"+dbResult);
            int on_hand_quantity = UpdateQue.getOnHandQuantity(sku);
            //System.out.println("ssssss"+on_hand_quantity);
            int new_quantity = 0;
            if (on_hand_quantity != -9999) {
                new_quantity = on_hand_quantity - quantity;
                UpdateQue.runUpdateQuery("UPDATE on_hand SET last_date_modified=CURDATE(),"
                        + "on_hand_quantity=" + new_quantity + " WHERE sku='" + sku + "';");
            }
        }
    }


}
