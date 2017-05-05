#!/usr/bin/perl

use DBI;
use CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn030";
my $username = "jadrn030";
my $password = "sweet";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $q = new CGI;
my $sku = $q->param("sku");


my $query = "select sku from product where sku='$sku'";

my $sth = $dbh->prepare($query);
$sth->execute();

$count = $sth->rows;

while(my @row=$sth->fetchrow_array()) {
$response = $row[0];
}

if($response) {
	
    my $query = "select image from product where sku='$sku'";
    my $sth = $dbh->prepare($query);
    $sth->execute();
    while (my @row = $sth->fetchrow_array) {
    	my $directory = '/home/jadrn030/public_html/proj1/tasvir/';
my $delete =  $directory . $row[0];
   unlink($delete);
}

    my $query = "delete from product where sku='$sku'";
    my $sth = $dbh->prepare($query);
    $sth->execute();

    $response = "success";
    }
else {
    $response = "failure";
    }

$sth->finish();
$dbh->disconnect();


print "Content-type: text/html\n\n";
print $response;
