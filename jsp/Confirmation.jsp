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
<link rel="stylesheet" type="text/css" href="../css/confirmation.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript" src="js/prod.js"></script>
<!-- <script type="text/javascript" src="js/ajax_populate_page.js"></script>
<script type="text/javascript" src="js/shopping_cart.js"></script> -->
</head>

<body>

<h1 id="heading"> BeautyBae <!-- <span id="cart"><i class="fa fa-shopping-bag fa-2x"></i><br> Cart:<span id="count">0</span></span> --></h1>

<h3> Your order has been confirmed! Thank you for shopping with us! </h3>

<table class="cart_table">
<%
			if (session != null) {

		
				CartBean bean  = (CartBean) session
						.getAttribute("cartdetails");


				
			%>


<c:forEach items="${productDetails}" var="item">
<% System.out.println("Inside prod -----"); %>
<c:set var="sku" value="${item.sku}" />
<% String sku  = pageContext.getAttribute("sku").toString();
int qty= bean.getQty(sku); %>
<tr>
<td><img src="http://jadran.sdsu.edu/~jadrn030/proj1/tasvir/${item.image}"></td>
<td>${item.model}</td>
<td><%= qty %> </td>
<td>${item.retail}</td>
</tr>

<!-- <tr>
<td><img src="images/1.jpg"></td>
<td>Title of the prod sadasdsadasdada</td>
<td>10</td>
<td>$45.54</td>

</tr>

<tr>
<td></td>
<td><b>Total</b></td>
<td><b>15</b></td>
<td><b>$91.92</b></td>

</tr> -->
</c:forEach>
<% } %>
</table>

<table class="checkout_table">
<c:forEach items="${form_beans}" var="items">
<tr>
<td> <b>Name</b> </td>
<td> ${items.name}</td>
</tr>

<tr>
<td> <b>Shipping Address</b> </td>
<td>${items.shipadd}</td>
</tr>

<tr>
<td> <b>Name on card</b> </td>
<td> ${items.payname} </td>
</tr>

<tr>
<td> <b>Credit Card Type</b> </td>
<td> ${items.paytype}</td>
</tr>

<tr>
<td> <b>Credit Card Number</b> </td>
<td> 
<c:set var="ccnum" value="${items.paynum}" />
<%
				
				String ccnum  = pageContext.getAttribute("ccnum").toString();
				 ccnum = ccnum.substring(ccnum.length() - 4); 
				

				 %>
			xxxx-xxxx-xxxx-	 <%= ccnum %>


</td>
</tr>
</c:forEach>

</table>


</body>
</html>