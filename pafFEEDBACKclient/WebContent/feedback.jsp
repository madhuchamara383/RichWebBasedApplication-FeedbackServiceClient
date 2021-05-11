<%@page import="com.Feedback"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>

<link rel="stylesheet" href="Views/bootstrap.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/feedbacks.js"></script>
</head>
<body>


	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Feedback Management </h1>
				<form id="formFeedback" name="formFeedback">
					Customer Name: <input id="cusName" name="cusName" type="text" class="form-control form-control-sm"> <br> 
					Customer Email: <input id="cusMail" name="cusMail" type="text" class="form-control form-control-sm"> <br> 
					Customer PhoneNumber: <input id="cusPhone" name="cusPhone" type="text" class="form-control form-control-sm"> <br> 
				    Your Comment: <input id="comment" name="comment" type="text" class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidFeedbackIDSave" name="hidFeedbackIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divItemsGrid">
					<%
					Feedback feedbackObj = new Feedback();
					out.print(feedbackObj.readFeedback());
					%>
				</div>
			</div>
		</div>
	</div>

</body>
</html>