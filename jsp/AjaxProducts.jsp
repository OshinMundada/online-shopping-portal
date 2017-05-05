<%@ page import = "java.util.*,sdsu.*;" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:forEach items="${p_beans}" var="item">
<div class="product_display">
<img src="http://jadran.sdsu.edu/~jadrn030/proj1/tasvir/${item.image}" class="prodimg" />
<h4> ${item.model}</h4>
<p>Category: ${item.category} </p>
<p> Vendor: ${item.vendor} </p>
<p> Cost: ${item.retail}</p>
<p>Description: ${item.description} </p>
<a href="http://jadran.sdsu.edu/jadrn030/servlet/AjaxPopulateDetails?sku=${item.sku}" class="knowmore">Click for details</a>
<p class="status"> ${item.quantity} </p> 
<!-- <input type="button" class="knowmore" name="knowmore" value="Click for details" /> -->
</div>
</c:forEach>

    
