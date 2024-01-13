chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    document.getElementById("colorForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let variables = {};
        for (const pair of formData.entries()) {
            if (pair[1] !== "") {
                variables[pair[0]] = pair[1];
            }
        }
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: changeColors,
            args: [variables],
        });
    });

    document.querySelectorAll('input[type="color"]').forEach(colorPicker => {
        colorPicker.addEventListener("input", function (e) {
            fillInputTextFromPicker(e.target);
        });
    });

    document.querySelectorAll('input[type="text"]').forEach(textInput => {
        textInput.addEventListener("change", function (e) {
            fillFromPickerInputText(e.target);
        });
    });
});


function changeColors(variables) {

    const setCssVariable = (variable, value) => {
        document.querySelector(':root').style.setProperty(variable, value);
    }

    const convertHexToRgb = (hex) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return r + "," + g + "," + b;
    }

    for (const [key, value] of Object.entries(variables)) {
        setCssVariable("--" + key, convertHexToRgb(value));
    }
}

function fillInputTextFromPicker(colorPicker) {
    colorPicker.nextElementSibling.value = colorPicker.value;
}

function fillFromPickerInputText(inputText) {
    if (!isHexadecimalColor(inputText.value)) return;
    inputText.previousElementSibling.value = inputText.value;
}

function isHexadecimalColor(input) {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexColorRegex.test(input);
}
