const subjectSelect12th = document.getElementById('subject-select-12th');
const subjectSelect11th = document.getElementById('subject-select-11th');
const classSelectSenior = document.getElementById('class-select-sr');

const subjectSelect10th = document.getElementById('subject-select-10th');
const subjectSelect9th = document.getElementById('subject-select-9th');
const classSelectSec = document.getElementById('class-select-sec');


const chapterContainer = document.getElementById('chapter-container');
const chapterSelect = document.getElementById('chapter-select');
const loadingIcon = document.getElementById('loading-icon');
const downloadContainer = document.getElementById('download-container');
const downloadButton = document.getElementById('download-button');

// URLs mapped by class and subject
const subjectUrls = {
    "12th": {
        "Mathematics": "https://example.com/mathematics-12th-url",
        "Physics": "https://example.com/physics-12th-url",
        "Chemistry": "https://script.google.com/macros/s/AKfycby9ml48--CfGCgOCUlMiaMxcGynnVNI41DaHEgv1JLYiLEqqxtHdZ3rPdTPNRGRq591oQ/exec",
        "Biology": "https://script.google.com/macros/s/AKfycbw5foe7B81N6W6pHcfT4i6SHuF6nMm8joAftYTg7GJWS4cQ4xmbi966IPhRlKPiEwI-MQ/exec",
        "Economic": "https://example.com/economic-12th-url",
        "English":"",
        "History":"",
        "Economics":"",
        "Accountancy":"",
        "Business":"",
        "Physical":"",
        "Information":"",
        "Computer":"",

    },
    "11th": {
        "Mathematics": "https://example.com/mathematics-11th-url",
        "Physics": "https://example.com/physics-11th-url",
        "Chemistry": "https://example.com/chemistry-11th-url",
        "Biology": "https://example.com/biology-11th-url",
        "Economic": "https://example.com/economic-11th-url",
        "Informatics": "https://example.com/informatics-11th-url",
        "Accountancy": "https://example.com/accountancy-11th-url",
        "Business": "https://example.com/business-11th-url",
        "Geography": "https://example.com/geography-11th-url",
        "Computer": "https://example.com/computer-11th-url"
    },
    "10th": {
        "Science": "",
        "English": "",
        "Social Science": "",
        "Mathematics": "",
        "Maths Formulas": "",
        "भूगोल": "",
        "इतिहास": "",
        "गणित": "",
        "विज्ञान": "",
        "राजनीति विज्ञान": "",
        "आर्थिक विकास की समझ": "",
        "कृतिका - II": "",
        "क्षितिज - II": "",
        "संचयन - II": "",
        "सपर्श - II": "",
    },

    "9th": {
        "Science" : "https://script.google.com/macros/s/AKfycby9ml48--CfGCgOCUlMiaMxcGynnVNI41DaHEgv1JLYiLEqqxtHdZ3rPdTPNRGRq591oQ/exec",
        "Maths Formula" : "",
        "Social Science" : "",
        "अर्थशास्त्र" : "",
        "भूगोल" : "",
        "इतिहास" : "",
        "गणित" : "",
        "राजनीति विज्ञान" : "",
        "विज्ञान" : "",
        "समकालीन भारत" : "",
        "कृतिका" : "",
        "क्षितिज" : "",
        "संचयन" : "",
        "स्पर्श" : "",
    },
    "8th": {
        "Biology" : "https://ncerthelp.com/ncert-cbse-notes/Class-8",
        "Chemistry" : "",
        "Mathematics" : "",
        "Physics" : "",
        "Science" : "",
        "Social Science" : "",
        "नागरिकशास्र" : "",
        "भूगोल" : "",
        "इतिहास" : "",
        "गणित" : "",
        "विज्ञान" : "",
        "भारत की खोज" : "",
        "वसंत" : "",
    }
};

classSelectSenior.addEventListener('change', function() {
    const selectedClass = this.value;
    console.log("class is selected");
    if (selectedClass === "12th") {
        subjectSelect12th.style.display = 'flex';
        subjectSelect11th.style.display = 'none';
    } 
    else if (selectedClass === "11th") {
        subjectSelect11th.style.display = 'flex';
        subjectSelect12th.style.display = 'none';
    } 
    else {
        subjectSelect12th.style.display = 'none';
        subjectSelect11th.style.display = 'none';
    }
    // Reset the chapter and download containers
    chapterContainer.style.display = 'none';
    downloadContainer.style.display = 'none';
});

classSelectSec.addEventListener('change', function() {
    const selectedClass = this.value;
    console.log("class is selected");
    
    if (selectedClass === "10th") {
        subjectSelect10th.style.display = 'flex';
        subjectSelect9th.style.display = 'none';
    } 
    else if (selectedClass === "9th") {
        subjectSelect9th.style.display = 'flex';
        subjectSelect10th.style.display = 'none';
    } 
    else {
        subjectSelect10th.style.display = 'none';
        subjectSelect9th.style.display = 'none';
    }
    // Reset the chapter and download containers
    chapterContainer.style.display = 'none';
    downloadContainer.style.display = 'none';
});

