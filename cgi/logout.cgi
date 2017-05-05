use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn030SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn030SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser



my $response = "LOGOUT";

print "Content-type: text/html\n\n";
print $response;
