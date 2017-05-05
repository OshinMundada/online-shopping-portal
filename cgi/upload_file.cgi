#!/usr/bin/perl

#   file upload script.
#   Remember that you MUST use enctype="mulitpart/form-data"
#   in the web page that invokes this script, and the destination
#   directory for the uploaded file must have permissions set to 777.
#   Do NOT set 777 permission on any other directory in your account!
#
#   CS645, Spring 2017
#   Alan Riggins

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;

$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn030/public_html/proj1/tasvir';
my $safe_filename_chars = "a-zA-Z0-9_.-";

my $q = new CGI;
my $filename = $q->param("storeimg");


unless($filename) {
    die "There was a problem uploading the image; ";
    }
$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }
$filename = untaint($filename);
$filename = lc($filename);
# get a handle on the uploaded image
if(!(-e $filename)) {
unlink($filename);
}	
my $filehandle = $q->upload("image");
unless($filehandle) { die "Invalid handle"; }
$message = "$upload_dir/$filename";
# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    print UPLOADFILE $_;
    }
close UPLOADFILE;

# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }
