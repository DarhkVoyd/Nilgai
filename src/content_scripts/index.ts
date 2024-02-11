chrome.runtime.onMessage.addListener(rescueFromFeedback);

function rescueFromFeedback(): undefined {
    const rescueContainer = document.createElement('div') as HTMLDivElement;
    rescueContainer.setAttribute('id', 'rescue-container');
    rescueContainer.style.marginTop = '20px';

    const dropdownLabel = document.createElement("label") as HTMLLabelElement;
    dropdownLabel.textContent = "Select an option:";
    dropdownLabel.style.marginRight = '10px';

    const rescueDropdown = document.createElement("select") as HTMLSelectElement;
    const options = ['1', '2', '3', '4', '5', 'Random'];
    options.forEach(optionValue => {
        const option = document.createElement("option") as HTMLOptionElement;
        option.value = optionValue;
        option.text = optionValue;
        rescueDropdown.appendChild(option);
    });
    rescueDropdown.id = "rescue-dropdown";
    rescueDropdown.style.padding = '8px';
    rescueDropdown.style.marginRight = '10px';
    rescueDropdown.value = '5';

    const rescueButton = document.createElement('button') as HTMLButtonElement;
    rescueButton.setAttribute('type', 'button');
    rescueButton.setAttribute('id', 'rescue-button');
    rescueButton.textContent = 'Rescue';
    rescueButton.style.backgroundColor = '#4CAF50';
    rescueButton.style.color = 'white';
    rescueButton.style.padding = '10px';
    rescueButton.style.border = 'none';
    rescueButton.style.borderRadius = '5px';
    rescueButton.addEventListener('click', rescueFeedback);

    const feedbackFormIFrame = document.querySelector('#frm')! as HTMLIFrameElement;
    const feedbackFormDocument = feedbackFormIFrame?.contentDocument || feedbackFormIFrame.contentWindow?.document;
    const feedbackForm = feedbackFormDocument!.querySelector('form')! as HTMLFormElement;

    rescueContainer.appendChild(dropdownLabel);
    rescueContainer.appendChild(rescueDropdown);
    rescueContainer.appendChild(rescueButton);
    feedbackForm.appendChild(rescueContainer);

    function rescueFeedback() {
        const selectedValue = rescueDropdown.value;

        const feedbackFormTable = feedbackForm.querySelector('#id_select_colindex_1_1')!.closest('table')! as HTMLTableElement;
        const feedbackFormTableSelects = feedbackFormTable.querySelectorAll(`select`) as NodeListOf<HTMLSelectElement>;
        if (selectedValue === 'Random') {
            feedbackFormTableSelects.forEach(select => {
                const randomValue = Math.floor(Math.random() * 5) + 1;
                select.value = randomValue.toString();
            });
        } else {
            const numericValue = parseInt(selectedValue, 10);
            if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 5) {
                feedbackFormTableSelects.forEach(select => {
                    select.value = numericValue.toString();
                });
            } else {
                alert('Invalid rescue value. Please select a number between 1 and 5 or "Random".');
            }
        }
    }
}

