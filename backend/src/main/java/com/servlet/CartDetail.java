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
import javax.swing.JOptionPane;

import com.DBConnection.DatabaseConnectivity;


@WebServlet("/CartDetail")
public class CartDetail extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			
			String product_id = request.getParameter("product_id");
			String product_name = request.getParameter("product_name");
			String product_brand = request.getParameter("product_brand");
			String product_price = request.getParameter("product_price");
			String produt_size = request.getParameter("product_size");
			String produt_quantity = request.getParameter("product_quantity");
			String product_image_url = request.getParameter("product_image_url");
			String product_description = request.getParameter("product_description");
			
			String url = "INSERT INTO cartlist (cart_product_id, cart_product_name, cart_product_brand, cart_product_price, cart_product_size, cart_product_quantity, cart_product_image_url, cart_product_description)"
					+ "VALUES (?,?,?,?,?,?,?,?)";
			
			try {
				Connection con = DatabaseConnectivity.getConnection();
				PreparedStatement ps = con.prepareStatement(url);
				
				ps.setString(1, "cart_product_id");
				ps.setString(2, "cart_product_name");
				ps.setString(3, "cart_product_brand");
				ps.setString(4, "cart_product_price");
				ps.setString(5, "cart_product_size");
				ps.setString(6, "cart_product_quantity");
				ps.setString(7, "cart_product_image_url");
				ps.setString(8, "cart_product_description");
				
				int row = ps.executeUpdate();
			
				if(row > 0) {
					JOptionPane.showMessageDialog(null, "Product added to cart list");
				}else {
					JOptionPane.showMessageDialog(null, "Failed cart list");
				}
				 
			}catch(Exception e) {
				System.out.println(e);
			}
		
	}

}
