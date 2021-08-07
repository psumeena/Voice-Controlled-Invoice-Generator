document.addEventListener('DOMContentLoaded', speechToText, false);
var boxMatched=false;
var boxid=" ";
var wake=" ";
var no=2;
var numberofrows=1;
var addrow="add row";
var calc="calculate total";
var downloadpdf="download pdf";
var downloadcsv="download csv";
var sendmail="send mail";
var invoicenum="invoice number";
var prodwake, prodquan, prodid, quanid,unitid,totalid=" ";
var reqquan=0;
var flag=false;
var finaltotal=0;
var mval;
var mlen;
var nameToId=
{       "invoice due date": "invoicedue",
		"business name": "businame",
		"business address": "busiad",
		"business phone":"busiphone",
		"business mail":"busimail",
		"business mel":"busimail",
		"business Mel":"busimail",
		"invoice number":"invoiceno",
		"invoice date": "invoicedate"

};

var prodId=
{
		"1":"1",
		"2":"2",
		"3":"3",
		"4":"4",
		"5":"5",
		"6":"6",
		"7":"7",
		"8":"8",
		"9":"9",
		"10":"10",
		"one":"1",
		"to":"2",
		"too":"2",
		"Tu":"2",
		"two":"2",
		"three":"3",
		"pre":"3",
		"free":"3",
		"four":"4",
		"fore":"4",
		"for":"4",
		"five":"5",
		"v":"5",
		"six":"6",
		"seven":"7",
		"eight":"8",
		"nine":"9",
		"ten":"10",
		"eleven":"11",
		"twelve":"12",
		"thirteen":"13",
		"fourteen":"14",
		"fifteen":"15",
		"sixteen":"16",
		"seventeen":"17",
		"eighteen":"18",
		"nineteen":"19",
		"twenty":"20"

};
var mm=
{
		"january":"01",
		"february":"02",
		"march":"03",
		"april":"04",
		"may":"05",
		"june":"06",
		"july":"07",
		"august":"08",
		"september":"09",
		"october":"10",
		"november":"11",
		"december":"12"
};
function speechToText() {

	const recognition = new webkitSpeechRecognition();
	recognition.lang = 'en-IN';
	recognition.continuous = true;

	recognition.onresult = function(event) {
		const results = event.results;
		const transcript = results[results.length-1][0].transcript;

		var req1= transcript.split(",");
		var req= req1.toString();
		req= req.trim();
		req=req.toLowerCase();
		console.log("you said: "+ req);
		var keys = Object.keys(nameToId);
		var values=Object.values(nameToId);
		for(var i=0; i<=keys.length;i++)
		{

			if(req.includes(keys[i]) && !boxMatched)
			{   
				boxMatched=true;
				console.log("input field matched: "+boxMatched);
				boxid=values[i];
				wake=keys[i];
				console.log("wake word: "+wake);
				if(wake.includes("mail") || wake.includes("mel"))
				{ 
					var at="at";
					if(req.includes(at))
					{
						req=req.replace("at","@");

					}
					req=req.replace(/\s/g,'');
					req= req.toLowerCase();
				}


			}
			else if(boxMatched)
			{

				setValue(wake,req,boxid);
				boxMatched=false;
				break;
			}
		}
		if(req.includes("client name"))
		{
			var cwake="client name"
				var m=req.lastIndexOf(cwake)+cwake.length;
			var setc= req.substring(m);
			setc=titleCase(setc);
			setc=setc.trim();

			var crequest=new XMLHttpRequest();
			crequest.open('GET','http://localhost:8080/invoice/clients');

			crequest.onload=function(){
				console.log("opened here");
				var cdata=JSON.parse(crequest.responseText);

				for(var b=0; b<cdata.length; b++)
				{  console.log("here");
				if(cdata[b].client_name.trim().toLowerCase===setc.trim().toLowerCase)
				{
					flag=true;
					document.getElementById("clientname").value=cdata[b].client_name.trim();
					document.getElementById("clientmail").value=cdata[b].client_mail.trim();
					document.getElementById("clientad").value=cdata[b].client_address.trim();
					document.getElementById("clientph").value=cdata[b].client_phone;
					console.log("it is valid");
				}   		
				}
				if(!flag)
				{
					console.log("no");
				}
			};
			crequest.send();
		}
		if(req===invoicenum.trim())
		{
			fillInvoiceno();
		}

		if(req===addrow.trim())
		{
			addfields();
			numberofrows+=1;
		}
		if(req===downloadpdf.trim())
		{
			downloadPDF();
		}
		if(req===downloadcsv.trim())
		{
			download_table_as_csv('fbill');
		}
		if(req===sendmail.trim())
		{
			getData();
		}
		var keysprod = Object.keys(prodId);
		var valuesprod =Object.values(prodId);
		for(var j=0; j<keysprod.length; j++)
		{


			if(req.includes("product"+" "+keysprod[j]))
			{    

				prodwake="product"+" "+keysprod[j];
				prodid="desc"+valuesprod[j];
				unitid="unit"+valuesprod[j];
				totalid="total"+valuesprod[j];

				var ourRequest=new XMLHttpRequest();
				ourRequest.open('GET','http://localhost:8080/invoice/products');
				ourRequest.onload=function(){
					var ourData=JSON.parse(ourRequest.responseText);
					var n=req.lastIndexOf(prodwake)+prodwake.length;
					var setem= req.substring(n);
					for(var a=0; a<ourData.length; a++)
					{
						if(ourData[a].product_name.trim()===setem.trim())
						{
							flag=true;
							document.getElementById("prodinvalid").style.visibility="hidden";
							document.getElementById(prodid).value=setem;
							document.getElementById(unitid).value=ourData[a].product_cost;
							console.log("it is valid");

						}   		
					}
					if(!flag)
					{
						document.getElementById("prodinvalid").style.visibility="visible";
					}
				};

				ourRequest.send();
			}
			if(req.includes("amount"+" "+keysprod[j]))
			{
				quanwake="amount"+" "+keysprod[j];
				quanid="quantity"+valuesprod[j];
				var m=req.lastIndexOf(quanwake)+quanwake.length;
				var quan= req.substring(m);
				reqquan= parseInt(quan);
				document.getElementById(quanid).value=reqquan;
				var unitprice=document.getElementById(unitid).value;
				var total=reqquan*unitprice;
				document.getElementById(totalid).value=total;

			}

		}

		function setValue(wake,req,id)
		{
			var monthkeys=Object.keys(mm);
			var monthvalues=Object.values(mm);

			var n=req.lastIndexOf(wake)+wake.length;
			var setto= req.substring(n);
			if(req.includes("business name"))
			{
				setto=titleCase(setto);
			}
			if(req.includes("business address"))
			{
				setto=setto.toLowerCase();
				if(setto.includes("number"))
				{
					setto=setto.replace("number","no.");
					setto=titleCase(setto);
				}
			}
			if(req.trim().includes("date"))
			{
				setto=setto.trim();
				setto=setto.replace(/\s/g,'');
				setto=setto.toLowerCase();
				var yyyy= setto.substring(0,4);
				for(var month=0;month<monthkeys.length;month++)
				{
					if(setto.includes(monthkeys[month]))
					{
						mval=monthvalues[month];

						mlen=monthkeys[month].length;
						break;
					}
				}
				var dd=setto.substring(mlen+4,setto.length);
				if(dd.length==1){
					var zero="0";
					dd=zero.concat(dd);
					console.log(dd);
				}
				setto=([yyyy,mval,dd].join("-"));
				document.getElementById("dateeg").style.visibility="hidden";

			}

			console.log(setto);
			document.getElementById(id).value=setto;
			console.log("Data to be set: "+setto);
			

		}
		if(req===calc.trim())
		{

			for(var k=1;k<=numberofrows;k++)
			{

				console.log(document.getElementById("total1").value);
				finaltotal+=parseFloat(document.getElementById("total"+k).value);

			}
			document.getElementById("bill").insertRow(-1).innerHTML='<tr id="lastrow"><td colspan=3 id="totid">Invoice Total</td><td id="total">'+finaltotal+'</td></tr>';
			numberofrows+=1;
			document.getElementById("billtip").style.visibility="hidden";
			createTable();
		}

	}

	recognition.start();
	recognition.addEventListener('end', () => recognition.start()); 
}

