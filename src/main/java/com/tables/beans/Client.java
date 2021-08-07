package com.tables.beans;

public class Client {
	private int client_id;
	private String client_name;
	private String client_address;
	private String client_mail;
	private long client_phone;
	public int getClient_id() {
		return client_id;
	}

	
	public void setClient_id(int client_id) {
		this.client_id = client_id;
	}
	public String getClient_name() {
		return client_name;
	}
	public void setClient_name(String client_name) {
		this.client_name = client_name;
	}
	public String getClient_address() {
		return client_address;
	}
	public void setClient_address(String client_address) {
		this.client_address = client_address;
	}
	public String getClient_mail() {
		return client_mail;
	}
	public void setClient_mail(String client_mail) {
		this.client_mail = client_mail;
	}
	public long getClient_phone() {
		return client_phone;
	}
	public void setClient_phone(long client_phone) {
		this.client_phone = client_phone;
	}
	public String toString()
	{
		return client_id +" "+client_name +" "+client_mail+" "+client_phone+" "+client_address;
	}
	

}
