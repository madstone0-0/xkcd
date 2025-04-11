/**
 * STEPS:
 * 1. create a requestController class and define the needed variables for the API call
 * 2. Create a method that will get the current (last added) comic and set the currentComicsNumber and
 *    maxComicsNumber accordingly, call that method on load
 * 3. Register an event for the random comic number and add all the chain of event to display it
 * 4. Add Previous/Next, First/Last and get Comic by ID functionality to the app
 * 5. Adjust UI states accordingly
 */
// const CORS_HEADER = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = `https://xkcd.now.sh/`;
// const buildComicUrl = (id) => (id !== undefined ? `${BASE_URL}${id}/info.0.json` : `${BASE_URL}/info.0.json`);
const buildComicUrl = (id) => (id !== undefined ? `${BASE_URL}${id}` : `${BASE_URL}`);

class DomInterface {
    constructor() {
        this.form = document.querySelector("#comic-form");
        this.searchField = document.querySelector("#search-input");

        this.title = document.querySelector("#comic-title");
        this.image = document.querySelector("#comic-image");

        this.error = document.querySelector("#error");
        this.formError = document.querySelector("#form-error");
        this.loader = document.querySelector("#loader");

        this.controls = {
            previous: document.querySelector("#request-prev"),
            next: document.querySelector("#request-next"),
            random: document.querySelector("#request-random"),
            first: document.querySelector("#request-first"),
            last: document.querySelector("#request-last"),
        };
    }

    clearResults() {
        this.title.innerHTML = "Loading...";
        this.image.src = "";
        this.image.alt = "";
    }

    hideLoader() {
        this.loader.classList.remove("d-flex");
        this.loader.classList.add("d-none");
    }

    showLoader() {
        this.loader.classList.remove("d-none");
        this.loader.classList.add("d-flex");
    }

    showError() {
        this.hideLoader();
        this.error.innerHTML = "There has been an error, please try again";
    }

    showFormError(message) {
        this.hideLoader();
        this.formError.innerHTML = message;
    }

    hideErrors() {
        this.error.innerHTML = "";
        this.formError.innerHTML = "";
    }

    showComics(data) {
        const { title, img } = data;

        this.title.innerHTML = title;
        this.image.src = img;
        if (data.alt) this.image.alt = data.alt;

        this.hideLoader();
    }
}

class RequestController {
    constructor() {
        this.dom = new DomInterface();
        this.fetch = async (input, init) => {
            return fetch(input, { ...init, mode: "cors" });
        };
        this.currentComicsNumber = 0;
        this.maxComicsNumber = 0;

        this.getCurrentComicsNumber();
    }

    async getComic(id) {
        const url = buildComicUrl(id);
        console.log({ url });
        this.dom.showLoader();

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to get comic${id ? " " + id : ""}`);
        }

        const json = await res.json();
        this.dom.hideLoader();
        return json;
    }

    async getCurrentComicsNumber() {
        const currComic = await this.getComic();
        this.currentComicsNumber = currComic.num;
        this.maxComicsNumber = this.currentComicsNumber;
    }

    setComic(comic) {
        this.dom.image = comic.img;
        this.dom.title = comic.title;
        this.dom.hideLoader();
    }

    async setRandomComic() {
        try {
            const randomId = Math.floor(Math.random() * this.maxComicsNumber) + 1;
            const comic = await this.getComic(randomId);
            this.setComic(comic);
        } catch (err) {
            console.log({ err });
            this.dom.showError();
        }
    }

    async setCurrComic() {
        try {
            const comic = await this.getComic(this.currentComicsNumber);
            this.setComic(comic);
        } catch (err) {
            console.log({ err });
            this.dom.showError();
        }
    }

    registerEvents() {}
}

(async () => {
    const controller = new RequestController();
    controller.setCurrComic();
})();
