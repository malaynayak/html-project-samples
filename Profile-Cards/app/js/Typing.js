class Typing {
    constructor() {
        this.heading = "Please Meet Our Team";
        this.i = 0;
        this.headingElem = document.querySelector('.heading');
        this.initTyping = this.initTyping.bind(this);
    }

    initTyping(){
        if (this.i < this.heading.length) {
            this.headingElem.innerHTML += this.heading.charAt(this.i);
            this.i = this.i + 1;
            setTimeout(this.initTyping, 150);
        }
    }
}

export default Typing;