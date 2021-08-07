package com.tables.access;
import com.tables.beans.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


public class DataAccess {
	public static long invoicenumber=1;
	private final String url = "jdbc:postgresql://localhost:5432/invoice";
	private final String username = "postgres";
	private final String password = "sumi2717";

	public long getInvoiceNumber()
	{
		invoicenumber+=1;
		return invoicenumber;
	}
	public List<Client> getClients()
	{
		List<Client> list =new ArrayList<Client>();
		try (Connection connection = DriverManager.getConnection(url,username,password)) {
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery("SELECT * from client");
			while (resultSet.next()) {
				Client obj=new Client();
				obj.setClient_id(resultSet.getInt("client_id"));
				obj.setClient_name(resultSet.getString("client_name"));
				obj.setClient_address(resultSet.getString("client_address"));
				obj.setClient_phone(resultSet.getLong("client_phone"));
				obj.setClient_mail(resultSet.getString("client_mail"));
				list.add(obj);

			}


		}
		catch (SQLException e) {
			System.out.println("Connection failure.");
			e.printStackTrace();
		}
		return list;

	}
	public List<Product> getProducts()
	{
		List<Product> list= new ArrayList<Product>();
		try (Connection connection = DriverManager.getConnection(url,username,password)) {
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery("SELECT * from product");


			while (resultSet.next()) {
				Product obj=new Product();
				obj.setProduct_id(resultSet.getInt("product_id"));
				obj.setProduct_name(resultSet.getString("product_name"));
				obj.setProduct_quantity(resultSet.getInt("product_quantity"));
				obj.setProduct_cost(resultSet.getFloat("product_cost(Rupees)"));

				list.add(obj);

			}
		}
		catch (SQLException e) {
			System.out.println("Connection failure.");
			e.printStackTrace();
		}
		return list;
	}
	public Connection connect() throws SQLException {
		return DriverManager.getConnection(url,username,password);
	}

	public int insertClient(Client client) {
		String SQL = "INSERT INTO client(client_name,client_mail,client_address,client_phone) "
				+ "VALUES(?,?,?,?) returning client_id";


		int id=0;

		try (Connection conn = connect();
				PreparedStatement pstmt = conn.prepareStatement(SQL))  {
			pstmt.setString(1,client.getClient_name());
			pstmt.setString(2,client.getClient_mail());
			pstmt.setString(3,client.getClient_address());
			pstmt.setLong(4,client.getClient_phone());
			ResultSet rs= pstmt.executeQuery();
			if(rs.next())
			{
				id=rs.getInt(1);
			}

		} catch (SQLException ex) {
			System.out.println(ex.getMessage());
		}
		return id;
	}

}
