package com.vcig.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tables.access.DataAccess;
import com.tables.beans.*;

@RestController
public class VcigController {
	@RequestMapping(path="/invoice/invoicenumber",method=RequestMethod.GET)
	public Long viewInvoiceNumber() throws InterruptedException
	{
		
		DataAccess obj=new DataAccess();
		return obj.getInvoiceNumber();
	}
	@RequestMapping(path="/invoice/client",method=RequestMethod.POST)
	public Client addClient(@RequestBody Client client) throws InterruptedException
	{
	    
		DataAccess obj=new DataAccess();
		int id=obj.insertClient(client);
		return client;
	}
	@RequestMapping(path="/invoice/clients",method=RequestMethod.GET)
	public List<Client> viewClients() throws InterruptedException
	{
		
		DataAccess obj=new DataAccess();
		return obj.getClients();
	}
	@RequestMapping(path="/invoice/products",method=RequestMethod.GET)
	public List<Product> viewProducts() throws InterruptedException
	{
		
		DataAccess obj=new DataAccess();
		return obj.getProducts();
	}

}
