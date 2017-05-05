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

my $query = "select * from product where sku='$sku'";


my $sth = $dbh->prepare($query);
$sth->execute();


while(my @row=$sth->fetchrow_array()) {
  foreach $item (@row) {
      $response .= $item."|";
      }
  $response .= ";";
    }

$sth->finish();
$dbh->disconnect();


print "Content-type: text/html\n\n";
print $response;
