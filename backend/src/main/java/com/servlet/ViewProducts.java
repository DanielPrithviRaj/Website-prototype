package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import com.DBConnection.DatabaseConnectivity;


@WebServlet("/ViewProducts")
public class ViewProducts extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			
			String url = "SELECT * FROM products";
			
			try {
				Connection con = DatabaseConnectivity.getConnection();
				PreparedStatement ps = con.prepareStatement(url);
				ResultSet rs = ps.executeQuery();
				
				JSONArray products = new JSONArray();  // JSON Array to hold all the products details
				
				while(rs.next()) {
					
					JSONObject json_obj = new JSONObject();
					
					json_obj.put("id", rs.getString("id"));
					json_obj.put("product_id", rs.getString("product_id"));
					json_obj.put("product_name", rs.getString("product_name"));
					json_obj.put("product_brand", rs.getString("product_brand"));
					json_obj.put("product_price", rs.getString("product_price"));
					json_obj.put("product_size", rs.getString("product_size"));
					json_obj.put("product_image_url", rs.getString("product_image_url"));
					json_obj.put("product_description", rs.getString("product_description"));
					
					products.put(json_obj);
					
					/*
					 * String id = rs.getString("id"); String product_id =
					 * rs.getString("product_id"); String product_name =
					 * rs.getString("product_name"); String product_brand =
					 * rs.getString("product_brand"); String product_price =
					 * rs.getString("product_price"); String product_size =
					 * rs.getString("product_size"); String product_image_url =
					 * rs.getString("product_image_url"); String product_desc =
					 * rs.getString("product_description");
					 */
					//con.close();
				}
				
				out.print(products);
			}catch(Exception e){
				System.out.println(e);
			}	
	}
}
