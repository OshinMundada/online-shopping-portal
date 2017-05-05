#!/usr/bin/perl

use DBI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn030";
my $username = "jadrn030";
my $password = "sweet";  #insert your password here
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

$query = "SELECT * FROM product";

my $sth = $dbh->prepare($query);
$sth->execute();

print "Content-type:text/html\r\n\r\n";
print "<html>";
print "<body>";

$str = "";
while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        $str .= $item."|";
        }       
    $str .= ";";    
    }
 
$sth->finish();
$dbh->disconnect();

    	
print $str;


