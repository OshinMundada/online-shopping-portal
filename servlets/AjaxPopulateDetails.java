import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

/**
 * The simplest possible servlet.
 *
 * @author James Duncan Davidson
 */

public class AjaxPopulateDetails extends HttpServlet {

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
        	String quantity;
        	
        	System.out.println("---oshin"+request.getParameter("sku"));
	PrintWriter out = response.getWriter();
	String sku = request.getParameter("sku");
	
	Vector<String[]> v = DBHelper.runQuery("SELECT sku, category.name as category, vendor.name as vendor, vendorModel,description, features, cost, retail, image, NULL FROM product, category, vendor WHERE sku = '" +sku + "' AND product.catID = category.id AND product.venID = vendor.id;");
	ProductBean [] beans = new ProductBean[v.size()];
	for(int i=0; i < v.size(); i++)  {
		String [] tmp = v.elementAt(i);

		OnHandCheck q= new OnHandCheck();
		String qty = q.checkOnHand(tmp[0]);
		// System.out.println("---Oshin"+qty);
		if(Integer.parseInt(qty) > 0) { quantity = "In stock (" +qty+")" ; }
		else if (Integer.parseInt(qty) == 0) {  quantity = "More on the way"; }
		else  { quantity = "Coming soon"; }



		beans[i] = new ProductBean(tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],
			tmp[5],tmp[8],Float.parseFloat(tmp[6]),Float.parseFloat(tmp[7]),qty,quantity);
		}
	request.setAttribute("q_beans",beans);
	String toDo = "/WEB-INF/jsp/AjaxProdDesc.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);  						    

    }
}



