// customInit() is called before any map initialization
function customInit() {

//     // I create a new control click event class
//     OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
//         defaultHandlerOptions: {
//                 'single': true,
//                 'double': false,
//                 'pixelTolerance': 0,
//                 'stopSingle': false,
//                 'stopDouble': false
//         },
//         initialize: function(options) {
//                 this.handlerOptions = OpenLayers.Util.extend(
//                         {}, this.defaultHandlerOptions
//                 );
//                 OpenLayers.Control.prototype.initialize.apply(
//                         this, arguments
//                 );
//                 this.handler = new OpenLayers.Handler.Click(
//                         this, {
//                                 'click': this.trigger
//                         }, this.handlerOptions
//                 );
//         }
//     });
}

// called before map initialization
function customBeforeMapInit() {
//  Example how to use a WMS layer as background layer:
//  create an OpenLayers.Layer.WMS object, see OpenLayers documentation for details
//  var myBackgroundLayer = new OpenLayers.Layer.WMS("myName",
//      "myURL", {
//          layers: "myLayer",
//          format: format,
//          dpi: screenDpi,
//          VERSION: "1.3.0"
//      },
//      {
//          buffer:0,
//          singleTile:true,
//          ratio:1,
//          transitionEffect:"resize",
//          isBaseLayer: true,
//          projection:authid
//      }
//  );
//
//  add the layer to the array of background layers
//  baseLayers.push(myBackgroundLayer); 
}

// called after map initialization
function customAfterMapInit() {

//     // Create a new map control based on Control Click Event
//     openlayersClickEvent = new OpenLayers.Control.Click( {
//         trigger: function(e) {
//             var xy = geoExtMap.map.getLonLatFromViewPortPx(e.xy);
//             var x = xy.lon;
//             var y = xy.lat;
//
//             alert ( "You clicked on " + x + ", " + y );
//         }
//     });
// 
//     geoExtMap.map.addControl(openlayersClickEvent);

	// PM: Quelle: http://level2.si/index.php/gis-clients-demo/#eqwc
	// Zeigt Legendensymbol unterhalb Layername in linkem Legendenpannel
	var treeRoot = layerTree.getNodeById("wmsNode");
	treeRoot.firstChild.cascade(
		function (n) {
			if (n.isLeaf()) {
                if (!isRasterImage(n.text)) {
                    if (n.attributes.checked) {
                        var legendUrl = wmsURI + Ext.urlEncode({
                                SERVICE: "WMS",
                                VERSION: "1.3.0",
                                REQUEST: "GetLegendGraphics",
                                FORMAT: "image/png",
                                EXCEPTIONS: "application/vnd.ogc.se_inimage",
                                BOXSPACE: 1,
                                LAYERSPACE: 2,
                                SYMBOLSPACE: 1,
                                SYMBOLHEIGHT: 2,
                                LAYERFONTSIZE: 8,
                                ITEMFONTSIZE: 8,
                                ICONLABELSPACE: 1.5,
                                LAYERTITLE: "FALSE",
                                LAYERFONTCOLOR: '#FFFFFF',
                                LAYERTITLESPACE: 0,
                                TRANSPARENT: true,
                                LAYERS: n.text,
                                DPI: screenDpi
                            });

                        Ext.DomHelper.insertAfter(n.getUI().getAnchor(),
                            "<div id='legend_" + n.text.replace(" ", "-") + "'><img style='vertical-align: middle; margin-left: 50px' src=\"" + legendUrl + "\"/></div>"
                        );
                    }
                }
			}
		}
	);


    // Zoom to Map-Theme center
    var projectSettings = getGisProjectSettings(layerTree.root.firstChild.text);
    if (projectSettings != null) {
        var newExtent = projectSettings.startExtent.split(",").map(Number);
        var newZoom = geoExtMap.map.getZoomForExtent(new OpenLayers.Bounds(newExtent), false);
        var curExtent = geoExtMap.map.getExtent().toArray();
        var curZoom = geoExtMap.map.getZoom();

        if (((newExtent[0] >= curExtent[0] && curExtent[0] <= curExtent[2]) || (newExtent[2] >= curExtent[0] && newExtent[2] <= curExtent[2]))
            && ((newExtent[1] >= curExtent[1] && newExtent[1] <= curExtent[3]) || (newExtent[3] >= curExtent[1] && newExtent[3] <= curExtent[3]))
            && (Math.abs(newZoom - curZoom) <= 2.5)) {
            // do nothing
        } else {
            geoExtMap.map.zoomToExtent(newExtent, true);
        }
    }

    layerTree.root.firstChild.text = '';

}

