(function(){
    'use strict';
    
    let regalo=document.getElementById('regalo');   

    document.addEventListener('DOMContentLoaded', function(){
        
        //Maps
        let map = L.map('mapa').setView([19.432762, -99.140625], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([19.432762, -99.140625]).addTo(map)
        .bindPopup('MEXWEBCAMP boletos ya disponibles!')
        .openPopup()
        .bindTooltip('Un Tooltip')
        .openTooltip();

        //Campos Datos Usuarios
         let nombre = document.getElementById('nombre');
         let apellido = document.getElementById('apellido');    
         let email = document.getElementById('email');        
        //Campus pases  
        let pase_dia = document.getElementById('pase_dia');
        let pase_dosdias = document.getElementById('pase_dosdias');
        let pase_completo = document.getElementById('pase_completo');
        //Botones y Divs
        let calcular = document.getElementById('calcular');
        let errorDiv = document.getElementById('error');
        let botonRegistro = document.getElementById('btnRegistro');
        let lista_productos = document.getElementById('lista-productos');
        let suma = document.getElementById('suma-total');

        //Extras
        let camisas =document.getElementById('camisa_evento');
        let etiquetas = document.getElementById('etiquetas');

        calcular.addEventListener('click', calcularMontos);

        pase_dia.addEventListener('change', mostrarDias);
        pase_dosdias.addEventListener('change', mostrarDias); 
        pase_completo.addEventListener('change', mostrarDias);
        //nombre
        nombre.addEventListener('blur',validarCampos);
        //apellido
        apellido.addEventListener('blur',validarCampos);
        //correo
        email.addEventListener('blur',validarCampos);
        email.addEventListener('blur',validarMail);

        function validarCampos(){
            if(this.value == ''){
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "Este campo es obligatorio";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
    
            }else
            errorDiv.style.display = 'none';
        }

        function calcularMontos(event){
            event.preventDefault();
            if(regalo.value === ''){
                alert('Debes elejir un regalo');
                regalo.focus();
            }else{
                let boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                    cantCamisas = parseInt(camisas.value, 10) || 0,
                    cantEtiquetas =  parseInt(etiquetas.value, 10) || 0;

                let totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) 
                + ((cantCamisas * 10)* .93) + (cantEtiquetas * 2); 
                
                let listadoProductos = [];

                if(boletosDia >= 1){
                listadoProductos.push(`${boletosDia} Pase por dia`);
                }
                if(boletos2Dias >= 1){
                listadoProductos.push(`${boletos2Dias} Pase por dos dias`);
                }
                if(boletoCompleto >= 1){
                listadoProductos.push(`${boletoCompleto} Pase completos`);    
                }
                if(cantCamisas >= 1){
                    listadoProductos.push(`${cantCamisas} Camisas`);    
                }
                if(cantEtiquetas >= 1){
                    listadoProductos.push(`${cantEtiquetas} Etiquetas`);    
                }
                
                lista_productos.style.display='block';
                lista_productos.innerHTML = '';
                for(let i =0; i< listadoProductos.length;i++){
                    lista_productos.innerHTML += listadoProductos[i] + '</br>';
                }
            
                suma.innerHTML =`$ ${totalPagar.toFixed(2)}`;
             
            }
        }

        function mostrarDias(){
            console.log(pase_dia.value);
            let boletosDia = parseInt(pase_dia.value, 10) || 0,
                boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
                boletoCompleto = parseInt(pase_completo.value, 10) || 0;
            
            let diasElegidos = [];
            
            if( boletosDia > 0 ){
                diasElegidos.push('viernes');
                console.log(diasElegidos);
            }
            if( boletos2Dias > 0 ){
                diasElegidos.push('viernes','sabado');
                console.log(diasElegidos);
            }
            if(boletoCompleto > 0){
                diasElegidos.push('viernes','sabado','domingo');
                console.log(diasElegidos);
            }
            for(let i=0; i < diasElegidos.length; i++){
                document.getElementById(diasElegidos[i]).style.display = 'block';
            }
            if (
                pase_dia.value == 0 &&
                pase_dosdias.value == 0 &&
                pase_completo.value == 0
              ) {
                document.getElementById("viernes").style.display = "none";
              }
              if (pase_dosdias.value == 0 && pase_completo.value == 0) {
                document.getElementById("sabado").style.display = "none";
              }
              if (pase_completo.value == 0) {
                document.getElementById("domingo").style.display = "none";
              }
        } 
        
        function validarMail() {
            if(this.value.indexOf("@") > -1){
                errorDiv.style.display = 'none';
                this.style.border = "1px solid #cccccc";
            } else{
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "Debe de ser un correo valido";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }
        }

    });//Dom Content loaded
})();