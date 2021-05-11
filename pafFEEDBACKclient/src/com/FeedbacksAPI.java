package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class FeedbacksAPI
 */
@WebServlet("/FeedbacksAPI")
public class FeedbacksAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Feedback feedbackObj = new Feedback();
  
    public FeedbacksAPI() {
        super();
        
    }

    
    
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String output = feedbackObj.insertFeedback(
				request.getParameter("cusName"),
				request.getParameter("cusMail"),
				request.getParameter("cusPhone"),
				request.getParameter("comment"));
		        response.getWriter().write(output);
		
	}

	
	// Convert request parameters to a Map
		private static Map getParasMap(HttpServletRequest request)
		{
		 Map<String, String> map = new HashMap<String, String>();
		try
		 {
		 Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
		 String queryString = scanner.hasNext() ?
		 scanner.useDelimiter("\\A").next() : "";
		 scanner.close();
		 String[] params = queryString.split("&");
		 for (String param : params)
		 { 
		
		String[] p = param.split("=");
		 map.put(p[0], p[1]);
		 }
		 }
		catch (Exception e)
		 {
		 }
		return map;
		}
		
		
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		 Map paras = getParasMap(request);
		 String output = feedbackObj.updateFeedback(paras.get("hidFeedbackIDSave").toString(),
		 paras.get("cusName").toString(),
		 paras.get("cusMail").toString(),
		 paras.get("cusPhone").toString(),
		 paras.get("comment").toString());
		 response.getWriter().write(output);
		
		
	}

	
	
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request);
		 String output = feedbackObj.deleteFeedback(paras.get("fID").toString());
		response.getWriter().write(output);
		
	}

}
