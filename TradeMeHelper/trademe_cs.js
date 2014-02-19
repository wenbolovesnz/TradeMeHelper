
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){	
	if(request.action == "isListPage"){
		var localStorage = window.localStorage;
		var $ = window.$;
		
		if($("#ListingTitle_container").length > 0){
			chrome.runtime.sendMessage({ action: "showAdd" });
		}else{
			chrome.runtime.sendMessage({ action: "hideAdd" });
		}	
	}

	if(request.action == "enable"){

		var localStorage = window.localStorage;
		var $ = window.$;
		if($("#ListingTitle_container").length > 0){
			var url = window.location.toString();
			try {
				var savedData = JSON.parse(localStorage[url] || "[]");
			} catch (ex) { savedData = []; }
			if(savedData.length > 1){
				var el = $("<span style='display:inline-block;border:1px solid black;'>" + savedData[0] + "</span>");
				el.css("background-color", (savedData[1] || "red"));
				$("#ListingTitle_container").append(el);
			}
		}else{
			$("a").each(function() {
				if(this.children.length == 0) {
					var url = $(this).prop("href");
					try {
						var data = JSON.parse(localStorage[url]);
					} catch(ex){ data = null; }
					if(data) {
						$(this).prop("style", "color:" + (data[1] || "red") + " !important;border:1px solid " + (data[1] || "red") );
						$(this).attr("title", data[0]);
						var el = $("<span style='display:inline-block;border:1px solid black;'>" + data[0] + "</span>");
						el.css("background-color", (data[1] || "red"));

						$(this).append(el);
					}
				}
			});
		}
	}

	if(request.action == "addNew"){

		var localStorage = window.localStorage;
		var $ = window.$;
		var url = window.location.toString();
		try {
			var data = JSON.parse(localStorage[url] || "[]");
		} catch (ex) { data = []; }
		var color = prompt("What Color you want to you comment to be ?", data[1] || 'red')
		var msg = prompt("Enter comment", data[0] || '');
		if(!msg)
			delete localStorage[url];
		else
			localStorage[url] = JSON.stringify([msg,color]);	
			$("#ListingTitle_container span").remove();

			var el = $("<span style='display:inline-block;border:1px solid black;'>" + msg + "</span>");
			el.css("background-color", (color || "red"));
			$("#ListingTitle_container").append(el);
	}
});

chrome.runtime.sendMessage({ action: "show" });