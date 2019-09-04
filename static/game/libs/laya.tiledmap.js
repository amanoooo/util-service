!function(exports,Laya){"use strict";class GridSprite extends Laya.Sprite{constructor(){super(...arguments),this.relativeX=0,this.relativeY=0,this.isAloneObject=!1,this.isHaveAnimation=!1,this.drawImageNum=0,this._map=null}initData(map,objectKey=!1){this._map=map,this.isAloneObject=objectKey}addAniSprite(sprite){null==this.aniSpriteArray&&(this.aniSpriteArray=[]),this.aniSpriteArray.push(sprite)}show(){if(!this.visible){if(this.visible=!0,null==this.aniSpriteArray)return;for(var i=0;i<this.aniSpriteArray.length;i++)this.aniSpriteArray[i].show()}}hide(){if(this.visible){if(this.visible=!1,null==this.aniSpriteArray)return;for(var i=0;i<this.aniSpriteArray.length;i++)this.aniSpriteArray[i].hide()}}updatePos(){this.isAloneObject?(this._map&&(this.x=this.relativeX-this._map._viewPortX,this.y=this.relativeY-this._map._viewPortY),this.x<0||this.x>this._map.viewPortWidth||this.y<0||this.y>this._map.viewPortHeight?this.hide():this.show()):this._map&&(this.x=this.relativeX-this._map._viewPortX,this.y=this.relativeY-this._map._viewPortY)}clearAll(){if(this._map&&(this._map=null),this.visible=!1,null!=this.aniSpriteArray)for(var i=0;i<this.aniSpriteArray.length;i++)this.aniSpriteArray[i].clearAll();this.destroy(),this.relativeX=0,this.relativeY=0,this.isHaveAnimation=!1,this.aniSpriteArray=null,this.drawImageNum=0}}class IMap{}IMap.TiledMap=null;class TileAniSprite extends Laya.Sprite{constructor(){super(...arguments),this._tileTextureSet=null,this._aniName=null}setTileTextureSet(aniName,tileTextureSet){this._aniName=aniName,this._tileTextureSet=tileTextureSet,tileTextureSet.addAniSprite(this._aniName,this)}show(){this._tileTextureSet.addAniSprite(this._aniName,this)}hide(){this._tileTextureSet.removeAniSprite(this._aniName)}clearAll(){this._tileTextureSet.removeAniSprite(this._aniName),this.destroy(),this._tileTextureSet=null,this._aniName=null}}class MapLayer extends Laya.Sprite{constructor(){super(...arguments),this._mapData=null,this._tileWidthHalf=0,this._tileHeightHalf=0,this._mapWidthHalf=0,this._mapHeightHalf=0,this._gridSpriteArray=[],this._objDic=null,this._dataDic=null,this._tempMapPos=new Laya.Point,this.layerName=null}init(layerData,map){this._map=map,this._mapData=layerData.data;layerData.height,layerData.width;var tTileW=map.tileWidth,tTileH=map.tileHeight;switch(this.layerName=layerData.name,this._properties=layerData.properties,this.alpha=layerData.opacity,this._tileWidthHalf=tTileW/2,this._tileHeightHalf=tTileH/2,this._mapWidthHalf=this._map.width/2-this._tileWidthHalf,this._mapHeightHalf=this._map.height/2,layerData.type){case"tilelayer":break;case"objectgroup":var tObjectData,tObjWidth,tObjHeight,tArray=layerData.objects;tArray.length>0&&(this._objDic={},this._dataDic={});for(var i=0;i<tArray.length;i++)if(tObjectData=tArray[i],this._dataDic[tObjectData.name]=tObjectData,1==tObjectData.visible){tObjWidth=tObjectData.width,tObjHeight=tObjectData.height;var tSprite=map.getSprite(tObjectData.gid,tObjWidth,tObjHeight);if(null!=tSprite){switch(this._map.orientation){case IMap.TiledMap.ORIENTATION_ISOMETRIC:this.getScreenPositionByTilePos(tObjectData.x/tTileH,tObjectData.y/tTileH,Laya.Point.TEMP),tSprite.pivot(tObjWidth/2,tObjHeight/2),tSprite.rotation=tObjectData.rotation,tSprite.x=tSprite.relativeX=Laya.Point.TEMP.x+this._map.viewPortX,tSprite.y=tSprite.relativeY=Laya.Point.TEMP.y+this._map.viewPortY-tObjHeight/2;break;case IMap.TiledMap.ORIENTATION_STAGGERED:case IMap.TiledMap.ORIENTATION_ORTHOGONAL:tSprite.pivot(tObjWidth/2,tObjHeight/2),tSprite.rotation=tObjectData.rotation,tSprite.x=tSprite.relativeX=tObjectData.x+tObjWidth/2,tSprite.y=tSprite.relativeY=tObjectData.y-tObjHeight/2;break;case IMap.TiledMap.ORIENTATION_HEXAGONAL:tSprite.x=tSprite.relativeX=tObjectData.x,tSprite.y=tSprite.relativeY=tObjectData.y}this.addChild(tSprite),this._gridSpriteArray.push(tSprite),this._objDic[tObjectData.name]=tSprite}}}}getObjectByName(objName){return this._objDic?this._objDic[objName]:null}getObjectDataByName(objName){return this._dataDic?this._dataDic[objName]:null}getLayerProperties(name){return this._properties?this._properties[name]:null}getTileData(tileX,tileY){if(tileY>=0&&tileY<this._map.numRowsTile&&tileX>=0&&tileX<this._map.numColumnsTile){var tIndex=tileY*this._map.numColumnsTile+tileX,tMapData=this._mapData;if(null!=tMapData&&tIndex<tMapData.length)return tMapData[tIndex]}return 0}getScreenPositionByTilePos(tileX,tileY,screenPos=null){if(screenPos){switch(this._map.orientation){case IMap.TiledMap.ORIENTATION_ISOMETRIC:screenPos.x=this._map.width/2-(tileY-tileX)*this._tileWidthHalf,screenPos.y=(tileY+tileX)*this._tileHeightHalf;break;case IMap.TiledMap.ORIENTATION_STAGGERED:tileX=Math.floor(tileX),tileY=Math.floor(tileY),screenPos.x=tileX*this._map.tileWidth+(1&tileY)*this._tileWidthHalf,screenPos.y=tileY*this._tileHeightHalf;break;case IMap.TiledMap.ORIENTATION_ORTHOGONAL:screenPos.x=tileX*this._map.tileWidth,screenPos.y=tileY*this._map.tileHeight;break;case IMap.TiledMap.ORIENTATION_HEXAGONAL:tileX=Math.floor(tileX),tileY=Math.floor(tileY);var tTileHeight=2*this._map.tileHeight/3;screenPos.x=(tileX*this._map.tileWidth+tileY%2*this._tileWidthHalf)%this._map.gridWidth,screenPos.y=tileY*tTileHeight%this._map.gridHeight}screenPos.x=(screenPos.x+this._map.viewPortX)*this._map.scale,screenPos.y=(screenPos.y+this._map.viewPortY)*this._map.scale}}getTileDataByScreenPos(screenX,screenY){var tData=0;return this.getTilePositionByScreenPos(screenX,screenY,this._tempMapPos)&&(tData=this.getTileData(Math.floor(this._tempMapPos.x),Math.floor(this._tempMapPos.y))),tData}getTilePositionByScreenPos(screenX,screenY,result=null){screenX=screenX/this._map.scale-this._map.viewPortX,screenY=screenY/this._map.scale-this._map.viewPortY;var tTileW=this._map.tileWidth,tTileH=this._map.tileHeight,tV=0,tU=0;switch(this._map.orientation){case IMap.TiledMap.ORIENTATION_ISOMETRIC:var tDirX=screenX-this._map.width/2;return tV=-(tDirX/tTileW-screenY/tTileH),tU=tDirX/tTileW+screenY/tTileH,result&&(result.x=tU,result.y=tV),!0;case IMap.TiledMap.ORIENTATION_STAGGERED:var rx,ry;if(result)rx=(screenX-(Math.floor(screenX/tTileW)*tTileW+tTileW/2))*tTileH/2,ry=(screenY-(Math.floor(screenY/tTileH)*tTileH+tTileH/2))*tTileW/2,Math.abs(rx)+Math.abs(ry)<=tTileW*tTileH/4?(tU=Math.floor(screenX/tTileW),tV=2*Math.floor(screenY/tTileH)):(screenX-=tTileW/2,tU=Math.floor(screenX/tTileW)+1,screenY-=tTileH/2,tV=2*Math.floor(screenY/tTileH)+1),result.x=tU-(1&tV),result.y=tV;return!0;case IMap.TiledMap.ORIENTATION_ORTHOGONAL:return tU=screenX/tTileW,tV=screenY/tTileH,result&&(result.x=tU,result.y=tV),!0;case IMap.TiledMap.ORIENTATION_HEXAGONAL:tU=(screenX-(tV=screenY/(2*tTileH/3))%2*this._tileWidthHalf)/tTileW,result&&(result.x=tU,result.y=tV)}return!1}getDrawSprite(gridX,gridY){var tSprite=new GridSprite;return tSprite.relativeX=gridX*this._map.gridWidth,tSprite.relativeY=gridY*this._map.gridHeight,tSprite.initData(this._map),this._gridSpriteArray.push(tSprite),tSprite}updateGridPos(){for(var tSprite,i=0;i<this._gridSpriteArray.length;i++)((tSprite=this._gridSpriteArray[i]).visible||tSprite.isAloneObject)&&tSprite.drawImageNum>0&&tSprite.updatePos()}drawTileTexture(gridSprite,tileX,tileY){if(tileY>=0&&tileY<this._map.numRowsTile&&tileX>=0&&tileX<this._map.numColumnsTile){var tIndex=tileY*this._map.numColumnsTile+tileX,tMapData=this._mapData;if(null!=tMapData&&tIndex<tMapData.length&&0!=tMapData[tIndex]){var tTileTexSet=this._map.getTexture(tMapData[tIndex]);if(tTileTexSet){var tX=0,tY=0;tTileTexSet.texture;switch(this._map.orientation){case IMap.TiledMap.ORIENTATION_STAGGERED:tX=tileX*this._map.tileWidth%this._map.gridWidth+(1&tileY)*this._tileWidthHalf,tY=tileY*this._tileHeightHalf%this._map.gridHeight;break;case IMap.TiledMap.ORIENTATION_ORTHOGONAL:tX=tileX*this._map.tileWidth%this._map.gridWidth,tY=tileY*this._map.tileHeight%this._map.gridHeight;break;case IMap.TiledMap.ORIENTATION_ISOMETRIC:tX=(this._mapWidthHalf+(tileX-tileY)*this._tileWidthHalf)%this._map.gridWidth,tY=(tileX+tileY)*this._tileHeightHalf%this._map.gridHeight;break;case IMap.TiledMap.ORIENTATION_HEXAGONAL:var tTileHeight=2*this._map.tileHeight/3;tX=(tileX*this._map.tileWidth+tileY%2*this._tileWidthHalf)%this._map.gridWidth,tY=tileY*tTileHeight%this._map.gridHeight}if(tTileTexSet.isAnimation){var tAnimationSprite=new TileAniSprite;tAnimationSprite.x=tX,tAnimationSprite.y=tY,tAnimationSprite.setTileTextureSet(tIndex.toString(),tTileTexSet),gridSprite.addAniSprite(tAnimationSprite),gridSprite.addChild(tAnimationSprite),gridSprite.isHaveAnimation=!0}else gridSprite.graphics.drawImage(tTileTexSet.texture,tX+tTileTexSet.offX,tY+tTileTexSet.offY);return!0}}}return!1}clearAll(){this._map=null,this._mapData=null,this._tileWidthHalf=0,this._tileHeightHalf=0,this._mapWidthHalf=0,this._mapHeightHalf=0,this.layerName=null;var i=0;if(this._objDic){for(var p in this._objDic)delete this._objDic[p];this._objDic=null}if(this._dataDic){for(p in this._dataDic)delete this._dataDic[p];this._dataDic=null}for(i=0;i<this._gridSpriteArray.length;i++)this._gridSpriteArray[i].clearAll();this._properties=null,this._tempMapPos=null,this.tarLayer=null}}class TileTexSet{constructor(){this.gid=-1,this.offX=0,this.offY=0,this.textureArray=null,this.durationTimeArray=null,this.animationTotalTime=0,this.isAnimation=!1,this._spriteNum=0,this._aniDic=null,this._frameIndex=0,this._time=0,this._interval=0,this._preFrameTime=0}addAniSprite(aniName,sprite){if(0!=this.animationTotalTime&&(null==this._aniDic&&(this._aniDic={}),0==this._spriteNum&&(Laya.ILaya.timer.frameLoop(3,this,this.animate),this._preFrameTime=Laya.ILaya.Browser.now(),this._frameIndex=0,this._time=0,this._interval=0),this._spriteNum++,this._aniDic[aniName]=sprite,this.textureArray&&this._frameIndex<this.textureArray.length)){var tTileTextureSet=this.textureArray[this._frameIndex];this.drawTexture(sprite,tTileTextureSet)}}animate(){if(this.textureArray&&this.textureArray.length>0&&this.durationTimeArray&&this.durationTimeArray.length>0){var tNow=Laya.ILaya.Browser.now();this._interval=tNow-this._preFrameTime,this._preFrameTime=tNow,this._interval>this.animationTotalTime&&(this._interval=this._interval%this.animationTotalTime),this._time+=this._interval;for(var tTime=this.durationTimeArray[this._frameIndex];this._time>tTime;){this._time-=tTime,this._frameIndex++,(this._frameIndex>=this.durationTimeArray.length||this._frameIndex>=this.textureArray.length)&&(this._frameIndex=0);var tSprite,tTileTextureSet=this.textureArray[this._frameIndex];for(var p in this._aniDic)tSprite=this._aniDic[p],this.drawTexture(tSprite,tTileTextureSet);tTime=this.durationTimeArray[this._frameIndex]}}}drawTexture(sprite,tileTextSet){sprite.graphics.clear(!0),sprite.graphics.drawImage(tileTextSet.texture,tileTextSet.offX,tileTextSet.offY)}removeAniSprite(_name){this._aniDic&&this._aniDic[_name]&&(delete this._aniDic[_name],this._spriteNum--,0==this._spriteNum&&Laya.ILaya.timer.clear(this,this.animate))}showDebugInfo(){var tInfo=null;return this._spriteNum>0&&(tInfo="TileTextureSet::gid:"+this.gid.toString()+" 动画数:"+this._spriteNum.toString()),tInfo}clearAll(){this.gid=-1,this.texture&&(this.texture.destroy(),this.texture=null),this.offX=0,this.offY=0,this.textureArray=null,this.durationTimeArray=null,this.isAnimation=!1,this._spriteNum=0,this._aniDic=null,this._frameIndex=0,this._preFrameTime=0,this._time=0,this._interval=0}}class TiledMap{constructor(){this._tileTexSetArr=[],this._texArray=[],this._x=0,this._y=0,this._width=0,this._height=0,this._mapW=0,this._mapH=0,this._mapTileW=0,this._mapTileH=0,this._rect=new Laya.Rectangle,this._paddingRect=new Laya.Rectangle,this._mapSprite=null,this._layerArray=[],this._renderLayerArray=[],this._gridArray=[],this._showGridKey=!1,this._totalGridNum=0,this._gridW=0,this._gridH=0,this._gridWidth=450,this._gridHeight=450,this._jsonLoader=null,this._loader=null,this._tileSetArray=[],this._currTileSet=null,this._completeHandler=null,this._mapRect=new GRect,this._mapLastRect=new GRect,this._index=0,this._animationDic={},this._tileProperties={},this._tileProperties2={},this._orientation="orthogonal",this._renderOrder="right-down",this._colorArray=["FF","00","33","66"],this._scale=1,this._pivotScaleX=.5,this._pivotScaleY=.5,this._centerX=0,this._centerY=0,this._viewPortX=0,this._viewPortY=0,this._viewPortWidth=0,this._viewPortHeight=0,this._enableLinear=!0,this._limitRange=!1,this.autoCache=!0,this.autoCacheType="normal",this.enableMergeLayer=!1,this.removeCoveredTile=!1,this.showGridTextureCount=!1,this.antiCrack=!0,this.cacheAllAfterInit=!1,this._texutreStartDic={}}createMap(mapName,viewRect,completeHandler,viewRectPadding=null,gridSize=null,enableLinear=!0,limitRange=!1){this._enableLinear=enableLinear,this._limitRange=limitRange,this._rect.x=viewRect.x,this._rect.y=viewRect.y,this._rect.width=viewRect.width,this._rect.height=viewRect.height,this._viewPortWidth=viewRect.width/this._scale,this._viewPortHeight=viewRect.height/this._scale,this._completeHandler=completeHandler,viewRectPadding?this._paddingRect.copyFrom(viewRectPadding):this._paddingRect.setTo(0,0,0,0),gridSize&&(this._gridWidth=gridSize.x,this._gridHeight=gridSize.y);var tIndex=mapName.lastIndexOf("/");tIndex>-1?(this._resPath=mapName.substr(0,tIndex),this._pathArray=this._resPath.split("/")):(this._resPath="",this._pathArray=[]),this._jsonLoader=new Laya.Loader,this._jsonLoader.once("complete",this,this.onJsonComplete),this._jsonLoader.load(mapName,Laya.Loader.JSON,!1)}onJsonComplete(e){this._mapSprite=new Laya.Sprite,Laya.ILaya.stage.addChild(this._mapSprite);var tJsonData=this._jsonData=e;this._properties=tJsonData.properties,this._orientation=tJsonData.orientation,this._renderOrder=tJsonData.renderorder,this._mapW=tJsonData.width,this._mapH=tJsonData.height,this._mapTileW=tJsonData.tilewidth,this._mapTileH=tJsonData.tileheight,this._width=this._mapTileW*this._mapW,this._height=this._mapTileH*this._mapH,this._orientation==TiledMap.ORIENTATION_STAGGERED&&(this._height=(.5+.5*this._mapH)*this._mapTileH),this._mapLastRect.top=this._mapLastRect.bottom=this._mapLastRect.left=this._mapLastRect.right=-1;var tileset,tTileSet,tArray=tJsonData.tilesets,i=0;for(i=0;i<tArray.length;i++)if(tileset=tArray[i],(tTileSet=new TileSet).init(tileset),!tTileSet.properties||!tTileSet.properties.ignore){this._tileProperties[i]=tTileSet.tileproperties,this.addTileProperties(tTileSet.tileproperties),this._tileSetArray.push(tTileSet);var tTiles=tileset.tiles;if(tTiles)for(var p in tTiles){var tAnimation=tTiles[p].animation;if(tAnimation){var tAniData=new TileMapAniData;this._animationDic[p]=tAniData,tAniData.image=tileset.image;for(var j=0;j<tAnimation.length;j++){var tAnimationItem=tAnimation[j];tAniData.mAniIdArray.push(tAnimationItem.tileid),tAniData.mDurationTimeArray.push(tAnimationItem.duration)}}}}if(this._tileTexSetArr.push(null),this._tileSetArray.length>0){tTileSet=this._currTileSet=this._tileSetArray.shift(),this._loader=new Laya.Loader,this._loader.once("complete",this,this.onTextureComplete);var tPath=this.mergePath(this._resPath,tTileSet.image);this._loader.load(tPath,Laya.Loader.IMAGE,!1)}}mergePath(resPath,relativePath){var tResultPath="",tImageArray=relativePath.split("/"),tParentPathNum=0,i=0;for(i=tImageArray.length-1;i>=0;i--)".."==tImageArray[i]&&tParentPathNum++;if(0==tParentPathNum)return tResultPath=this._pathArray.length>0?resPath+"/"+relativePath:relativePath;var tSrcNum=this._pathArray.length-tParentPathNum;for(tSrcNum<0&&console.log("[error]path does not exist",this._pathArray,tImageArray,resPath,relativePath),i=0;i<tSrcNum;i++)0==i?tResultPath+=this._pathArray[i]:tResultPath=tResultPath+"/"+this._pathArray[i];for(i=tParentPathNum;i<tImageArray.length;i++)tResultPath=tResultPath+"/"+tImageArray[i];return tResultPath}onTextureComplete(e){this._jsonData;var tTexture=e;this._enableLinear||(tTexture.bitmap.minFifter=9728,tTexture.bitmap.magFifter=9728),this._texArray.push(tTexture);var tTileSet=this._currTileSet,tTileTextureW=tTileSet.tilewidth,tTileTextureH=tTileSet.tileheight,tImageWidth=tTileSet.imagewidth,tImageHeight=tTileSet.imageheight,tTileWNum=(tTileSet.firstgid,Math.floor((tImageWidth-tTileSet.margin-tTileTextureW)/(tTileTextureW+tTileSet.spacing))+1),tTileHNum=Math.floor((tImageHeight-tTileSet.margin-tTileTextureH)/(tTileTextureH+tTileSet.spacing))+1,tTileTexSet=null;this._texutreStartDic[tTileSet.image]=this._tileTexSetArr.length;for(var i=0;i<tTileHNum;i++)for(var j=0;j<tTileWNum;j++)(tTileTexSet=new TileTexSet).offX=tTileSet.titleoffsetX,tTileTexSet.offY=tTileSet.titleoffsetY-(tTileTextureH-this._mapTileH),tTileTexSet.texture=Laya.Texture.createFromTexture(tTexture,tTileSet.margin+(tTileTextureW+tTileSet.spacing)*j,tTileSet.margin+(tTileTextureH+tTileSet.spacing)*i,tTileTextureW,tTileTextureH),this.antiCrack&&this.adptTexture(tTileTexSet.texture),this._tileTexSetArr.push(tTileTexSet),tTileTexSet.gid=this._tileTexSetArr.length;if(this._tileSetArray.length>0){tTileSet=this._currTileSet=this._tileSetArray.shift(),this._loader.once("complete",this,this.onTextureComplete);var tPath=this.mergePath(this._resPath,tTileSet.image);this._loader.load(tPath,Laya.Loader.IMAGE,!1)}else this._currTileSet=null,this.initMap()}adptTexture(tex){if(tex){var pX=tex.uv[0],pX1=tex.uv[2],pY=tex.uv[1],pY1=tex.uv[7],dW=1/tex.bitmap.width,dH=1/tex.bitmap.height,Tex=tex;Tex.uv[0]=Tex.uv[6]=pX+dW,Tex.uv[2]=Tex.uv[4]=pX1-dW,Tex.uv[1]=Tex.uv[3]=pY+dH,Tex.uv[5]=Tex.uv[7]=pY1-dH}}initMap(){var i,n;for(var p in this._animationDic){var gStart,tAniData=this._animationDic[p];gStart=this._texutreStartDic[tAniData.image];var tTileTexSet=this.getTexture(parseInt(p)+gStart);if(tAniData.mAniIdArray.length>0){for(tTileTexSet.textureArray=[],tTileTexSet.durationTimeArray=tAniData.mDurationTimeArray,tTileTexSet.isAnimation=!0,tTileTexSet.animationTotalTime=0,i=0,n=tTileTexSet.durationTimeArray.length;i<n;i++)tTileTexSet.animationTotalTime+=tTileTexSet.durationTimeArray[i];for(i=0,n=tAniData.mAniIdArray.length;i<n;i++){var tTexture=this.getTexture(tAniData.mAniIdArray[i]+gStart);tTileTexSet.textureArray.push(tTexture)}}}for(this._gridWidth=Math.floor(this._gridWidth/this._mapTileW)*this._mapTileW,this._gridHeight=Math.floor(this._gridHeight/this._mapTileH)*this._mapTileH,this._gridWidth<this._mapTileW&&(this._gridWidth=this._mapTileW),this._gridHeight<this._mapTileH&&(this._gridHeight=this._mapTileH),this._gridW=Math.ceil(this._width/this._gridWidth),this._gridH=Math.ceil(this._height/this._gridHeight),this._totalGridNum=this._gridW*this._gridH,i=0;i<this._gridH;i++){var tGridArray=[];this._gridArray.push(tGridArray);for(var j=0;j<this._gridW;j++)tGridArray.push(null)}for(var tLayerTarLayerName,preLayerTarName,preLayer,tLayerArray=this._jsonData.layers,isFirst=!0,tLayerLoop=0;tLayerLoop<tLayerArray.length;tLayerLoop++){var tLayerData=tLayerArray[tLayerLoop];if(1==tLayerData.visible){var tMapLayer=new MapLayer;tMapLayer.init(tLayerData,this),this.enableMergeLayer?(tLayerTarLayerName=tMapLayer.getLayerProperties("layer"),(isFirst=isFirst||!preLayer||tLayerTarLayerName!=preLayerTarName)?(isFirst=!1,tMapLayer.tarLayer=tMapLayer,preLayer=tMapLayer,this._mapSprite.addChild(tMapLayer),this._renderLayerArray.push(tMapLayer)):tMapLayer.tarLayer=preLayer,preLayerTarName=tLayerTarLayerName):(this._mapSprite.addChild(tMapLayer),this._renderLayerArray.push(tMapLayer)),this._layerArray.push(tMapLayer)}}this.removeCoveredTile&&this.adptTiledMapData(),this.cacheAllAfterInit&&this.cacheAllGrid(),this.moveViewPort(this._rect.x,this._rect.y),null!=this._completeHandler&&this._completeHandler.run()}addTileProperties(tileDataDic){var key;for(key in tileDataDic)this._tileProperties2[key]=tileDataDic[key]}getTileUserData(id,sign,defaultV=null){return this._tileProperties2&&this._tileProperties2[id]&&sign in this._tileProperties2[id]?this._tileProperties2[id][sign]:defaultV}adptTiledMapData(){var i,tDatas,noNeeds={};for(i=this._layerArray.length-1;i>=0;i--)(tDatas=this._layerArray[i]._mapData)&&(this.removeCoverd(tDatas,noNeeds),this.collectCovers(tDatas,noNeeds,i))}removeCoverd(datas,noNeeds){var i,len;for(len=datas.length,i=0;i<len;i++)noNeeds[i]&&(datas[i]=0)}collectCovers(datas,noNeeds,layer){var i,len,tTileData;for(len=datas.length,i=0;i<len;i++)(tTileData=datas[i])>0&&this.getTileUserData(tTileData-1,"type",0)>0&&(noNeeds[i]=tTileData)}getTexture(index){return index<this._tileTexSetArr.length?this._tileTexSetArr[index]:null}getMapProperties(name){return this._properties?this._properties[name]:null}getTileProperties(index,id,name){return this._tileProperties[index]&&this._tileProperties[index][id]?this._tileProperties[index][id][name]:null}getSprite(index,width,height){if(0<this._tileTexSetArr.length){var tGridSprite=new GridSprite;tGridSprite.initData(this,!0),tGridSprite.size(width,height);var tTileTexSet=this._tileTexSetArr[index];if(null!=tTileTexSet&&null!=tTileTexSet.texture){if(tTileTexSet.isAnimation){var tAnimationSprite=new TileAniSprite;this._index++,tAnimationSprite.setTileTextureSet(this._index.toString(),tTileTexSet),tGridSprite.addAniSprite(tAnimationSprite),tGridSprite.addChild(tAnimationSprite)}else tGridSprite.graphics.drawImage(tTileTexSet.texture,0,0,width,height);tGridSprite.drawImageNum++}return tGridSprite}return null}setViewPortPivotByScale(scaleX,scaleY){this._pivotScaleX=scaleX,this._pivotScaleY=scaleY}set scale(scale){scale<=0||(this._scale=scale,this._viewPortWidth=this._rect.width/scale,this._viewPortHeight=this._rect.height/scale,this._mapSprite.scale(this._scale,this._scale),this.updateViewPort())}get scale(){return this._scale}moveViewPort(moveX,moveY){this._x=-moveX,this._y=-moveY,this._rect.x=moveX,this._rect.y=moveY,this.updateViewPort()}changeViewPort(moveX,moveY,width,height){moveX==this._rect.x&&moveY==this._rect.y&&width==this._rect.width&&height==this._rect.height||(this._x=-moveX,this._y=-moveY,this._rect.x=moveX,this._rect.y=moveY,this._rect.width=width,this._rect.height=height,this._viewPortWidth=width/this._scale,this._viewPortHeight=height/this._scale,this.updateViewPort())}changeViewPortBySize(width,height,rect=null){return null==rect&&(rect=new Laya.Rectangle),this._centerX=this._rect.x+this._rect.width*this._pivotScaleX,this._centerY=this._rect.y+this._rect.height*this._pivotScaleY,rect.x=this._centerX-width*this._pivotScaleX,rect.y=this._centerY-height*this._pivotScaleY,rect.width=width,rect.height=height,this.changeViewPort(rect.x,rect.y,rect.width,rect.height),rect}updateViewPort(){this._centerX=this._rect.x+this._rect.width*this._pivotScaleX,this._centerY=this._rect.y+this._rect.height*this._pivotScaleY;var posChanged=!1,preValue=this._viewPortX;(this._viewPortX=this._centerX-this._rect.width*this._pivotScaleX/this._scale,preValue!=this._viewPortX?posChanged=!0:preValue=this._viewPortY,this._viewPortY=this._centerY-this._rect.height*this._pivotScaleY/this._scale,posChanged||preValue==this._viewPortY||(posChanged=!0),this._limitRange)&&(this._viewPortX+this._viewPortWidth>this._width&&(this._viewPortX=this._width-this._viewPortWidth),this._viewPortY+this._viewPortHeight>this._height&&(this._viewPortY=this._height-this._viewPortHeight),this._viewPortX<0&&(this._viewPortX=0),this._viewPortY<0&&(this._viewPortY=0));var tPaddingRect=this._paddingRect;if(this._mapRect.top=Math.floor((this._viewPortY-tPaddingRect.y)/this._gridHeight),this._mapRect.bottom=Math.floor((this._viewPortY+this._viewPortHeight+tPaddingRect.height+tPaddingRect.y)/this._gridHeight),this._mapRect.left=Math.floor((this._viewPortX-tPaddingRect.x)/this._gridWidth),this._mapRect.right=Math.floor((this._viewPortX+this._viewPortWidth+tPaddingRect.width+tPaddingRect.x)/this._gridWidth),this._mapRect.top==this._mapLastRect.top&&this._mapRect.bottom==this._mapLastRect.bottom&&this._mapRect.left==this._mapLastRect.left&&this._mapRect.right==this._mapLastRect.right||(this.clipViewPort(),this._mapLastRect.top=this._mapRect.top,this._mapLastRect.bottom=this._mapRect.bottom,this._mapLastRect.left=this._mapRect.left,this._mapLastRect.right=this._mapRect.right,posChanged=!0),posChanged)for(var tMapLayer,len=this._renderLayerArray.length,i=0;i<len;i++)(tMapLayer=this._renderLayerArray[i])._gridSpriteArray.length>0&&tMapLayer.updateGridPos()}clipViewPort(){var i,j,tSub=0,tAdd=0;if(this._mapRect.left>this._mapLastRect.left){if((tSub=this._mapRect.left-this._mapLastRect.left)>0)for(j=this._mapLastRect.left;j<this._mapLastRect.left+tSub;j++)for(i=this._mapLastRect.top;i<=this._mapLastRect.bottom;i++)this.hideGrid(j,i)}else if((tAdd=Math.min(this._mapLastRect.left,this._mapRect.right+1)-this._mapRect.left)>0)for(j=this._mapRect.left;j<this._mapRect.left+tAdd;j++)for(i=this._mapRect.top;i<=this._mapRect.bottom;i++)this.showGrid(j,i);if(this._mapRect.right>this._mapLastRect.right){if((tAdd=this._mapRect.right-this._mapLastRect.right)>0)for(j=Math.max(this._mapLastRect.right+1,this._mapRect.left);j<=this._mapLastRect.right+tAdd;j++)for(i=this._mapRect.top;i<=this._mapRect.bottom;i++)this.showGrid(j,i)}else if((tSub=this._mapLastRect.right-this._mapRect.right)>0)for(j=this._mapRect.right+1;j<=this._mapRect.right+tSub;j++)for(i=this._mapLastRect.top;i<=this._mapLastRect.bottom;i++)this.hideGrid(j,i);if(this._mapRect.top>this._mapLastRect.top){if((tSub=this._mapRect.top-this._mapLastRect.top)>0)for(i=this._mapLastRect.top;i<this._mapLastRect.top+tSub;i++)for(j=this._mapLastRect.left;j<=this._mapLastRect.right;j++)this.hideGrid(j,i)}else if((tAdd=Math.min(this._mapLastRect.top,this._mapRect.bottom+1)-this._mapRect.top)>0)for(i=this._mapRect.top;i<this._mapRect.top+tAdd;i++)for(j=this._mapRect.left;j<=this._mapRect.right;j++)this.showGrid(j,i);if(this._mapRect.bottom>this._mapLastRect.bottom){if((tAdd=this._mapRect.bottom-this._mapLastRect.bottom)>0)for(i=Math.max(this._mapLastRect.bottom+1,this._mapRect.top);i<=this._mapLastRect.bottom+tAdd;i++)for(j=this._mapRect.left;j<=this._mapRect.right;j++)this.showGrid(j,i)}else if((tSub=this._mapLastRect.bottom-this._mapRect.bottom)>0)for(i=this._mapRect.bottom+1;i<=this._mapRect.bottom+tSub;i++)for(j=this._mapLastRect.left;j<=this._mapLastRect.right;j++)this.hideGrid(j,i)}showGrid(gridX,gridY){if(!(gridX<0||gridX>=this._gridW||gridY<0||gridY>=this._gridH)){var i,tGridSprite,tTempArray=this._gridArray[gridY][gridX];if(null==tTempArray)tTempArray=this.getGridArray(gridX,gridY);else for(i=0;i<tTempArray.length&&i<this._layerArray.length;i++){this._layerArray[i]&&tTempArray[i]&&0==(tGridSprite=tTempArray[i]).visible&&tGridSprite.drawImageNum>0&&tGridSprite.show()}}}cacheAllGrid(){var i,j,tempArr;for(i=0;i<this._gridW;i++)for(j=0;j<this._gridH;j++)tempArr=this.getGridArray(i,j),this.cacheGridsArray(tempArr)}cacheGridsArray(arr){var canvas,i,len,tGrid;if(!TiledMap._tempCanvas){TiledMap._tempCanvas=new Laya.HTMLCanvas;var tx=TiledMap._tempCanvas.context;tx||(tx=TiledMap._tempCanvas.getContext("2d"))}for((canvas=TiledMap._tempCanvas).context.asBitmap=!1,len=arr.length,i=0;i<len;i++)tGrid=arr[i],canvas.clear(),canvas.size(1,1),tGrid.render(canvas.context,0,0),tGrid.hide();canvas.clear(),canvas.size(1,1)}getGridArray(gridX,gridY){var i,j,tGridSprite,tTempArray=this._gridArray[gridY][gridX];if(null==tTempArray){tTempArray=this._gridArray[gridY][gridX]=[];var tLeft=0,tRight=0,tTop=0,tBottom=0,tGridWidth=this._gridWidth,tGridHeight=this._gridHeight;switch(this.orientation){case TiledMap.ORIENTATION_ISOMETRIC:var tLeft1,tRight1,tTop1,tBottom1;tLeft=Math.floor(gridX*tGridWidth),tRight=Math.floor(gridX*tGridWidth+tGridWidth),tTop=Math.floor(gridY*tGridHeight),tBottom=Math.floor(gridY*tGridHeight+tGridHeight);break;case TiledMap.ORIENTATION_STAGGERED:tLeft=Math.floor(gridX*tGridWidth/this._mapTileW),tRight=Math.floor((gridX*tGridWidth+tGridWidth)/this._mapTileW),tTop=Math.floor(gridY*tGridHeight/(this._mapTileH/2)),tBottom=Math.floor((gridY*tGridHeight+tGridHeight)/(this._mapTileH/2));break;case TiledMap.ORIENTATION_ORTHOGONAL:tLeft=Math.floor(gridX*tGridWidth/this._mapTileW),tRight=Math.floor((gridX*tGridWidth+tGridWidth)/this._mapTileW),tTop=Math.floor(gridY*tGridHeight/this._mapTileH),tBottom=Math.floor((gridY*tGridHeight+tGridHeight)/this._mapTileH);break;case TiledMap.ORIENTATION_HEXAGONAL:var tHeight=2*this._mapTileH/3;tLeft=Math.floor(gridX*tGridWidth/this._mapTileW),tRight=Math.ceil((gridX*tGridWidth+tGridWidth)/this._mapTileW),tTop=Math.floor(gridY*tGridHeight/tHeight),tBottom=Math.ceil((gridY*tGridHeight+tGridHeight)/tHeight)}for(var tTGridSprite,tDrawMapLayer,tLayer=null,z=0;z<this._layerArray.length;z++){var tColorStr;switch(tLayer=this._layerArray[z],this.enableMergeLayer?(tLayer.tarLayer!=tDrawMapLayer&&(tTGridSprite=null,tDrawMapLayer=tLayer.tarLayer),tTGridSprite||(tTGridSprite=tDrawMapLayer.getDrawSprite(gridX,gridY),tTempArray.push(tTGridSprite)),tGridSprite=tTGridSprite):(tGridSprite=tLayer.getDrawSprite(gridX,gridY),tTempArray.push(tGridSprite)),this._showGridKey&&(tColorStr="#",tColorStr+=this._colorArray[Math.floor(Math.random()*this._colorArray.length)],tColorStr+=this._colorArray[Math.floor(Math.random()*this._colorArray.length)],tColorStr+=this._colorArray[Math.floor(Math.random()*this._colorArray.length)]),this.orientation){case TiledMap.ORIENTATION_ISOMETRIC:var tHalfTileHeight=this.tileHeight/2,tHalfTileWidth=this.tileWidth/2,tHalfMapWidth=this._width/2;tTop1=Math.floor(tTop/tHalfTileHeight),tBottom1=Math.floor(tBottom/tHalfTileHeight),tLeft1=this._mapW+Math.floor((tLeft-tHalfMapWidth)/tHalfTileWidth),tRight1=this._mapW+Math.floor((tRight-tHalfMapWidth)/tHalfTileWidth);this._mapW;var tMapH=2*this._mapH;for(tTop1<0&&(tTop1=0),tTop1>=tMapH&&(tTop1=tMapH-1),tBottom1<0&&(tBottom=0),tBottom1>=tMapH&&(tBottom1=tMapH-1),tGridSprite.zOrder=this._totalGridNum*z+gridY*this._gridW+gridX,i=tTop1;i<tBottom1;i++)for(j=0;j<=i;j++){var tIndexX=i-j,tIndexY=j,tIndexValue=tIndexX-tIndexY+this._mapW;tIndexValue>tLeft1&&tIndexValue<=tRight1&&tLayer.drawTileTexture(tGridSprite,tIndexX,tIndexY)&&tGridSprite.drawImageNum++}break;case TiledMap.ORIENTATION_STAGGERED:for(tGridSprite.zOrder=z*this._totalGridNum+gridY*this._gridW+gridX,i=tTop;i<tBottom;i++)for(j=tLeft;j<tRight;j++)tLayer.drawTileTexture(tGridSprite,j,i)&&tGridSprite.drawImageNum++;break;case TiledMap.ORIENTATION_ORTHOGONAL:case TiledMap.ORIENTATION_HEXAGONAL:switch(this._renderOrder){case TiledMap.RENDERORDER_RIGHTDOWN:for(tGridSprite.zOrder=z*this._totalGridNum+gridY*this._gridW+gridX,i=tTop;i<tBottom;i++)for(j=tLeft;j<tRight;j++)tLayer.drawTileTexture(tGridSprite,j,i)&&tGridSprite.drawImageNum++;break;case TiledMap.RENDERORDER_RIGHTUP:for(tGridSprite.zOrder=z*this._totalGridNum+(this._gridH-1-gridY)*this._gridW+gridX,i=tBottom-1;i>=tTop;i--)for(j=tLeft;j<tRight;j++)tLayer.drawTileTexture(tGridSprite,j,i)&&tGridSprite.drawImageNum++;break;case TiledMap.RENDERORDER_LEFTDOWN:for(tGridSprite.zOrder=z*this._totalGridNum+gridY*this._gridW+(this._gridW-1-gridX),i=tTop;i<tBottom;i++)for(j=tRight-1;j>=tLeft;j--)tLayer.drawTileTexture(tGridSprite,j,i)&&tGridSprite.drawImageNum++;break;case TiledMap.RENDERORDER_LEFTUP:for(tGridSprite.zOrder=z*this._totalGridNum+(this._gridH-1-gridY)*this._gridW+(this._gridW-1-gridX),i=tBottom-1;i>=tTop;i--)for(j=tRight-1;j>=tLeft;j--)tLayer.drawTileTexture(tGridSprite,j,i)&&tGridSprite.drawImageNum++}}tGridSprite.isHaveAnimation||(tGridSprite.autoSize=!0,this.autoCache&&(tGridSprite.cacheAs=this.autoCacheType),tGridSprite.autoSize=!1),this.enableMergeLayer?tTGridSprite&&tTGridSprite.drawImageNum>0&&tDrawMapLayer&&tDrawMapLayer.addChild(tTGridSprite):(tGridSprite.drawImageNum>0&&tLayer.addChild(tGridSprite),this._showGridKey&&tGridSprite.graphics.drawRect(0,0,tGridWidth,tGridHeight,null,tColorStr))}this.enableMergeLayer&&this.showGridTextureCount&&tTGridSprite&&tTGridSprite.graphics.fillText(tTGridSprite.drawImageNum+"",20,20,null,"#ff0000","left")}return tTempArray}hideGrid(gridX,gridY){if(!(gridX<0||gridX>=this._gridW||gridY<0||gridY>=this._gridH)){var tTempArray=this._gridArray[gridY][gridX];if(tTempArray)for(var tGridSprite,i=0;i<tTempArray.length;i++)(tGridSprite=tTempArray[i]).drawImageNum>0&&null!=tGridSprite&&tGridSprite.hide()}}getLayerObject(layerName,objectName){for(var tLayer=null,i=0;i<this._layerArray.length&&(tLayer=this._layerArray[i]).layerName!=layerName;i++);return tLayer?tLayer.getObjectByName(objectName):null}destroy(){this._orientation=TiledMap.ORIENTATION_ORTHOGONAL,this._jsonData=null;var tTileTexSet,i=0;for(this._gridArray=[],i=0;i<this._tileTexSetArr.length;i++)(tTileTexSet=this._tileTexSetArr[i])&&tTileTexSet.clearAll();for(this._tileTexSetArr=[],i=0;i<this._texArray.length;i++)this._texArray[i].destroy();for(this._texArray=[],this._width=0,this._height=0,this._mapW=0,this._mapH=0,this._mapTileW=0,this._mapTileH=0,this._rect.setTo(0,0,0,0),i=0;i<this._layerArray.length;i++)this._layerArray[i].clearAll();this._layerArray=[],this._renderLayerArray=[],this._mapSprite&&(this._mapSprite.destroy(),this._mapSprite=null),this._jsonLoader=null,this._loader=null;var tDic=this._animationDic;for(var p in tDic)delete tDic[p];for(p in this._properties=null,tDic=this._tileProperties)delete tDic[p];this._currTileSet=null,this._completeHandler=null,this._mapRect.clearAll(),this._mapLastRect.clearAll(),this._tileSetArray=[],this._gridWidth=450,this._gridHeight=450,this._gridW=0,this._gridH=0,this._x=0,this._y=0,this._index=0,this._enableLinear=!0,this._resPath=null,this._pathArray=null}get tileWidth(){return this._mapTileW}get tileHeight(){return this._mapTileH}get width(){return this._width}get height(){return this._height}get numColumnsTile(){return this._mapW}get numRowsTile(){return this._mapH}get viewPortX(){return-this._viewPortX}get viewPortY(){return-this._viewPortY}get viewPortWidth(){return this._viewPortWidth}get viewPortHeight(){return this._viewPortHeight}get x(){return this._x}get y(){return this._y}get gridWidth(){return this._gridWidth}get gridHeight(){return this._gridHeight}get numColumnsGrid(){return this._gridW}get numRowsGrid(){return this._gridH}get orientation(){return this._orientation}get renderOrder(){return this._renderOrder}mapSprite(){return this._mapSprite}getLayerByName(layerName){for(var tMapLayer,i=0;i<this._layerArray.length;i++)if(layerName==(tMapLayer=this._layerArray[i]).layerName)return tMapLayer;return null}getLayerByIndex(index){return index<this._layerArray.length?this._layerArray[index]:null}}TiledMap.ORIENTATION_ORTHOGONAL="orthogonal",TiledMap.ORIENTATION_ISOMETRIC="isometric",TiledMap.ORIENTATION_STAGGERED="staggered",TiledMap.ORIENTATION_HEXAGONAL="hexagonal",TiledMap.RENDERORDER_RIGHTDOWN="right-down",TiledMap.RENDERORDER_RIGHTUP="right-up",TiledMap.RENDERORDER_LEFTDOWN="left-down",TiledMap.RENDERORDER_LEFTUP="left-up";class GRect{clearAll(){this.left=this.top=this.right=this.bottom=0}}class TileMapAniData{constructor(){this.mAniIdArray=[],this.mDurationTimeArray=[],this.mTileTexSetArr=[]}}class TileSet{constructor(){this.firstgid=0,this.image="",this.imageheight=0,this.imagewidth=0,this.margin=0,this.name=0,this.spacing=0,this.tileheight=0,this.tilewidth=0,this.titleoffsetX=0,this.titleoffsetY=0}init(data){this.firstgid=data.firstgid,this.image=data.image,this.imageheight=data.imageheight,this.imagewidth=data.imagewidth,this.margin=data.margin,this.name=data.name,this.properties=data.properties,this.spacing=data.spacing,this.tileheight=data.tileheight,this.tilewidth=data.tilewidth,this.tileproperties=data.tileproperties;var tTileoffset=data.tileoffset;tTileoffset&&(this.titleoffsetX=tTileoffset.x,this.titleoffsetY=tTileoffset.y)}}IMap.TiledMap=TiledMap,exports.GridSprite=GridSprite,exports.IMap=IMap,exports.MapLayer=MapLayer,exports.TileAniSprite=TileAniSprite,exports.TileTexSet=TileTexSet,exports.TiledMap=TiledMap}(window.Laya=window.Laya||{},Laya);