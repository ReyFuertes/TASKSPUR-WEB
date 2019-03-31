import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { slideInRightSide, slideInRightSideFast, slideInLeftSide, slideInDown, slideInUp } from '../../../../shared/animations/landing.animation';
import * as $ from 'jquery';

@Component({
  selector: 'app-why-taskspur',
  templateUrl: './why-taskspur.component.html',
  styleUrls: ['./why-taskspur.component.scss'],
  animations: [slideInRightSide, slideInRightSideFast, slideInLeftSide,  slideInDown, slideInUp] 
})

export class WhyTaskspurComponent implements OnInit {

  public wtDescription = `We don’t want you to forget a single reminder or get stressed over unaccomplished tasks; 
  miss your project deadlines or even fail to maintain a healthy work/life balance.<br/><br/>  
  
  No matter how busy you are, you should make time for yourself, your loved ones, and your goals. 
  Sounds impossible? We are here to help.<br/><br/> 

  That’s why we created <span class="wt-desc-highlight">TaskSpur</span>.<br/><br/> 

  TaskSpur is a revolutionary intelligent assistant designed to make your life easier, 
  manageable, and stress-free. Our tool promotes a holistic lifestyle by increasing 
  your productivity, constant development, and improved stress management. 
  Have you heard about the <span class="wt-desc-highlight">Agile Mindset, 
  Artificial Intelligence and Machine Learning?</span><br/><br/>
  
  Don't worry. We’ve got you! 
  <span class="wt-desc-highlight">TaskSpur</span> has been built using the power of Artificial Intelligence and 
  Machine Learning to train you to have the Agile Mindset by focusing on what 
  is most important in your life with minimum effort. We are a smart solution for your busy, hectic life.<br/><br/>

  It's time to discover how people are changing their lives using <span class="wt-desc-highlight">TaskSpur</span> using its unique, 
  fun and easy to use interface.<br/><br/>
  
  Our values are family first, easy life management, 
  collaboration and quick change due to unpredictable life events.
  <span class="wt-desc-highlight">TaskSpur</span> is backed by over 5 years of research and development, and built by experts in their fields.<br/><br/>

  Make every moment count – with <span class="wt-desc-highlight">TaskSpur</span>.`;

  public firstCardContent = `Track all your life’s most important events and say hello to your all-in-one task manager. <strong>TaskSpur</strong> allows you to track your ongoing activities, so you’ll never miss anything. 
  Know when and what to prioritise with TaskSpur boards. <br/><br/>

  Compared to other tools, <strong>TaskSpur</strong> lets you customise boards and collaborate easily with other people in your life via real time tracking, 
  chats and notifications to get the work done with minimal effort.`;

  public secondCardContent = `<strong>TaskSpur</strong> is a stress-management tool that allows you to focus on yourself and the goals you want to accomplish. 
  At <strong>TaskSpur</strong>, our mission is to help you develop an agile mindset – right here, right now.<br/><br/>

  <strong>TaskSpur</strong> is currently the only tool that trains you about the <strong>Agile</strong> mindset without any prior training or knowledge required., 
  chats and notifications to get the work done with minimal effort.`;

  public thirdCardContent = `<strong>TaskSpur</strong> is a wellness platform ideal for people from different walks of life. 
  Access educational courses and training materials from life coaches and wellness professionals. 
  Be one of our many users who continue to live a balanced and stress-free lifestyle.<br/><br/>

  <strong>TaskSpur</strong> does not only reduce your stress and save your time to focus on your family and hobbies, 
  it also helps you in your personal development. Now that’s what we call wellness at your fingertips!`;

  public fourthCardContent = `Never miss a bill payment again. Be on track with your expenses and finances. 
  Thanks to <strong>TaskSpur</strong>, you can easily manage and protect your financial assets straight from your phone. 
  <strong>TaskSpur</strong> brings you on a financial literacy journey in an easy, seamless manner even though you may hate dealing with anything finance related. 
  Financial expert or not, TaskSpur gets rid of your worries related to finances by keeping you updated on the current financial trends in your area.`;

  public fifthCardContent = `Communicate with your team effectively, manage projects easily, track your team’s progress and share ideas in an instant! 
  All these and more with the help of a power agile tool TaskSpur. 
  You and your team can use TaskSpur in multiple ways. With its advanced productivity solution,  
  TaskSpur helps you and your team focus on the most important things without losing the spirit of teamwork.`;

  public showTitle: string = 'hidden';
  public wmudVisible: string = 'hidden';
  public showFirstCard: string = 'hidden';
  public showSecondCard: string = 'hidden';
  public showThirdCard: string = 'hidden';
  public showFourthCard:string = 'hidden';
  public showFifthCard: string = 'hidden';
  public showGylo: string = 'hidden';

  constructor(private el: ElementRef) { }

  ngOnInit() {
   
      $('.carousel .carousel-item').each(function(){
        var next = $(this).next();
        if(window.outerWidth <= 767) {
          
            if (!next.length) {
            next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            if (next.next().length>0) {
            next.next().children(':first-child').clone().appendTo($(this));
            }
            else {
              $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
        
       } else {
         
            if (!next.length) {
            next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            if (next.next().length>0) {
            next.next().children(':first-child').clone().appendTo($(this));
            }
            else {
              $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
            
            if (next.next().next().length>0) {
                next.next().next().children(':first-child').clone().appendTo($(this));
            } else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }

          }
      });


    
   
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
  
    const docHeightTitle = document.documentElement.clientHeight * 0.7;
    const viewPoint = 550;
    const scrollPosition = window.pageYOffset

    if (scrollPosition >= (this.el.nativeElement.querySelector('.a-wt-text-header').offsetTop) - docHeightTitle)  {
      this.showTitle = 'shown';
      let routeType = '.router-link-item';
      if(window.outerWidth <= 767) {
         routeType = '.router-link-item-sb';
      }
      let links = Array.from(document.querySelectorAll(routeType));
      let routeCounter = 0;
      links.forEach(link => {
        link.classList.remove('active');
        if(links[routeCounter].className.indexOf('r-why-taskspur') != -1) {
          links[routeCounter].className = links[routeCounter].className + ' active';
        }
        routeCounter = routeCounter + 1;
      });
    } 

    if (scrollPosition >= (this.el.nativeElement.querySelector('.a-wumd-con').offsetTop / 2)) {
      this.wmudVisible = 'shown';
    } 

    if ((this.el.nativeElement.querySelector('.a-first-card').getBoundingClientRect().top) <= viewPoint) {
      this.showFirstCard = 'shown';
    }

    if ((this.el.nativeElement.querySelector('.a-second-card').getBoundingClientRect().top) <= viewPoint) {
      this.showSecondCard = 'shown';
    }

    if ((this.el.nativeElement.querySelector('.a-third-card').getBoundingClientRect().top) <= viewPoint) {
      this.showThirdCard = 'shown';
    }

    if ((this.el.nativeElement.querySelector('.a-fourth-card').getBoundingClientRect().top) <= viewPoint) {
      this.showFourthCard = 'shown';
    }

    if ((this.el.nativeElement.querySelector('.a-fifth-card').getBoundingClientRect().top) <= viewPoint) {
      this.showFifthCard = 'shown';
    }

    if ((this.el.nativeElement.querySelector('.gylo-title').getBoundingClientRect().top) <= viewPoint) {
      this.showGylo = 'shown';
    }

  }

}