function addfields() {
	document.getElementById("bill").insertRow(-1).innerHTML = '<tr><td><input type="text" id="'+"desc"+no+'" class="left removeborder"  placeholder="'+"wakeword: product"+no+'"><span id="prodinvalid" style="color:red; visibility:hidden">invalid product</span></td><td><input type="text" id="'+"quantity"+no+'" class="center removeborder" placeholder="'+"wakeword: amount"+no+'"></td><td><input type="text" id="'+"unit"+no+'"  class="right removeborder" placeholder="0.00"></td><td><input type="text" id="'+"total"+no+'" class="right removeborder" placeholder="0.00"></td></tr>';
	no++;
}
function downloadPDF()
{
	document.getElementById("tips").style.visibility="hidden";
	var fname=document.getElementById("clientname").value;
	html2canvas(document.body,{
		onrendered:function(canvas){
			var img=canvas.toDataURL("image/png");
			var doc = new jsPDF('p', "mm", "a4");
			doc.addImage(img,'png',15, 40, 180, 160);
			doc.save(fname+".pdf");
		}

	});

}


function download_table_as_csv(fbill, separator = ',') {

	var rows = document.querySelectorAll('table#' + fbill + ' tr');

	var csv = [];
	for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll('td, th');
		for (var j = 0; j < cols.length; j++) {

			var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')

			data = data.replace(/"/g, '""');

			row.push('"' + data + '"');
		}
		csv.push(row.join(separator));
	}
	var csv_string = csv.join('\n');
	var nameclient=document.getElementById("clientname");
	var filename = 'export_' + "invoice" + '_' + new Date().toLocaleDateString() + '.csv';
	var link = document.createElement('a');
	link.style.display = 'none';
	link.setAttribute('target', '_blank');
	link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
	link.setAttribute('download', filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function getData() {

	var myTab = document.getElementById('fbill');
	var len=fbill.rows.length;
	var content="<table border='1' style="+'border-collapse:collapse'+">"
	for (i = 0; i < fbill.rows.length; i++) {
		content+="<tr>";
		var objCells = fbill.rows.item(i).cells;


		for (var j = 0; j < objCells.length; j++) {
			content+= "<td>"+objCells.item(j).innerHTML+"</td>";

		}

		content+="</tr>";

	}
	content+="</table>";
	console.log(content);
	var bfinal="amount to be paid="+finaltotal;
	(function() {
		emailjs.init("user_nb6hciSvyQPHGLazrNPuV");
	})();
	var params=
	{
			to_mail:document.getElementById("clientmail").value,
			my_html: content
	};
	emailjs.send('service_star','template_invoice',params)
	.then(function(res){
		console.log("success",res.status);
	})


}

function createTable()
{
	var table = document.createElement('table');
	table.setAttribute("id", "fbill");
	var first=document.createElement('tr');
	var th1=document.createElement('th');
	var th2=document.createElement('th');
	var th3=document.createElement('th');
	var th4=document.createElement('th');

	th1.innerHTML="Item Description";
	th2.innerHTML="Quantity";
	th3.innerHTML="Unit Price";
	th4.innerHTML="Total";

	first.appendChild(th1);
	first.appendChild(th2);
	first.appendChild(th3);
	first.appendChild(th4);
	table.appendChild(first);


	for (var n = 1;  n <numberofrows ; n++)
	{
		var tr = document.createElement('tr');   

		var td1  = document.createElement('td');
		var td2 = document.createElement('td');
		var td3= document.createElement('td');
		var td4=document.createElement('td');


		var td1c=document.getElementById("desc"+n).value.trim();
		var td2c=document.getElementById("quantity"+n).value.trim();
		var td3c=document.getElementById("unit"+n).value.trim();
		var td4c=document.getElementById("total"+n).value.trim();


		td1.innerHTML = td1c;
		td2.innerHTML= td2c
		td3.innerHTML= td3c;
		td4.innerHTML = td4c;



		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);

		table.appendChild(tr);
	}


	document.body.appendChild(table);
	document.getElementById("fbill").insertRow(-1).innerHTML='<tr class="blank"><td colspan="4"></td></tr>';
	document.getElementById("fbill").insertRow(-1).innerHTML='<tr id="lastrow"><td colspan=3 id="totid"><b>Invoice Total</b></td><td id="total">'+finaltotal+'</td></tr>';
}

function fillInvoiceno()
{    
	var irequest=new XMLHttpRequest();
	irequest.open('GET','http://localhost:8080/invoice/invoicenumber');

	irequest.onload=function(){
		var invoicenumber=JSON.parse(irequest.responseText);
		document.getElementById("invoiceno").value=invoicenumber;
		console.log("invoice number set!");
	};
	irequest.send();
}

function titleCase(str) {
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {

		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	}

	return splitStr.join(' '); 
}




