package sdsu;

public class FormInfo implements java.io.Serializable {
	private String name, email, mobile,shipadd,paytype,paynum,payname,paycvv,payexpmon,payyear;
	
	public FormInfo() {}
	
	public FormInfo(String name, String email, String mobile,
		String shipadd, String paytype, String paynum,
		String payname, String paycvv, String payexpmon, String payyear) {
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.shipadd = shipadd;
		this.paytype = paytype;
		this.paynum = paynum;
		this.payname = payname;
		this.payyear = payyear;
		this.paycvv = paycvv;
		this.payexpmon = payexpmon;
		}
		
	public String getName() { return name; }
	public String getEmail() { return email; }
	public String getMobile() { return mobile; }
	public String getShipadd() { return shipadd; }
	public String getPaytype() { return paytype; }
	public String getPaynum() { return paynum; }
	public String getPayname() { return payname; }
	public String getPaycvv() { return paycvv; }
	public String getPayexpmon() { return payexpmon; }
	public String getPayyear() { return payyear; }
	
	public void setName(String s) { name = s; }
	public void setEmail(String s) { email = s; }
	public void setMobile(String s) { mobile = s; }
	public void setShipadd(String s) { shipadd = s; }
	public void setPaytype(String s) { paytype = s; }
	public void setPaynum(String s) { paynum = s; }
	public void setPayname(String s) { payname = s; }
	public void setPaycvv(String s) { paycvv = s; }  															  
	public void setPayexpmon(String s) { payexpmon = s; } 
	public void setPayyear(String s) { payyear = s; }  															  
	
	}