// called at the end of GetMapUrls
function customAfterGetMapUrls() {
}

// called when DOM is ready (Ext.onReady in WebgisInit.js)
function customPostLoading() {
//    Ext.get("panel_header").addClass('sogis-header').insertHtml('beforeEnd', '<div style="float: right; width: 250px;">hello world</div>');
}

// called when starting print
function customBeforePrint() {
    // do something. e.g. rearrange your layers
}

// called when printing is launched
function customAfterPrint() {
    // do something. e.g. rearrange your layers
}

// new buttons for the toolbar
var customButtons = [ 
   
//    // Add a separator and a button
//    {
//      xtype: 'tbseparator'
//    }, {
//      xtype: 'button',
//      enableToggle: true,
//      allowDepress: true,
//      toggleGroup: 'mapTools',
//      scale: 'medium',
//      icon: 'gis_icons/test.gif',
//      tooltipType: 'qtip',
//      tooltip: "Test button - click on the map",
//      id: 'TESTBUTTON'
//    }
];

// code to add buttons in the toolbar
function customToolbarLoad() {
//     // Handle the button click
//     Ext.getCmp('TESTBUTTON').toggleHandler = mapToolbarHandler;
}

// called when an event on toolbar is invoked
function customMapToolbarHandler(btn, evt) {
//     // Check if the button is pressed or unpressed
//     if (btn.id == "TESTBUTTON") {
//         if (btn.pressed) {
//              alert ( "You clicked on Test Button!" );
//              openlayersClickEvent.activate();
//         }
//         else
//         {
//              alert ( "TEST button is toggled up!" );
//              openlayersClickEvent.deactivate();
//         }
//     }
}

// called when the user clicks on a check in layerTree.
// n is a Ext.TreeNode object
function customActionLayerTreeCheck(n) {
//    if (n.text == "test layer") {
//        alert ("test layer check state:" + n.attributes.checked);
//    }
	// PM: Quelle: http://level2.si/index.php/gis-clients-demo/#eqwc
	if (n.isLeaf()) {
        if (n.attributes.checked) {
            var toAdd = Ext.get ( "legend_"+n.text.replace(" ", "-") );
            if (toAdd || isRasterImage(n.text)) {
            } else {
                var legendUrl = wmsURI + Ext.urlEncode({
                        SERVICE: "WMS",
                        VERSION: "1.3.0",
                        REQUEST: "GetLegendGraphics",
                        FORMAT: "image/png",
                        EXCEPTIONS: "application/vnd.ogc.se_inimage",
                        BOXSPACE: 1,
                        LAYERSPACE: 2,
                        SYMBOLSPACE: 1,
                        SYMBOLHEIGHT: 2,
                        //SYMBOLWIDTH: 4,
                        LAYERFONTSIZE: 8,
                        ITEMFONTSIZE: 8,
                        ICONLABELSPACE: 2,
                        // LAYERFONTFAMILY: "Adobe Blank",
                        LAYERTITLE: "FALSE",
                        LAYERFONTCOLOR: '#FFFFFF',
                        // 			ITEMFONTCOLOR: '#FFFFFF',
                        LAYERTITLESPACE: 0,
                        TRANSPARENT: true,
                        //ITEMFONTSIZE: 0,
                        LAYERS: n.text,
                        DPI: screenDpi
                    });

                Ext.DomHelper.insertAfter(n.getUI().getAnchor(),
                    "<div id='legend_"+n.text.replace(" ", "-")+"'><img style='vertical-align: middle; margin-left: 50px' src=\""+legendUrl+"\"/></div>"
                );
            }
        } else {
            var toRemove = Ext.get ( "legend_"+n.text.replace(" ", "-") );
            if (toRemove) {
                toRemove.remove();
            }

        }
    }
}


// called when the user zooms.
function customActionOnZoomEvent() {
	// NOTE: if you define customActionOnMoveEvent() (see below)
	// that function is called during zooms, too!

	// ... action to do on call
}

// called after a drag, pan, or zoom completed
function customActionOnMoveEvent() {
	// ... action to do on call
}


function isRasterImage (layername) {
    var rasterImgNames = [
        'swisstopo',
        'Swisstopo',
        'Luftbild',
        'Ortho',
        'ortho',
        'swissimage',
        'Swissimage',
        'SWISSIMAGE',
        'Landeskarte'
    ];

    for (var n in rasterImgNames) {
        if (layername.indexOf(rasterImgNames[n]) > -1) {
            return true;
        }
    }
    return false;
}
