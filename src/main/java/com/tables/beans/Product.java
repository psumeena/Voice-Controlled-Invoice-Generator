package com.tables.beans;

public class Product {
	private int product_id;
	private String product_name;
	private int product_quantity;
    private float product_cost;
	public int getProduct_id() {
		return product_id;
	}
	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public int getProduct_quantity() {
		return product_quantity;
	}
	public void setProduct_quantity(int product_quantity) {
		this.product_quantity = product_quantity;
	}
	public float getProduct_cost() {
		return product_cost;
	}
	public void setProduct_cost(float product_cost) {
		this.product_cost = product_cost;
	}
	public String toString()
	{
		return product_id +" "+product_name+" "+ product_quantity+" "+ product_cost;
	}
	
    

}
