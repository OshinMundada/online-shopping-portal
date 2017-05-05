package sdsu;

import java.security.*;
import java.util.*;
import java.io.*;

public class PasswordUtilities {
        
    public static boolean isValidLogin(String username, String password) {
       Vector<String[]> userData;

       String encryptedPassword = getEncryptedPassword(password);     
       String query = "SELECT password FROM users WHERE username='" + username + "';";
       userData = DBHelper.runQuery(query);
       try {
       		if(userData.elementAt(0)[0].equals(encryptedPassword))
			return true;
		}
	catch(Exception e) {
		return false;
		}
	return false;
        }
        
    public static String getEncryptedPassword(String str) {   
        try {  
            MessageDigest d = MessageDigest.getInstance("MD5");
            byte [] b = str.getBytes();     
            d.update(b);
            return  byteArrayToHexString(d.digest());
            }
        catch(Exception e) {
            e.printStackTrace();               
            }
    return null;
    }          
    
    private static String byteArrayToHexString(byte[] b){
        String str = "";
        for(int i=0; i < b.length; i++) {
            int value = b[i] & 0xFF;
            if(value < 16)
                str += "0";
            str += Integer.toHexString(value);
            }
        return str.toUpperCase();
        }                
}            
