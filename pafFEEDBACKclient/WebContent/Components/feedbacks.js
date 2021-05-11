/**
 * 
 */

$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}

	$("#alertError").hide();

});




// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateFeedbackForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	
	
	// If valid------------------------
	var type = ($("#hidFeedbackIDSave").val() == "") ? "POST" : "PUT";
	$.ajax(
		{
			url: "FeedbacksAPI",
			type: type,
			data: $("#formFeedback").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onItemSaveComplete(response.responseText, status);
			}
		});

});



function onItemSaveComplete(response, status) {

	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		}

		else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidFeedbackIDSave").val("");
	$("#formFeedback")[0].reset();

}





// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) {
	$("#hidFeedbackIDSave").val($(this).closest("tr").find('#hidFeedbackIDUpdate').val());
	$("#cusName").val($(this).closest("tr").find('td:eq(0)').text());
	$("#cusMail").val($(this).closest("tr").find('td:eq(1)').text());
	$("#cusPhone").val($(this).closest("tr").find('td:eq(2)').text());
	$("#comment").val($(this).closest("tr").find('td:eq(3)').text());
});






// CLIENT-MODEL================================================================
function validateFeedbackForm() {
	// NAME
	if ($("#cusName").val().trim() == "") {
		return "Insert your Name.";
	}
	
	// MAIL
	if ($("#cusMail").val().trim() == "") {
		return "Insert your Mail.";
	}




	// PHONE-------------------------------
	if ($("#cusPhone").val().trim() == "") {
		return "Insert your Phone.";
	}


	// is numerical value
	var tmpPhone = $("#cusPhone").val().trim();
	if (!$.isNumeric(tmpPhone)) {
		return "Insert a numerical value for phone number.";
	}



	// convert to decimal phone
	$("#cusPhone").val(parseInt(tmpPhone));



	// DESCRIPTION------------------------
	if ($("#comment").val().trim() == "") {
		return "Insert feedback.";
	}
	return true;
}







///REMOVE============================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax(
		{
			url: "FeedbacksAPI",
			type: "DELETE",
			data: "fID=" + $(this).data("feedid"),
			dataType: "text",
			complete: function(response, status) {
				onItemDeleteComplete(response.responseText, status);
			}


		});

});




function onItemDeleteComplete(response, status) {

	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		}

		else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}

	}

	else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	}

	else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();

	}


}




