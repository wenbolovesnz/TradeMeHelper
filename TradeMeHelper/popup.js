$(function(){

	$("#newAddButton").click(function(){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "addNew" });            
        });
	});

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "isListPage" });            
    });

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){	
	if(request.action == "hideAdd"){
		$("#newAddButton").hide();
	}

	if(request.action == "showAdd"){
		$("#newAddButton").show();
	}	

});