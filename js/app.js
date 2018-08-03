$(function() {
	var img = $('.tecla');
			img.on('mousedown', function() {
				resizeButton(this);
			}).on('mouseup', function() {
				normal(this);
			});
	
	$('img.tecla').click(function() {
		var valor = this.getAttribute('id');
		switch(valor){			
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				Calculadora.numeroClick(valor);
				break;
			case "punto":
				Calculadora.numeroClick(".");
				break;
			case "on":
				Calculadora.limpiarNumeros();
				break;
			case "mas":
				Calculadora.operadorClick("+");
				break;	
			case "menos":
				Calculadora.operadorClick("-");
				break;
			case "por":
				Calculadora.operadorClick("*");
				break;
			case "dividido":
				Calculadora.operadorClick("/");
				break;
			case "raiz":
				Calculadora.operadorClick("raiz");
				break;
			case "sign":
				Calculadora.operadorClick("sign");
				break;
			case "igual":
				Calculadora.operadorClick("igual");
				break;				
		}
	});
});


window.onload = function () {  
    var pantalla = document.getElementById('display');
    Calculadora.init(pantalla);
};

	x = "0"; //número en pantalla
	xi = 1; //iniciar número en pantalla: 1=si; 0=no;
	coma = 0; //estado coma decimal 0=no, 1=si;
	ni = 0; //número oculto o en espera.
	op = "no"; //operación en curso; "no" =  sin operación.
	aux = ""; //valor para actualizar pantalla

var Calculadora = function() {
    var pantalla,
       
        init = function(currNumber) {            
            pantalla = currNumber;
        },
           
		igualar = function() {
			aux = "";
			 if (op == "no") { //no hay ninguna operación pendiente.
			 	aux = x; //auxiliar para mostrar mismo numero
				
			}
			 else { //con operación pendiente resolvemos
				sl = ni + op + x; // escribimos la operación en una cadena
				sol = eval(sl) //convertimos la cadena a código y resolvemos
				aux = sol; //solucion en variable auxiliar		
				x = sol; //guardamos la solucióen
				op = "no"; //ya no hayn operaciones pendientes
				xi = 1; //se puede reiniciar la pantalla.
			}
			setVal(aux); //mostramos en pantalla resultado	
		},

        setVal = function(val) {
            pantalla.innerHTML = val;//actualizar pantalla
        },
        
        raiz = function(val){
        	x = Math.sqrt(val) //resolver raíz cuadrada.
			op = "no"; //quitar operaciones pendientes.
			xi = 1; //se puede reiniciar la pantalla
			setVal(x);//actualizar pantalla
        },
        
        sign = function(val){
        	nx = Number(val); //convertir en número
			nx = -nx; //cambiar de signo
			x = String(nx); //volver a convertir a cadena
			setVal(x);//actualizar pantalla
        },

        limpiarNumeros = function() {            
			x = "0"; //reiniciar número en pantalla
			coma = 0; //reiniciar estado coma decimal 
			ni = 0 //indicador de número oculto a 0;
			op = "no" //borrar operación en curso.
            setVal('0');//actualizar pantalla
        },

        operadorClick = function(operador) {
           	if (operador == "raiz"){
           		raiz(x);
           	}else if(operador == "sign"){
           		sign(x);
           	}else if(operador == "igual"){
           		igualar()
           	}else{
           		igualar(); //si hay operaciones pendientes se realizan primero
				ni = x; //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
				op = operador; //guardamos tipo de operación.
				xi = 1; //inicializar pantalla.           	
           	}
        },

        numeroClick = function(xx) {       
           aux = "";
           if (x == "0" || xi == 1) {	// inicializar un número, 
				//pantalla.innerHTML=xx; //mostrar en pantalla
				setVal('');//actualizar pantalla
				aux = xx;
				x = xx; //guardar número
				if (xx == ".") { //si escribimos una coma al principio del número
				   //pantalla.innerHTML = "0."; //escribimos 0.
				   aux = "0.";
				   x = xx; //guardar número
				   coma = 1; //cambiar estado de la coma
				}
			}
			else { //continuar escribiendo un número
				   if (xx =="." && coma==0) { //si escribimos una coma decimal pòr primera vez
					   //pantalla.innerHTML+=xx;
					   x += xx;
					   aux = xx;
					   coma = 1; //cambiar el estado de la coma  
				   }
				   //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
				   else if (xx == "." && coma == 1) {} 
				   //Resto de casos: escribir un número del 0 al 9: 	 
				   else {
					   //pantalla.innerHTML+=xx;
					   aux = xx;
					   x += xx
				   }
			}
			xi = 0 //el número está iniciado y podemos ampliarlo.
            setVal(pantalla.innerHTML + aux);//actualizar pantalla
        };
        
    return {
        init: init,
        numeroClick: numeroClick,
        operadorClick: operadorClick,
        limpiarNumeros: limpiarNumeros
    };
}();

function resizeButton(e) {
	var currWidth = e.clientWidth;
	var currHeight = e.clientHeight;
	e.style.width = (currWidth - 3) + "px";
	e.style.height = (currHeight - 3) + "px";

}


function normal(e) {
	var currWidth = e.clientWidth;
	var currHeight = e.clientHeight;
	e.style.width = (currWidth + 3) + "px";
	e.style.height = (currHeight + 3) + "px";
}