subjectSelect12th.addEventListener('change', function() {
    const selectedSubject = this.value;
    fetchChapters('12th', selectedSubject);
});

subjectSelect11th.addEventListener('change', function() {
    const selectedSubject = this.value; 
    fetchChapters('11th', selectedSubject);
});
subjectSelect10th.addEventListener('change', function() {
    const selectedSubject = this.value;
    fetchChapters('10th', selectedSubject);
});

subjectSelect9th.addEventListener('change', function() {
    const selectedSubject = this.value;
    fetchChapters('9th', selectedSubject);
});

chapterSelect.addEventListener('change', function() {
    const selectedChapterLink = this.value;
    if (selectedChapterLink) {
        downloadButton.onclick = function() {
            window.open(selectedChapterLink, '_blank');
        };
        downloadContainer.style.display = 'flex';
    } else {
        downloadContainer.style.display = 'none';
    }
});

function fetchChapters(selectedClass, selectedSubject) {
    const url = subjectUrls[selectedClass][selectedSubject];
    const chapterModal = new bootstrap.Modal(document.getElementById('chapterModal'));
    const loadingIcon = document.getElementById('loading-icon');
    const chapterContainer = document.getElementById('chapter-container');
    const errorMessage = document.getElementById('error-message');
    const chapterSelect = document.getElementById('chapter-select');
    const downloadContainer = document.getElementById('download-container');

    if (url) {
        // Immediately show the modal
        chapterModal.show();

        // Reset the modal content
        loadingIcon.style.display = 'block';
        chapterContainer.style.display = 'none';
        downloadContainer.style.display = 'none';
        errorMessage.style.display = 'none';
        chapterSelect.innerHTML = '<option value="" disabled selected>Select Chapter</option>';

        // Fetch the data
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const chapters = data.data;
                populateChapterSelect(chapters);
                chapterContainer.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching chapter data:', error);
                errorMessage.style.display = 'block';
            })
            .finally(() => {
                loadingIcon.style.display = 'none';
            });
    }
}


function populateChapterSelect(chapters) {
    const chapterSelect = document.getElementById('chapter-select');
    const downloadContainer = document.getElementById('download-container');
    const downloadButton = document.getElementById('download-button');

    // Reset the select options and hide the download container
    chapterSelect.innerHTML = '<option value="" disabled selected>Select Chapter</option>';
    downloadContainer.style.display = 'none';
    downloadButton.disabled = true;

    // Populate the select dropdown with chapters
    chapters.forEach(chapter => {
        const option = document.createElement('option');
        option.value = chapter["Download Link"];
        option.textContent = chapter["Chapter Name"];
        chapterSelect.appendChild(option);
    });

    // Show the download container and enable the download button when a chapter is selected
    chapterSelect.addEventListener('change', () => {
        if (chapterSelect.value) {
            downloadContainer.style.display = 'flex';
            downloadButton.disabled = false;

            // Update the download button's click event to download the selected chapter
            downloadButton.onclick = () => {
                const downloadLink = chapterSelect.value;
                window.open(downloadLink, '_blank');
            };
        } else {
            downloadContainer.style.display = 'none';
            downloadButton.disabled = true;
        }
    });
}


//  Script to Handle Selection 
    window.onload = function() {
        // Get the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const selectedRadio = urlParams.get('select');

        // Function to update header and paragraph based on selected radio button
        function updateContent(id) {
            let headerText = "";
            let paragraphText = "";

            switch(id) {
                case "youtube":
                    headerText = "It's Lecture Time";
                    paragraphText = "Access detailed video lectures covering all important topics. Find all study-related videos and tutorials on our YouTube channel.";
                    break;
                case "notes":
                    headerText = "My Notes";
                    paragraphText = "Get Notes of every class & every subject you wanted.";
                    break;
                case "previous-exams":
                    headerText = "Previous Exam Papers";
                    paragraphText = "Review previous exam papers to prepare effectively.";
                    break;
                case "books":
                    headerText = "Let's See The Text Books";
                    paragraphText = "Review previous exam papers to prepare effectively.";
                    break;
                case "mock-test":
                    headerText = "You wanna give Test";
                    paragraphText = "You can also Give Test and Imporve you skills by giving them.";
                    break;
                case "earn":
                    headerText = "Earn While Learn";
                    paragraphText = "You can earn something while in your learning phase. Read about our Earn while Learn Scheme.";
                    break;
                default:
                    headerText = "Select an Option";
                    paragraphText = "Please choose an option to see more details.";
                    break;
            }

            document.getElementById('header-text').textContent = headerText;
            document.getElementById('paragraph-text').textContent = paragraphText;
        }

        // If the select parameter exists, trigger the radio button click
        if (selectedRadio) {
            const radioButton = document.getElementById(selectedRadio);
            if (radioButton) {
                radioButton.checked = true;
                radioButton.dispatchEvent(new Event('change'));
                updateContent(selectedRadio);  // Update content on page load based on URL
            }
        }

        // Add event listeners to update content when a radio button is clicked
        const radioButtons = document.querySelectorAll('input[name="radio-examples"]');
        radioButtons.forEach(button => {
            button.addEventListener('change', function() {
                updateContent(this.id);
            });
        });
    };

