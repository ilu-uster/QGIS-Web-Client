<?php
// PM 02.10.2015: Erstellt dynamsich den Pfad zu den Kartenprojekten des aktuellen Kunden 
//	und des aktuellen selektierten Projektes

header('P3P: CP="CAO PSA OUR"');
session_start();

$scriptPath = $_GET["scriptPath"];
//$scriptPath = '../../infonetz/projectData/' . $_SESSION['dbKunde'] . '/' . $_SESSION['nameProjekt'] . '/modMap/GISprojects.js';
?>

<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>QGIS-Browser</title>
	<link rel="stylesheet" type="text/css" href="libs/ext/resources/css/ext-all-notheme.css"/>
	<link rel="stylesheet" type="text/css" href="libs/ext/resources/css/xtheme-gray.css"/>
	<link rel="stylesheet" type="text/css" href="libs/ext/ux/css/ux-all.css" />
	<link rel="stylesheet" type="text/css" href="css/TriStateTreeAndCheckbox.css" />
	<link rel="stylesheet" type="text/css" href="css/ThemeSwitcherDataView.css" />
	<link rel="stylesheet" type="text/css" href="css/popup.css" /> 
	<link rel="stylesheet" type="text/css" href="css/layerOrderTab.css" />
    <script src="https://maps.googleapis.com/maps/api/js?v=3&sensor=false"></script>
<!--
	<script type="text/javascript" src="libs/ext/adapter/ext/ext-base.js"></script>
-->
    <script type="text/javascript" src="libs/ext/adapter/ext/ext-base-debug.js"></script>
<!--
	<script type="text/javascript" src="libs/ext/ext-all.js"></script>
-->
    <script type="text/javascript" src="libs/ext/ext-all-debug-w-comments.js"></script>
	<script type="text/javascript" src="libs/ext/ux/ux-all.js"></script>
	<script type="text/javascript" src="libs/proj4js/proj4js-compressed.js"></script>
	<script type="text/javascript" src="libs/openlayers/OpenLayers.js"></script>
	<script type="text/javascript" src="libs/geoext/script/GeoExt.js"></script>
    <!-- Uncomment this line and delete the following if you have created a custom translations file -->
<!--
    <script type="text/javascript" src="js/Translations_custom.js"></script>
-->
	<script type="text/javascript" src="js/Translations.js"></script>
	<!-- before using QGIS Webclient you need to edit the GlobalOptions.js file-->
	<!-- you can start from one of the templates -->
	<script type="text/javascript" src="js/GlobalOptions.js"></script>
	<!-- before using the ThemeSwitcher in QGIS Webclient you need to edit the GISProjectListing.js file and -->
	<!-- you also need to place 300x200 pixel thumbnails with projectname.png in site/thumbnails -->
	<script type="text/javascript" src="js/Customizations.js"></script>
	
	<!-- PM 01.10.2015: Auskommentiert und durch dynamische Adresse ersetzt  -->
	<!-- <script type="text/javascript" src="../../infonetz/projectData/ilu_Wartung_Kunde/global/modMap/GISprojects.js"></script>-->
	<script type="text/javascript" src="<?=$scriptPath?>"></script>
	
	<script type="text/javascript" src="js/GetUrlParams.js"></script>
	<script type="text/javascript" src="js/TriStateTree.js"></script>
	<script type="text/javascript" src="js/GUI.js"></script>
	<script type="text/javascript" src="js/ThemeSwitcher.js"></script>
	<script type="text/javascript" src="js/QGISExtensions.js"></script>
	<script type="text/javascript" src="js/GeoNamesSearchCombo.js"></script>
	<script type="text/javascript" src="js/FeatureInfoDisplay.js"></script>
	<script type="text/javascript" src="js/LegendAndMetadataDisplay.js"></script>
	<script type="text/javascript" src="js/DXFExport.js"></script>
	<script type="text/javascript" src="js/WebgisInit.js"></script>
	
	
<style type="text/css">
<!--
#dpiDetection {
  height: 1in;
  left: -100%;
  position: absolute;
  top: -100%;
  width: 1in;
}
 
#panel_header_title {
  float: left;
  font-size: 18px;
}
#panel_header_link {
  float: left;
}
#panel_header_terms_of_use {
  float: right;
  font-weight: normal;
}
#panel_header_lang_switcher {
  float: right;
  font-weight: normal;
}
p.DXFExportDisclaimer {
  margin-bottom: 0.75em;
}
h4.DXFExportDisclaimer {
  margin-bottom: 1em;
}
.DXFExportCurrentAreaLabel {
	color:red;
}
-->
</style>
</head>
<body>
<!-- this empty div is used for dpi-detection - do not remove it -->
<div id="dpiDetection"></div>
</body>
</html>
