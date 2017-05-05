<%@ page import="java.util.*"%>
<%@ page import="sdsu.*"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>




<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>BeautyBae</title>
<link rel="stylesheet" type="text/css" href="../css/basket.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript" src="../js/basket.js"></script>
<!-- <script type="text/javascript" src="js/ajax_populate_page.js"></script>
<script type="text/javascript" src="js/shopping_cart.js"></script> -->
</head>

<body>

<h1 id="heading"> BeautyBae <!-- <span id="cart"><a href="http://jadran.sdsu.edu/jadrn030/servlet/CartServlet?action=CartServlet&requesttype=showCart"><i class="fa fa-shopping-bag fa-2x"></i><br> Cart:<span id="count">0</span></span> --></h1>

<h3>MY BASKET</h3>

<table class="cart_table" id="cartshow">
<%! float grandtot =0;
float taxtot =0;
float lasttot =0;
 %>
<%
			if (session != null) {
				
			 grandtot=0; taxtot=0; lasttot=0;
			 
				CartBean bean  = (CartBean) session
						.getAttribute("cartdetails");

				if(bean.size()==0) {

				
			%>
			<div class="emptyclass"><h5> Cart is empty! <br/>Add items to your cart! <br/><br/><a href="http://jadran.sdsu.edu/jadrn030/proj3.html"> Start Shopping Here! </a> </h5>
			
			</div>
		<% } else { %>

<c:forEach items="${productDetails}" var="item">
<c:set var="sku" value="${item.sku}" />

<c:set var="retail" value="${item.retail}" />
			<%
				
				String sku  = pageContext.getAttribute("sku").toString();
				
				int qty= bean.getQty(sku);

				String retail = pageContext.getAttribute("retail").toString();
				
			%>

<tr>
<td class="skuhide"><%=sku%></td>
<td><img src="http://jadran.sdsu.edu/~jadrn030/proj1/tasvir/${item.image}"></td>
<td>${item.model}
<input type="hidden" name="quant" id="quant" value="${item.qty}" >
<input type="hidden" name="oldquant" id="oldquant" value="<%=qty%>" ></td>
<td>

Qty: <input type="number" class="qtycart" id="quantity_${item.sku}" min="1" size="4" value="<%=qty%>"></td>

<% 
	float total = (float) qty * Float.parseFloat(retail); 
   grandtot += total; %>
<td>$ ${item.retail} EA </td>
<td><input type="button" class="remove" value="Remove" id="remove_${item.sku}" ></td>
</tr>


</c:forEach>

</table>

<table class="checkout_table">
<tr>
<td> <b>ORDER SUMMARY</b> </td>
<td> </td>
</tr>
<tr>
<td>Merchandise subtotal:</td>
<td>$ <%= grandtot %></td>
</tr>
<tr>
<td>Shipping and Handling</td>
<td>$5.00</td>
</tr>
<tr>
<td>Tax(8%)</td>
<% taxtot = 0.08f * (grandtot+5);
double taxtots = Math.round(taxtot * 100.0) / 100.0; %>
<td>$ <%= taxtots %></td>
</tr>
<% lasttot = grandtot + taxtot;
double lasttots = Math.round(lasttot * 100.0) / 100.0; %>
<tr>
<td>Total</td>
<td>$ <%= lasttots %></td>
</tr>

<tr>
<td><input type="button" id="checkoutbutton" name="checkout" value="Checkout"></td>
<td><input type="button" id="cancelbutton" name="cancel" value="Cancel"></td>
</tr>
<% } %>
<% } %>
</table>

</body>
</html>







    
