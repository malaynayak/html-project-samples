class App {
    constructor() {
        this.bannerButton = document.querySelector('.banner-btn');
        this.closeButton = document.querySelector('.x-btn');
        this.banner = document.querySelector('.banner');
        this.formContainer = document.querySelector('.form-container');
        this.container = document.querySelector('.container');
    }
    
    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.bannerButton.addEventListener('click', () => { 
            this.banner.style.display = 'none';
            this.formContainer.style.cssText = 'opacity: 1;visibility: visible';
            this.container.style.background = '#cc683c'
        });

        this.closeButton.addEventListener('click', () => { 
            this.banner.style.display= 'flex';
            this.formContainer.style.cssText = 'opacity: 0;visibility: hidden';
            this.container.style.cssText = "background: linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .7)), url('images/bg1.jpeg') center no-repeat;background-size: cover";
        });
    }
}

const app =  new App();
app.init();