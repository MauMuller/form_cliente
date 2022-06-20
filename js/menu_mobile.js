{
    "use strict";

    const [
        container_links, 
        box_links,
        links,
        container_mobile,
        menu,
        spans_menu,
        figure_container,
        window_mobile_menu,
        container_mobile_elements,

    ] = [document.querySelector('ul.links_container'), document.querySelectorAll('ul.links_container li'), document.querySelectorAll('ul.links_container li a'), document.querySelector('div.container_mobile'), document.querySelector("div.menu-mobile"), document.querySelectorAll("div.menu-mobile span"), document.querySelector('figure.figure_container'), document.querySelector('section.window_mobile_menu'),document.querySelectorAll('div.container_mobile_elements')];
    let bool_menu=true; //CONDIÇÃO PARA ATIVAR OU DESATIVAR A ANIMAÇÃO

    const eventsMobile = (event) => {
        window.addEventListener(event, ()=>{

            if(window.innerWidth <= 1000){
                container_mobile.classList.remove("hidden_element");
                container_links.classList.add("hidden_element");

                figure_container.classList.remove('default_width');
                figure_container.classList.add('mobile_width');
            } else {
                container_mobile.classList.add("hidden_element");
                container_links.classList.remove("hidden_element")

                figure_container.classList.add('default_width');
                figure_container.classList.remove('mobile_width');
            }

        });
    };

    eventsMobile('load');
    eventsMobile('resize');

    menu.addEventListener('click',()=>{
        //OPERAÇÃO TERNÁRIA PARA EXECUTAR AS ANIMAÇÕES OU NÃO
        bool_menu ? enabled_animation() : disabled_animation();

        // CONTINUAR SEU CÓDIGO AQUI!


    });

    const enabled_animation = () => { //FUNÇÃO PARA ATIVAR AS ANIMAÇÕES
        let cont_span=0;
        window_mobile_menu.classList.remove('hidden_element');
        document.body.classList.add('trava_scroll');  
        container_mobile_elements[0].appendChild(menu);


        spans_menu.forEach((span,ind_span)=>{
            if(cont_span===ind_span){
                span.classList.remove(`span${ind_span}_disabled`);
                span.classList.add(`span${ind_span}_enabled`);
                cont_span++;
            }
        });
        bool_menu=false;
    };

    const disabled_animation = () => { //FUNÇÃO PARA DESATIVAR AS ANIMAÇÕES
        let cont_span=0;
        window_mobile_menu.classList.add('hidden_element');
        document.body.classList.remove('trava_scroll');
        container_mobile.appendChild(menu);

        spans_menu.forEach((span,ind_span)=>{
            if(cont_span===ind_span){
                span.classList.remove(`span${ind_span}_enabled`);
                span.classList.add(`span${ind_span}_disabled`);
                cont_span++;
            }
        });
        bool_menu=true;
    };
}