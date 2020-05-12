import { Directive, ElementRef, Renderer2, HostListener} from '@angular/core';
//Renderer2,
//which allows us to automatically adapt itself to
//the appropriate platform on which the rendering of this view is being done
//The HostListener will listen to mouse movements from the screen 
@Directive({
  selector: '[appHighlight]' //So, wherever you want to use this directive,  you will use an attribute called  appHighlight within that particular element in your template
})
export class HighlightDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer2) { }

    //when the mouseenter event occurs,then we'll call the onmouseenter methodand in the onmouseenter method
    @HostListener('mouseenter') onmouseenter(){
     //the renderer provides a method called addClass.So, this method will be used to add a class to the grid item in my grid list. 
      this.renderer.addClass(this.el.nativeElement,'highlight');
    }

    @HostListener('mouseleave') onmouseleave(){
      this.renderer.removeClass(this.el.nativeElement,'highlight')
    }
}
