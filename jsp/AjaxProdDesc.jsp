<%@ page import = "java.util.*,sdsu.*;" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>BeautyBae</title>
<link rel="stylesheet" type="text/css" href="../css/proddesc.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript" src="/jadrn030/js/cart.js"></script>
</head>

<body>
<h1 id="heading"> BeautyBae <span id="cart"><a href="http://jadran.sdsu.edu/jadrn030/servlet/CartServlet?requesttype=showCart"><i class="fa fa-shopping-bag fa-2x"></i><br> Cart:<span id="count">0</span></a></span></h1>
<div id="goback"> <a href="http://jadran.sdsu.edu/jadrn030/proj3.html">&lt;&lt;Go Back</a> </div>

<div id="container">

<c:forEach items="${q_beans}" var="item">

<img src="http://jadran.sdsu.edu/~jadrn030/proj1/tasvir/${item.image}" id="prodimg" />  
<div id="nextstep">
	<p>${item.quantity}</p>
	<p>Quantity: <input type="number" name="quantity" id="quantity" min="1" value="1"></p>
	<input type="hidden" id="sku" value="${item.sku}" />
	<input type="hidden" id="qty" value="${item.qty}" />
	<p><button id="addtobasket">Add to basket</a></p>
</div>
<h4>${item.model}</h4>
<p>Category: ${item.category} </p>
<p>Vendor: ${item.vendor}  </p>
<p>Cost: ${item.retail}</p>
<p>Description: ${item.description}</p>
<p>Features: ${item.features}</p>

</c:forEach>


    
