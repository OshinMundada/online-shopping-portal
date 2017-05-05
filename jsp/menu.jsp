<!DOCTYPE html>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="javax.servlet.*, javax.servlet.http.*" %>
<html>

<head>
    <meta charset="utf-8">
    <title>BeautyBae</title>

    <link rel="stylesheet" href="/jadrn030/css/tabmenu.css">
    <link rel="stylesheet" href="/jadrn030/css/tabscss.css">
    
    <script src="/jquery/jquery.js"></script>
    <script src="/jquery/jQueryUI.js"></script>
    <script src="/jadrn030/js/tab_example.js"></script>
    <script src="/jadrn030/js/inventoryjs.js"></script>
    


    <link rel="stylesheet" href="/jadrn030/css/login.css">

</head>


<body>
    <%@ page language="java" import="cal.*" %>
        <jsp:useBean id="current_date" scope="session" class="cal.TableBean" />

        <%
    current_date.processRequest(request);
%>
            <%
  response.setHeader("Cache-Control","no-cache");
  response.setHeader("Cache-Control","no-store");
  response.setHeader("Pragma","no-cache");
  response.setDateHeader ("Expires", 0);

  if(session.getAttribute("username")=="")
      response.sendRedirect("login_err.jsp");

  %>

                <%if(session.getAttribute("username")!=null){
                	System.out.println("session started");
	%>
                    <div id="home_page1">
                        <h1 id="title">BeautyBae</h1><br><br>

                        <input id="logout" value="Logout" type="button" class="button1">

                        <div id="tabs">
                            <ul>
                                <li><a href="#tabs-1"><span>Inventory Received</span></a></li>
                                <li><a href="#tabs-2"><span>Inventory Sent Out</span></a></li>
                            </ul>
                            <div id="tabs-1"><br><br>
                                <h2>Inventory Received</h2>
					
                                <table class="tableid">
                                    <tbody>

                                        <tr>
                                            <form method="post" enctype="multipart/form-data" name="form" action="">
                                                
                                                <tr>
                                                    <td>Date:*
                                                    </td>
                                                    <td><input type="date" name="date" id="date" size="20" placeholder="mm/dd/yyyy" autofocus value=<%=current_date.getDate() %>></td>
                                                    <td>
                                                        <div class="dr" id="date_status"></div>
                                                    </td> 			
                                                </tr>	
                                                <tr>
                                                    <td>SKU:*</td>
                                                    <td><input type="text" name="sku" id="sku" maxlength="7" size="20" placeholder="ABC-123" />
                                                        <td>
                                                            <div id="sku_status" class="dr"></div>
                                                        </td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Product Name:* </td>
                                                    <td><input type="text" name="model" id="model" disabled/> </td>
                                                    <td>
                                                        <div id="model_status" class="dr"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Vendor:*
                                                        <td><input type="text" name="vendor" id="vendor" size="20" disabled /> </td>
                                                        <td>
                                                            <div id="vendor_status" class="dr"></div>
                                                        </td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Category:* </td>

                                                    <td><input type="text" name="category" id="category" size="20" disabled/> </td>

                                                    <td>
                                                        <div id="category_status" class="dr"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td> Quantity:*

                                                    </td>
                                                    <td><input type="text" name="quantity" id="quantity" size="20"></td>
                                                    <td>
                                                        <div id="quantity_status" class="dr"></div>
                                                   
                                                    </td>

                                                </tr>
                                                
                                                <tr>
                                                    <td><input type="button" id="submit" value="Update" class="button1"></td>
                                                </tr>

                                                

                                </table>
			
                                </form>
     
                                 
    <h3 id="result">&nbsp;</h3>

                            </div>
                            <div id="tabs-2"> <br><br>
                            <h2>Inventory Sent Out</h2>

                                <table class="tableid">
                                    <tbody>

                                        <tr>
                                            <form method="post" enctype="multipart/form-data" name="form" action="">
                                                
                                                <tr>
                                                    <td>Date:*
                                                    </td>
                                                    <td><input type="date" name="dateedit" id="dateedit" size="20" placeholder="mm/dd/yyyy" autofocus value=<%=current_date.getDate() %>></td>
                                                    <td>
                                                        <div class="dr"  id="dateedit_status"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>SKU:*</td>
                                                    <td><input type="text" name="skuedit" id="skuedit" maxlength="7" size="20" placeholder="ABC-123" />
                                                        <td>
                                                            <div id="skuedit_status" class="dr"></div>
                                                        </td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Product Name:* </td>
                                                    <td><input type="text" name="modeledit" id="modeledit" disabled /> </td>
                                                    <td>
                                                        <div id="modeledit_status" class="dr"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Vendor:*
                                                        <td><input type="text" name="vendoredit" id="vendoredit" size="20" disabled /></td>
                                                        <td>
                                                            <div id="vendoredit_status" class="dr"></div>
                                                        </td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Category:* </td>

                                                    <td><input type="text" name="categoryedit" id="categoryedit" size="20" disabled/> </td>

                                                    <td>
                                                        <div id="categoryedit_status" class="dr"></div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td >Quantity:*

                                                    </td>
                                                    <td><input type="text" name="quantityedit" id="quantityedit" size="20"></td>
                                                    <td>
                                                        <div  class="dr" id="quantityedit_status"></div>
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td class="dr"></td>
                                                    <td class="dr"><div id="on_handedit"></div></td>

                                                </tr>
                                                <tr>
                                                    <td><input type="button" id="subedit" value="Update" class="button1"></td>
                                                </tr>

                                               


                                </table>

                                </form>
                               <h3 id="resultedit">&nbsp;</h3>
                            </div>

                        </div>
                    </div>



                    <%
} else{
	System.out.println("session none");
}%>

</body>

</html>
