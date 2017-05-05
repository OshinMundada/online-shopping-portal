
import java.util.*;

public class CartBean implements java.io.Serializable {

	private String cartId;
	private Hashtable<String, Integer> cartDetails;

	public int getQty(String s) {
		Integer temp = cartDetails.get(s);
		if (temp == null)
			return 0;
		return temp;
	}

	public String getId() {
		return cartId;
	}

	public int size() {
		return cartDetails.size();
	}

	public void insert(String s, int q) {
		Integer quantity = cartDetails.get(s);
		if (quantity == null)
			cartDetails.put(s, q);
		else
			cartDetails.put(s, quantity + q);
	}
	public void update(String s, int q) {
		Integer quantity = cartDetails.get(s);
		if (quantity == null)
			cartDetails.put(s, q);
		else
			cartDetails.put(s, quantity + q);
	}

	public void delete(String s) {
		cartDetails.remove(s);
	}

	public Iterator<String> keys() {
		return cartDetails.keySet().iterator();
	}

	public Iterator<Integer> values() {
		return cartDetails.values().iterator();
	}

	public CartBean(String sessionId) {
		cartId = sessionId;
		cartDetails = new Hashtable<String, Integer>();
	}

	public void clear() {
		cartDetails.clear();
	}

}
