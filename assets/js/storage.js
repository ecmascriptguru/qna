let DataStorage = (() => {
    let AnswerTypes = (() => {
        const _types = [
            {
                id: 1,
                type_name: "Text Field",
                value: [{
                    caption: "",
                    value: "",
                    weight: 100,
                    next: null
                }]
            },
            {
                id: 2,
                type_name: "Number Field",
                value: [{
                    caption: "",
                    value: 1,
                    min: 1,
                    max: 100,
                    weight: 100,
                    next: null
                }]
            },
            {
                id: 3,
                type_name: "Drop Down",
                value: [{
                        caption: "One",
                        value: "one",
                        weight: 50,
                        next: null
                    },
                    {
                        caption: "Two",
                        value: "two",
                        weight: 50,
                        next: null
                    }
                ]
            },
            {
                id: 4,
                type_name: "Multiple Choice",
                value: [{
                        caption: "One",
                        value: "one",
                        weight: 50,
                        next: null
                    },
                    {
                        caption: "Two",
                        value: "two",
                        weight: 50,
                        next: null
                    }
                ]
            },
            {
                id: 5,
                type_name: "Yes or No",
                value: [{
                        caption: "Yes",
                        value: "yes",
                        weight: 100,
                        next: null
                    },
                    {
                        caption: "No",
                        value: "no",
                        weight: 0,
                        next: null
                    }
                ]
            }
        ];

        const get = (callback) => {
            if (typeof callback === "function") {
                callback(_types);
            }
        }

        const find = (id, callback) => {
            for( let i = 0; i < _types.length; i ++) {
                if (_types[i].id == parseInt(id)) {
                    if (typeof callback === "function") {
                        callback(_types[i]);
                        return false;
                    }
                }
            }
            if (typeof callback === "function") {
                callback(null);
            }
        }

        return {
            get: get,
            find: find
        };
    })();

    let Wizards = (() => {
        let _wizards = [];
        const get = (callback) => {
            if (typeof callback === "function") {
                callback(_wizards);
            }
        }

        const addWizard = (wizard, callback) => {
            _wizards.push(wizard);

            if (typeof callback === "function") {
                callback();
            }
        }

        return {
            get: get,
            insert: addWizard
        }
    })();

    return {
        Types: AnswerTypes,
        Wizards: Wizards
    }
})();