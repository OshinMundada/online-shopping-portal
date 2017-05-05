#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

##---------------------------- MAIN ---------------------------------------
# our $logged_in=1;
my $q;

my $cookie;


if(authenticate_user()) {
    send_to_main();
}
else {
    send_to_login_error();
    }    
###########################################################################

###########################################################################
sub authenticate_user {
    $q = new CGI;
    my $user = $q->param("user");
    my $password = $q->param("password");    
    open DATA, "</srv/www/cgi-bin/jadrn030/proj1/encryption/passwords.dat" 
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
        chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line;    
        if($stored_user eq $user && Crypt::SaltedHash->validate($stored_pass, $password)) {
            $OK = 1;
            last;
            }
        }
    return $OK;
    }
###########################################################################

###########################################################################
sub send_to_login_error {

    print <<END;
Content-type:  text/html

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn030/proj1/error.html" />
</head><body></body>
</html>

END
    }  
    
sub send_to_main {


# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP 
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID  
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    $cookie = $q->cookie(jadrn030SID => $session->id);
    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser    
    my $sid = $session->id;
    

    print <<END;
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>BeautyBae - User Page</title>
    <link rel="stylesheet" href="/~jadrn030/proj1/css/tab_example.css">
    <link rel="stylesheet" href="/~jadrn030/proj1/css/logout.css">
    <link href="/~jadrn030/proj1/css/tabs.css" rel="stylesheet">

    <script src="/jquery/jquery.js"></script>
    <script src="/jquery/jQueryUI.js"></script>
    <script src="/~jadrn030/proj1/js/tab_example.js"></script>
    <script src="/~jadrn030/proj1/js/check_dup.js"></script>
    <script src="/~jadrn030/proj1/js/add_data.js"></script>
    <script src="/~jadrn030/proj1/js/edit_data.js"></script>
    <script src="/~jadrn030/proj1/js/logout.js"></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body id="bod">

<div id="container">
            <div id="content">
            <span id="thankyou">Logged out successfullly. </span><br />
            <div id="gobacklogo">
            <a href="http://jadran.sdsu.edu/~jadrn030/proj1/index.html">
                
                <span id="goback1"> Log in again </span>
            </a>
            </div>
            </div>
        </div>
<div id="rest">
<span id="logoutspan">
  <input type="button" id="logout_button" value="Logout" />
  </span>

  <h1>BeautyBae</h1>


    <div id="tabsdiv">
      <ul>
        <li><a href="#tabs-1"><span>Add Product</span></a></li>
        <li><a href="#tabs-2"><span>Edit Product</span></a></li>
        <li><a href="#tabs-3"><span>Delete Product</span></a></li>

      </ul>
      <div id="tabs-1">
       
<div class="formcontent">
   <h2>ADD</h2>

  <form method="post"
      enctype="multipart/form-data"
      name="form"
      action="">
      <p class="left">
          <label for="sku" class="fa fa-pencil"> SKU
          </label>
          <input type="text" name="sku" id="sku" size="20" placeholder="ABC-123" autofocus/>
      </p>
      <p class="right">
          <label for="model" class="fa fa-link" required="required"> Product Name</label>
          <input type="text" name="model" id="vendorModel" placeholder="JHG789" />
      </p>
      

      <p class="left">
          <label for="category" class="fa fa-list" required="required">Category
          </label>
          <select id="category"></select>
      </p>
      
      <p class="right">
            <label for="vendor" class="fa fa-list" required="required"> Vendor
            </label>
            <select id="vendor"></select>
      </p>     
      
       
      <p class="left descpara">
            <label for="description" class="fa fa-align-justify"> Description
            </label>
            <textarea id="description" placeholder="A short description of the product"></textarea>
      </p>

      <p class="left featpara">
      <label for="features" class="fa fa-list-alt"> Features
            </label>
            <textarea id="features" placeholder="A fuller description of the product features"></textarea>
          </p>

        <p class="left">
            <label for="cost" class="fa fa-money"> Cost</label>
            <input type="text" name="Cost" id="cost" />
        </p>

        <p class="right">
        <label for="retail" class="fa fa-money"> Retail</label>
        <input type="text" name="retail" id="retail" />
        </p>

        <p class="left imgpara">
        <label for="image" class="fa fa-photo"> Upload product image</label>
        <input type="file" name="image" id="image_upload" accept="image/*" />
        </p>
        <div id="pic" class="right">&nbsp;</div>
        <input type="button" id="submit" value="Submit">
        <input type="button" id="addnew" value="Add New">

        <h3 id="status">&nbsp;</h3>


        </form>
    </div>
</div>

      <div id="tabs-2">

<div class="formcontent">
   <h2>EDIT</h2>

        <p class="left">
          <label for="skuedit" class="fa fa-pencil"> SKU
          </label>
          <input type="text" name="sku" id="skuedit" size="20" placeholder="ABC-123" autofocus/>
      </p>
     <input type="button" id="checkEdit" value="Edit">
      <div id="showlater">
      <p class="right">
          <label for="model" class="fa fa-link" required="required"> Product Name</label>
          <input type="text" name="model" id="vendorModeledit" placeholder="JHG789" />
      </p>
      

      <p class="left">
          <label for="categoryEdit" class="fa fa-list" required="required">Category
          </label>
          <select id="categoryEdit"></select>
      </p>
      
      <p class="right">
            <label for="vendorEdit" class="fa fa-list" required="required"> Vendor
            </label>
            <select id="vendorEdit"></select>
      </p>     
      
       
      <p class="left descpara">
            <label for="descriptionEdit" class="fa fa-align-justify"> Description
            </label>
            <textarea id="descriptionEdit" placeholder="A short description of the product"></textarea>
      </p>

      <p class="left featpara">
      <label for="featuresEdit" class="fa fa-list-alt"> Features
            </label>
            <textarea id="featuresEdit" placeholder="A fuller description of the product features"></textarea>
          </p>

        <p class="left">
            <label for="costEdit" class="fa fa-money"> Cost</label>
            <input type="text" name="cost" id="costEdit" />
        </p>

        <p class="right">
        <label for="retailEdit" class="fa fa-money"> Retail</label>
        <input type="text" name="retail" id="retailEdit" />
        </p>

        <p class="left imgpara">
        <label for="imageEdit" class="fa fa-photo"> Upload product image</label>
        <input type="file" name="image" id="imageEdit" accept="image/*" />
        </p>
        <div id="picture" class="right">&nbsp;</div>

<input type="button" id="submitEdit" value="Update">
<input type="button" id="newEdit" value="Edit New">
</div>
        <h3 id="status_edit">&nbsp;</h3>

            
      </div>
      </div>

      <div id="tabs-3">
      <div class="formcontent">
        <h2>DELETE</h2>
           <p class="left">
          <label for="sku_delete" class="fa fa-pencil"> SKU
          </label>
          <input type="text" name="sku" id="sku_delete" size="20" placeholder="ABC-123" autofocus/>
      </p>
        <input type="button" id=  "delete_sku_button" value="Check SKU">
          
       <div id="showlaterdel">
      <p class="right">
          <label for="vendorModelDelete" class="fa fa-link" required="required"> Product Name</label>
          <input type="text" name="model" id="vendorModelDelete" placeholder="JHG789" disabled />
      </p>
      

      <p class="left">
          <label for="categoryDelete" class="fa fa-list" required="required">Category
          </label>
          <input type="text" name="categoryDelete" id="categoryDelete" disabled />
      </p>
      
      <p class="right">
            <label for="vendorDelete" class="fa fa-list" required="required"> Vendor
            </label>
            <input type="text" name="vendorDelete" id="vendorDelete"  disabled />
      </p>     
      
       
      <p class="left descpara">
            <label for="descriptionDelete" class="fa fa-align-justify"> Description
            </label>
            <textarea id="descriptionDelete" placeholder="A short description of the product" disabled></textarea>
      </p>

      <p class="left featpara">
      <label for="featuresDelete" class="fa fa-list-alt"> Features
            </label>
            <textarea id="featuresDelete" placeholder="A fuller description of the product features" disabled></textarea>
          </p>

        <p class="left">
            <label for="costDelete" class="fa fa-money"> Cost</label>
            <input type="text" name="cost" id="costDelete" disabled />
        </p>

        <p class="right">
        <label for="retailDelete" class="fa fa-money"> Retail</label>
        <input type="text" name="retail" id="retailDelete" disabled />
        </p>

        <p class="left imgpara">
        <label for="imageDel" class="fa fa-photo"> Upload product image</label>
        </p>
        <div id="pictureDelete" class="right">&nbsp;</div>


            <input type="button" id="delete" value="Delete">
            <input type="button" id="newDelete" value="Delete New">
            </div>
                <h3 id="statusDelete">&nbsp;</h3>
        </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>


END
}
