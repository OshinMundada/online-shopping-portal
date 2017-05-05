import java.io.*;
import java.util.*;
import sdsu.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class CartServlet extends HttpServlet {



	private static Hashtable<String, CartBean> currentCart;


	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		intializeCartHashTable();

	}



	public static Hashtable<String, CartBean> getCurrentShoppingCart() {
		if (currentCart == null)
			currentCart = new Hashtable<String, CartBean>();

		return currentCart;
	}



	public static void intializeCartHashTable() {
		currentCart = new Hashtable<String, CartBean>();

	}
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		cartProcess(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		cartProcess(request, response);
	}


	public void cartProcess(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		HttpSession session = request.getSession();



		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		Hashtable<String, CartBean> cartDetails = getCurrentShoppingCart();
		String requestType = request.getParameter("requesttype");
		String productSku = request.getParameter("skuaddtocart");
		String quantity = request.getParameter("quantity");

		int qty = 0;
		try {
			qty = Integer.parseInt(quantity);
		} catch (NumberFormatException e) {
			qty = 0;
		}

		if (session == null) {
			out.write("NULL (Empty Session)");
		} else {
			String sessionId = session.getId();
			CartBean CartBean = cartDetails.get(sessionId);
			if (CartBean == null)
				cartDetails.put(sessionId, new CartBean(sessionId));
			CartBean = cartDetails.get(sessionId);
			if (requestType.equals("addproduct")) {
				CartBean.insert(productSku, qty);
				out.write("Succeess|" + CartBean.size());
			} else if (requestType.equals("update")) {
				CartBean.update(productSku, qty);
			carCRUDOperations(CartBean, request, response);
			} else if (requestType.equals("delete")) {
				CartBean.delete(productSku);
				carCRUDOperations(CartBean, request, response);
			} else if (requestType.equals("clear")) {
				CartBean.clear();
			} else if (requestType.equals("showCart")) {
				carCRUDOperations(CartBean, request, response);
			} else if (requestType.equals("size")) {
				out.write("" + CartBean.size());
			}
		}

	}

	private void carCRUDOperations(CartBean c, HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
				String quantity;
		HttpSession session = request.getSession(false);
		HashMap<String, Integer> cartQuantity = new HashMap<String, Integer>();
		Iterator<String> k = c.keys();
		Iterator<Integer> v = c.values();

		List<ProductBean> bean = new ArrayList<ProductBean>();

		while (k.hasNext()) {
			String key = k.next();
			int value = v.next();
			String query = "select * from product where sku = '" + key +"';";
			Vector<String[]> vector = DBHelper.runQuery(query);
			for(int i=0; i < vector.size(); i++)  {
				String [] tmp = vector.elementAt(i);
				String qty = OnHandCheck.checkOnHand(key);

				if(Integer.parseInt(qty) > 0) { quantity = "In stock (" +qty+")" ; }
		else if (Integer.parseInt(qty) == 0) {  quantity = "More on the way"; }
		else  { quantity = "Coming soon"; }

				ProductBean bean2 = new ProductBean();

				bean2 = new ProductBean(tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],
					tmp[5],tmp[8],Float.parseFloat(tmp[6]),Float.parseFloat(tmp[7]),qty,quantity);
				bean.add(bean2);

				}


			cartQuantity.put(key, value);
			System.out.println("oshin--" + key + value);

		}

		ProductBean b1[] = new ProductBean[bean.size()];
		for(int i=0;i<bean.size();i++){
			b1[i] = bean.get(i);
		}

		for(int j = 0;j<b1.length;j++){
			System.out.println("--oshin"+b1[j].getImage());
		}

		session.setAttribute("cartdetails", c);
		session.setAttribute("productDetails", b1);


		RequestDispatcher dispatcher = request.getServletContext()
				.getRequestDispatcher("/WEB-INF/shoppingcart.jsp");
		dispatcher.forward(request, response);
	}



}
