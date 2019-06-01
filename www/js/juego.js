var app={
 
	inicio: function(){

 		DIAMETRO_BOLA = 50;
		tamaño_cangrjo_x=148;
		tamaño_cangrjo_y=82;
		dificultad = 0;
		velocidadX = 0;
		velocidadY = 0;
		puntuacion = 0;
		puntuacion2 = 0;
		eventoPecera=0;
		estado={rojo:1,verde:2};
		estadoCaballito=2;
 	    factorDificultad=300;
        velocidadMedusa=0;
		timer =0;
		alto  = document.documentElement.clientHeight;
		ancho = document.documentElement.clientWidth;
		punto=0;
		nivel =10;nivelPuntuacion=100;
		finTexto=0;
		nivelText=1;
		timerMensaje=0;
		//var millis;

 		  app.vigilaSensores(); 
		app.iniciaJuego();

	},
 
	iniciaJuego: function(){

 var gameRatio = window.innerWidth/window.innerHeight;	
  var estados = { preload: preload, create: create, update: update, render: render };
  var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
  

  var content = [
    "bloquea el giro de pantalla",
    "El protagonista es el ",
    "CANGREJO, que as de ",
    "controlar con el  ",
    "accelerometro(movil) ",
    "asustando al PULPO y ",
    "al CABALLITO DE MAR le", 
    "quitaras vida a la",
    "MEDUSA expulsandola ",
    "y asi pasar de nivel ",
    "si te toca la medusa o chocas ",
    "con los bordes de la pecera ",
    "aumentaras la velocidad ",
    "y te quitara vida. ", 
    "",
    "",
    "ACARICIA A LA MEDUSA!!!! ",
    ""  
 ];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 100;
var lineDelay = 400;
 
function siguienteLinea() {



    if (lineIndex === content.length)
    {
        //finTexto=1;
        //  We're finished
        return;
    }//else {finTexto=0;}

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'siguientePalabra' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, siguientePalabra, this);

    //  Advance to the next line
    lineIndex++;

}

function siguientePalabra() {
 
    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, siguienteLinea, this);
    }

}

function preload() {
 
  

	firstRunLandscape = game.scale.isGameLandscape;
 	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	  //game.scale.setShowAll();
	game.scale.forceOrientation(false, true	);
    game.scale.enterIncorrectOrientation.add(app.handleIncorrect);
	game.scale.leaveIncorrectOrientation.add(app.handleCorrect);


	game.physics.startSystem(Phaser.Physics.ARCADE);

  game.load.atlasXML('seacreatures', 'assets/sprites/seacreatures.png', 'assets/sprites/seacreatures.xml');
   game.load.image('coral', 'assets/pics/seabed.png');
    game.load.audio('sfx', 'assets/audio/SoundEffects/fx_mixdown.ogg');
game.load.image('undersea', 'assets/pics/undersea.jpg');
    game.load.image('coral', 'assets/pics/seabed.png');
    game.load.image('ball', 'assets/particles/bubble256.png');

if (typeof forcePortrait === 'undefined')
{
   this.forcePortrait = false;
}
}

var fx;
var bg;

var medusa;
var medusa2;
var cangrejo;
var cangrejo2;
var greenmedusa;
var octopus;
var purpleFish;
var caballitoMar;
var squid;
var stingray;
var flyingfish;
var tweencaballitoMar;
var tweenpulpo;
var tweencangrejo;
var tweenmedusa;
var estadoJuego = 0;
var barra;
var barramedusa;



function updateCounter() {

	estadoJuego++;

}

