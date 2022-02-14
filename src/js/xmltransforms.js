/**
* String helper function to see if input string 'str' ends with the string 'suffix'
**/
function endsWith(str, suffix)
{
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function loadXMLDoc(filename)
{
	if (window.ActiveXObject)
	{
		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	else
	{
		xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	xhttp.setRequestHeader('Content-Type', "text/xml");
	try
	{
		xhttp.responseType = "msxml-document";
	}
	catch(err) {} // Helping IE11

	xhttp.send("");
	
	if( xhttp.responseXML !== null)
	{
		return xhttp.responresponseXML;
	}
	else
	{
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(xhttp.responseText, "application/xml");
		return xmlDoc;
	}
}

function displayResult( xmlpath, transformpath, outputId )
{
	xml = loadXMLDoc(xmlpath);
	xsl = loadXMLDoc(transformpath);
	// code for IE
	if (window.ActiveXObject || xhttp.responseType == "msxml-document")
	{
		ex = xml.transformNode(xsl);
		document.getElementById(outputId).innerHTML = ex;
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml, document);
		document.getElementById(outputId).appendChild(resultDocument);
	}
}
