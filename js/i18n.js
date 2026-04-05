(() => {
    const STORAGE_KEY = "wedding-language";
    const DEFAULT_LANGUAGE = "ru";

    const translations = {
        ru: {
            meta: {
                homeTitle: "Z & E | Приглашение",
                invitationTitle: "Свадебное приглашение"
            },
            common: {
                withLove: "С ЛЮБОВЬЮ",
                clickHere: "НАЖМИТЕ ЗДЕСЬ"
            },
            home: {
                subtitle: "мы женимся",
                hint: "нажмите на конверт, чтобы открыть",
                envelopeAlt: "Конверт"
            },
            invitation: {
                hero: {
                    alt: "Свадебное приглашение",
                    names: "Zaladdin & Emiliya",
                    date: "15 августа 2026",
                    location: "Баку, Азербайджан"
                },
                intro: {
                    lead: "Когда мы вступаем в новую главу нашей жизни, нам было бы очень приятно видеть вас рядом в этот особенный день. На этой странице вы найдёте всё важное: расписание, информацию о месте проведения и ещё несколько приятных деталей.",
                    closing: "За любовь, радость и начало нашей вечности!"
                },
                rsvp: {
                    title: "The Details",
                    envelopeAlt: "Конверт с деталями"
                },
                story: {
                    title: "Наша<br>история"
                },
                footer: {
                    contact: "По всем вопросам свяжитесь напрямую с Zaladdin или Emiliya.",
                    back: "• НАЗАД К КОНВЕРТУ"
                },
                modals: {
                    rsvp: {
                        title: "The Details",
                        body: "Здесь вы найдёте всю важную информацию о нашем свадебном дне: расписание, место проведения и многое другое."
                    },
                    details: {
                        title: "Детали",
                        body: "Здесь вы найдёте всю важную информацию о нашем свадебном дне: расписание, место проведения и многое другое."
                    },
                    story: {
                        title: "Наша история",
                        body: "Наша история всё ещё пишется, и мы очень счастливы разделить эту главу вместе с вами."
                    }
                }
            }
        },
        az: {
            meta: {
                homeTitle: "Z & E | Dəvət",
                invitationTitle: "Toy dəvəti"
            },
            common: {
                withLove: "SEVGİ İLƏ",
                clickHere: "BURAYA TOXUNUN"
            },
            home: {
                subtitle: "biz evlənirik",
                hint: "açmaq üçün zərfə toxunun",
                envelopeAlt: "Zərf"
            },
            invitation: {
                hero: {
                    alt: "Toy dəvəti",
                    names: "Zaladdin & Emiliya",
                    date: "15 avqust 2026",
                    location: "Bakı, Azərbaycan"
                },
                intro: {
                    lead: "Həyatımızın bu yeni fəslinə qədəm qoyarkən, bu özəl günümüzdə yanımızda olmağınız bizim üçün böyük sevinc olar. Bu səhifədə sizə lazım olan hər şeyi tapacaqsınız: proqram, məkan haqqında məlumat və bir neçə xoş detal.",
                    closing: "Sevgi, sevinc və əbədi yolumuzun başlanğıcına!"
                },
                rsvp: {
                    title: "The Details",
                    envelopeAlt: "Təfərrüatlar zərfi"
                },
                story: {
                    title: "Bizim<br>hekayəmiz"
                },
                footer: {
                    contact: "Hər hansı sualınız olarsa, birbaşa Zaladdin və ya Emiliya ilə əlaqə saxlayın.",
                    back: "• ZƏRFƏ QAYIT"
                },
                modals: {
                    rsvp: {
                        title: "The Details",
                        body: "Burada toy günümüzlə bağlı bütün vacib məlumatları tapa bilərsiniz: proqram, məkan və digər vacib detallar."
                    },
                    details: {
                        title: "Təfərrüatlar",
                        body: "Burada toy günümüzlə bağlı bütün vacib məlumatları tapa bilərsiniz: proqram, məkan və digər vacib detallar."
                    },
                    story: {
                        title: "Bizim hekayəmiz",
                        body: "Bizim hekayəmiz hələ də yazılır və bu fəslimizi sizinlə bölüşməkdən çox xoşbəxtik."
                    }
                }
            }
        }
    };

    function getValue(source, path) {
        return path.split(".").reduce((accumulator, part) => {
            if (accumulator && Object.prototype.hasOwnProperty.call(accumulator, part)) {
                return accumulator[part];
            }

            return undefined;
        }, source);
    }

    function updateActiveButton(language) {
        document.querySelectorAll(".language-switcher__button").forEach((button) => {
            button.classList.toggle("is-active", button.dataset.lang === language);
        });
    }

    function applyTranslations(language) {
        const dictionary = translations[language];
        const page = document.body.dataset.page;

        if (!dictionary || !page) {
            return;
        }

        document.documentElement.lang = language;

        const titleKey = page === "home" ? "meta.homeTitle" : "meta.invitationTitle";
        const translatedTitle = getValue(dictionary, titleKey);

        if (translatedTitle) {
            document.title = translatedTitle;
        }

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const translatedText = getValue(dictionary, element.dataset.i18n);

            if (typeof translatedText === "string") {
                element.textContent = translatedText;
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach((element) => {
            const translatedHtml = getValue(dictionary, element.dataset.i18nHtml);

            if (typeof translatedHtml === "string") {
                element.innerHTML = translatedHtml;
            }
        });

        document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
            const translatedAlt = getValue(dictionary, element.dataset.i18nAlt);

            if (typeof translatedAlt === "string") {
                element.alt = translatedAlt;
            }
        });

        updateActiveButton(language);
    }

    function setLanguage(language) {
        if (!translations[language]) {
            return;
        }

        localStorage.setItem(STORAGE_KEY, language);
        applyTranslations(language);
    }

    document.querySelectorAll(".language-switcher__button").forEach((button) => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.lang);
        });
    });

    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    const initialLanguage = translations[savedLanguage] ? savedLanguage : DEFAULT_LANGUAGE;

    applyTranslations(initialLanguage);
})();
