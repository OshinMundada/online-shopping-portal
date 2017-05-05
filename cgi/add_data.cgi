#!/usr/bin/perl

use strict;
use warnings;
use POSIX qw(strftime);
use JSON; #if not already installed, just run "cpan JSON"
use CGI;
use DBI;

my $cgi = CGI->new;

print $cgi->header('application/json;charset=UTF-8');
my $sku = $cgi->param('sku');
my $venID = $cgi->param('venID');
my $catID = $cgi->param('catID');
my $vendorModel = $cgi->param('vendorModel');
my $description = $cgi->param('description');
my $features= $cgi->param('features');
my $cost = $cgi->param('cost');
my $retail = $cgi->param('retail');
my $image = $cgi->param('image');
$image = lc($image);

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn030";
my $username = "jadrn030";
my $password = "sweet"; #insert your password here
my $database_source = "dbi:mysql:$database:$host:$port";

my $newdbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $message = " ";
my $sql = $newdbh->prepare("INSERT INTO product (sku,catID,venID,vendorModel,description,features,cost,retail,image) VALUES ('$sku','$catID','$venID','$vendorModel','$description','$features','$cost','$retail','$image')");
#$sql->execute() or die $DBI::errstr;


if ($sql->execute()) {
  $message = "Success";
}
else {
  $message = "Error"
}
$sql->finish();
$newdbh->disconnect();

#convert  data to JSON
my $op = JSON -> new -> utf8 -> pretty(1);
my $json = $op -> encode({
    result => $message
});
print $json;