function create() {

	timer = game.time.create(true);
	timer.loop(1000000, updateCounter, this);
	timer.start();


    game.add.image(0, 0, 'undersea');
////////////////////////////////// textos
	marcador = game.add.text(148, 16, puntuacion, { align: "center", fontSize: '30px', fill: '#757676' });
	text = game.add.text(30, 50, '', { font: "20px Arial", fill: "#757676" });
 
 //////////////////////////////// marcador vida cangrejo y medusa
 	barra= game.add.graphics(ancho/2, 5);
   	barramedusa= game.add.graphics(ancho/2, 5);
 // window.graphics = barra;
//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////  lluvia de burbujas
    var delay = 0;

    for (var i = 0; i < 40; i++)
    {
        var sprite = game.add.sprite((game.world.randomX), 600, 'ball');

        sprite.scale.set(game.rnd.realInRange(0.1, 0.1));

        var speed = game.rnd.between(4000, 6000);

        game.add.tween(sprite).to({ y: -256 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);

        delay += 200;
    }


     siguienteLinea();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


 	cangrejo2 = game.add.sprite(80, 0, 'seacreatures');
	cangrejo2.animations.add('swim', Phaser.Animation.generateFrameNames('crab1', 0, 25, '', 4), 30, true);
	cangrejo2.animations.play('swim');
	cangrejo2.scale.setTo(0.25, 0.25);

	medusa2 = game.add.sprite(ancho-103, 0, 'seacreatures');  
	medusa2.animations.add('swim', Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4), 30, true);
	medusa2.animations.play('swim'); 
	medusa2.scale.setTo(0.35, 0.30); 
	medusa2.tint=0xffff00;

    cangrejo = game.add.sprite(app.inicioX(), app.inicioY(), 'seacreatures');
	cangrejo.animations.add('swim', Phaser.Animation.generateFrameNames('crab1', 0, 25, '', 4), 30, true);
	cangrejo.animations.play('swim');
	cangrejo.scale.setTo(0.5, 0.5); 
	game.physics.arcade.enable(cangrejo); 
	cangrejo.body.collideWorldBounds = true; 
	cangrejo.anchor.setTo(0.5, 0.5);
	cangrejo.body.onWorldBounds = new Phaser.Signal();
	cangrejo.body.onWorldBounds.add(app.decrementaPuntuacion, this);
	cangrejo.inputEnabled = true;
 	cangrejo.events.onInputDown.add(cangrejoListener, this);

	pulpo = game.add.sprite(app.inicioX(),  app.inicioY(), 'seacreatures');
	pulpo.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
	pulpo.animations.play('swim');
	pulpo.scale.setTo(0.5, 0.5); 
	game.physics.arcade.enable(pulpo);
	pulpo.body.collideWorldBounds = true;
	pulpo.anchor.setTo(0.5, 0.5);

	
	caballitoMar = game.add.sprite(app.inicioX(), app.inicioY(), 'seacreatures');
	caballitoMar.animations.add('swim', Phaser.Animation.generateFrameNames('seahorse', 0, 5, '', 4), 30, true);
	caballitoMar.animations.play('swim');
	caballitoMar.scale.setTo(0.4, 0.4);  
	game.physics.arcade.enable(caballitoMar);
	caballitoMar.body.collideWorldBounds = true;  
 	caballitoMar.scale.setTo(0.2, 0.2); 

	medusa = game.add.sprite(30, 20, 'seacreatures');  
	medusa.animations.add('swim', Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4), 30, true);
	medusa.animations.play('swim'); 
	medusa.enableBody = true;
	game.physics.arcade.enable(medusa);
	medusa.body.collideWorldBounds = true; 
	medusa.anchor.setTo(0.5, 0.5);  
	medusa.inputEnabled = true;
 //medusa.events.onInputDown.add(medusaListener, this);

 	tweenmedusa = game.add.tween(medusa);
 	tweenmedusa.to({ x: 300, y:  300,angle: 360,alpha: 1}, 1000, Phaser.Easing.Linear.None, true );
 	tweenmedusa.onComplete.add(app.persiguecangrejo,this);

 	tweencangrejo = game.add.tween(cangrejo);
 	tweencangrejo = game.add.tween(cangrejo).to({x: 100,y: 200}, 800, Phaser.Easing.Linear.None, true );

  	tweenpulpo = game.add.tween(pulpo);
 	tweenpulpo = game.add.tween(pulpo).to({x: 200,y: 200}, 500, Phaser.Easing.Linear.None, true );
 	 	
	tweencaballitoMar = game.add.tween(caballitoMar); 
 	tweencaballitoMar.to({x: app.inicioXcan(),y: app.inicioYcan() }, 800,  Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

   	game.add.image(0, alto-125, 'coral');

/////////////////////////// textos 

/////////////////////////// audio
	fx = game.add.audio('sfx');
    fx.allowMultiple = true;

	fx.addMarker('alien death', 1, 1.0);
	fx.addMarker('boss hit', 3, 0.5);
	fx.addMarker('escape', 4, 3.2);
	fx.addMarker('meow', 8, 0.5);
	fx.addMarker('numkey', 9, 0.1);
	fx.addMarker('ping', 10, 1.0);
	fx.addMarker('death', 12, 4.2);
	fx.addMarker('shot', 17, 1.0);
	fx.addMarker('squit', 19, 0.3);
	 
}
 

