import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import sdsu.*;
import javax.servlet.*;
import javax.servlet.http.*;


/**
 * The simplest possible servlet.
 *
 * @author James Duncan Davidson
 */

public class AjaxGetProducts2 extends HttpServlet {
	 String[] selectedCategories;
	 String[] selectedVendors;
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
         String quantity;
         response.setContentType("text/html");
	PrintWriter out = response.getWriter();
	ProductBean [] beans;
	String categories = request.getParameter("categories");
	selectedCategories = (categories != null) ? categories.split("\\|") : null;

	String vendors = request.getParameter("vendors");
	selectedVendors = (vendors != null) ? vendors.split("\\|") : null;
	Vector<String[]> v = DBHelper.runQuery("SELECT sku, category.name as category, vendor.name as vendor,"
				+ "vendorModel,description, features, cost, retail, image, NULL " + "FROM product, category, vendor "
				+ "WHERE product.catID = category.id AND product.venID = vendor.id;");
	if(selectedCategories==null && selectedVendors==null){

	beans = new ProductBean[v.size()];
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
	}
	else{
		List<ProductBean> b=new ArrayList<ProductBean>();

		for(int i=0; i < v.size(); i++)  {
			String [] tmp = v.elementAt(i);

			OnHandCheck q= new OnHandCheck();
			String qty = q.checkOnHand(tmp[0]);
			// System.out.println("---Oshin"+qty);
			if(Integer.parseInt(qty) > 0) { quantity = "In stock (" +qty+")" ; }
			else if (Integer.parseInt(qty) == 0) {  quantity = "More on the way"; }
			else  { quantity = "Coming soon"; }



			ProductBean res=new ProductBean(tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],
					tmp[5],tmp[8],Float.parseFloat(tmp[6]),Float.parseFloat(tmp[7]),qty,quantity);

			if(getProductsWithFilters(tmp[1],tmp[2])==true){
				b.add(res);
			}
		}
		beans=new ProductBean[b.size()];
		for(int i=0;i<b.size();i++){
			beans[i]=b.get(i);
			System.out.println("----oshin"+beans[i]);

		}


	}
if(beans.length==0){
				out.write("<h1>--- no result</h1>");
				System.out.println("empty");
		}
	request.setAttribute("p_beans",beans);
	String toDo = "/WEB-INF/jsp/AjaxProducts.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo);
        dispatcher.forward(request, response);

    }

    private boolean getProductsWithFilters(String category, String vendor) {
		return (selectedCategories == null || Arrays.asList(selectedCategories).contains(category))
				&& (selectedVendors == null || Arrays.asList(selectedVendors).contains(vendor));

	}

}



