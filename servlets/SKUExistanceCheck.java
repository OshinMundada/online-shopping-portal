import java.io.IOException;
import java.io.PrintWriter;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import sdsu.*;


public class SKUExistanceCheck extends HttpServlet  {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SKUExistanceCheck() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		checkSKU(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		checkSKU(request, response);
	}

	private void checkSKU(HttpServletRequest request, HttpServletResponse response)   throws IOException, ServletException {
		PrintWriter out = response.getWriter();
		String sku = request.getParameter("sku");
		String query = "SELECT sku from product WHERE sku=\"" + sku + "\"";
		Vector<String[]> data = DBHelper.runQuery(query);
		response.setContentType("text/html");
		if (data.size() == 0) {
			out.print("no");
		} else {
			out.print("yes");
		}
	}

}