evento = {
    pazPecera : 0,
    escapaCaballito : 1,
    escapaPulpito : 2,
    tooLocoCangrejito:3,
    buscaCangrejo:4,
    venenoMedusa:5,
    bloqueoContactos:10
}


 function medusaListener(){

 	 
   if (estadoJuego==-2){ 
		text.text = ' COMIENZA NIVEL '+ nivelText;
   	 	cangrejo.reset(50,50);
    	tweencangrejo = game.add.tween(cangrejo.scale).to({ x: 0, y: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
    	tweencangrejo = game.add.tween(cangrejo.scale).to({ x: 0.5, y: 0.5 }, 2000, Phaser.Easing.Bounce.Out, true);
		tweencangrejo = game.add.tween(cangrejo).to({ x: caballitoMar.x, y:  caballitoMar.y,angle: 360},700, Phaser.Easing.Linear.None).start();
		tweencangrejo.onComplete.add(function (){
		puntuacion=0;
		puntuacion2=0;
		eventoPecera=evento.buscaCangrejo; 
		estadoJuego=1;timer.start();
		factorDificultad=300;
		cangrejo.body.velocity.y=0;
		cangrejo.body.velocity.x=0;
		timerMensaje=timer.duration.toFixed(0);
	});

 	//tweenmedusa.to({ x: medusa.x, y:  medusa.y,angle: 360}, 1000, Phaser.Easing.Linear.None, true );
}

 }
function cangrejoListener(){var string;
		text.text = 'COMIENZA NIVEL '+ nivelText;  
    	medusa.reset(30,50);
    	tweenmedusa = game.add.tween(medusa.scale).to({ x: 0, y: 0 }, 2000, Phaser.Easing.Bounce.Out, true);
    	tweenmedusa = game.add.tween(medusa.scale).to({ x: 0.7, y: 0.7 }, 2000, Phaser.Easing.Bounce.Out, true);
		tweenmedusa = game.add.tween(medusa).to({ x: caballitoMar.x, y:  caballitoMar.y,angle: 360},700, Phaser.Easing.Linear.None).start();
		tweenmedusa.onComplete.add(function (){ 
		puntuacion=0; 
		puntuacion2=0;
		eventoPecera=evento.buscaCangrejo;
		estadoJuego=1;timer.start();
		factorDificultad=300;
		cangrejo.body.velocity.y=0;
		cangrejo.body.velocity.x=0;
		timerMensaje=timer.duration.toFixed(0);
	});

 }

function update(){


	 millis= timer.duration.toFixed(0);
if (estadoJuego==0){velocidadMedusa=200;
 }

if (estadoJuego==-1){


	var y=app.numeroAleatorioHasta(100); 
	if (y>=99){tweencangrejo = game.add.tween(cangrejo).to({ x: caballitoMar.x, y:  caballitoMar.y},700, Phaser.Easing.Linear.None).start();
	}
	var y=app.numeroAleatorioHasta(100); 
	if (y>=99){tweenpulpo = game.add.tween(pulpo).to({ x: caballitoMar.x, y:  caballitoMar.y},700, Phaser.Easing.Linear.None).start();
	}

 	var d=app.numeroAleatorioHasta(100); 
  	if (d>=98){
  tweencaballitoMar = game.add.tween(caballitoMar).to({x: app.inicioXcan(),y: app.inicioYcan()}, 800,  Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
   }
}

if (estadoJuego==-2){
	if (lineIndex == content.length){ medusa.events.onInputDown.add(medusaListener, this);}

	var y=app.numeroAleatorioHasta(100); 
	if (y>=99){tweenmedusa = game.add.tween(medusa).to({ x: caballitoMar.x, y: caballitoMar.y},700, Phaser.Easing.Linear.None).start();
	}


	var d=app.numeroAleatorioHasta(100); 
 	if (d>=98){
 	tweencaballitoMar = game.add.tween(caballitoMar).to({x: app.inicioXcan(),y: app.inicioYcan()}, 800,  Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

  	}
}

///////////// borra textos
 

if (estadoJuego==1){
	if (timerMensaje-timer.duration.toFixed(0)>=3000){text.text='';}}

////////////////// velocidad medusa , puntuacion y ganador con final feliz
if (estadoJuego>=0){
	if(punto){

		  	velocidadMedusa=1000-puntuacion;
			
			barramedusa.kill();
 			barramedusa= game.add.graphics(ancho/2, 5);
 			barramedusa.beginFill(0xFF3300);
			barramedusa.lineStyle(20, 0xff0000);// rojo
	 		barramedusa.moveTo(0,5);
	    	barramedusa.lineTo(-(puntuacion/10)*nivel, 5);


			barra.kill();
			barra= game.add.graphics(ancho/2, 5);
			barra.beginFill(0xFF3300);
 	 		barra.lineStyle(20, 0x33FF00);// verde
			barra.moveTo(0,5);
	    	barra.lineTo((puntuacion2/10)*nivel, 5);

 	    	
 
	punto=0;
	window.graphics = barra;
 
		if (puntuacion2>nivelPuntuacion){ fx.play('death');/// GANADOR cangrtjo';
			 
			text.text='ACARICIA EL CANGREJO NIVEL ';

 			eventoPecera=evento.bloqueoContactos;
			tweenmedusa = game.add.tween(medusa.scale).to({ x: 6, y: 6  }, 2000, Phaser.Easing.Bounce.Out, true);
			tweenmedusa.onComplete.add(function (){medusa.kill();marcador.text=''; });
			estadoJuego=-1; timer.stop();
			nivelText++;
			if (nivelText==2){ nivel =2;nivelPuntuacion=500; }	
			else if (nivelText==3){ nivel =1;nivelPuntuacion=1000;}	
			else if (nivelText==4){nivelText=1;nivel=10;
			nivelPuntuacion =100;}
		} 
		else if(puntuacion>nivelPuntuacion){ fx.play('death'); //'GANADOR MEDUSA';
			if (estadoJuego!=0){   text.text='GANADOR MEDUSA';}
			eventoPecera=evento.bloqueoContactos;
			tweencangrejo = game.add.tween(cangrejo.scale).to({ x:  3, y: 3 }, 2000,Phaser.Easing.Bounce.Out,true);
			tweencangrejo.onComplete.add(function (){cangrejo.kill(); 
		});
 			estadoJuego=-2;	 timer.stop();
			nivelText=1;nivel=10;
			nivelPuntuacion =100;



		}
    }


//////////////////////7 EVENTOS PECERA

	if (eventoPecera!=evento.bloqueoContactos){
	// adacta velocidad cangrjo por los golpes con los bordes de la pecera y cuando molesta la medusa
if (factorDificultad<=0){factorDificultad=0;}

		cangrejo.body.velocity.y = (velocidadY * factorDificultad);
		cangrejo.body.velocity.x = (velocidadX * (-1 * factorDificultad));

	
//// eventos en la pecera
		if (eventoPecera==evento.escapaCaballito){fx.play('numkey');
			caballitoMar.tint= 0xffffff;
			caballitoMar.alpha= 30;
			caballitoMar.scale.setTo(0.2, 0.2); 
			tweencaballitoMar = game.add.tween(caballitoMar).to({x: app.inicioX(),y: app.inicioY(), angle: 360}, 800, Phaser.Easing.Linear.None ).to({x: app.inicioXcan(),y: app.inicioYcan()}, 800,  Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
			eventoPecera=0;
		}/// final evento cangrejo molesta a caballito y se va al fondo de la pecera para que no le moleste

		if (eventoPecera==evento.escapaPulpito){fx.play('ping');
	 		caballitoMar.tint= 0xff0000;
			//caballitoMar.alpha= 1;
			caballitoMar.scale.setTo(0.4, 0.4);    
			tweenpulpo = game.add.tween(pulpo).to({x: app.inicioXcan(),y: app.inicioYcan(), angle: 360}, 800, Phaser.Easing.Linear.None			, true ).start();
			 eventoPecera=0; 
		}// final evento cangrejo molesta a pulpo y enciende al caballito que sale del fondo de la pecera rojo

		if (eventoPecera==evento.tooLocoCangrejito ){ 	 fx.play('meow');     //barra.destroy();
			tweencangrejo = game.add.tween(cangrejo).to({x: app.inicioXcan(),y: app.inicioYcan(), angle: 360}, 800, Phaser.Easing.			Linear.None ).to({x: app.inicioXcan(),y: app.inicioYcan(),  angle: -360 }, 800, Phaser.Easing.Linear.None).start();
			tweencangrejo.onComplete.add(function (){eventoPecera=evento.buscaCangrejo;});
			eventoPecera=evento.bloqueoContactos;
		}// final evento cangrejo se vuelve tooo loco

		if (eventoPecera==evento.buscaCangrejo  ){  
			var poscangrejox=cangrejo.x +10;
			var poscangrejoy=cangrejo.y -10;
			tweenmedusa = game.add.tween(medusa).to({ x: poscangrejox, y:  poscangrejoy,angle: 0,alpha: 5,tint: 0xffff00},			velocidadMedusa, Phaser.Easing.Linear.None).start();
			tweenmedusa.onComplete.add(app.persiguecangrejo, this);
			eventoPecera=0;
		}// final evento medusa persigue cangrejo
		
	} //// final evento cangrejo too loco
	game.physics.arcade.collide(cangrejo, pulpo, app.incrementaPuntuacion1, null, this);
	game.physics.arcade.overlap(cangrejo, caballitoMar, app.incrementaPuntuacion2, null, this);

	 
	game.physics.arcade.overlap(cangrejo, medusa, app.decrementaPuntuacion2, null, this);

	if (eventoPecera==evento.venenoMedusa ){ 	 
		fx.play('squit');
		eventoPecera=0;
	}
}//// fin estadoJuego

}

function render() {
	game.debug.text("nivelText = "+ nivelText, 32, 522);

	game.debug.text("eventoPecera = "+ eventoPecera, 32, 532);
	game.debug.text("dificultad = "+ dificultad, 32, 542);
	game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 552);
    game.debug.text('Loop Count: ' + estadoJuego, 32, 562); 
    game.debug.text('volocidadcan: ' + cangrejo.body.velocity.x, 32, 572); 
    game.debug.text('factorDificultad: ' + factorDificultad, 32, 582); 
    game.debug.text('volocidad medusa: ' + velocidadMedusa, 32, 592); 
    game.debug.text('nivel: ' + nivel, 32, 602); 
    game.debug.text('nivelPuntuacion: ' + nivelPuntuacion, 32,612); 


 }
},

decrementaPuntuacion: function(){
punto++;
 	if (eventoPecera!=evento.bloqueoContactos){
		eventoPecera=evento.tooLocoCangrejito;
		puntuacion = puntuacion+1;
		factorDificultad++;
		marcador.text = puntuacion;}
	},

	persiguecangrejo: function(){
	if (eventoPecera!=evento.bloqueoContactos){
		eventoPecera=evento.buscaCangrejo;
	}
},

incrementaPuntuacion1: function(cangrejo, pulpo){
punto++;
	if (eventoPecera!=evento.bloqueoContactos){
		puntuacion2 = puntuacion2+10;
		factorDificultad--;
		marcador.text = puntuacion;
		eventoPecera=evento.escapaPulpito;
		estadoCaballito=estado.rojo;
   }
},

incrementaPuntuacion2: function(cangrejo, caballitoMar){
punto++;
	if (eventoPecera!=evento.bloqueoContactos){
		if (estadoCaballito==estado.verde){ 
			puntuacion2++;  factorDificultad++;}
		else {	puntuacion2++;
			factorDificultad=factorDificultad-1;
			estadoCaballito=estado.verde;} 

	marcador.text = puntuacion;
 	eventoPecera=evento.escapaCaballito;
 	}
},
decrementaPuntuacion2: function(cangrejo, medusa){
punto++;
	//if (eventoPecera!=evento.bloqueoContactos){
  		eventoPecera=evento.venenoMedusa;  
  		puntuacion++; 
			factorDificultad=factorDificultad+1;
		marcador.text = puntuacion;
	//}
},


inicioX: function(){
	return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA );
},

inicioY: function(){
	return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA );
},
inicioXcan: function(){
	return app.numeroAleatorioHasta(ancho - tamaño_cangrjo_x );
},

inicioYcan: function(){
	return app.numeroAleatorioHasta(alto - tamaño_cangrjo_y );
},
numeroAleatorioHasta: function(limite){
	return Math.floor(Math.random() * limite);
},

handleIncorrect: function(){
     	  if(!game.device.desktop){
      	     		document.getElementById("turn").style.display="block";	 			  }
	},

	handleCorrect: function(){
		  if(!game.device.desktop){
 
			document.getElementById("turn").style.display="none";
			  }
	},
vigilaSensores: function(){

	function onError() {
		console.log('onError!');
	}

	function onSuccess(datosAceleracion){
		app.detectaAgitacion(datosAceleracion);
		if (eventoPecera!=evento.bloqueoContactos){
			app.registraDireccion(datosAceleracion);
		}
	}

	navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
},


detectaAgitacion: function(datosAceleracion){
	var agitacionX = datosAceleracion.x > 10;
	var agitacionY = datosAceleracion.y > 10;

	if (agitacionX || agitacionY){
		setTimeout(app.recomienza, 1000);
	}
},

recomienza: function(){
	document.location.reload(true);
},

registraDireccion: function(datosAceleracion){
	velocidadX = datosAceleracion.x ;
	velocidadY = datosAceleracion.y ;
}

};

if ('addEventListener' in document) {
	document.addEventListener('deviceready', function() {
 		app.inicio();
	}, false);
}
 
