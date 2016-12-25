Game.addToManifest({
	bg_preload: "sprites/bg_preload.png",
	bg_preload_2: "sprites/bg_preload_2.png",
	preload_play: "sprites/misc/preload_play.json"
}, true);

function Scene_Preloader(){

	var self = this;
	Scene.call(self);

	// Background!
	Game.stage.addChild(MakeSprite("bg_preload"));

	// RECURSIVE SCREEN
	var renderTexturePoolIndex = 0;
	var renderTexturePool = [
		PIXI.RenderTexture.create(Game.width, Game.height),
		PIXI.RenderTexture.create(Game.width, Game.height)
	];
	self.stream = new PIXI.Sprite();
	self.stream.x = 722;
	self.stream.y = 359;
	self.stream.scale.x = self.stream.scale.y = 0.29;
	self.stream.anchor.x = self.stream.anchor.y = 0.5;
	self.stream.rotation = 0.087263889;
	Game.stage.addChild(self.stream);

	// Background! #2
	Game.stage.addChild(MakeSprite("bg_preload_2"));

	// Loading Bar
	var bar = MakeMovieClip("preload_play");
	bar.anchor.x = bar.anchor.y = 0.5;
	bar.x = 278;
	bar.y = 225;
	Game.stage.addChild(bar);
	var barEase = 0.9;

	// Since the loading screen can be rendered before browser completes the
	// download of Noto Sans KR font, PIXI.js must know which font to fallback.
	//
	// Reference: http://www.beautifulcss.com/archives/431
	var fontFamily =
		"'Noto Sans KR (Subset)', " + // Derised fonts
		"'맑은 고딕', 'Malgun Gothic', " + // Fallback for Windows
		"'애플 SD 산돌고딕 Neo', 'Apple SD Gothic Neo', " + // Fallback for OS X
		"Ngothic, sans-serif";

	// Loading text
	var text = new PIXI.Text("loading... 0%", {font:"25px " + fontFamily, fill:"#4C4C4C", align:"center"});
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	text.x = bar.x;
	text.y = bar.y;
	Game.stage.addChild(text);

	// Playing time text
	var playingTimeText = new PIXI.Text(textStrings["playingTime"], { font: "32px " + fontFamily, fill: "#FFFFFF", align: "center" });
	playingTimeText.anchor.x = 0.5;
	playingTimeText.anchor.y = 0.5;
	playingTimeText.x = bar.x;
	playingTimeText.y = 300;
	Game.stage.addChild(playingTimeText);

	// Warning text
	var warningText = new PIXI.Text(textStrings["warning"], { font: "25px " + fontFamily, fill: "#666666", align: "center" });
	warningText.anchor.x = 0.5;
	warningText.anchor.y = 0.5;
	warningText.x = bar.x;
	warningText.y = 422;
	Game.stage.addChild(warningText);

	// CURSOR
	var cursor = new Cursor(self);
	Game.stage.addChild(cursor.graphics);

	// Update!
	self.update = function(){

		// RECURSIVE SCREEN
		var renderTexture = renderTexturePool[renderTexturePoolIndex];
		Game.renderer.render(Game.stage, renderTexture);
		renderTexturePoolIndex = (renderTexturePoolIndex+1)%renderTexturePool.length;
		self.stream.texture = renderTexture;

		// THE BUTTON!
		var scale = bar.scale.x;
		var gotoScale = (bar.currentFrame==2) ? 1.02 : 1.00;
		scale = scale*barEase + gotoScale*(1-barEase);
		bar.scale.x = bar.scale.y = scale;

		// Ya
		cursor.update((bar.currentFrame==2));

	};

	Game.loadAssets(function(){

		Game.stage.removeChild(text);
		bar.gotoAndStop(1);
		bar.scale.x = bar.scale.y = 1.1;

		// INTERACTIVITY!
		bar.interactive = true;
		bar.mouseover = function(){
			barEase = 0.5;
			bar.gotoAndStop(2);
		};
		bar.mouseout = function(){
			bar.gotoAndStop(1);
		};
		bar.mousedown = bar.touchend = function(){
			Game.sounds.squeak.play();
			setTimeout(function(){
				Game.sceneManager.gotoScene("Quote");
			},200);
		};

	}, function(ratio){
		var percent = Math.floor(ratio*100);
		text.text = "loading... "+percent+"%";
	}, false);

}
