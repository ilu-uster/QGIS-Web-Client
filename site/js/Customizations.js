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


    // Zoom to Map-Theme center
    var projectSettings = getGisProjectSettings(layerTree.root.firstChild.text);
    if (projectSettings != null) {
        var newExtent = projectSettings.startExtent.split(",").map(Number);
        var newZoom = geoExtMap.map.getZoomForExtent(new OpenLayers.Bounds(newExtent), false);
        var curExtent = geoExtMap.map.getExtent().toArray();
        var curZoom = geoExtMap.map.getZoom();

        if (((newExtent[0] >= curExtent[0] && newExtent[0] <= curExtent[2]) || (newExtent[2] >= curExtent[0] && newExtent[2] <= curExtent[2]))
            && ((newExtent[1] >= curExtent[1] && newExtent[1] <= curExtent[3]) || (newExtent[3] >= curExtent[1] && newExtent[3] <= curExtent[3]))
            && (Math.abs(newZoom - curZoom) < 2)) {
            // 1) Neuer Extent befindet sich komplett im alten Extent
            // 2) neuer Extent ist nicht mehr als 2-fach kleiner als der ursprünglichen Extent
            // --> dann kein Zoom/Pan durchführen
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



function customAddInfoButtonsToLayerTree() {
    var treeRoot = layerTree.getNodeById("wmsNode");
    treeRoot.firstChild.cascade(
        function (n) {
            var layerProperties = wmsLoader.layerProperties[wmsLoader.layerTitleNameMapping[n.text]];

            if (!n.isLeaf()) {
                Ext.DomHelper.insertBefore(n.getUI().getAnchor(), {
                    tag: 'b',
                    id: n.id,
                    cls: 'layer-button x-tool folder'
                });

                n.on('click', function(e) {
                    this.toggle();
                });

            }

            else if ((!layerProperties.showLegend && !layerProperties.showMetadata)
                || n.parentNode.text == 'Hintergrund' || isRasterImage(layerProperties.name)
            ) {
                // no info button, add blank element to keep text aligned
                Ext.DomHelper.insertBefore(n.getUI().getAnchor(), {
                    tag: 'b',
                    cls: 'layer-button x-tool action-down-inactive'
                });
            }
            else {
                // info button
                var buttonId = 'layer_' + n.id;
                Ext.DomHelper.insertBefore(n.getUI().getAnchor(), {
                    tag: 'b',
                    id: buttonId,
                    cls: 'layer-button x-tool action-down'
                });

                // add legend
                var legendUrl = wmsURI + Ext.urlEncode({
                        SERVICE: "WMS",
                        VERSION: "1.3.0",
                        REQUEST: "GetLegendGraphics",
                        FORMAT: "image/png",
                        EXCEPTIONS: "application/vnd.ogc.se_inimage",
                        BOXSPACE: 1,
                        LAYERSPACE: 0,
                        SYMBOLSPACE: 1,
                        SYMBOLHEIGHT: 2,
                        SYMBOLWIDTH: 4,
                        LAYERFONTSIZE: 0,
                        ITEMFONTSIZE: 8,
                        ICONLABELSPACE: 2,
                        //LAYERFONTFAMILY: "Adobe Blank",
                        LAYERTITLE: false,
                        LAYERFONTCOLOR: '#FFFFFF',
                        // 			ITEMFONTCOLOR: '#FFFFFF',
                        LAYERTITLESPACE: 0,
                        TRANSPARENT: true,
                        //ITEMFONTSIZE: 0,
                        LAYERS: n.text,
                        DPI: screenDpi
                    });

                var legendId = 'legend_' + n.id;
                var legendEl = Ext.DomHelper.insertAfter(n.getUI().getAnchor(),
                    {
                        tag: 'div',
                        id: legendId,
                        style: 'margin-left: ' + 16 * (n.getDepth() + 1) + 'px;'
                    },
                    true
                );
                legendEl.setVisibilityMode(Ext.Element.DISPLAY);

                n.on('click', function(e) {
                    if (legendEl.select('img').first() == null) {
                        // add legend image on first expand
                        legendEl.createChild({
                            tag: 'img',
                            src: legendUrl
                        });
                        legendEl.toggle();
                    }
                    Ext.get(buttonId).toggleClass('action-down');
                    Ext.get(buttonId).toggleClass('action-up');
                    legendEl.toggle();
                });

            }
        }
    );
}