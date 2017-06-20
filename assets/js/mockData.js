let Constants = {
    types: [
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
    ],

    wizards: [
        {
            id: 1,
            name: "Demo Wizard 1",
            starts_with: null
        },
        {
            id: 2,
            name: "Demo Wizard 2",
            starts_with: null
        },
        {
            id: 3,
            name: "Demo for Admin UI including analysis",
            starts_with: 1
        }
    ],

    subjects: [
        {
            id: 1,
            wizard_id: "3",
            question: "How much do you want for it?",
            type_id: 2,
            type_name: "Number Field",
            answers: "[{\"caption\":\"\",\"value\":\"\",\"weight\":\"0\",\"next\":\"2\"}]"
        },{
            id: 2,
            wizard_id: "3",
            question: "How much do you think it's worth?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: null
            }])
        },{
            id: 3,
            wizard_id: "3",
            question: "Why?",
            type_id: 2,
            type_name: "Text Field",
            answers: "[{\"caption\":\"\",\"value\":\"\",\"weight\":\"0\",\"next\":\"4\"}]"
        },{
            id: 4,
            wizard_id: "3",
            question: "How did you come up with the price?",
            type_id: 3,
            type_name: "Drop Down",
            answers: JSON.stringify([
                {
                    caption: "Comparable Sales",
                    value: "Comparable Sales",
                    weight: 25,
                    next: 5
                },
                {
                    caption: "Zestimate",
                    value: "Zestimate",
                    weight: 25,
                    next: 5
                },
                {
                    caption: "Realtor",
                    value: "Realtor",
                    weight: 25,
                    next: 5
                },
                {
                    caption: "Guess",
                    value: "Guess",
                    weight: 25,
                    next: 5
                }
            ])
        },
        {
            id: 5,
            wizard_id: "3",
            question: "How much will it rent for? (number)",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 6
            }])
        },
        {
            id: 6,
            wizard_id: "3",
            question: "Is it vacant?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([
                {
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 7
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 7
                }
            ])
        },
        {
            id: 7,
            wizard_id: "3",
            question: "Does it need repairs?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([
                {
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 8
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 8
                }
            ])
        },
        {
            id: 8,
            wizard_id: "3",
            question: "Approximate cost to repair?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 9
            }])
        },
        {
            id: 9,
            wizard_id: "3",
            question: "How long have you owned it?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "Years",
                value: 1,
                weight: 100,
                next: 10
            }])
        },
        {
            id: 10,
            wizard_id: "3",
            question: "First mortgage balance?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 11
            }])
        },
        {
            id: 11,
            wizard_id: "3",
            question: "Payment amount? PITI - Principle, Interest, Taxes and Insurance",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 12
            }])
        },
        
        {
            id: 12,
            wizard_id: "3",
            question: "Years to payoff?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 13
            }])
        },
        {
            id: 13,
            wizard_id: "3",
            question: "Interest rate fixed or adjustable?",
            type_id: 3,
            type_name: "Drop Down",
            answers: JSON.stringify([{
                    caption: "Fixed",
                    value: "Fixed",
                    weight: 50,
                    next: 14
                },
                {
                    caption: "Adjustable",
                    value: "Adjustable",
                    weight: 50,
                    next: 14
                }
            ])
        },
        {
            id: 14,
            wizard_id: "3",
            question: "Interest rate?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 15
            }])
        },
        {
            id: 15,
            wizard_id: "3",
            question: "Second mortgage balance?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 16
            }])
        },
        {
            id: 16,
            wizard_id: "3",
            question: "Payment amount?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 17
            }])
        },
        {
            id: 17,
            wizard_id: "3",
            question: "Years to payoff?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 18
            }])
        },
        {
            id: 18,
            wizard_id: "3",
            question: "Interest rate fixed or adjustable?",
            type_id: 3,
            type_name: "Drop Down",
            answers: JSON.stringify([{
                    caption: "Fixed",
                    value: "Fixed",
                    weight: 50,
                    next: 19
                },
                {
                    caption: "Adjustable",
                    value: "Adjustable",
                    weight: 50,
                    next: 19
                }
            ])
        },
        {
            id: 19,
            wizard_id: "3",
            question: "Interest rate?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 20
            }])
        },
        {
            id: 20,
            wizard_id: "3",
            question: "Additional mortgage owed?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 21
            }])
        },
        {
            id: 21,
            wizard_id: "3",
            question: "Is there a monthly HOA fee? (Home Owners Association)",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([{
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 22
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 23
                }
            ])
        },
        {
            id: 22,
            wizard_id: "3",
            question: "If yes, how much is the HOA fee?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 23
            }])
        },
        {
            id: 23,
            wizard_id: "3",
            question: "Are the payments current?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([{
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 25
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: 24
                }
            ])
        },
        {
            id: 24,
            wizard_id: "3",
            question: "If not, balance of arrears?",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: null
            }])
        },
        {
            id: 25,
            wizard_id: "3",
            question: "Why are you selling?",
            type_id: 1,
            type_name: "Text Field",
            answers: JSON.stringify([{
                caption: "",
                value: "",
                weight: 100,
                next: 26
            }])
        },
        {
            id: 26,
            wizard_id: "3",
            question: "Do you have to sell or would you consider keeping it and why?",
            type_id: 1,
            type_name: "Text Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 27
            }])
        },
        {
            id: 27,
            wizard_id: "3",
            question: "Are you moving out of the area?",
            type_id: 5,
            type_name: "Yes or No",
            answers: JSON.stringify([{
                    caption: "Yes",
                    value: "yes",
                    weight: 100,
                    next: 28
                },
                {
                    caption: "No",
                    value: "no",
                    weight: 0,
                    next: null
                }
            ])
        },

        
        {
            id: 28,
            wizard_id: "3",
            question: "If yes, where?",
            type_id: 1,
            type_name: "Text Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: 29
            }])
        },
        {
            id: 29,
            wizard_id: "3",
            question: "How soon do you have to move? (Days)",
            type_id: 2,
            type_name: "Number Field",
            answers: JSON.stringify([{
                caption: "",
                value: 1,
                weight: 100,
                next: null
            }])
        },
    ],

    calculations: [
        {
            id: 1,
            wizard_id: 3,
            name: "V1: calculates difference between asking price and value",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 1,
                    coeff: 1
                },
                {
                    id: 2,
                    coeff: -1
                }
            ])
        },
        {
            id: 2,
            wizard_id: 3,
            name: "V2: Monthly property management fee.",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 0.1
                }
            ])
        },
        {
            id: 3,
            wizard_id: 3,
            name: "V3: Total owed:",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 10,
                    coeff: 1
                },
                {
                    id: 15,
                    coeff: 1
                }
            ])
        },
        {
            id: 4,
            wizard_id: 3,
            name: "V4: Total payment",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 11,
                    coeff: 1
                },
                {
                    id: 16,
                    coeff: 1
                }
            ])
        },
        {
            id: 5,
            wizard_id: 3,
            name: "V5: Cash Flow",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 0.9
                },
                {
                    id: 11,
                    coeff: -1
                },
                {
                    id: 16,
                    coeff: -1
                }
            ])
        },
        {
            id: 6,
            wizard_id: 3,
            name: "V6: Annual Cashflow Potential",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 10.8
                },
                {
                    id: 11,
                    coeff: -12
                },
                {
                    id: 16,
                    coeff: -12
                }
            ])
        },
        {
            id: 7,
            wizard_id: 3,
            name: "V7: Annual gross income potential",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 12
                }
            ])
        },
        {
            id: 8,
            wizard_id: 3,
            name: "V8: Annual net income potential",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 10.8
                },
                {
                    id: 11,
                    coeff: -12
                },
                {
                    id: 16,
                    coeff: -12
                }
            ])
        },
        {
            id: 9,
            wizard_id: 3,
            name: "V9: Annual income after estimated expenses",
            operator: "+",
            factors: JSON.stringify([
                {
                    id: 5,
                    coeff: 9.8
                },
                {
                    id: 11,
                    coeff: -12
                },
                {
                    id: 16,
                    coeff: -12
                }
            ])
        },
    ]
}