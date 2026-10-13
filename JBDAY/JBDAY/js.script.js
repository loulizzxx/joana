/* =========================================
   ELEMENTS
========================================= */

const loadingScreen =
    document.getElementById("loadingScreen");

const loadingVideo =
    document.getElementById("loadingVideo");

const loadingProgress =
    document.getElementById("loadingProgress");

const percentage =
    document.getElementById("percentage");


const giftScreen =
    document.getElementById("giftScreen");

const giftWrapper =
    document.getElementById("giftWrapper");

const giftBox =
    document.getElementById("giftBox");

const lettersContainer =
    document.getElementById("lettersContainer");


const letterOverlay =
    document.getElementById("letterOverlay");

const letterTitle =
    document.getElementById("letterTitle");

const letterText =
    document.getElementById("letterText");

const closeLetter =
    document.getElementById("closeLetter");

const scrolls =
    document.querySelectorAll(".letter-scroll");


/* =========================================
   LOADING
========================================= */

const loadingDuration = 8000;

let startTime = null;

let finished = false;


function updateLoading(timestamp) {

    if (startTime === null) {
        startTime = timestamp;
    }


    const elapsed =
        timestamp - startTime;


    let progress =
        (elapsed / loadingDuration) * 100;


    progress =
        Math.min(progress, 100);


    loadingProgress.style.width =
        progress + "%";


    percentage.textContent =
        Math.floor(progress) + "%";


    if (progress < 100) {

        requestAnimationFrame(
            updateLoading
        );

    } else {

        finishLoading();

    }
}


/* =========================================
   FINISH LOADING
========================================= */

function finishLoading() {

    if (finished) {
        return;
    }


    finished = true;


    loadingProgress.style.width =
        "100%";


    percentage.textContent =
        "100%";


    setTimeout(() => {

        loadingScreen.classList.add(
            "finished"
        );


        setTimeout(() => {

            giftScreen.classList.add(
                "visible"
            );

        }, 350);


    }, 400);
}


/* =========================================
   VIDEO
========================================= */

loadingVideo
    .play()
    .catch(() => {

        console.log(
            "Video autoplay was blocked."
        );

    });


/* =========================================
   START LOADING
========================================= */

requestAnimationFrame(
    updateLoading
);


/* =========================================
   GIFT BOX
========================================= */

giftBox.addEventListener(
    "click",
    () => {

        /* Don't reopen it */

        if (
            giftBox.classList.contains(
                "open"
            )
        ) {
            return;
        }


        /* Open lid */

        giftBox.classList.add(
            "open"
        );


        /* Light burst */

        setTimeout(() => {

            giftWrapper.classList.add(
                "light-up"
            );

        }, 450);


        /* Drop scrolls */

        setTimeout(() => {

            lettersContainer.classList.add(
                "show"
            );

        }, 1200);

    }
);


/* =========================================
   LETTER CONTENT
========================================= */

const letters = {

    meg: {

        title:
            "Dear Jojo,",

        text:
            "Happy birthday, Joanna! I hope you enjoy your special day and I'm grateful to have you as my bestfriend. Thank you for everything and all the memories we have, I love you so much and I wish you more birthdays to come. HAPPY BIRTHDAY!!"

    },


    noraine: {

        title:
            "Dear Jojo,",

        text:
            "Happy birthday, Jojo!! ♡"

    },


    sammy: {

        title:
            "Dear Jojo,",

        text:
            "Hi!! Happy bday Joaananninininniniaaa!! I wish you the happiest birthday, for your dreams to come true, and many more birthdays to come! I'm more than glad to have you as my besto friendo, and I look forward to spending more time with you! - Sammeh 💗"

    },


    louise: {

        title:
            "Dear Jojo,",

        text:
            "Happy birthday, Jojo!! I hope that this day will be the greatest day you'll have all year. I'm blessed to have a best friend as kind, smart, and funny as you. For all the doubts you have, Meg, Sam, Noraine, and I will always be here for you. I hope you continue to stay as kind and smart as you are as you reach your dreams. Love, Louise. ♡"

    }

};


/* =========================================
   CLICKABLE SCROLLS
========================================= */

scrolls.forEach(
    (scroll) => {

        scroll.addEventListener(
            "click",
            (event) => {

                /*
                    Prevent the click from
                    reaching anything behind
                    the scroll.
                */

                event.stopPropagation();


                const letterName =
                    scroll.dataset.letter;


                const letter =
                    letters[letterName];


                if (!letter) {
                    return;
                }


                /* Fill letter */

                letterTitle.textContent =
                    letter.title;


                letterText.textContent =
                    letter.text;


                /* Scroll disappears */

                scroll.classList.add(
                    "opening"
                );


                /* Open fancy letter */

                setTimeout(() => {

                    letterOverlay.classList.add(
                        "open"
                    );

                }, 250);

            }
        );

    }
);


/* =========================================
   CLOSE LETTER
========================================= */

function closeFancyLetter() {

    letterOverlay.classList.remove(
        "open"
    );


    setTimeout(() => {

        scrolls.forEach(
            (scroll) => {

                scroll.classList.remove(
                    "opening"
                );

            }
        );

    }, 400);
}


closeLetter.addEventListener(
    "click",
    closeFancyLetter
);


/* =========================================
   CLICK OUTSIDE LETTER
========================================= */

letterOverlay.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            letterOverlay
        ) {

            closeFancyLetter();

        }

    }
);